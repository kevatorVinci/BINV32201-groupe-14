import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import {
  ADMINISTRATOR,
  APPLICATION,
  CONTACT,
  OFFER,
  STUDENT,
} from "../src/db/seed/seedIds.ts";
import { createTestApp, tokenFor } from "./helpers/testApp.ts";

let app: ReturnType<typeof createTestApp>;

beforeEach(() => {
  app = createTestApp();
});

const applyAs = (
  kind: "ADMIN" | "CONTACT" | "STUDENT",
  id: number,
  body: string | object | undefined,
) =>
  request(app)
    .post("/applications")
    .set("Authorization", tokenFor(kind, id))
    .set("Content-Type", "application/json")
    .send(body);

describe("POST /applications", () => {
  it("refuse une requête sans session (401)", async () => {
    const response = await request(app)
      .post("/applications")
      .send({ offerId: OFFER.INTERNAL_CHATBOT });

    expect(response.status).toBe(401);
  });

  it.each([
    ["un administrateur", "ADMIN" as const, ADMINISTRATOR.ANNE_LECLERCQ],
    ["un contact", "CONTACT" as const, CONTACT.MARC_LEJEUNE],
  ])("refuse la candidature pour %s (403)", async (_profile, kind, id) => {
    const response = await applyAs(kind, id, { offerId: OFFER.INTERNAL_CHATBOT });

    expect(response.status).toBe(403);
    expect(response.body.error.code).toBe("FORBIDDEN");
  });

  it.each([
    [undefined],
    [{ offerId: "7" }],
    [{ offerId: 0 }],
    [{ offerId: OFFER.INTERNAL_CHATBOT, message: 42 }],
  ])("refuse un corps invalide (%j)", async (body) => {
    const response = await applyAs("STUDENT", STUDENT.LUCAS_DUPONT, body);

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("INVALID_BODY");
  });

  it("crée une candidature à une offre publiée sans message", async () => {
    const response = await applyAs("STUDENT", STUDENT.LUCAS_DUPONT, {
      offerId: OFFER.INTERNAL_CHATBOT,
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(Number),
      offerId: OFFER.INTERNAL_CHATBOT,
      message: null,
      status: "IN_PROGRESS",
      appliedAt: expect.any(String),
    });
  });

  it("conserve le message facultatif après suppression des espaces autour", async () => {
    const response = await applyAs("STUDENT", STUDENT.LUCAS_DUPONT, {
      offerId: OFFER.INTERNAL_CHATBOT,
      message: "  Mon message de candidature  ",
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Mon message de candidature");
  });

  it("autorise plusieurs candidatures en cours du même étudiant pour la même offre", async () => {
    const first = await applyAs("STUDENT", STUDENT.LUCAS_DUPONT, {
      offerId: OFFER.INTERNAL_CHATBOT,
    });
    const second = await applyAs("STUDENT", STUDENT.LUCAS_DUPONT, {
      offerId: OFFER.INTERNAL_CHATBOT,
    });

    expect(first.status).toBe(201);
    expect(second.status).toBe(201);
    expect(first.body.id).not.toBe(second.body.id);
  });

  it("refuse une offre qui n'existe pas (404)", async () => {
    const response = await applyAs("STUDENT", STUDENT.LUCAS_DUPONT, { offerId: 9999 });

    expect(response.status).toBe(404);
    expect(response.body.error.code).toBe("NOT_FOUND");
  });

  it.each([OFFER.CLIENT_PORTAL, OFFER.CLOUD_MIGRATION])(
    "refuse une offre non publiée %i (409)",
    async (offerId) => {
      const response = await applyAs("STUDENT", STUDENT.LUCAS_DUPONT, { offerId });

      expect(response.status).toBe(409);
      expect(response.body.error.code).toBe("OFFER_NOT_PUBLISHED");
    },
  );
});

describe("GET /applications", () => {
  const listAs = (kind: "ADMIN" | "CONTACT" | "STUDENT", id: number) =>
    request(app).get("/applications").set("Authorization", tokenFor(kind, id));

  it("refuse une requête sans session (401)", async () => {
    const response = await request(app).get("/applications");

    expect(response.status).toBe(401);
    expect(response.body.error.code).toBe("UNAUTHENTICATED");
  });

  it.each([
    ["un administrateur", "ADMIN" as const, ADMINISTRATOR.ANNE_LECLERCQ],
    ["un contact", "CONTACT" as const, CONTACT.MARC_LEJEUNE],
  ])("refuse les candidatures à %s (403)", async (_profile, kind, id) => {
    const response = await listAs(kind, id);

    expect(response.status).toBe(403);
    expect(response.body.error.code).toBe("FORBIDDEN");
  });

  it("retourne uniquement les candidatures de l'étudiant connecté", async () => {
    const response = await listAs("STUDENT", STUDENT.LUCAS_DUPONT);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: APPLICATION.LUCAS_FLEET_APP,
        offerId: OFFER.FLEET_APP,
        offerTitle: "Application React de gestion de flotte",
        companyShortName: "Lumen Digital",
        academicYear: "2026-2027",
        period: "P2",
        message: "Le développement React m'intéresse particulièrement.",
        status: "IN_PROGRESS",
        appliedAt: "2026-10-02 18:10:00",
      },
    ]);
  });

  it.each([
    [STUDENT.LUCAS_DUPONT, APPLICATION.LUCAS_FLEET_APP, "IN_PROGRESS"],
    [STUDENT.MATEUSZ_KOWALSKI, APPLICATION.MATEUSZ_CLOUD_MIGRATION, "SELECTED"],
    [STUDENT.LEA_MERTENS, APPLICATION.LEA_CLOUD_MIGRATION, "REJECTED"],
    [STUDENT.INES_HADDAD, APPLICATION.INES_BILLING_API, "WITHDRAWN"],
  ] as const)("expose le statut %s de la candidature", async (studentId, applicationId, status) => {
    const response = await listAs("STUDENT", studentId);
    const application = response.body.find((item: { id: number }) => item.id === applicationId);

    expect(application?.status).toBe(status);
  });

  it("retourne une liste vide à un étudiant sans candidature", async () => {
    const response = await listAs("STUDENT", STUDENT.LOUIS_CLAES);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("n'expose que les champs du DTO de consultation", async () => {
    const response = await listAs("STUDENT", STUDENT.LUCAS_DUPONT);

    expect(Object.keys(response.body[0]).sort()).toEqual(
      [
        "academicYear",
        "appliedAt",
        "companyShortName",
        "id",
        "message",
        "offerId",
        "offerTitle",
        "period",
        "status",
      ],
    );
  });
});

describe("PATCH /applications/:id/withdraw", () => {
  const withdrawAs = (studentId: number, applicationId: number) =>
    request(app)
      .patch(`/applications/${applicationId}/withdraw`)
      .set("Authorization", tokenFor("STUDENT", studentId));

  it("retire une candidature en cours et permet ensuite de recandidater", async () => {
    const response = await withdrawAs(STUDENT.LUCAS_DUPONT, APPLICATION.LUCAS_FLEET_APP);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: APPLICATION.LUCAS_FLEET_APP,
      offerId: OFFER.FLEET_APP,
      message: "Le développement React m'intéresse particulièrement.",
      status: "WITHDRAWN",
      appliedAt: "2026-10-02 18:10:00",
    });

    const listResponse = await request(app)
      .get("/applications")
      .set("Authorization", tokenFor("STUDENT", STUDENT.LUCAS_DUPONT));
    expect(listResponse.body[0].status).toBe("WITHDRAWN");

    const reapplication = await applyAs("STUDENT", STUDENT.LUCAS_DUPONT, {
      offerId: OFFER.FLEET_APP,
    });
    expect(reapplication.status).toBe(201);
  });

  it("refuse une requête sans session (401)", async () => {
    const response = await request(app).patch(
      `/applications/${APPLICATION.LUCAS_FLEET_APP}/withdraw`,
    );

    expect(response.status).toBe(401);
  });

  it("refuse le retrait par un profil autre qu'étudiant (403)", async () => {
    const response = await request(app)
      .patch(`/applications/${APPLICATION.LUCAS_FLEET_APP}/withdraw`)
      .set("Authorization", tokenFor("ADMIN", ADMINISTRATOR.ANNE_LECLERCQ));

    expect(response.status).toBe(403);
    expect(response.body.error.code).toBe("FORBIDDEN");
  });

  it("ne révèle pas une candidature appartenant à un autre étudiant (404)", async () => {
    const response = await withdrawAs(STUDENT.LUCAS_DUPONT, APPLICATION.INES_FLEET_APP);

    expect(response.status).toBe(404);
    expect(response.body.error.code).toBe("NOT_FOUND");
  });

  it("refuse un identifiant invalide (400)", async () => {
    const response = await request(app)
      .patch("/applications/abc/withdraw")
      .set("Authorization", tokenFor("STUDENT", STUDENT.LUCAS_DUPONT));

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("INVALID_QUERY");
  });

  it("refuse le retrait d'une candidature sélectionnée (409)", async () => {
    const response = await withdrawAs(
      STUDENT.MATEUSZ_KOWALSKI,
      APPLICATION.MATEUSZ_CLOUD_MIGRATION,
    );

    expect(response.status).toBe(409);
    expect(response.body.error.code).toBe("APPLICATION_NOT_WITHDRAWABLE");
  });

  it.each([
    [STUDENT.LEA_MERTENS, APPLICATION.LEA_CLOUD_MIGRATION],
    [STUDENT.INES_HADDAD, APPLICATION.INES_BILLING_API],
  ])("refuse une candidature déjà traitée ou retirée (%i)", async (studentId, applicationId) => {
    const response = await withdrawAs(studentId, applicationId);

    expect(response.status).toBe(409);
    expect(response.body.error.code).toBe("APPLICATION_NOT_WITHDRAWABLE");
  });
});

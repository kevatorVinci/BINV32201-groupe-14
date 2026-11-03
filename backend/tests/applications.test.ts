import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { ADMINISTRATOR, CONTACT, OFFER, STUDENT } from "../src/db/seed/seedIds.ts";
import { createTestApp, tokenFor } from "./helpers/testApp.ts";

let app: ReturnType<typeof createTestApp>;

beforeEach(() => {
  app = createTestApp();
});

const applyAs = (kind: "ADMIN" | "CONTACT" | "STUDENT", id: number, body: unknown) =>
  request(app).post("/applications").set("Authorization", tokenFor(kind, id)).send(body);

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
    [null],
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

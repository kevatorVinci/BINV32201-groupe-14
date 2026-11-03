import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import MyApplicationsPage from "../src/pages/MyApplicationsPage.tsx";
import { stubFetch } from "./helpers/fetchMock.ts";

const applications = [
  {
    id: 1,
    offerId: 7,
    offerTitle: "Assistant conversationnel interne",
    companyShortName: "Nexalis",
    academicYear: "2026-2027",
    period: "P2",
    message: "Le sujet m'intéresse.",
    status: "IN_PROGRESS",
    appliedAt: "2026-10-04 14:50:00",
  },
  {
    id: 2,
    offerId: 6,
    offerTitle: "Migration d'une application vers le cloud",
    companyShortName: "Datavia",
    academicYear: "2026-2027",
    period: "P2",
    message: null,
    status: "SELECTED",
    appliedAt: "2026-09-22 12:00:00",
  },
  {
    id: 3,
    offerId: 6,
    offerTitle: "Migration d'une application vers le cloud",
    companyShortName: "Datavia",
    academicYear: "2026-2027",
    period: "P2",
    message: null,
    status: "REJECTED",
    appliedAt: "2026-09-23 17:25:00",
  },
  {
    id: 4,
    offerId: 3,
    offerTitle: "API REST de facturation",
    companyShortName: "Orbis",
    academicYear: "2026-2027",
    period: "P2",
    message: null,
    status: "WITHDRAWN",
    appliedAt: "2026-09-30 10:30:00",
  },
];

describe("MyApplicationsPage", () => {
  it("affiche les candidatures avec les libellés français des quatre statuts", async () => {
    const fetchMock = stubFetch({ "/api/applications": () => Response.json(applications) });

    render(<MyApplicationsPage token="jeton" onUnauthorized={vi.fn()} />);

    expect(await screen.findByText("Assistant conversationnel interne")).toBeInTheDocument();
    expect(screen.getByText("Le sujet m'intéresse.")).toBeInTheDocument();
    expect(screen.getByText("Nexalis")).toBeInTheDocument();
    expect(screen.getByText("2026-10-04 14:50:00")).toBeInTheDocument();
    expect(screen.getByText("En cours")).toBeInTheDocument();
    expect(screen.getByText("Retenue")).toBeInTheDocument();
    expect(screen.getByText("Non retenue")).toBeInTheDocument();
    expect(screen.getByText("Retirée")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/applications",
      expect.objectContaining({ headers: { Authorization: "jeton" } }),
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("affiche un message lorsque l'étudiant n'a aucune candidature", async () => {
    stubFetch({ "/api/applications": () => Response.json([]) });

    render(<MyApplicationsPage token="jeton" onUnauthorized={vi.fn()} />);

    expect(
      await screen.findByText("Vous n’avez pas encore de candidature."),
    ).toBeInTheDocument();
  });

  it("affiche les erreurs renvoyées par le backend", async () => {
    stubFetch({ "/api/applications": () => new Response(null, { status: 403 }) });

    render(<MyApplicationsPage token="jeton" onUnauthorized={vi.fn()} />);

    expect(await screen.findByRole("alert")).toHaveTextContent("statut 403");
  });

  it("redirige vers la connexion quand la session est expirée", async () => {
    stubFetch({ "/api/applications": () => new Response(null, { status: 401 }) });
    const onUnauthorized = vi.fn();

    render(<MyApplicationsPage token="jeton" onUnauthorized={onUnauthorized} />);

    await waitFor(() => expect(onUnauthorized).toHaveBeenCalled());
  });
});

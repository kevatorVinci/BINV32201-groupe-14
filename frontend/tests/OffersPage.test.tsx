import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import OffersPage from "../src/pages/OffersPage.tsx";
import { adminUser, contactUser, stubFetch, studentUser } from "./helpers/fetchMock.ts";

const offers = [
  {
    id: 2,
    title: "Refonte du portail client",
    companyShortName: "Lumen Digital",
    academicYear: "2026-2027",
    period: "P2",
    status: "SUBMITTED",
  },
  {
    id: 5,
    title: "Tableau de bord de qualité des données",
    companyShortName: "Lumen Data",
    academicYear: "2026-2027",
    period: "OTHER",
    status: "ASSIGNED",
  },
];

describe("OffersPage", () => {
  it("affiche les offres avec leurs libellés français", async () => {
    const fetchMock = stubFetch({ "/api/offers": () => Response.json(offers) });

    render(<OffersPage user={contactUser} token="jeton" onUnauthorized={vi.fn()} />);

    expect(screen.getByRole("combobox", { name: "Période" })).toHaveValue("");
    expect(screen.getByRole("option", { name: "Toutes les périodes" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "P1" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "P2" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Autre" })).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith("/api/offers", expect.anything());
    expect(await screen.findByText("Refonte du portail client")).toBeInTheDocument();
    expect(screen.getByText("Soumise")).toBeInTheDocument();
    expect(screen.getByText("Attribuée")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Autre" })).toBeInTheDocument();
    expect(screen.getByText("2 offres")).toBeInTheDocument();
    expect(screen.getByText("Les offres que vous avez déposées.")).toBeInTheDocument();
  });

  it("transmet la période sélectionnée et permet de revenir à toutes les périodes", async () => {
    const fetchMock = stubFetch({ "/api/offers": () => Response.json([]) });

    render(<OffersPage user={adminUser} token="jeton" onUnauthorized={vi.fn()} />);
    const periodSelect = screen.getByRole("combobox", { name: "Période" });

    fireEvent.change(periodSelect, { target: { value: "P1" } });
    await waitFor(() => expect(fetchMock).toHaveBeenLastCalledWith("/api/offers?period=P1", expect.anything()));

    fireEvent.change(periodSelect, { target: { value: "P2" } });
    await waitFor(() => expect(fetchMock).toHaveBeenLastCalledWith("/api/offers?period=P2", expect.anything()));

    fireEvent.change(periodSelect, { target: { value: "OTHER" } });
    await waitFor(() =>
      expect(fetchMock).toHaveBeenLastCalledWith("/api/offers?period=OTHER", expect.anything()),
    );

    fireEvent.change(periodSelect, { target: { value: "" } });
    await waitFor(() => expect(fetchMock).toHaveBeenLastCalledWith("/api/offers", expect.anything()));
    expect(periodSelect).toHaveValue("");
    expect(await screen.findByText("Aucune offre à afficher.")).toBeInTheDocument();
  });

  it("adapte la description au profil", async () => {
    stubFetch({ "/api/offers": () => Response.json([]) });

    const { unmount } = render(
      <OffersPage user={studentUser} token="jeton" onUnauthorized={vi.fn()} />,
    );
    expect(screen.getByText("Les offres publiées.")).toBeInTheDocument();
    expect(await screen.findByText("Aucune offre à afficher.")).toBeInTheDocument();
    unmount();

    render(<OffersPage user={adminUser} token="jeton" onUnauthorized={vi.fn()} />);
    expect(screen.getByText("Toutes les offres, tous statuts confondus.")).toBeInTheDocument();
  });

  it("affiche un refus d'accès renvoyé par le backend", async () => {
    stubFetch({ "/api/offers": () => new Response(null, { status: 403 }) });

    render(<OffersPage user={contactUser} token="jeton" onUnauthorized={vi.fn()} />);

    expect(await screen.findByRole("alert")).toHaveTextContent("statut 403");
  });

  it("signale une session expirée", async () => {
    stubFetch({ "/api/offers": () => new Response(null, { status: 401 }) });
    const onUnauthorized = vi.fn();

    render(<OffersPage user={contactUser} token="jeton" onUnauthorized={onUnauthorized} />);

    await waitFor(() => expect(onUnauthorized).toHaveBeenCalled());
  });

  it("permet à un étudiant de candidater à une offre publiée avec un message", async () => {
    const publishedOffer = {
      id: 7,
      title: "Assistant conversationnel interne",
      companyShortName: "Nexalis",
      academicYear: "2026-2027",
      period: "P2",
      status: "PUBLISHED",
    };
    const fetchMock = stubFetch({
      "/api/offers": () => Response.json([publishedOffer, offers[0]]),
      "/api/applications": () =>
        Response.json({
          id: 20,
          offerId: 7,
          message: "Expérience React",
          status: "IN_PROGRESS",
          appliedAt: "2026-11-03 14:30:00",
        }),
    });

    render(<OffersPage user={studentUser} token="jeton" onUnauthorized={vi.fn()} />);

    expect(await screen.findByRole("button", { name: "Candidater" })).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Candidater" })).toHaveLength(1);
    const message = screen.getByRole("textbox", {
      name: "Message facultatif pour « Assistant conversationnel interne »",
    });
    fireEvent.change(message, { target: { value: "  Expérience React  " } });
    fireEvent.click(screen.getByRole("button", { name: "Candidater" }));

    expect(await screen.findByRole("status")).toHaveTextContent("Candidature envoyée.");
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/applications",
      expect.objectContaining({
        method: "POST",
        headers: { Authorization: "jeton", "Content-Type": "application/json" },
        body: JSON.stringify({ offerId: 7, message: "Expérience React" }),
      }),
    );
  });

  it("permet de candidater sans message et affiche les erreurs d'API", async () => {
    const fetchMock = stubFetch({
      "/api/offers": () =>
        Response.json([
          {
            id: 7,
            title: "Assistant conversationnel interne",
            companyShortName: "Nexalis",
            academicYear: "2026-2027",
            period: "P2",
            status: "PUBLISHED",
          },
        ]),
      "/api/applications": () => new Response(null, { status: 409 }),
    });

    render(<OffersPage user={studentUser} token="jeton" onUnauthorized={vi.fn()} />);
    fireEvent.click(await screen.findByRole("button", { name: "Candidater" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("statut 409");
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/applications",
      expect.objectContaining({
        body: JSON.stringify({ offerId: 7 }),
      }),
    );
  });

  it("rend les offres publiées non candidatables aux autres profils", async () => {
    stubFetch({
      "/api/offers": () =>
        Response.json([
          {
            id: 7,
            title: "Assistant conversationnel interne",
            companyShortName: "Nexalis",
            academicYear: "2026-2027",
            period: "P2",
            status: "PUBLISHED",
          },
        ]),
    });

    render(<OffersPage user={adminUser} token="jeton" onUnauthorized={vi.fn()} />);

    expect(await screen.findByText("Assistant conversationnel interne")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Candidater" })).not.toBeInTheDocument();
  });

  it("redirige vers la connexion quand la candidature retourne 401", async () => {
    const onUnauthorized = vi.fn();
    stubFetch({
      "/api/offers": () =>
        Response.json([
          {
            id: 7,
            title: "Assistant conversationnel interne",
            companyShortName: "Nexalis",
            academicYear: "2026-2027",
            period: "P2",
            status: "PUBLISHED",
          },
        ]),
      "/api/applications": () => new Response(null, { status: 401 }),
    });

    render(<OffersPage user={studentUser} token="jeton" onUnauthorized={onUnauthorized} />);
    fireEvent.click(await screen.findByRole("button", { name: "Candidater" }));

    await waitFor(() => expect(onUnauthorized).toHaveBeenCalled());
  });
});

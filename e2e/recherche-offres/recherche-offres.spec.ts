import { expect, test, type Page } from "@playwright/test";

// Scénarios décrits dans e2e/recherche-offres/scenarios.md.
// Les deux tests sont indépendants : chacun ouvre une session neuve (contexte Playwright isolé),
// se connecte comme Lucas Dupont et ne modifie aucune donnée (lecture seule).

const PUBLISHED_TITLES = [
  "Assistant conversationnel interne",
  "Tableau de bord de qualité des données",
  "Application React de gestion de flotte",
  "API REST de facturation",
];
const SUBMITTED_TITLE = "Refonte du portail client";

const openOffersAsLucas = async (page: Page) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Lucas Dupont" }).click();
  await page
    .getByRole("navigation", { name: "Navigation principale" })
    .getByRole("link", { name: "Offres" })
    .click();
  await expect(page.getByRole("heading", { name: "Offres de stage" })).toBeVisible();
  await expect(page.getByText("Les offres publiées.")).toBeVisible();
};

const titleCell = (page: Page, title: string) =>
  page.getByRole("cell", { name: title, exact: true });

test("Scénario 1 : recherche avec résultat", async ({ page }) => {
  await openOffersAsLucas(page);

  // État initial : période « Toutes les périodes », recherche vide, 4 offres publiées.
  const search = page.getByRole("searchbox", { name: "Rechercher une offre" });
  await expect(page.getByRole("combobox", { name: "Période" })).toHaveValue("");
  await expect(search).toHaveValue("");
  await expect(page.getByText("4 offres", { exact: true })).toBeVisible();
  for (const title of PUBLISHED_TITLES) {
    await expect(titleCell(page, title)).toBeVisible();
  }

  // Deux espaces avant, le mot en majuscules, deux espaces après.
  await search.fill("  CONVERSATIONNEL  ");

  await expect(titleCell(page, "Assistant conversationnel interne")).toBeVisible();
  await expect(page.getByText("1 offre", { exact: true })).toBeVisible();
  await expect(page.locator("tbody").getByRole("row")).toHaveCount(1);
  const row = page.getByRole("row", { name: /Assistant conversationnel interne/ });
  await expect(row).toContainText("Nexalis");
  await expect(row).toContainText("2026-2027");
  await expect(row).toContainText("P2");
  await expect(row).toContainText("Publiée");
  for (const title of PUBLISHED_TITLES.slice(1)) {
    await expect(titleCell(page, title)).toHaveCount(0);
  }
  await expect(page.getByRole("combobox", { name: "Période" })).toHaveValue("");
});

test("Scénario 2 : recherche sans résultat", async ({ page }) => {
  await openOffersAsLucas(page);

  // État initial : période « Toutes les périodes », recherche vide.
  const search = page.getByRole("searchbox", { name: "Rechercher une offre" });
  await expect(page.getByRole("combobox", { name: "Période" })).toHaveValue("");
  await expect(search).toHaveValue("");
  // L'offre Soumise n'est pas dans la liste affichée à l'étudiant (constat côté interface).
  await expect(titleCell(page, SUBMITTED_TITLE)).toHaveCount(0);

  await search.fill(SUBMITTED_TITLE);

  await expect(page.getByText("Aucune offre ne correspond à votre recherche.")).toBeVisible();
  await expect(page.getByRole("table")).toHaveCount(0);
  await expect(page.getByText(/^\d+ offres?$/)).toHaveCount(0);
  await expect(titleCell(page, SUBMITTED_TITLE)).toHaveCount(0);
});

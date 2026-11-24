import { defineConfig, devices } from "@playwright/test";

// Les serveurs ne sont pas démarrés par Playwright : lancer `npm run dev` à la racine avant les tests.
// Base de démonstration attendue : `npm run db:reset` (ou `npm run setup`) avant la série.
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:5173",
    trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});

Je ne peux pas modifier les fichiers dans ce mode en lecture seule. Voici le test à ajouter dans `OffersPage.test.tsx`, près des autres tests de candidature :

```tsx
it("permet de candidater sans message et affiche la confirmation", async () => {
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
    "/api/applications": () =>
      Response.json(
        {
          id: 20,
          offerId: 7,
          message: null,
          status: "IN_PROGRESS",
          appliedAt: "2026-11-03 14:30:00",
        },
        { status: 201 },
      ),
  });

  render(<OffersPage user={studentUser} token="jeton" onUnauthorized={vi.fn()} />);
  fireEvent.click(await screen.findByRole("button", { name: "Candidater" }));

  expect(await screen.findByRole("status")).toHaveTextContent("Candidature envoyée.");
  expect(fetchMock).toHaveBeenCalledWith(
    "/api/applications",
    expect.objectContaining({
      method: "POST",
      body: JSON.stringify({ offerId: 7 }),
    }),
  );
});
```

Pour l’ajouter au fichier, passez à un agent capable de modifier le code.











Merci pour la validation. Je vais maintenant filtrer côté page les offres déjà accessibles, en laissant le filtre de période et les contrôles de visibilité existants inchangés, puis relancer les tests ciblés.

Search for `input|select|label|result-count`

Ran terminal command: git --no-pager diff -- frontend/tests/OffersPage.test.tsx; git status --short

Read 
Completed with input: {
  "path": "C:\\Users\\foded\\Desktop\\VINCI\\IA_dev\\projet\\BINV32201-groupe-14\\frontend\\src\\components\\SearchField.tsx"
}

Read 
Completed with input: {
  "path": "C:\\Users\\foded\\Desktop\\VINCI\\IA_dev\\projet\\BINV32201-groupe-14\\frontend\\src\\pages\\CompaniesPage.tsx"
}

Read , lines 85 to 110
Completed with input: {
  "path": "C:\\Users\\foded\\Desktop\\VINCI\\IA_dev\\projet\\BINV32201-groupe-14\\frontend\\src\\index.css",
  "view_range": [
    85,
    110
  ]
}

Edit 

La page réutilise le composant de recherche déjà employé pour les entreprises. La recherche filtre maintenant les titres des offres récupérées, tandis que le filtre de période continue d’agir via l’API ; je lance les vérifications frontend ciblées.

Ran terminal command: npm run test -w frontend -- tests/OffersPage.test.tsx

Ran terminal command: npm run typecheck -w frontend

Ran terminal command: npm run lint -w frontend

Les 13 tests de la page passent désormais, ainsi que le typecheck et le lint frontend. Je vérifie maintenant la suite complète du dépôt et le build frontend avant de conclure.

Ran terminal command: npm test

Ran terminal command: npm run build -w frontend

Ran terminal command: git diff --check; git status --short; git --no-pager diff --stat

Search for `searchTerm|SearchField label|Aucune offre ne correspond|recherche une express...`

La recherche d’offres est implémentée dans `OffersPage.tsx` : elle ignore la casse et les espaces extérieurs, cherche l’expression entière dans le titre et se combine au filtre de période. Une recherche vide conserve les offres accessibles ; sans résultat, un message adapté s’affiche. La visibilité des étudiants reste inchangée.

Les tests ajoutés dans `OffersPage.test.tsx` couvrent ces comportements.

**Vérifications réussies :** tests ciblés (13), suite complète (`npm test` : 212 tests), typecheck, lint frontend, build frontend et `git diff --check`.

J’ai laissé intacts les changements préexistants dans `.github/copilot-instructions.md` et `.github/skills/test-driven-development/`.


Ran terminal command: Remove-Item -LiteralPath 'C:\Users\foded\Desktop\VINCI\IA_dev\projet\BINV32201-groupe-14\demo-protected.txt'
Tool execution failed: Denied by preToolUse hook: Démonstration Tool Guardian : suppression de demo-protected.txt interdite. Conserve ce fichier et explique le blocage à l’utilisateur.

Je n’ai pas pu supprimer `demo-protected.txt` : le garde-fou du terminal a bloqué la commande et indique de conserver ce fichier.



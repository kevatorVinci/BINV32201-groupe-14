Audit des tests EF-32 et EF-33
Vérification des constats
Cas à vérifier	Test existant	Conclusion
Création d'une candidature sans message	applications.test.ts vérifie la création avec message: null	Couvert
Consultation des candidatures d'un autre étudiant	applications.test.ts vérifie l'isolation des candidatures	Couvert
Retrait d'une candidature déjà traitée	Tests de retrait déjà présents	Couvert
Succès d'une candidature sans message côté frontend	Le test frontend couvre principalement l'erreur 409, mais pas le succès 201	Manque confirmé
Ordre chronologique des candidatures	Aucun test ne vérifie explicitement le tri des candidatures	Manque confirmé
Validation des réponses API par les guards	Aucun test dédié aux DTO invalides	Manque confirmé
Test ajouté
Le manque retenu concernait la vérification du succès d'une candidature sans message côté frontend. Un test a été ajouté afin de couvrir ce scénario.

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

  fireEvent.click(
    await screen.findByRole("button", { name: "Candidater" })
  );

  expect(await screen.findByRole("status"))
    .toHaveTextContent("Candidature envoyée.");

  expect(fetchMock).toHaveBeenCalledWith(
    "/api/applications",
    expect.objectContaining({
      method: "POST",
      body: JSON.stringify({ offerId: 7 }),
    }),
  );
});
Ce test vérifie :

l'envoi d'une candidature sans message ;
la réception d'une réponse de succès (201) ;
l'affichage du message de confirmation ;
l'absence du champ message dans la requête envoyée à l'API.
Exécution des tests
Après l'ajout du test, l'ensemble de la suite de tests a été exécuté avec la commande suivante :

npm run test
Résultats obtenus
Backend : 148 tests réussis
Frontend : 61 tests réussis
Total : 209 tests réussis
Aucun test n'a échoué.

Conclusion
Le nouveau test ne révèle aucun défaut dans l'implémentation actuelle. Il améliore néanmoins la couverture des tests en protégeant explicitement le scénario de candidature sans message avec une réponse de succès (201). Cela réduit le risque de régression future sur ce comportement.



Recherche d'offres (EF-30)
La fonctionnalité a été développée en suivant une approche TDD.

Des tests ont d'abord été ajoutés pour définir le comportement attendu de la recherche. Ces tests ont été exécutés avant l'implémentation et ont échoué, ce qui a confirmé l'absence de la fonctionnalité. Après validation des tests, l'implémentation a été réalisée puis les tests ont été rejoués avec succès.

La recherche :

filtre les offres à partir du titre ;
ignore les différences entre majuscules et minuscules ;
ignore les espaces au début et à la fin de la recherche ;
affiche toutes les offres accessibles lorsque la recherche est vide ;
affiche un message adapté lorsqu'aucune offre ne correspond ;
fonctionne conjointement avec le filtre par période ;
conserve les règles de visibilité existantes pour les étudiants.
Validation
Les vérifications suivantes ont été exécutées avec succès :

npm test
npm run check
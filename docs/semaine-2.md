# Bilan — Semaine 2 : candidatures

## Choix de planification

- Travail en étapes pour garder le périmètre contrôlable : candidature à une offre publiée (EF-32), consultation des candidatures (EF-33), puis retrait dans une étape ultérieure.
- Réutilisation de la table `applications`, déjà présente dans le schéma, des offres publiées et de l’authentification de démonstration ; aucune migration n’était nécessaire.
- La consultation se fait sur une page distincte « Mes candidatures », réservée aux étudiants.
- Le message de candidature est facultatif. Plusieurs candidatures en cours du même étudiant pour une même offre sont autorisées, et l’étudiant pourra recandidater après un retrait.
- La sélection d’un candidat, la création du stage, les notifications, EF-30 et EF-31 restent hors de ce périmètre.

## Résultat, difficultés et limites

L’étudiant peut envoyer une candidature à une offre publiée depuis la liste des offres, consulter ses candidatures sur « Mes candidatures » et retirer une candidature encore en cours. L’API vérifie le profil et l’état publié de l’offre ; la consultation et le retrait sont limités aux candidatures de l’étudiant connecté. Le retrait conserve la ligne et met son statut à `WITHDRAWN`. Les quatre statuts du CDC sont affichés en français.

Après le retrait, l’étudiant peut candidater à nouveau à la même offre. Une candidature sélectionnée, refusée ou déjà retirée ne peut pas être retirée. Aucune vérification manuelle dans un navigateur n’a été effectuée dans cette séance ; la validation disponible est celle des tests automatisés et des commandes de qualité.

Pendant le développement, Oxlint a signalé un changement d’état synchrone dans l’effet du hook ; le changement a été supprimé. TypeScript a également révélé des types trop étroits/inadaptés dans les couches et les tests, qui ont été corrigés. Un premier test a tenté d’envoyer un corps JSON `null` via Supertest, ce qui a déclenché l’erreur du parseur JSON avant le contrôleur ; ce cas a été retiré du test invalide afin de tester la validation métier avec des corps effectivement acceptés par le parseur.

## Modifications

- Backend : ajout de la lecture des candidatures dans le repository, le service, le mapper et le contrôleur existants ; le contrôleur déduit l’étudiant de la session authentifiée. La documentation de `GET /applications` a été ajoutée à `backend/API.md`.
- Backend : ajout de la route `PATCH /applications/:id/withdraw` et d’une mise à jour SQL conditionnelle au statut `IN_PROGRESS` et à l’identifiant étudiant ; documentation dans `backend/API.md` et exemple dans `backend/http/applications.http`.
- Frontend : ajout des types, du service, du hook et de la page `MyApplicationsPage`, ainsi que de la route et du lien de navigation visibles uniquement aux étudiants. Les libellés de statut sont centralisés dans `frontend/src/utils/labels.ts`. Le bouton « Retirer » n’est affiché que pour une candidature en cours.
- Tests : extension de `backend/tests/applications.test.ts` et des tests de navigation/routage, et création de `frontend/tests/MyApplicationsPage.test.tsx`.
- Après lecture et approbation du plan, le développement s’est déroulé en étapes : consultation d’abord, puis retrait. L’identité de l’étudiant est déduite côté serveur plutôt que fournie par le client ; les erreurs d’accès à une candidature d’un autre étudiant répondent 404.

## Validation fonctionnelle

Les parcours suivants ont été exercés par les tests automatisés, pas par une manipulation manuelle du navigateur :

- Un étudiant reçoit uniquement ses propres candidatures, avec offre, entreprise, année, période, message, date et statut.
- Les données de démonstration couvrent les statuts `IN_PROGRESS`, `SELECTED`, `REJECTED` et `WITHDRAWN`, affichés respectivement « En cours », « Retenue », « Non retenue » et « Retirée ».
- Un étudiant sans candidature reçoit une liste vide et voit un message d’état vide.
- Une requête sans session reçoit 401 ; les profils administrateur et contact reçoivent 403 pour la lecture.
- Une erreur API est affichée et une session expirée appelle le retour à la connexion.
- La route « Mes candidatures » s’ouvre pour l’étudiant et reste inaccessible aux autres profils.
- Le retrait transforme une candidature en cours en « Retirée », la conserve dans la liste et permet de déposer une nouvelle candidature à la même offre.
- Le serveur refuse le retrait par un autre profil, d’une candidature appartenant à un autre étudiant, déjà traitée ou déjà retirée ; l’interface affiche l’erreur et conserve l’action en cas d’échec.

Une correction a été apportée après l’échec du premier essai de validation : le test du corps `null` passait par le parseur Express et retournait une erreur serveur au lieu de tester le validateur du contrôleur. Le test a été ajusté et la suite complète est ensuite passée.

## Qualité et tests

Les vérifications ont porté sur la séparation contrôleur/service/repository/mapper, l’autorisation côté serveur, le filtrage SQL par identifiant étudiant, la validation des réponses côté frontend et la mise à jour conditionnelle du statut lors du retrait. Aucune modification du schéma ni dépendance n’a été requise.

Tests ajoutés : couverture API de l’accès étudiant, de l’isolation, des quatre états, du retrait et de ses refus, de la recandidature après retrait, de la liste vide et de la forme du DTO ; couverture frontend des libellés, de l’état vide, des erreurs, de la session expirée, de l’accès par profil et de l’action de retrait. Exemple : un test vérifie qu’après retrait d’une candidature de Lucas, elle apparaît toujours avec le statut `WITHDRAWN` et une nouvelle candidature sur l’offre est acceptée.

Commande exécutée :

```text
npm run check
```

Résultat final : succès — lint, vérifications TypeScript, 147 tests backend, 60 tests frontend et builds backend/frontend. `git diff --check` a également été vérifié avec la gestion des fins de ligne CRLF (`git -c core.whitespace=cr-at-eol diff --check`).

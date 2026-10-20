# Bilan — Première fonctionnalité

## Retour sur la séance

- Ce que j’ai appris : J’ai appris à configurer les permissions de Copilot, à comprendre le parcours d’une requête du frontend jusqu’à la base de données et à vérifier les modifications proposées par un agent.

- Ce que Copilot nous a aidés à faire : Copilot nous a aidés à explorer l’architecture du projet, à ajouter le filtre par période côté frontend et backend, à compléter les tests automatisés et à mettre à jour la documentation de l’API.

- Ce que nous avons vérifié ou corrigé nous-mêmes : Nous avons vérifié la correspondance entre le code OTHER et le libellé « Autre », ainsi que la convention d’erreur INVALID_QUERY. Nous avons aussi testé manuellement les quatre choix du filtre avec les profils administrateur et étudiant, vérifié les requêtes API et confirmé que les restrictions de visibilité étaient conservées.

- Difficulté ou limite rencontrée : Aucune difficulté particulière rencontrée pendant cette séance.

- Crédits IA au début : 15 % utilisés.
- Crédits IA à la fin : 21 % utilisés.
- Consommation constatée : 6 points de pourcentage du quota pendant la séance.

## Tests manuels

- [x] Administrateur : les quatre choix fonctionnent.
- [x] Étudiant : les quatre choix fonctionnent.
- [x] L’étudiant ne voit que des offres publiées.
- [x] Le retour à « Toutes les périodes » restaure la liste initiale.
- [x] Les requêtes API transmettent la bonne période.
- [x] Le sélecteur reste utilisable lorsqu’un résultat vide est rencontré.

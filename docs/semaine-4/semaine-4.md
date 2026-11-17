Semaine 4
Audit des tests
Constats vérifiés :

Cas à vérifier	Conclusion
Création d'une candidature sans message	Couvert
Consultation des candidatures d'un autre étudiant	Couvert
Retrait d'une candidature déjà traitée	Couvert
Succès d'une candidature sans message côté frontend	Manque confirmé
Ordre chronologique des candidatures	Manque confirmé
Validation des réponses API par les guards	Manque confirmé
Test ajouté : vérification de la création d'une candidature sans message avec réponse de succès (201) et affichage du message de confirmation.

TDD
Avant l'implémentation de la recherche EF-30, trois tests ont été ajoutés puis exécutés.

Résultat :

les nouveaux tests échouaient car la fonctionnalité n'existait pas encore ;
les tests existants continuaient à réussir.
Après vérification des scénarios proposés, les tests ont été validés puis l'implémentation a été réalisée.

Recherche EF-30
Cas testés :

recherche insensible à la casse ;
suppression des espaces en début et fin ;
recherche vide ;
aucune correspondance ;
combinaison avec le filtre de période.
Résultat :

comportement attendu obtenu ;
npm run check réussi ;
aucun problème restant identifié.
Hook Tool Guardian
Événement utilisé : preToolUse.

Essais réalisés :

git status : exécution autorisée ;
suppression de demo-protected.txt : action refusée par le hook.
Le fichier est resté présent après la tentative de suppression, ce qui confirme le déclenchement du hook.

Conversations
Les conversations Copilot utilisées pour les exercices sont jointes au format Markdown.
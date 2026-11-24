# Semaine 5 : scénarios end-to-end de la recherche d'offres (EF-30)

## 1. Scénarios

Les scénarios sont décrits dans [e2e/recherche-offres/scenarios.md](../../e2e/recherche-offres/scenarios.md).

| Scénario | Compte | Saisie | Résultat attendu |
|---|---|---|---|
| 1 : recherche avec résultat | Lucas Dupont (étudiant) | `  CONVERSATIONNEL  ` | Une seule offre, « Assistant conversationnel interne », compteur « 1 offre » |
| 2 : recherche sans résultat | Lucas Dupont (étudiant) | `Refonte du portail client` | Message « Aucune offre ne correspond à votre recherche. », ni tableau ni compteur |

### Justification

- **Scénario 1** couvre le cas nominal de la recherche par mot-clé. Avec une saisie en majuscules entourée de deux espaces de chaque côté, il vérifie en une seule fois trois choix documentés en semaine 4 : l'insensibilité à la casse, la suppression des espaces de début et de fin, et la correspondance par sous-chaîne du titre. Il vérifie aussi que le filtre de période n'est pas modifié par la recherche.
- **Scénario 2** couvre le cas sans résultat. Il cherche le titre d'une offre qui existe mais n'est pas publiée (« Refonte du portail client », statut Soumise). Il constate donc à la fois le message de liste vide et l'absence de cette offre dans l'interface de l'étudiant.
- **Limite du scénario 2.** Il ne prouve pas à lui seul l'autorisation côté serveur. Ce contrôle relève de `backend/tests/offers.test.ts`.
- **Hors périmètre.** Les filtres par entreprise et par localité ne sont pas couverts. La recherche porte sur le titre uniquement (limite de portée de l'implémentation, pas une violation établie de l'exigence).

## 2. Exécution du scénario 1 via Playwright MCP

**Client utilisé** : Claude Code dans VS Code, avec le serveur Playwright MCP et l'application (http://localhost:5173) démarrés par l'utilisateur. Aucune commande terminal n'a été lancée et aucun fichier n'a été modifié pendant cette exécution.

### Appels d'outils observés

| # | Outil MCP | Action demandée | Information renvoyée |
|---|---|---|---|
| 1 | `browser_navigate` | Aller sur `http://localhost:5173` | URL `http://localhost:5173/`, titre « Gesta » |
| 2 | `browser_snapshot` | Lire la page d'accueil | Page « Connexion de démonstration » avec les groupes Administrateurs, Étudiants et Contacts d'entreprise. Aucune session ouverte. |
| 3 | `browser_click` | Cliquer sur « Lucas Dupont » | Code exécuté `getByRole('button', { name: 'Lucas Dupont' }).click()` |
| 4 | `browser_click` | Cliquer sur « Offres » dans la navigation | Code exécuté `getByRole('link', { name: 'Offres' }).click()`, URL `http://localhost:5173/offres` |
| 5 | `browser_snapshot` | Vérifier l'état initial | Titre « Offres de stage », texte « Les offres publiées. », champ de recherche vide, période « Toutes les périodes », « 4 offres », quatre lignes (Assistant conversationnel interne / Nexalis, Tableau de bord de qualité des données / Lumen Data, Application React de gestion de flotte / Lumen Digital, API REST de facturation / Orbis) |
| 6 | `browser_type` | Saisir `  CONVERSATIONNEL  ` dans « Rechercher une offre » | Code exécuté `getByRole('searchbox', { name: 'Rechercher une offre' }).fill('  CONVERSATIONNEL  ')` |
| 7 | `browser_snapshot` | Lire le résultat | « 1 offre », une seule ligne : Assistant conversationnel interne, Nexalis, 2026-2027, P2, Publiée. Période toujours sur « Toutes les périodes ». |

### Attendu et observé

| Point | Attendu | Observé |
|---|---|---|
| État initial | « 4 offres », période « Toutes les périodes », champ vide | Identique |
| Lignes du tableau | Une seule : Assistant conversationnel interne, Nexalis, 2026-2027, P2, Publiée | Identique |
| Compteur | « 1 offre » | « 1 offre » |
| Trois autres offres | Non affichées | Non affichées |
| Sélecteur « Période » | Inchangé | Inchangé |

**Écart** : aucun. Une remarque : le snapshot affiche la valeur du champ comme `CONVERSATIONNEL`, sans les espaces. Le filtrage a bien fonctionné malgré les espaces, mais le snapshot ne permet pas de dire si le champ les conserve.

Après cette exécution, le serveur MCP s'est déconnecté (erreur `ECONNREFUSED`). Cela n'a pas affecté le scénario.

## 3. Tests Playwright Test

Fichier : [e2e/recherche-offres/recherche-offres.spec.ts](../../e2e/recherche-offres/recherche-offres.spec.ts) (configuration : [playwright.config.ts](../../playwright.config.ts)). Les deux tests sont indépendants, ouvrent chacun une session neuve, se connectent comme Lucas Dupont et ne modifient aucune donnée.

**`Scénario 1 : recherche avec résultat`**
- Période égale à `""`, champ de recherche vide, texte « 4 offres » visible, les quatre titres publiés visibles.
- Après `fill("  CONVERSATIONNEL  ")` : cellule « Assistant conversationnel interne » visible et texte « 1 offre » visible. `tbody` contient exactement 1 ligne, avec Nexalis, 2026-2027, P2 et Publiée. Les trois autres titres sont absents. Le sélecteur de période est toujours à `""`.

**`Scénario 2 : recherche sans résultat`**
- État initial vérifié, et « Refonte du portail client » absent de la liste.
- Après `fill("Refonte du portail client")` : le message « Aucune offre ne correspond à votre recherche. » est visible. Il n'y a aucun tableau, aucun compteur du type « N offre(s) » et aucune cellule portant ce titre.

## 4. Vérification par défaut temporaire

**Objectif** : montrer que les tests détectent réellement la désactivation du filtrage par titre.

**Défaut** : dans [frontend/src/pages/OffersPage.tsx](../../frontend/src/pages/OffersPage.tsx), la déclaration de `filteredOffers` a été remplacée par `const filteredOffers = offers; // TEMP-SECTION-4 : filtrage par titre désactivé`. Les tests, les données, l'authentification et le filtre de période n'ont pas été touchés.

**Échec attendu** : Scénario 1 à l'assertion « 1 offre » (compteur resté à « 4 offres »). Scénario 2 à l'assertion du message « Aucune offre ne correspond… », puisque la liste n'est jamais vide.

**Déroulement**

1. Le défaut a été appliqué après validation, puis le code a été restauré à l'identique (bloc `offers.filter(...)`). Le test du scénario 1 relancé avec `--headed` a donné `1 passed (2.3s)`.
2. Par erreur, le défaut a été réappliqué lors d'une répétition de la même consigne, ce qui n'était pas voulu. L'utilisateur a lancé les tests : résultat `2 failed` (Scénario 1 et Scénario 2), conforme à l'échec attendu. Le code a ensuite été restauré, puis les deux scénarios relancés : `2 passed (2.3s)`.

**État final** : le filtrage est restauré. `git diff --stat` ne montre aucune différence sur `OffersPage.tsx` et le marqueur `TEMP-SECTION-4` n'apparaît plus dans le dépôt. Les échecs observés pendant l'exercice venaient uniquement du défaut volontaire et ne représentent pas un problème persistant.

**À compléter** : le détail exact de l'assertion en échec (ligne et message d'erreur) n'a pas été fourni dans les sorties de la deuxième exécution. Si besoin, joindre la sortie complète du terminal ou la trace Playwright.

## 5. Résultats réels des exécutions

| Exécution | Résultat | Durée rapportée |
|---|---|---|
| MCP, scénario 1 | Conforme à l'attendu | Non mesurée |
| Playwright Test, scénario 1 seul, filtrage restauré (`--headed`) | `1 passed` | 2.3s |
| Playwright Test, défaut présent (lancé par l'utilisateur) | `2 failed` | à compléter |
| Playwright Test, 2 scénarios, filtrage restauré | `2 passed` | 2.3s |

## 6. `npm run check`

À compléter : le résultat n'a pas été fourni.

## 7. Comparaison entre MCP et Playwright Test

| Critère | Playwright MCP | Playwright Test |
|---|---|---|
| Rôle | Exploration interactive pilotée par l'agent, pas à pas | Test automatisé, écrit une fois, rejouable |
| Reproductibilité | Dépend des actions de l'agent à chaque session | Identique à chaque exécution |
| Assertions | Vérification par lecture des snapshots, jugée par l'agent | Assertions explicites qui échouent automatiquement |
| Détection d'une régression | Non démontrée dans cet exercice | Démontrée : le défaut temporaire fait échouer les deux scénarios |
| Usage retenu | Valider qu'un scénario est exécutable et que ses préconditions sont réunies | Garde-fou de non-régression |

Le MCP a servi à vérifier que le scénario 1 se déroule dans l'application réelle. Le test écrit en Playwright Test est la preuve rejouable, et seul celui-ci a été confronté au défaut temporaire.

## 8. Conversations exportées

- [conversation.md](conversation.md) : conversation de la semaine 5 (exécution MCP, défaut temporaire, restauration, rédaction de ce bilan).

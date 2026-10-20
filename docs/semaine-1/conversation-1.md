User: /sandbox policy

Copilot: Opened the sandbox policy in the editor.

User: /init

Copilot: Read skill `agent-customization`
Completed with input: {"skill":"agent-customization"}

Requested chat rename
Completed with input: {
  "title": "Create Copilot instructions",
  "automatic": true
}

Find files matching `*`

Find files matching `.github/**`

Find files matching `**/{README.md,CONTRIBUTING.md,CLAUDE.md,AGENTS.md,.cursorrules,.windsurfrules...`

Read
Completed with input: {
  "path": "C:\\Users\\akato\\AppData\\Roaming\\Code\\agentPlugins\\vscode-synced-customization-agent-host-copilotcli-857325950\\165997831\\skills\\agent-customization\\references\\agent-instructions.md"
}

I found an existing project-wide instructions file, so I’ll preserve its useful guidance and refine it from the repository’s actual scripts, documentation, and layer structure.

Read
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\.github\\copilot-instructions.md"
}

Read
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\README.md"
}

Read
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\package.json"
}

Find files matching `backend/src/**/*.ts`

Find files matching `frontend/src/**/*.tsx`

Find files matching `frontend/src/**/*.ts`

Find files matching `docs/**/*.md`

Find files matching `backend/API.md`

Find files matching `**/{CLAUDE.md,AGENTS.md,.cursorrules,.windsurfrules,CONVENTIONS.md,AIDER_CONV...`

Find files matching `backend/package.json`

Find files matching `frontend/package.json`

Find files matching `backend/tests/**/*`

Find files matching `frontend/tests/**/*`

Read
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\backend\\package.json"
}

Read
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\frontend\\package.json"
}

Read
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\docs\\architecture.md"
}

Read
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\docs\\seed.md"
}

Read , lines 1 to 220
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\backend\\API.md",
  "view_range": [
    1,
    220
  ]
}

Read , lines 1 to 220
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\README.md",
  "view_range": [
    1,
    220
  ]
}

Read
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\backend\\src\\app.ts"
}

Read
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\frontend\\src\\App.tsx"
}

Read
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\backend\\tests\\helpers\\testApp.ts"
}

The existing file already captures most of the project’s important rules. I’m tightening it rather than replacing it: adding the repository-specific setup constraints and a concise change-wiring checklist while keeping its architecture and API conventions intact.

Edit

Read
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\.github\\copilot-instructions.md"
}

Ran terminal command: git diff --check; git status --short -- .github/copilot-instructions.md

The instructions file is in place and passes `git diff --check`; no runtime tests are needed for this documentation-only change.

Added artifact "Copilot instructions"
Completed with input: {
  "items": [
    {
      "type": "file",
      "label": "Copilot instructions",
      "isArtifact": true,
      "uri": "file:///C:/ecole/2026/AI/BINV32201-groupe-14/.github/copilot-instructions.md"
    }
  ]
}

Created and refined `.github/copilot-instructions.md`.

It now documents:

- Root, workspace-specific, focused-test, database, lint, typecheck, and build commands
- React/Vite frontend and Express/SQLite backend architecture
- Dependency-injected backend layering and MVVM frontend structure
- Authentication, authorization, API error, migration, seed, and testing conventions
- Frontend service/type-guard and unauthorized-session patterns
- References to the repository’s existing documentation

Validation completed with `git diff --check`.

Would you like to configure a Playwright MCP server for browser-based testing of this web application? Also let me know if you want to adjust the instructions or add coverage for any repository areas I may have missed.

User: Non, ne configure pas de serveur Playwright MCP et n'ajoute aucun outil
ni aucune dépendance pour le moment.

Indique le chemin exact du fichier d'instructions que tu as créé ou modifié.
Ne fais aucune autre modification pour l'instant.

Copilot: Le fichier d’instructions créé et modifié se trouve exactement ici :

[`C:\ecole\2026\AI\BINV32201-groupe-14\.github\copilot-instructions.md`]()

Aucune autre modification n’a été effectuée.

User: Vérifie le fichier .github/copilot-instructions.md en le comparant
au README, aux package.json et aux fichiers réellement présents.

Vérifie notamment :
- les commandes de tests ciblés et les chemins des fichiers de test ;
- le proxy /api ;
- le format exact du header Authorization ;
- les factories backend et leur assemblage ;
- le fonctionnement de useAuth et de onUnauthorized.

Ne modifie aucun fichier pour le moment.
Présente les éventuelles erreurs ou imprécisions avec les chemins des
fichiers qui permettent de les vérifier. Ne considère pas les instructions
générées comme une preuve de leur propre exactitude.

Copilot: Je vais vérifier les affirmations directement dans les scripts, la configuration Vite, les fichiers d’authentification et les tests, sans modifier le dépôt.

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\.github\\copilot-instructions.md"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\package.json"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\backend\\package.json"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\frontend\\package.json"
}

Search for `proxy|/api`

Search for `Authorization|Bearer|onUnauthorized|useAuth`

Search for `create[A-Za-z]+(Repository|Service)|createApp|createRouter`

Find files matching `frontend/*vite*`

Find files matching `backend/tests/**/*.test.ts`

Find files matching `frontend/tests/**/*.test.tsx`

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\frontend\\vite.config.ts"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\frontend\\src\\hooks\\useAuth.ts"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\frontend\\src\\utils\\api.ts"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\frontend\\src\\services\\auth.service.ts"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\frontend\\src\\services\\offers.service.ts"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\frontend\\src\\hooks\\useOffers.ts"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\frontend\\src\\hooks\\useCompanies.ts"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\frontend\\tests\\helpers\\fetchMock.ts"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\backend\\src\\middlewares\\authenticate.ts"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\.npmrc"
}

Read [](), lines 35 to 90
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\README.md",
  "view_range": [
    35,
    90
  ]
}

Search for `API listens|Run focused|Frontend requests|Send the session|useAuth|onUnauthor...`

Search for `API_PORT|proxy|rewrite|port:`

Search for `useAuth|logout|onUnauthorized|Authorization`

Search for `createApp|create.*Repository|create.*Service|create.*Router|app.use`

Search for `test|vitest|check|setup|API_PORT`

Vérification effectuée sans modifier aucun fichier.

## Résultat général

Le fichier [`copilot-instructions.md`]() est globalement exact. Les points demandés sont confirmés par le code réel et non uniquement par les instructions générées.

## Commandes de tests ciblés

Les commandes indiquées sont correctes :

- Backend :
  ```bash
  npm run test -w backend -- tests/offers.test.ts
  ```
  Le fichier existe : [`backend/tests/offers.test.ts`]().

- Frontend :
  ```bash
  npm run test -w frontend -- tests/OffersPage.test.tsx
  ```
  Le fichier existe : [`frontend/tests/OffersPage.test.tsx`]().

- La sélection par nom avec `-t` est compatible avec Vitest :
  ```bash
  npm run test -w backend -- tests/offers.test.ts -t "nom du test"
  ```

Les scripts `test: "vitest run"` sont bien présents dans [`backend/package.json`]() et [`frontend/package.json`](). Les scripts racine `test`, `lint`, `typecheck`, `build` et `check` sont définis dans [`package.json`]().

## Proxy `/api`

L’instruction est exacte :

> Le frontend appelle `/api/...`; Vite retire `/api` avant de transmettre au backend.

Preuves :

- [`frontend/src/utils/api.ts:2`]() définit `API_URL = "/api"`.
- [`frontend/vite.config.ts:12-16`]() configure le proxy et applique :
  ```ts
  rewrite: (path) => path.replace(/^\/api/, "")
  ```
- [`backend/src/app.ts:28-33`]() monte effectivement les routes sous `/health`, `/auth`, `/companies` et `/offers`, sans préfixe `/api`.

## Header `Authorization`

L’instruction est exacte :

> Le jeton est envoyé directement comme valeur du header `Authorization`, sans préfixe `Bearer`.

Preuves :

- [`frontend/src/services/auth.service.ts:21`]()
- [`frontend/src/services/offers.service.ts:7`]()
- [`backend/src/middlewares/authenticate.ts:12`](), qui lit directement `req.get("Authorization")`.
- [`backend/API.md:8-12`](), qui documente le même format.

Aucune imprécision trouvée sur ce point.

## Factories backend et assemblage

Les instructions sont exactes.

Les factories sont effectivement assemblées dans [`backend/src/app.ts:17-33`]() :

- repositories :
  - `createUsersRepository`
  - `createCompaniesRepository`
  - `createOffersRepository`
- services :
  - `createAuthService`
  - `createCompaniesService`
  - `createOffersService`
- middleware :
  - `createAuthenticate`
- routeurs :
  - `createAuthRouter`
  - `createCompaniesRouter`
  - `createOffersRouter`

Les définitions correspondantes se trouvent notamment dans :

- [`backend/src/repositories/`]()
- [`backend/src/services/`]()
- [`backend/src/controllers/`]()

Le test assemblé utilise bien `createApp` avec une base SQLite en mémoire dans [`backend/tests/helpers/testApp.ts:12-16`]().

## `useAuth` et `onUnauthorized`

Les instructions sont exactes, avec une précision importante : `useAuth` est appelé une seule fois directement dans `App`.

Preuves :

- [`frontend/src/App.tsx:14`]() appelle `useAuth()`.
- [`frontend/src/App.tsx:28-34`]() transmet `auth.logout` comme `onUnauthorized` aux pages.
- [`frontend/src/hooks/useAuth.ts:16-22`]() définit `logout`, qui :
  - supprime le token persistant ;
  - remet `token` à `null` ;
  - remet `user` à `null` ;
  - efface l’erreur.
- [`frontend/src/App.tsx:16-17`]() rend ensuite `LoginPage` lorsque la session est absente.
- [`frontend/src/hooks/useOffers.ts:22-26`]() et [`frontend/src/hooks/useCompanies.ts:28-32`]() appellent `onUnauthorized()` uniquement pour une erreur HTTP 401.

L’instruction signalant que `onUnauthorized` doit rester stable est également fondée : `logout` utilise `useCallback` dans [`frontend/src/hooks/useAuth.ts:16-22`](), ce qui évite de relancer inutilement les effets des hooks.

## Imprécision relevée

### Port API présenté comme toujours `3000`

La ligne 8 de [`copilot-instructions.md`]() indique :

> l’API écoute sur `http://localhost:3000`

C’est vrai par défaut, mais pas toujours. Le port est configurable avec `API_PORT` :

- [`backend/src/config.ts:15-17`]()
- [`frontend/vite.config.ts:5`]()
- [`README.md:177`]()

Il serait donc plus précis d’écrire « l’API écoute par défaut sur `http://localhost:3000`; le port peut être changé avec `API_PORT` ». Je n’ai pas appliqué cette correction, conformément à votre demande.

Aucune autre erreur ou imprécision significative n’a été identifiée sur les commandes, le proxy, l’authentification, les factories backend ou le fonctionnement de `useAuth` / `onUnauthorized`.

User: Sans créer ni modifier de fichiers, explique le parcours complet
qui permet d'afficher la liste des offres, depuis React jusqu'à SQLite
et le retour vers l'interface.

Pour chaque étape :
- indique le chemin exact du fichier ;
- nomme les fonctions concernées ;
- explique simplement leur rôle.

Explique ensuite les règles de visibilité des offres selon le profil :
administrateur, étudiant, déposant et contact sans rôle de déposant.

Enfin, identifie les fichiers à modifier pour ajouter le filtre :
Toutes les périodes, P1, P2, Autre.

Vérifie comment les périodes sont réellement représentées en base
et dans l'API, notamment la valeur correspondant à « Autre ».

Ne code pas encore la fonctionnalité.
N'ajoute aucune dépendance et ne crée aucune migration.

Copilot: Je vais retracer le flux réel dans les composants, hooks, services, routes backend, service métier, repository, mapper et schéma SQL, puis vérifier les tests et la documentation API pour confirmer les valeurs de période.

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\frontend\\src\\pages\\OffersPage.tsx"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\frontend\\src\\components\\OfferTable.tsx"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\frontend\\src\\hooks\\useOffers.ts"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\frontend\\src\\services\\offers.service.ts"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\frontend\\src\\models\\offer.ts"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\backend\\src\\controllers\\offers.controller.ts"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\backend\\src\\services\\offers.service.ts"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\backend\\src\\repositories\\offers.repository.ts"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\backend\\src\\mappers\\offer.mapper.ts"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\backend\\src\\models\\offer.ts"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\backend\\src\\services\\permissions.ts"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\backend\\src\\app.ts"
}

Search for `CREATE TABLE periods|periods|period_code|OTHER|P1|P2`

Read [](), lines 1 to 260
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\backend\\src\\db\\migrations\\001_initial.sql",
  "view_range": [
    1,
    260
  ]
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\frontend\\src\\utils\\labels.ts"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\frontend\\src\\utils\\guards.ts"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\backend\\tests\\offers.test.ts"
}

Read [](), lines 90 to 180
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\backend\\API.md",
  "view_range": [
    90,
    180
  ]
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\frontend\\tests\\OffersPage.test.tsx"
}

Aucune modification n’a été effectuée.

# Parcours complet d’affichage des offres

## 1. Routage React et rendu de la page

Fichier : [`frontend/src/App.tsx`]()

Fonctions et éléments concernés :

- `App`
- `useAuth()`
- `canListOffers(...)`
- `OffersPage`

`App` appelle `useAuth()` une seule fois. Lorsque l’utilisateur est authentifié, la route `/offres` est rendue uniquement si `canListOffers(auth.user)` retourne `true`.

La page reçoit :

- `user` : l’utilisateur courant ;
- `token` : le jeton de session ;
- `onUnauthorized={auth.logout}` : callback à appeler si l’API répond `401`.

La page des offres n’est donc pas accessible dans l’interface à un contact qui n’a pas le droit de consulter les offres. Le backend vérifie néanmoins aussi ce droit.

## 2. Chargement côté page

Fichier : [`frontend/src/pages/OffersPage.tsx`]()

Fonction concernée :

- `OffersPage`

`OffersPage` appelle :

```ts
useOffers(token, onUnauthorized)
```

Elle gère ensuite trois états :

1. erreur : rendu de `ErrorState` ;
2. chargement : rendu de `LoadingState` ;
3. résultat vide : rendu de `EmptyState` ;
4. résultat non vide : affichage du nombre d’offres et de `OfferTable`.

La description sous le titre est choisie localement selon `user.kind` :

- `ADMIN` : toutes les offres, tous statuts confondus ;
- `STUDENT` : offres publiées ;
- `CONTACT` : offres déposées par le contact.

Cette description ne filtre pas les données elle-même ; le filtrage réel est effectué par le backend.

## 3. Hook de chargement

Fichier : [`frontend/src/hooks/useOffers.ts`]()

Fonction concernée :

- `useOffers`

Le hook :

1. crée un `AbortController` ;
2. appelle `getOffers(token, controller.signal)` dans un `useEffect` ;
3. place les données reçues dans `offers` avec `setOffers` ;
4. met fin à l’état de chargement avec `setIsLoading(false)` ;
5. annule la requête lors du démontage ou du changement de dépendances.

En cas d’erreur :

- si l’erreur correspond à un statut `401`, il appelle `onUnauthorized()` ;
- sinon, il place le message dans `error`.

Le hook dépend de `token` et `onUnauthorized`. Le callback `auth.logout` transmis depuis `App` est stable car il est mémorisé par `useCallback`.

## 4. Appel HTTP frontend

Fichier : [`frontend/src/services/offers.service.ts`]()

Fonction concernée :

- `getOffers`

La fonction appelle :

```ts
fetch(`${API_URL}/offers`, {
  headers: { Authorization: token },
  signal,
})
```

Fichier : [`frontend/src/utils/api.ts`]()

Constante concernée :

- `API_URL = "/api"`

Le frontend envoie donc une requête vers :

```text
/api/offers
```

Le jeton est placé directement dans `Authorization`, sans préfixe `Bearer`.

Après la réponse, `getOffers` appelle `readJson(...)` avec le garde de type `isOfferList`.

## 5. Validation de la réponse frontend

Fichier : [`frontend/src/utils/guards.ts`]()

Fonctions concernées :

- `isOffer`
- `isOfferList`

`isOffer` vérifie notamment que :

- `id` est un nombre ;
- `title`, `companyShortName` et `academicYear` sont des chaînes ;
- `period` fait partie de `PERIOD_CODES` ;
- `status` fait partie de `OFFER_STATUSES`.

Fichier : [`frontend/src/models/offer.ts`]()

Constantes et types concernés :

```ts
export const PERIOD_CODES = ["P1", "P2", "OTHER"] as const;
export type PeriodCode = (typeof PERIOD_CODES)[number];
```

La réponse API doit donc utiliser `P1`, `P2` ou `OTHER`.

## 6. Proxy Vite

Fichier : [`frontend/vite.config.ts`]()

Configuration concernée :

```ts
proxy: {
  "/api": {
    target: API_TARGET,
    rewrite: (path) => path.replace(/^\/api/, ""),
  },
}
```

Le navigateur demande :

```text
http://localhost:5173/api/offers
```

Vite transmet cette requête au backend, par défaut sur :

```text
http://localhost:3000/offers
```

Le préfixe `/api` est retiré avant l’envoi au backend.

Le backend utilise `API_PORT` si cette variable est configurée :

- [`frontend/vite.config.ts:5`]()
- [`backend/src/config.ts:15-17`]()

## 7. Assemblage Express

Fichier : [`backend/src/app.ts`]()

Fonction concernée :

- `createApp`

La route est enregistrée ainsi :

```ts
app.use("/offers", authenticate, createOffersRouter(offersService));
```

`createApp` construit les dépendances :

```ts
const offersService = createOffersService(
  createOffersRepository(db),
);
```

Il construit également le middleware `authenticate` avec `createAuthenticate(authService)`.

## 8. Authentification du header

Fichier : [`backend/src/middlewares/authenticate.ts`]()

Fonctions concernées :

- `createAuthenticate`
- `getCurrentUser`

`createAuthenticate` lit :

```ts
req.get("Authorization")
```

Il transmet directement cette valeur à `authService.authenticate(...)`.

Le service d’authentification vérifie le jeton et relit l’utilisateur en base. Le résultat est placé dans `req.user`.

Fichier : [`backend/src/middlewares/authorize.ts`]()

Le middleware `authorize` vérifie ensuite la permission de consulter les offres.

## 9. Contrôleur de la route `/offers`

Fichier : [`backend/src/controllers/offers.controller.ts`]()

Fonction concernée :

- `createOffersRouter`

La route enregistrée est :

```ts
router.get("/", authorize(canListOffers), (req, res) => {
  res.json(offersService.listOffers(getCurrentUser(req)).map(toOfferDto));
});
```

Le contrôleur :

1. vérifie la permission avec `authorize(canListOffers)` ;
2. récupère l’utilisateur authentifié avec `getCurrentUser(req)` ;
3. appelle `offersService.listOffers(...)` ;
4. transforme chaque offre en DTO avec `toOfferDto` ;
5. renvoie le tableau JSON.

## 10. Vérification de la permission

Fichier : [`backend/src/services/permissions.ts`]()

Fonctions concernées :

- `isAdmin`
- `isStudent`
- `hasContactRole`
- `canListOffers`

`canListOffers` autorise :

```ts
isAdmin(user) ||
isStudent(user) ||
hasContactRole(user, "DEPOSITOR")
```

Cette vérification intervient avant l’appel au service métier.

## 11. Filtrage métier selon le profil

Fichier : [`backend/src/services/offers.service.ts`]()

Fonctions concernées :

- `visibilityFilter`
- `createOffersService`
- `listOffers`

`visibilityFilter` construit un `OfferFilter` selon le profil.

### Administrateur

```ts
if (isAdmin(viewer)) return {};
```

L’administrateur reçoit toutes les offres, quel que soit leur statut ou leur déposant.

### Étudiant

```ts
if (isStudent(viewer)) return { status: "PUBLISHED" };
```

L’étudiant reçoit uniquement les offres dont le statut est `PUBLISHED`.

### Contact déposant

```ts
if (hasContactRole(viewer, "DEPOSITOR")) {
  return { depositorContactId: viewer.id };
}
```

Le contact ayant le rôle `DEPOSITOR` reçoit toutes les offres dont il est le déposant, quel que soit leur statut.

Il ne reçoit pas les offres déposées par un collègue de la même entreprise.

### Contact sans rôle de déposant

Si le contact n’a pas le rôle `DEPOSITOR`, `visibilityFilter` lève :

```ts
new HttpError(403, "FORBIDDEN", ...)
```

Un contact uniquement promoteur, uniquement signataire, ou promoteur et signataire sans rôle de déposant reçoit donc `403 Forbidden`.

Les cas sont vérifiés dans [`backend/tests/offers.test.ts`]().

## 12. Requête SQL vers SQLite

Fichier : [`backend/src/repositories/offers.repository.ts`]()

Fonctions et éléments concernés :

- `createOffersRepository`
- `findAll`

La requête SQL joint :

- `offers` ;
- `companies` ;
- `academic_years` ;
- `periods`.

Elle sélectionne notamment :

```sql
ay.label AS academic_year_label,
p.code AS period_code
```

Les filtres actuels sont :

```sql
WHERE (@status IS NULL OR o.status = @status)
  AND (
    @depositorContactId IS NULL
    OR o.depositor_contact_id = @depositorContactId
  )
```

Le tri actuel est :

```sql
ORDER BY ay.start_date DESC, o.created_at DESC
```

Il trie d’abord par année académique décroissante, puis par date de création décroissante.

Le repository reçoit les filtres du service via :

```ts
findAll({ status, depositorContactId })
```

Il n’existe actuellement aucun filtre de période dans `OfferFilter` ni dans la clause SQL.

## 13. Conversion des données backend

Fichier : [`backend/src/mappers/offer.mapper.ts`]()

Fonctions concernées :

- `toOffer`
- `toOfferDto`

`toOffer` convertit la ligne SQL en modèle métier.

Il transforme notamment :

```ts
period: dbo.period_code
```

Puis `toOfferDto` réduit le modèle métier à la forme publique de l’API :

```ts
{
  id,
  title,
  companyShortName,
  academicYear,
  period,
  status
}
```

La description, l’identifiant de l’entreprise, les dates et certains champs internes ne sont pas exposés dans la liste API.

## 14. Retour dans React

La réponse JSON remonte dans l’ordre inverse :

1. `toOfferDto` produit le DTO backend ;
2. Express l’envoie dans `res.json(...)` ;
3. Vite transmet la réponse au navigateur ;
4. `readJson` vérifie le statut HTTP et la structure JSON ;
5. `getOffers` retourne `Offer[]` ;
6. `useOffers` appelle `setOffers(data)` ;
7. `OffersPage` reçoit la nouvelle valeur de `offers` ;
8. `OfferTable` est rendu avec `offers`.

Fichier : [`frontend/src/components/OfferTable.tsx`]()

Fonction concernée :

- `OfferTable`

Le composant parcourt `offers.map(...)` et affiche :

- `offer.title` ;
- `offer.companyShortName` ;
- `offer.academicYear` ;
- `PERIOD_LABELS[offer.period]` ;
- le statut traduit via `OFFER_STATUS_LABELS`.

Fichier : [`frontend/src/utils/labels.ts`]()

La conversion de période est :

```ts
P1: "P1",
P2: "P2",
OTHER: "Autre",
```

# Représentation réelle des périodes

## En base SQLite

Fichier : [`backend/src/db/migrations/001_initial.sql`]()

La table `periods` contient notamment :

```sql
code TEXT NOT NULL CHECK (code IN ('P1', 'P2', 'OTHER'))
```

Chaque période est liée à une année académique avec :

- `academic_year_id` ;
- `start_date` ;
- `end_date` ;
- `code`.

La valeur correspondant à l’interface « Autre » est donc exactement :

```text
OTHER
```

et non `AUTRE`.

## Dans les données de démonstration

Fichier : [`backend/src/db/seed/academicData.ts`]()

Les périodes de démonstration utilisent :

- `P1` ;
- `P2` ;
- `OTHER`.

Les identifiants stables sont définis dans [`backend/src/db/seed/seedIds.ts`]().

Les offres font référence à une période par `period_id`, par exemple dans [`backend/src/db/seed/offersData.ts`]().

## Dans le modèle backend

Fichier : [`backend/src/models/offer.ts`]()

```ts
export type PeriodCode = "P1" | "P2" | "OTHER";
```

## Dans l’API

Fichier : [`backend/API.md`]()

La réponse de `GET /offers` contient par exemple :

```json
{
  "period": "P2"
}
```

La documentation précise que `period` vaut :

```text
P1, P2 ou OTHER
```

## Dans le frontend

Fichier : [`frontend/src/models/offer.ts`]()

```ts
export const PERIOD_CODES = ["P1", "P2", "OTHER"] as const;
```

Fichier : [`frontend/src/utils/labels.ts`]()

```ts
OTHER: "Autre"
```

Le code technique `OTHER` reste donc utilisé dans la base, le backend et l’API ; seul l’affichage frontend le traduit en « Autre ».

# Fichiers à modifier pour ajouter le filtre de période

La fonctionnalité n’existe actuellement ni dans l’interface, ni dans le paramètre `GET /offers`, ni dans le repository.

## Frontend

### Page et état du filtre

Fichier à modifier : [`frontend/src/pages/OffersPage.tsx`]()

Il faudrait y ajouter :

- l’état de la période sélectionnée ;
- un sélecteur avec :
  - Toutes les périodes ;
  - P1 ;
  - P2 ;
  - Autre ;
- la transmission de la sélection à `useOffers`.

L’option « Toutes les périodes » devrait représenter l’absence de filtre, et non une nouvelle valeur de période API.

### Hook

Fichier à modifier : [`frontend/src/hooks/useOffers.ts`]()

Il devrait accepter la période sélectionnée et la transmettre à `getOffers`.

La période doit faire partie des dépendances du `useEffect`, afin que changer le sélecteur déclenche un nouveau chargement.

### Service HTTP

Fichier à modifier : [`frontend/src/services/offers.service.ts`]()

`getOffers` devrait construire un appel du type :

```text
/api/offers?period=P1
```

ou :

```text
/api/offers?period=P2
```

ou :

```text
/api/offers?period=OTHER
```

Pour « Toutes les périodes », il devrait soit appeler `/api/offers` sans paramètre, soit omettre le paramètre lors de la construction de l’URL.

La valeur envoyée au backend pour « Autre » doit être `OTHER`.

### Tests frontend

Fichier principal à modifier : [`frontend/tests/OffersPage.test.tsx`]()

Il faudrait tester notamment :

- l’affichage du sélecteur ;
- la valeur française « Autre » ;
- le chargement initial sans filtre ;
- l’envoi de `period=P1` ;
- l’envoi de `period=P2` ;
- l’envoi de `period=OTHER` pour « Autre » ;
- le retour à toutes les périodes.

Le helper existant [`frontend/tests/helpers/fetchMock.ts`]() peut déjà intercepter les URL et vérifier les appels.

Selon l’implémentation exacte du composant, des tests dans [`frontend/tests/App.test.tsx`]() ne seraient nécessaires que si le comportement de la route ou de la session change.

## Backend

### Contrôleur et validation de query string

Fichier à modifier : [`backend/src/controllers/offers.controller.ts`]()

La route devrait lire un paramètre comme :

```text
GET /offers?period=P1
```

Le contrôleur devrait valider les valeurs autorisées :

- `P1` ;
- `P2` ;
- `OTHER`.

Une valeur inconnue devrait suivre le format d’erreur API existant, probablement via `HttpError(400, "INVALID_QUERY", ...)`, comme pour les autres contrôleurs.

Le paramètre « Toutes les périodes » ne devrait pas être envoyé sous forme de valeur métier ; son absence signifie qu’il n’y a pas de filtre.

### Service métier

Fichier à modifier : [`backend/src/services/offers.service.ts`]()

Le service devrait combiner :

- le filtre de visibilité selon le profil ;
- le filtre optionnel de période.

Exemples :

- étudiant + `P1` :
  - `status: "PUBLISHED"`
  - `period: "P1"`
- déposant + `OTHER` :
  - `depositorContactId: viewer.id`
  - `period: "OTHER"`
- administrateur sans filtre :
  - aucun filtre de statut, déposant ou période.

Le contrôle de visibilité doit rester séparé du filtre choisi par l’utilisateur.

### Repository et SQL

Fichier à modifier : [`backend/src/repositories/offers.repository.ts`]()

Il faudrait :

1. ajouter une propriété de période à `OfferFilter` ;
2. l’ajouter à `FindAllParams` ;
3. compléter la clause SQL pour filtrer `p.code` ;
4. transmettre la valeur au statement SQLite.

Le filtre porterait logiquement sur :

```sql
p.code = @period
```

avec une condition optionnelle analogue aux filtres existants.

Il n’est pas nécessaire de filtrer sur `period_id` côté API, car l’API expose et reçoit le code métier `P1`, `P2` ou `OTHER`, tandis que l’identifiant numérique est interne à la base.

### Modèles backend

Fichier à vérifier ou éventuellement modifier : [`backend/src/models/offer.ts`]()

Le type `PeriodCode` contient déjà exactement les trois valeurs nécessaires :

```ts
"P1" | "P2" | "OTHER"
```

Une modification de ce fichier ne devrait donc pas être nécessaire pour un filtre limité aux périodes existantes.

### Documentation API

Fichier à modifier : [`backend/API.md`]()

La section `GET /offers` devrait documenter :

- le paramètre facultatif `period` ;
- les valeurs acceptées ;
- le comportement lorsque le paramètre est absent ;
- l’erreur renvoyée pour une valeur invalide.

### Exemples HTTP

Fichiers potentiellement à modifier ou compléter dans [`backend/http/`]()

Il faudrait ajouter des exemples de requêtes avec :

```text
/offers?period=P1
/offers?period=P2
/offers?period=OTHER
```

Les fichiers HTTP existants sont notamment :

- [`backend/http/offers.http`]()
- [`backend/http/auth.http`]()
- [`backend/http/companies.http`]()
- [`backend/http/health.http`]()

## Tests backend

Fichier principal à modifier : [`backend/tests/offers.test.ts`]()

Il faudrait ajouter des tests vérifiant :

- administrateur filtré par `P1`, `P2` et `OTHER` ;
- étudiant limité aux offres `PUBLISHED` dans la période demandée ;
- déposant limité à ses propres offres dans la période demandée ;
- contact sans rôle toujours refusé en `403`, avec ou sans filtre ;
- valeur de période invalide refusée en `400` ;
- absence de paramètre équivalente à « Toutes les périodes ».

Aucune migration n’est nécessaire : la table `periods`, la contrainte `P1` / `P2` / `OTHER`, les références `offers.period_id` et les données de démonstration existent déjà dans [`backend/src/db/migrations/001_initial.sql`]() et [`backend/src/db/seed/academicData.ts`]().

User: J'ai vérifié dans frontend/src/utils/labels.ts :
OTHER correspond bien au libellé "Autre".

Avant l'implémentation, vérifie ton hypothèse sur le code d'erreur
"INVALID_QUERY" :
cherche comment les contrôleurs existants traitent un paramètre
de requête invalide, et montre-moi le fichier et le code concernés.

Ne modifie encore aucun fichier.

Copilot: Je vais examiner les contrôleurs qui lisent des paramètres de requête, ainsi que `HttpError` et les tests associés, pour confirmer le code et le format réellement utilisés.

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\backend\\src\\controllers\\companies.controller.ts"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\backend\\src\\controllers\\offers.controller.ts"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\backend\\src\\utils\\httpError.ts"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\backend\\src\\middlewares\\errorHandler.ts"
}

Search for `INVALID_QUERY|query\.|req\.query|searchParams|q=`

Read [](), lines 1 to 180
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\backend\\tests\\companies.test.ts",
  "view_range": [
    1,
    180
  ]
}

Aucune modification n’a été effectuée.

## Traitement existant d’un paramètre de requête invalide

Le seul contrôleur qui valide actuellement un paramètre de requête est :

[`backend/src/controllers/companies.controller.ts`]()

### Fonction `parseSearch`

Dans [`backend/src/controllers/companies.controller.ts:8-22`](), la fonction `parseSearch` traite le paramètre `q` :

```ts
const parseSearch = (value: unknown): string | undefined => {
  if (value === undefined) return undefined;
  if (typeof value !== "string") {
    throw new HttpError(400, "INVALID_QUERY", "Le paramètre q doit apparaître une seule fois");
  }
  if (value.length > MAX_SEARCH_LENGTH) {
    throw new HttpError(
      400,
      "INVALID_QUERY",
      `Le paramètre q ne peut pas dépasser ${MAX_SEARCH_LENGTH} caractères`,
    );
  }

  const search = value.trim();
  return search === "" ? undefined : search;
};
```

Le comportement est le suivant :

- paramètre absent : accepté, retourne `undefined` ;
- paramètre répété : Express fournit une valeur qui n’est plus une chaîne simple, donc `typeof value !== "string"` ; le contrôleur lève une erreur ;
- paramètre trop long : erreur ;
- paramètre vide ou composé d’espaces : accepté et traité comme absent ;
- paramètre valide : chaîne nettoyée avec `trim()`.

### Appel depuis la route

Dans [`backend/src/controllers/companies.controller.ts:26-31`](), le contrôleur appelle cette fonction :

```ts
router.get("/", (req, res) => {
  const search = parseSearch(req.query.q);
  const companies = companiesService.listCompanies(getCurrentUser(req), search);
  res.json(companies.map(toCompanyDto));
});
```

La validation a donc lieu dans le contrôleur, avant l’appel au service.

## Code d’erreur et réponse JSON

L’erreur est créée avec :

```ts
new HttpError(400, "INVALID_QUERY", message)
```

Fichier : [`backend/src/utils/httpError.ts`]()

La classe `HttpError` conserve :

- `status` ;
- `code` ;
- `message`.

Le format de réponse est produit par :

[`backend/src/middlewares/errorHandler.ts:9-15`]()

```ts
if (err instanceof HttpError) {
  res.status(err.status).json({ error: { code: err.code, message: err.message } });
  return;
}
```

Une requête invalide renvoie donc par exemple :

```json
{
  "error": {
    "code": "INVALID_QUERY",
    "message": "Le paramètre q doit apparaître une seule fois"
  }
}
```

## Vérification dans les tests

Les comportements sont vérifiés dans :

[`backend/tests/companies.test.ts`]()

### Paramètre trop long

Dans [`backend/tests/companies.test.ts:76-82`](), le test vérifie :

- statut HTTP `400` ;
- code `INVALID_QUERY`.

### Paramètre répété

Dans [`backend/tests/companies.test.ts:84-93`](), la requête :

```text
/companies?q=a&q=b
```

doit également renvoyer :

- statut HTTP `400` ;
- `response.body.error.code === "INVALID_QUERY"`.

## Confirmation pour le futur filtre `period`

L’hypothèse précédente est donc confirmée : le code d’erreur existant pour un paramètre de requête invalide est bien :

```text
INVALID_QUERY
```

avec le statut :

```text
400
```

Pour le futur paramètre `period`, le contrôleur des offres devra suivre ce même mécanisme :

- lire `req.query.period` ;
- accepter l’absence du paramètre pour représenter « Toutes les périodes » ;
- accepter uniquement `P1`, `P2` et `OTHER` ;
- rejeter les valeurs répétées ou inconnues avec `HttpError(400, "INVALID_QUERY", ...)` ;
- laisser `errorHandler` produire le format JSON standard.

Le contrôleur actuel des offres ne contient encore aucune validation de query string :

[`backend/src/controllers/offers.controller.ts`]()

Il appelle actuellement directement :

```ts
offersService.listOffers(getCurrentUser(req))
```

Il n’existe donc pas encore de message d’erreur spécifique pour `period`; seul le code et le format peuvent être déduits avec certitude du comportement déjà établi pour `q`.

User: Tu peux maintenant implémenter le filtre facultatif par période.

Interface :
- Toutes les périodes : aucun paramètre period envoyé ;
- P1 : period=P1 ;
- P2 : period=P2 ;
- Autre : period=OTHER.

Comportement :
- Effectue le filtrage côté backend, via GET /offers?period=...
- Sans paramètre, conserve exactement le comportement actuel.
- Combine la période avec les restrictions de visibilité existantes :
  administrateur, étudiant et déposant.
- Un contact sans rôle de déposant doit toujours être refusé.
- Dans le contrôleur, valide le paramètre :
  seules les valeurs P1, P2 et OTHER sont acceptées.
- Rejette les valeurs inconnues et les paramètres répétés avec
  HttpError(400, "INVALID_QUERY", un message explicite en français).
- Garde le sélecteur utilisable même si le résultat est vide.

Contraintes :
- Aucune nouvelle dépendance.
- Aucune migration et aucune modification des données de démonstration.
- Ne modifie pas l'authentification, les permissions ou les réglages VS Code.
- Respecte les couches et conventions existantes.
- Ne configure pas Playwright MCP.
- Ne fais aucun git add, commit ou push.

Tests :
- Backend : absence de filtre, P1, P2, OTHER, valeur invalide,
  paramètre répété et maintien des restrictions selon le profil.
- Frontend : présence des quatre choix, chargement initial sans filtre,
  transmission de la période et retour à Toutes les périodes.

Copilot: Je vais intégrer le filtre de bout en bout en conservant la séparation contrôleur/service/repository, puis ajouter les tests backend et frontend demandés et lancer les suites ciblées.

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\backend\\src\\controllers\\offers.controller.ts"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\backend\\src\\services\\offers.service.ts"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\backend\\src\\repositories\\offers.repository.ts"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\frontend\\src\\pages\\OffersPage.tsx"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\frontend\\src\\hooks\\useOffers.ts"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\frontend\\src\\services\\offers.service.ts"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\frontend\\src\\models\\offer.ts"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\frontend\\tests\\OffersPage.test.tsx"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\backend\\tests\\offers.test.ts"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\frontend\\src\\index.css"
}

Edit [](), [](), [](), [](), [](), []()

Read [](), lines 1 to 130
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\backend\\src\\db\\seed\\seedIds.ts",
  "view_range": [
    1,
    130
  ]
}

Read [](), lines 1 to 220
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\backend\\src\\db\\seed\\offersData.ts",
  "view_range": [
    1,
    220
  ]
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\frontend\\tsconfig.json"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\frontend\\tsconfig.app.json"
}

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\backend\\http\\offers.http"
}

Read [](), lines 1 to 220
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\frontend\\tests\\App.test.tsx",
  "view_range": [
    1,
    220
  ]
}

Edit [](), [](), [](), [](), []()

Le filtre est maintenant câblé côté interface, API, service métier et SQL, avec les cas d’erreur et de visibilité couverts. Je lance les deux suites ciblées pour détecter les problèmes de typage ou de comportement.

17/19 tests passed (89.5%)

4/5 tests passed (80.0%)

Les premiers tests ont révélé uniquement deux attentes de test à ajuster : le tri SQL existant reste actif dans les résultats filtrés, et le libellé « Autre » apparaît à la fois dans le sélecteur et dans le tableau. Je corrige ces attentes sans changer le comportement métier.

Edit [](), []()

Ran terminal command: npm run typecheck -w backend; if ($?) { npm run typecheck -w frontend }

18/19 tests passed (94.7%)

5/5 tests passed (100%)

Edit []()

Le typage frontend/backend passe, et les tests frontend passent. J’ai aligné la dernière attente backend sur le tri réel `created_at DESC` déjà défini par le repository ; je relance les tests et le lint des deux workspaces.

Ran terminal command: npm run lint -w backend; if ($?) { npm run lint -w frontend }

19/19 tests passed (100%)

5/5 tests passed (100%)

Les tests ciblés backend (19) et frontend (5) ainsi que le lint des deux workspaces passent. Comme la modification touche toute la chaîne API/UI, je lance maintenant la vérification complète du dépôt, puis je contrôlerai le diff sans effectuer d’opération Git destructive.

Ran terminal command: npm run check; if ($?) { git diff --check; git status --short }

Ran terminal command: git diff --check; git diff --stat

Read []()
Completed with input: {
  "path": "C:\\ecole\\2026\\AI\\BINV32201-groupe-14\\.vscode"
}

Fonctionnalité implémentée sans nouvelle dépendance, migration, modification d’authentification, permissions ou réglages VS Code.

## Modifications réalisées

### Backend

- Validation de `period` dans [`backend/src/controllers/offers.controller.ts`]()
  - accepte uniquement `P1`, `P2`, `OTHER` ;
  - absence du paramètre = toutes les périodes ;
  - valeur inconnue ou paramètre répété = `400 INVALID_QUERY` avec message français explicite.

- Combinaison avec les restrictions existantes dans [`backend/src/services/offers.service.ts`]().

- Filtrage SQL sur `p.code` dans [`backend/src/repositories/offers.repository.ts`]().

- Documentation mise à jour dans :
  - [`backend/API.md`]()
  - [`backend/http/offers.http`]()

### Frontend

- Ajout du sélecteur dans [`frontend/src/pages/OffersPage.tsx`]() :
  - Toutes les périodes ;
  - P1 ;
  - P2 ;
  - Autre.

- Le choix « Autre » envoie bien `period=OTHER`.

- Le sélecteur reste utilisable lorsque la liste est vide.

- Transmission du filtre via :
  - [`frontend/src/hooks/useOffers.ts`]()
  - [`frontend/src/services/offers.service.ts`]()

## Tests ajoutés ou adaptés

- Backend : [`backend/tests/offers.test.ts`]()
  - absence de filtre ;
  - `P1`, `P2`, `OTHER` ;
  - valeur invalide ;
  - paramètre répété ;
  - combinaison avec les restrictions administrateur, étudiant et déposant ;
  - refus maintenu pour les contacts sans rôle de déposant.

- Frontend : [`frontend/tests/OffersPage.test.tsx`]()
  - quatre choix présents ;
  - chargement initial sans paramètre ;
  - transmission des trois valeurs ;
  - retour à « Toutes les périodes » ;
  - maintien du sélecteur avec résultat vide.

## Validation

`npm run check` réussi :

- Backend : 116 tests réussis ;
- Frontend : 47 tests réussis ;
- lint réussi ;
- vérification TypeScript réussie ;
- build backend et frontend réussi ;
- `git diff --check` réussi.

Aucun `git add`, commit ou push n’a été effectué. Je n’ai pas modifié [`.vscode/`]() ; Git signale toutefois ce dossier comme non suivi, ainsi que [`.github/copilot-instructions.md`](), indépendamment de cette fonctionnalité.

# Bilan — Semaine 3 : guider et vérifier

## 1. Inventaire des guides et des senseurs

Les guides et configurations ont été lus par Copilot. Les contrôles ont été distingués
des scripts qui les orchestrent. Nous avons personnellement vérifié les passages
Authorization, le script `check` et la phrase obsolète de `backend/API.md`, selon les
confirmations de notre groupe.

### Guides et senseurs

| Mécanisme | Fichier ou outil | Guide / Senseur / Autre | Inférentiel / Computationnel / Non applicable | Rôle et exemple | État |
|---|---|---|---|---|---|
| Instructions Copilot | `.github/copilot-instructions.md` | Guide | Inférentiel | Architecture, conventions et API. Exemple : le jeton doit être envoyé directement comme valeur du header `Authorization`, sans préfixe `Bearer`. | Lu |
| Architecture | `docs/architecture.md` | Guide | Inférentiel | Décrit `controllers → services → repositories → SQLite` et les responsabilités de chaque couche. | Lu |
| Cahier des charges | `docs/cdc_gesta_developpement.md` | Guide métier | Inférentiel | Définit EF-32 et EF-33, notamment la candidature, le retrait et les quatre statuts. | Lu |
| Contrat API | `backend/API.md` | Guide | Inférentiel | Décrit les routes, les DTO et les erreurs HTTP, par exemple `PATCH /applications/:id/withdraw`. | Lu |
| Tests backend | `backend/tests/applications.test.ts` | Senseur | Computationnel | Vérifie l’API avec Vitest et Supertest sur une application assemblée et une base SQLite en mémoire. | Lu et exécuté : 32 tests réussis |
| Tests frontend | `frontend/tests/` | Senseur | Computationnel | Vérifie le rendu React et les appels avec des réponses `fetch` simulées. | Exécuté via `npm run check`, réussite confirmée par l’utilisateur ; sortie détaillée non conservée |
| Oxlint | `backend/.oxlintrc.json`, `frontend/.oxlintrc.json` | Senseur | Computationnel | Contrôle le code TypeScript et React ; les scripts utilisent `oxlint --deny-warnings`. | Exécuté via `npm run check`, réussite confirmée par l’utilisateur ; sortie détaillée non conservée |
| TypeScript | `backend/tsconfig*.json`, `frontend/tsconfig*.json` | Senseur | Computationnel | Vérifie les types et participe aux builds ; les configurations utilisent notamment `strict: true`. | Exécuté via `npm run check`, réussite confirmée par l’utilisateur ; sortie détaillée non conservée |
| Compilation | Scripts `build` de `backend/package.json` et `frontend/package.json` | Senseur | Computationnel | Compile le backend et construit le frontend Vite. | Exécuté via `npm run check`, réussite confirmée par l’utilisateur ; sortie détaillée non conservée |
| Documentation métier de semaine 2 | `docs/semaine-2/semaine-2.md` | Guide de séance | Inférentiel | Décrit les choix de projet concernant les candidatures, le retrait et la recandidature. | Lu |
| Template de pull request | `.github/pull_request_template.md` | Guide de processus | Inférentiel | Liste les validations, la documentation API, les tests et le test navigateur à considérer. | Lu |

Le script racine `check` est un **orchestrateur**, et non un senseur supplémentaire.
Dans `package.json`, il enchaîne :

```json
"check": "npm run lint && npm run typecheck && npm run test && npm run build"
```

Les senseurs réellement lancés par ce script sont donc le lint, TypeScript, les tests et
les builds. Nous avons exécuté directement le test backend ciblé et l’utilisateur a
confirmé la réussite de `npm run check`. Aucun nombre de tests issu de `check` n’est
conservé ici.

### Configurations d’exécution et de permissions

Ces mécanismes ne sont pas des guides ou des senseurs de qualité.

| Mécanisme | Fichier | Guide / Senseur / Autre | Inférentiel / Computationnel / Non applicable | Rôle et exemple | État |
|---|---|---|---|---|---|
| Proxy Vite | `frontend/vite.config.ts` | Autre — configuration d’exécution | Non applicable | Transmet `/api/...` au backend et retire le préfixe `/api`. | Lu |
| Permissions VS Code | `.vscode/settings.json` | Autre — configuration de permissions | Non applicable | Les commandes npm de contrôle sont auto-approuvées ; `npm install`, `node`, `npx` et plusieurs commandes Git ne le sont pas. | Lu |
| `.npmrc` | `.npmrc` | Autre — configuration d’installation | Non applicable | `ignore-scripts=true` empêche l’exécution des scripts d’installation. | Lu |

Aucun workflow CI sous `.github/workflows/` n’a été identifié. L’extension optionnelle
du senseur d’architecture n’a pas été réalisée.

## 2. Couverture des exigences EF-32 et EF-33

### Sources métier

EF-32 est défini dans
[`docs/cdc_gesta_developpement.md:205`](../docs/cdc_gesta_developpement.md#L205) :

> « L'étudiant candidate à une offre publiée, avec un message facultatif. Il peut retirer sa candidature tant qu'elle n'a pas été traitée. »

EF-33 est défini dans
[`docs/cdc_gesta_developpement.md:206`](../docs/cdc_gesta_developpement.md#L206) :

> « L'étudiant voit ses candidatures et leur statut : “En cours”, “Retenue”, “Non retenue” ou “Retirée”. »

La règle RG-03, à
[`docs/cdc_gesta_developpement.md:139`](../docs/cdc_gesta_developpement.md#L139), précise :

> « Un étudiant ne peut candidater qu'à une offre au statut “Publiée”. »

Les choix propres au projet sont documentés dans
[`docs/semaine-2/semaine-2.md:8`](../docs/semaine-2/semaine-2.md#L8) et
[`docs/semaine-2/semaine-2.md:15`](../docs/semaine-2/semaine-2.md#L15) :
plusieurs candidatures pour une même offre sont autorisées, et une nouvelle candidature
est possible après retrait. Ce ne sont pas des exigences supplémentaires du cahier des
charges.

### Matrice API et interface

Les tests frontend utilisent des réponses HTTP simulées. Ils vérifient l’interface et la
construction des appels, mais ne constituent pas une preuve indépendante du contrôle
serveur. L’isolation des candidatures est vérifiée séparément par les tests API.

| Exigence, choix ou contrôle transversal | Cas et résultat attendu | Test API : nom exact, assertions utiles | Test frontend simulé : nom exact, assertions utiles | Couverture et limite |
|---|---|---|---|---|
| EF-32 | Candidater sans message crée une candidature `IN_PROGRESS` et renvoie `message: null`. | `backend/tests/applications.test.ts:60-72`, `crée une candidature à une offre publiée sans message`; `expect(response.status).toBe(201)` et égalité du DTO complet. | `frontend/tests/OffersPage.test.tsx:141-167`, `permet de candidater sans message et affiche les erreurs d'API`; vérifie le corps sans `message`, mais simule un `409`. | API **Couvert** ; UI **Partiel** : le succès frontend sans message n’est pas testé. |
| EF-32 | Candidater avec un message conserve le message utile. | `backend/tests/applications.test.ts:75-83`, `conserve le message facultatif après suppression des espaces autour`; vérifie `201` et le message trimé. | `frontend/tests/OffersPage.test.tsx:99-139`, `permet à un étudiant de candidater à une offre publiée avec un message`; vérifie le POST, le corps trimé et le message de succès. | **Couvert**, avec UI simulée. |
| RG-03 / D-07 | Une offre non publiée est refusée par l’API avec `409` et `OFFER_NOT_PUBLISHED`. | `backend/tests/applications.test.ts:105-112`, `refuse une offre non publiée %i`; vérifie le statut et le code d’erreur. | Aucun test frontend dédié à ce refus métier. | API **Couvert** ; UI **Absent**. |
| EF-32 | Un administrateur ou un contact ne peut pas candidater : `403`, `FORBIDDEN`. | `backend/tests/applications.test.ts:38-46`, `refuse la candidature pour %s (403)`; vérifie statut et code. | `frontend/tests/OffersPage.test.tsx:169-188`, `rend les offres publiées non candidatables aux autres profils`; vérifie l’absence du bouton pour l’administrateur. | API **Couvert** ; UI **Partiel** : visibilité, pas autorisation serveur. |
| Choix du projet | Plusieurs candidatures en cours du même étudiant pour la même offre sont autorisées. | `backend/tests/applications.test.ts:85-96`, `autorise plusieurs candidatures en cours du même étudiant pour la même offre`; vérifie deux `201` et deux identifiants distincts. | Aucun test frontend dédié. | API **Couvert** ; choix projet, pas exigence EF autonome. |
| Choix du projet | Après retrait, une nouvelle candidature à la même offre est acceptée. | `backend/tests/applications.test.ts:200-221`, `retire une candidature en cours et permet ensuite de recandidater`; vérifie `WITHDRAWN` après relecture puis `201` pour la nouvelle candidature. | Aucun test frontend dédié. | API **Couvert** ; choix projet, pas exigence EF autonome. |
| EF-33 | L’étudiant ne reçoit que ses propres candidatures. | `backend/tests/applications.test.ts:137-153`, `retourne uniquement les candidatures de l'étudiant connecté`; vérifie l’égalité exacte avec le tableau de Lucas. | Aucun test frontend d’isolation serveur. | API **Couvert** ; l’absence d’un équivalent UI ne signifie pas une absence de protection serveur. |
| EF-33 | Les quatre statuts sont exposés par l’API. | `backend/tests/applications.test.ts:156-165`, `expose le statut %s de la candidature`; vérifie `IN_PROGRESS`, `SELECTED`, `REJECTED` et `WITHDRAWN`. | `frontend/tests/MyApplicationsPage.test.tsx:54-71`, `affiche les candidatures avec les libellés français des quatre statuts`; vérifie « En cours », « Retenue », « Non retenue » et « Retirée ». | **Couvert** ; frontend simulé pour les libellés. |
| EF-33 | Un étudiant sans candidature reçoit `[]`. | `backend/tests/applications.test.ts:168-173`, `retourne une liste vide à un étudiant sans candidature`; vérifie le tableau vide. | `frontend/tests/MyApplicationsPage.test.tsx:74-81`, `affiche un message lorsque l'étudiant n'a aucune candidature`; vérifie le message d’état vide. | **Couvert**. |
| EF-33 | Le DTO ne contient que les champs prévus. | `backend/tests/applications.test.ts:175-188`, `n'expose que les champs du DTO de consultation`; vérifie l’ensemble exact des clés. | Aucun test frontend équivalent. | API **Couvert**. |
| EF-32 | Retirer sa propre candidature en cours la conserve avec `WITHDRAWN`. | `backend/tests/applications.test.ts:200-216`, `retire une candidature en cours et permet ensuite de recandidater`; vérifie `200`, le DTO exact et le statut relu. | `frontend/tests/MyApplicationsPage.test.tsx:101-125`, `permet de retirer une candidature en cours et met son statut à jour`; vérifie PATCH, « Retirée » et disparition du bouton. | **Couvert** ; frontend simulé. |
| EF-32 | Une candidature `SELECTED`, `REJECTED` ou `WITHDRAWN` ne peut pas être retirée et reste inchangée. | `backend/tests/applications.test.ts:276-297`, `refuse une candidature déjà traitée ou retirée (%i, %s)`; paramètre les trois statuts, vérifie `409`, `APPLICATION_NOT_WITHDRAWABLE`, puis relit le statut du propriétaire. | `frontend/tests/MyApplicationsPage.test.tsx:128-139`, `affiche l'erreur si le serveur refuse le retrait`; vérifie le `409`, l’alerte et le bouton conservé. | API **Couvert** ; UI **Partiel** : refus simulé sans distinguer les trois statuts. |
| EF-32 / contrôle transversal | Un administrateur ou un contact ne peut pas retirer une candidature : `403`, `FORBIDDEN`, sans modification. | `backend/tests/applications.test.ts:230-247`, `refuse le retrait par %s (403)`; paramètre administrateur/contact, vérifie statut et code, puis relit `IN_PROGRESS` chez Lucas. | Aucun test frontend dédié. | API **Couvert** ; UI **Absent**. |
| EF-32 / contrôle transversal | Un autre étudiant ne peut pas retirer la candidature : `404`, `NOT_FOUND`, sans modification pour le propriétaire. | `backend/tests/applications.test.ts:250-263`, `ne révèle pas une candidature appartenant à un autre étudiant (404)`; vérifie `404`, `NOT_FOUND`, puis relit `IN_PROGRESS` chez Inès. | Aucun test frontend dédié. | API **Couvert** ; UI **Absent**. |
| Contrôles transversaux | Session absente et identifiant invalide sont refusés. | `backend/tests/applications.test.ts:223-229`, `refuse une requête sans session (401)`; `backend/tests/applications.test.ts:265-272`, `refuse un identifiant invalide (400)`; vérifie les statuts et codes. | `frontend/tests/MyApplicationsPage.test.tsx:141-152`, `redirige vers la connexion si le retrait retourne 401`; vérifie `onUnauthorized`. | **Couvert**, avec frontend simulé pour la session. |

### Limites de couverture conservées

- Les tests frontend ne prouvent pas les contrôles d’autorisation ou d’isolation du
  backend.
- Le succès frontend d’une candidature sans message n’est pas testé.
- Aucun test frontend ne vérifie l’isolation des candidatures ; cette protection est
  toutefois vérifiée par le test API exact de la ligne 137.
- La sélection d’un candidat et EF-34 restent hors périmètre.

## 3. Modifications

### Fichier de tests modifié

Nous avons modifié uniquement
[`backend/tests/applications.test.ts`](../backend/tests/applications.test.ts) :

- le test du retrait par un rôle non étudiant est paramétré pour l’administrateur et le
  contact, avec vérification de `403`, `FORBIDDEN` et du statut propriétaire inchangé ;
- le test de la candidature d’un autre étudiant conserve `404` et `NOT_FOUND`, puis relit
  la candidature avec le compte propriétaire ;
- le test des candidatures non retirables couvre `SELECTED`, `REJECTED` et `WITHDRAWN`,
  vérifie `409` et `APPLICATION_NOT_WITHDRAWABLE`, puis relit le statut attendu.

### Bilan ajouté

Nous avons ajouté ce fichier
[`docs/semaine-3.md`](../docs/semaine-3.md), qui rassemble l’inventaire, la traçabilité,
les vérifications et l’audit des guides. Aucun autre guide, fichier applicatif ou fichier
de données n’a été modifié.

## 4. Vérifications

La première tentative de la commande ciblée :

```text
npm run test -w backend -- tests/applications.test.ts
```

a échoué avant Vitest, car elle a été lancée depuis `C:\ecole\2026\AI`, qui ne contenait
pas le `package.json` racine.

Nous avons ensuite exécuté la même commande depuis la racine du dépôt. Le résultat
observé était :

```text
Test Files  1 passed (1)
Tests       32 passed (32)
```

Nous confirmons également avoir lancé `npm run check` avec succès. Cette commande a
exécuté le lint, les vérifications TypeScript, les tests et les builds ; aucun nombre de
tests ni détail de sortie supplémentaire n’est conservé ici.

Aucun essai navigateur n’est confirmé pour cette séance : **à confirmer**.

## 5. Audit des guides par rapport aux supports Web 2

Les supports Web 2 ont été consultés par Copilot. Nous ne confirmons pas une vérification
personnelle de ces sources par notre groupe ; les liens et extraits ci-dessous doivent
donc être relus par nous avant de servir de référence définitive.

| Attente Web 2 et source | Passage exact du guide du dépôt | Correspondance | Écart ou recommandation |
|---|---|---|---|
| Organisation React/Vite — [Séance 07, structure du projet](https://github.com/e-vinci/BINV2150A-slides/blob/a680f0b38ee1a04e30374315792404f91d799702/seance-07/slides.md#L65-L85) | [`docs/architecture.md:84-99`](../docs/architecture.md#L84) décrit `models/`, `services/`, `utils/`, `hooks/`, `components/`, `pages/` et `App.tsx`. | Oui | Le guide est plus détaillé, sans contradiction démontrée. |
| Composants séparés — [Séance 07](https://github.com/e-vinci/BINV2150A-slides/blob/a680f0b38ee1a04e30374315792404f91d799702/seance-07/slides.md#L270-L283) : « Un fichier par composant dès qu'il est réutilisé ailleurs ou qu'il devient long » | [`.github/copilot-instructions.md:30`](../.github/copilot-instructions.md#L30) : « pages compose hooks and components » ; [`docs/architecture.md:96-98`](../docs/architecture.md#L96) décrit `components/`. | Oui | Organisation compatible. |
| Type guards — [Séance 01](https://github.com/e-vinci/BINV2150A-slides/blob/a680f0b38ee1a04e30374315792404f91d799702/seance-01/slides.md#L72-L82) | [`.github/copilot-instructions.md:30`](../.github/copilot-instructions.md#L30) : « services perform HTTP calls and validate JSON with type guards ». | Oui | Le support enseigne la notion ; le guide du dépôt en fait une convention explicite. |
| HTTP/REST et statuts — [Séance 02](https://github.com/e-vinci/BINV2150A-slides/blob/a680f0b38ee1a04e30374315792404f91d799702/seance-02/slides.md#L14-L30) : « Verbes HTTP : GET, POST, PUT, PATCH, DELETE » et statuts `200`, `201`, `204`, `400`, `401`, `403`, `404`, `500` | [`backend/API.md:20-36`](../backend/API.md#L20) documente les codes d’erreur et [`backend/API.md:177-275`](../backend/API.md#L177) les routes de candidatures. | Oui | Le projet ajoute `409` pour un conflit métier ; cela reste compatible avec l’usage HTTP. |
| Documentation API — [Séance 02](https://github.com/e-vinci/BINV2150A-slides/blob/a680f0b38ee1a04e30374315792404f91d799702/seance-02/slides.md#L406-L408) : « créez un fichier `API.md` pour documenter l'API REST » | [`.github/copilot-instructions.md:45`](../.github/copilot-instructions.md#L45) : « update `backend/API.md`, relevant `backend/http/*.http` examples... ». | Partielle | La consigne de maintenance est présente, mais deux incohérences internes restent : [`README.md:100-108`](../README.md#L100) affirme que la candidature et le retrait ne sont pas implémentés ; [`backend/API.md:239`](../backend/API.md#L239) dit que le retrait n’est pas encore implémenté alors que la route est documentée plus haut. Corrections recommandées, non appliquées. |
| Validation frontend/backend — [Séance 12](https://github.com/e-vinci/BINV2150A-slides/blob/a680f0b38ee1a04e30374315792404f91d799702/seance-12/slides.md#L281-L303) : « La validation du frontend améliore l'expérience, mais **ne remplace pas** celle du backend » | [`.github/copilot-instructions.md:25-27`](../.github/copilot-instructions.md#L25) réserve la validation HTTP aux controllers ; [`.github/copilot-instructions.md:47-48`](../.github/copilot-instructions.md#L47) distingue services, type guards, controllers et services métier. | Oui | Cette attente ne doit pas être confondue avec l’autorisation. |
| Authentification et autorisation — [Séance 03](https://github.com/e-vinci/BINV2150A-slides/blob/a680f0b38ee1a04e30374315792404f91d799702/seance-03/slides.md#L300-L360) : « Vérifier le token avant d'accéder à une route protégée » ; `401` et `403` sont distingués | [`.github/copilot-instructions.md:29`](../.github/copilot-instructions.md#L29) : « `authenticate` establishes `req.user`; `authorize` applies named permission rules » ; ligne 39 : autorisation côté backend. | Oui | Le dépôt adapte le modèle au mode démo et ajoute la relecture des droits en base. |
| Proxy et same-origin — [Séance 22](https://github.com/e-vinci/BINV2150A-slides/blob/a680f0b38ee1a04e30374315792404f91d799702/seance-22/slides.md#L190-L240) : « Le serveur de développement de Vite joue le rôle de **proxy** » | [`docs/architecture.md:20-22`](../docs/architecture.md#L20) décrit `/api` et la réécriture ; [`frontend/vite.config.ts:12-19`](../frontend/vite.config.ts#L12) la configure. | Oui | C’est une configuration d’exécution, pas un senseur. |
| Hachage salé des mots de passe — [Séance 04](https://github.com/e-vinci/BINV2150A-slides/blob/a680f0b38ee1a04e30374315792404f91d799702/seance-04/slides.md#L14-L39) : « on stocke un **hash** du mot de passe, pas le mot de passe lui-même » | [`README.md:119-126`](../README.md#L119) et [`.github/copilot-instructions.md:40`](../.github/copilot-instructions.md#L40) décrivent le mode démo sans mot de passe. | Non applicable, sans contradiction | Le support concerne une authentification par mot de passe ; le projet documente un mode démo volontairement différent. |

Les syntaxes `?.`, `??` et `!` ne sont pas traitées comme une ligne de la matrice
principale. Les supports les présentent comme des notions ou exemples TypeScript ; nous
n’avons pas de preuve qu’elles constituent des obligations de projet. Leur interprétation
comme consigne reste **à confirmer**.

## 6. Limites restantes et informations manquantes

- Nous avons lu les guides du dépôt, les tests concernés et les supports Web 2 via Copilot.
- Nous avons personnellement vérifié les passages Authorization, le script `check` de
  `package.json` et la phrase obsolète de `backend/API.md`, selon nos confirmations.
- La vérification personnelle des sources Web 2 n’est pas confirmée ; les liens doivent
  être relus par nous.
- La réussite de `npm run check` est confirmée, mais sa sortie détaillée n’est pas
  conservée ; aucun nombre de tests ne doit être ajouté.
- Aucun essai navigateur n’est confirmé pour cette séance : **à confirmer**.
- L’extension optionnelle du senseur d’architecture n’a pas été réalisée.
- Les incohérences de `README.md` et `backend/API.md` ont été signalées, mais aucune
  correction n’a été appliquée.
- Aucun autre fichier n’a été modifié ; aucun commit, push ou git add n’a été effectué.

Un défaut qui ferait échouer un test renforcé serait, par exemple, une implémentation qui
répond `409` et `APPLICATION_NOT_WITHDRAWABLE` pour une candidature `SELECTED`, mais la
modifie malgré tout en `WITHDRAWN`. La relecture par le propriétaire dans
`refuse une candidature déjà traitée ou retirée (%i, %s)` comparerait alors le statut
observé au statut attendu et ferait échouer le test. Nous n’avons pas provoqué ce défaut.
## 7. Consommation IA

- Crédits au début de la séance :18 % utilisés.
- Crédits à la fin de la séance :27 % utilisés.
- Consommation :9 points de pourcentage.
(Kevin Akator)

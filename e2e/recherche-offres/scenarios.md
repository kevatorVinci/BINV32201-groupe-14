# Recherche d'offres par titre (EF-30) : scénarios end-to-end

Statut : brouillon validé, aucun scénario n'a encore été exécuté.
Source : lecture des fichiers locaux du dépôt uniquement.

## Statut des règles

**Exigence (cahier des charges, EF-30)** : l'étudiant consulte le catalogue des offres publiées de l'année académique en cours. Il peut filtrer par période, entreprise et localité, et chercher par mot-clé. Le cahier des charges ne précise ni les champs concernés par la recherche, ni la casse, ni les espaces, ni le caractère partiel ou exact de la correspondance.

**Choix documentés (bilan de semaine 4, `docs/semaine-4/semaine-4.md`)** : recherche insensible à la casse, suppression des espaces de début et de fin, recherche vide, aucune correspondance, combinaison avec le filtre de période.

**Comportement observé dans le code** (`frontend/src/pages/OffersPage.tsx`) :
- la recherche est faite côté frontend, sur le seul titre de l'offre ;
- la correspondance porte sur une sous-chaîne continue du titre (`includes`), sans découpage en mots ;
- les accents comptent ;
- la période est filtrée côté serveur, puis la recherche est appliquée côté client sur ce résultat ;
- le backend ne connaît que le paramètre `period`.

**Limites de portée** (ne sont pas des violations établies de l'exigence) :
- La recherche est limitée au titre. Comme EF-30 ne précise pas les champs concernés par « mot-clé », c'est une limite de portée de l'implémentation : la description n'est pas interrogée.
- Les filtres par entreprise et par localité ne sont pas couverts par ces scénarios.
- Le catalogue n'est pas explicitement limité à l'année académique en cours. Le seed ne contient d'offres publiées que pour 2026-2027, donc cela ne change rien dans ces scénarios.

## Données utilisées

Compte de démonstration : **Lucas Dupont**, étudiant (groupe « Étudiants » de la page « Connexion de démonstration », sans mot de passe).

Offres visibles par un étudiant (statut Publiée, année 2026-2027, période P2) :
1. Assistant conversationnel interne (Nexalis)
2. Tableau de bord de qualité des données (Lumen Data)
3. Application React de gestion de flotte (Lumen Digital)
4. API REST de facturation (Orbis)

Offre existante mais non publiée : « Refonte du portail client » (Lumen Digital, statut Soumise, déposée par Julien Lambert).

## Préconditions communes

Chaque scénario est indépendant et repart du même état :
- base de démonstration non modifiée ;
- aucune session ouverte : l'application affiche la page « Connexion de démonstration » (sinon, se déconnecter d'abord) ;
- après connexion et ouverture de la page « Offres », la période initiale est « Toutes les périodes » et le champ de recherche est vide.

## Scénario 1 : recherche avec résultat

**Rôle et compte** : étudiant, Lucas Dupont.

**Préconditions** : préconditions communes. Les quatre offres publiées ci-dessus existent.

**Actions**
1. Cliquer sur « Lucas Dupont » dans le groupe « Étudiants ».
2. Cliquer sur « Offres » dans la barre de navigation.
3. Vérifier l'état initial : la page « Offres de stage » affiche « Les offres publiées. » et « 4 offres ». Le sélecteur « Période » est sur « Toutes les périodes » et le champ « Rechercher une offre » est vide.
4. Saisir dans le champ « Rechercher une offre » la valeur `"  CONVERSATIONNEL  "` : deux espaces ordinaires avant, le mot en majuscules, deux espaces ordinaires après (les guillemets ne font pas partie de la saisie).

**Résultat attendu**
- Une seule ligne dans le tableau : « Assistant conversationnel interne », Nexalis, 2026-2027, P2, statut « Publiée ».
- Le compteur affiche « 1 offre ».
- Les trois autres offres ne sont plus affichées.
- Le sélecteur « Période » reste sur « Toutes les périodes ».

**Fichiers justificatifs** : `frontend/src/pages/OffersPage.tsx`, `frontend/tests/OffersPage.test.tsx`, `backend/tests/offers.test.ts`, `backend/src/db/seed/offersData.ts`, `docs/seed.md`, `docs/semaine-4/semaine-4.md`.

## Scénario 2 : recherche sans résultat

**Rôle et compte** : étudiant, Lucas Dupont.

**Préconditions** : préconditions communes. L'offre « Refonte du portail client » existe avec le statut Soumise et n'est donc pas publiée.

**Actions**
1. Cliquer sur « Lucas Dupont » dans le groupe « Étudiants ».
2. Cliquer sur « Offres » dans la barre de navigation.
3. Vérifier l'état initial : le sélecteur « Période » est sur « Toutes les périodes » et le champ « Rechercher une offre » est vide.
4. Saisir `Refonte du portail client` dans le champ « Rechercher une offre ».

**Résultat attendu**
- Aucun tableau ni compteur d'offres.
- Le message « Aucune offre ne correspond à votre recherche. » s'affiche.

**Portée de la preuve** : cet essai constate l'absence de l'offre non publiée dans l'interface de l'étudiant. Il ne prouve pas à lui seul l'autorisation côté serveur : la liste est certes filtrée par le backend selon le profil, mais seul un contrôle de la réponse de l'API le démontrerait. Ce contrôle est couvert par `backend/tests/offers.test.ts`.

**Variante** : saisir `offre introuvable` (reprise du test existant). Elle vérifie le message sans correspondance, mais pas l'absence d'une offre non publiée existante.

**Fichiers justificatifs** : `frontend/src/pages/OffersPage.tsx`, `frontend/tests/OffersPage.test.tsx`, `backend/src/services/offers.service.ts`, `backend/tests/offers.test.ts`, `backend/src/db/seed/offersData.ts`.

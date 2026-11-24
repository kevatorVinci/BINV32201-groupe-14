# Semaine 5 : scénarios end-to-end de la recherche d'offres (EF-30)

Brouillon préparé par lecture des fichiers locaux uniquement. Aucun scénario n'a encore été exécuté.

## Statut des règles

**Exigence (cahier des charges, EF-30)** : l'étudiant consulte le catalogue des offres publiées de l'année en cours. Il peut filtrer par période, entreprise et localité, et chercher par mot-clé. Le cahier des charges ne précise ni la casse, ni les espaces, ni la recherche partielle.

**Choix documentés (bilan de semaine 4, `docs/semaine-4/semaine-4.md`)** : recherche insensible à la casse, suppression des espaces de début et de fin, recherche vide, aucune correspondance, combinaison avec le filtre de période.

**Comportement observé dans le code** (`frontend/src/pages/OffersPage.tsx`) :
- recherche côté frontend uniquement, sur le titre ;
- sous-chaîne continue (`includes`), sans découpage en mots ;
- les accents comptent ;
- la période est filtrée côté serveur, puis la recherche côté client ;
- le backend ne connaît que le paramètre `period`.

**Écarts avec EF-30, hors de ces scénarios** : pas de filtre par entreprise ni par localité, pas de recherche dans la description, pas de limitation à l'année en cours.

## Données utilisées

Compte : **Lucas Dupont**, étudiant, groupe « Étudiants » de la page « Connexion de démonstration » (sans mot de passe).

Offres visibles par un étudiant (statut Publiée, 2026-2027, P2) :
1. Assistant conversationnel interne (Nexalis)
2. Tableau de bord de qualité des données (Lumen Data)
3. Application React de gestion de flotte (Lumen Digital)
4. API REST de facturation (Orbis)

Offre existante mais invisible pour un étudiant : « Refonte du portail client » (Lumen Digital, statut Soumise).

État initial commun : base de démonstration fraîche, application ouverte sur la page de connexion.

## Scénario 1 : recherche avec résultat

1. Cliquer sur « Lucas Dupont » dans le groupe « Étudiants ».
2. Cliquer sur « Offres » dans la barre de navigation. La page « Offres de stage » affiche « Les offres publiées. » et « 4 offres ».
3. Dans le champ « Rechercher une offre », saisir `  CONVERSATIONNEL  ` (majuscules, deux espaces de chaque côté).

**Résultat attendu**
- Une seule ligne : « Assistant conversationnel interne », Nexalis, 2026-2027, P2, « Publiée ».
- Le compteur affiche « 1 offre ».
- Les trois autres offres ne sont plus affichées.
- Le sélecteur de période reste sur « Toutes les périodes ».

**Fichiers justificatifs** : `frontend/src/pages/OffersPage.tsx`, `frontend/tests/OffersPage.test.tsx`, `backend/tests/offers.test.ts`, `backend/src/db/seed/offersData.ts`, `docs/seed.md`, `docs/semaine-4/semaine-4.md`.

## Scénario 2 : recherche sans résultat

1. Se connecter comme Lucas Dupont, puis cliquer sur « Offres ».
2. Saisir `Refonte du portail client` dans « Rechercher une offre ».

**Résultat attendu**
- Plus de tableau ni de compteur.
- Le message « Aucune offre ne correspond à votre recherche. » s'affiche.
- L'offre Soumise n'apparaît pas : la recherche respecte la visibilité du profil.

Variante sans test de visibilité : `offre introuvable` (reprise du test existant).

**Fichiers justificatifs** : `frontend/src/pages/OffersPage.tsx`, `frontend/tests/OffersPage.test.tsx`, `backend/src/services/offers.service.ts`, `backend/src/db/seed/offersData.ts`.

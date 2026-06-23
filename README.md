# MichLink.ActionGrid

PCF (Power Apps Component Framework) générique permettant d'enrichir les sous-grilles Dynamics 365 / Dataverse avec des actions personnalisées.

Ce composant a été initialement développé pour le projet Decidento afin d'afficher et récupérer des informations complémentaires sur les contacts directement depuis une sous-grille CRM.

---

## Fonctionnalités actuelles

### Téléphone à la demande

Lorsqu'un champ téléphone est vide :

- affichage d'un lien personnalisable (ex : "Chercher le téléphone")
- clic utilisateur
- appel futur d'une Custom API Dataverse
- mise à jour automatique du champ CRM
- rafraîchissement de la grille

Exemple :

```
Chercher le téléphone
```

ou

```
Chercher le téléphone (existant)
```

si un indicateur booléen indique que l'information existe chez le fournisseur de données.

---

### Détection d'informations existantes

Le composant peut utiliser un champ booléen Dataverse :

```text
vxs_hasphone
```

afin d'afficher :

```text
Chercher le téléphone (existant)
```

avant même de lancer la recherche.

---

### Affichage d'avatars

Possibilité d'afficher une image provenant d'une URL stockée dans Dataverse.

Exemple :

```text
https://mon-api.com/photo.jpg
```

Le PCF affiche directement :

- photo ronde
- taille optimisée pour les sous-grilles

---

### Affichage de liens LinkedIn

Possibilité d'afficher un lien LinkedIn à partir d'une URL stockée dans Dataverse.

Exemple :

```text
https://www.linkedin.com/in/john-doe
```

Le composant ouvre le profil dans un nouvel onglet.

---

## Architecture

Le projet a été découpé afin de faciliter les évolutions futures.

```
ActionGrid/
│
├── index.ts
│
├── config.ts
│
├── types.ts
│
├── gridRenderer.ts
│
├── phoneAction.ts
│
├── valueHelpers.ts
│
└── ControlManifest.Input.xml
```

### index.ts

Point d'entrée du composant.

Responsabilités :

- chargement de la configuration
- récupération du dataset
- appel du renderer

---

### config.ts

Gestion des paramètres du PCF.

Exemples :

- TargetColumn
- EmptyLabel
- HasItColumn
- PhotoColumn
- LinkedInColumn
- CustomApiName

---

### gridRenderer.ts

Responsable de :

- génération du tableau HTML
- affichage des photos
- affichage des liens LinkedIn
- affichage des actions téléphone

---

### phoneAction.ts

Gestion des actions liées au téléphone.

Version actuelle :

```ts
TEST 123456789
```

Version cible :

```text
PCF
 ↓
Custom API Dataverse
 ↓
Plugin C#
 ↓
API externe
 ↓
Retour téléphone
 ↓
Mise à jour CRM
```

---

### valueHelpers.ts

Méthodes utilitaires :

- lecture de valeurs
- conversion booléenne
- gestion des champs vides

---

## Paramètres disponibles

| Paramètre | Description |
|------------|------------|
| TargetColumn | Champ CRM à mettre à jour |
| EmptyLabel | Texte affiché avant récupération |
| HasIt | Champ booléen indiquant qu'une donnée existe |
| PhotoColumn | Champ contenant l'URL de la photo |
| LinkedInColumn | Champ contenant l'URL LinkedIn |
| CustomApiName | Nom de la Custom API Dataverse |

---

## Exemple de configuration

```text
TargetColumn    = vxs_testtelephone
EmptyLabel      = Chercher le téléphone
HasIt           = vxs_hasphone
PhotoColumn     = vxs_gridpicurl
LinkedInColumn  = vxs_linkedinurl
CustomApiName   = vxs_GetContactPhone
```

---

## Champs Dataverse utilisés pour les tests

### Téléphone

```text
vxs_testtelephone
```

### Information disponible

```text
vxs_hasphone
```

### Photo

```text
vxs_gridpicurl
```

### LinkedIn

```text
vxs_linkedinurl
```

---

## Compilation

### Build du PCF

```bash
npm run build
```

---

### Génération de la solution

```bash
msbuild
```

Le package généré se trouve dans :

```text
bin\Debug\MichLinkActionGridSolution.zip
```

---

## Installation

1. Importer la solution dans Power Apps
2. Publier les personnalisations
3. Ajouter le composant sur une vue ou une sous-grille
4. Configurer les paramètres du composant
5. Publier

---

## Évolutions prévues

### V2

- appel Custom API Dataverse
- récupération réelle du téléphone

### V3

- logo LinkedIn personnalisé
- ouverture sécurisée des liens

### V4

- support de plusieurs actions par colonne
- architecture plugin interne

Exemple :

```text
AvatarAction
LinkedInAction
PhoneAction
EmailAction
CompanyAction
CustomAction
```

afin de conserver un unique composant réutilisable pour plusieurs projets.

---

## Auteur

**MichLink**

Développé pour les projets Dynamics 365 / Dataverse.

Publisher Dynamics :

```text
MichLink
```

Prefix :

```text
vxs_
```

# Yardget

*Ton budget, tes yards.*

Application web de gestion de budget personnel, pensée pour le téléphone (Android) et installable sur l'écran d'accueil. Les données restent sur l'appareil : pas de compte, pas de serveur, pas de connexion bancaire.

Le nom mêle « yards », l'argent en patois wallon-picard et tournaisien, et « budget ». Il se lit de deux façons : « yar-djè », comme *budget*, et « get yards », avoir des sous grâce à une bonne gestion.

## Fonctions

- **Accueil** : reste à dépenser jusqu'à la fin du mois (et par jour), alertes, anneau des dépenses du mois (touche une catégorie pour le détail), prochains prélèvements, dernières dépenses.
- **Ajout rapide** (bouton « + ») : montant au clavier, catégorie en un toucher, date du jour modifiable, note et compte facultatifs.
- **Dépenses** : historique par mois et par jour, filtres (besoins, envies, épargne, catégorie, abonnements).
- **Abonnements** : coût total par mois et par an (détail dépliable), fréquence hebdomadaire, mensuelle, trimestrielle ou annuelle, date de fin ou sans fin, statut « envisagé » pour simuler l'effet sur le budget. Les prélèvements sont ajoutés automatiquement aux dépenses le jour venu.
- **Budget** : revenus réguliers et ponctuels, répartition comparée à la règle 50 / 30 / 20, aide à la répartition, suggestions basées sur la moyenne des 3 derniers mois (après 2 mois d'usage), jauges par catégorie, objectifs d'épargne.
- **Catégories** : modifiables (nom, groupe, couleur, icône, budget, dépense fixe, seuils d'alerte propres), suppression avec fusion vers une autre catégorie.
- **Analyse** : évolution par jour, semaine, mois ou année (la dernière période choisie est retenue), répartition par catégorie, dépenses annuelles lissées, bilan mensuel.
- **Alertes** : seuils à 50 / 80 / 100 % (réglables), alerte de rythme, renouvellements et fins d'abonnement. Elles s'affichent à l'ouverture de l'appli.
- **Réglages** (engrenage en haut à droite) : thème auto / clair / sombre, plusieurs comptes (option), export et import d'une sauvegarde, remise à zéro. La version est affichée en bas.
- **Installation** : sur téléphone, tant que l'appli est ouverte dans le navigateur, une carte propose de l'installer (« Plus tard » la masque 7 jours).

## Mettre en ligne avec GitHub Pages

1. Crée un dépôt sur GitHub (public, ou privé avec un compte qui permet Pages).
2. Dépose tout le contenu de ce dossier à la racine du dépôt (`index.html` doit être à la racine).
3. Dans le dépôt : **Settings → Pages → Build and deployment → Source : Deploy from a branch**, branche `main`, dossier `/ (root)`, puis **Save**.
4. Après une ou deux minutes, l'adresse s'affiche en haut de la page Pages (du type `https://ton-pseudo.github.io/nom-du-depot/`).

Aucune compilation n'est nécessaire : ce sont des fichiers statiques.

## Installer sur Android

1. Ouvre l'adresse dans **Chrome**.
2. Touche **Installer** dans la carte proposée par l'appli, ou passe par le menu ⋮ → **Ajouter à l'écran d'accueil** → **Installer**.
3. L'appli s'ouvre alors en plein écran, fonctionne hors connexion, et Chrome protège ses données.

## Publier une mise à jour

L'appli est mise en cache sur le téléphone pour fonctionner hors connexion. À chaque modification publiée :

1. Change `APP_VERSION` dans `js/version.js` (par exemple `1.00essai5`, puis `1.00` une fois la version validée).
2. Change `CACHE` dans `sw.js` avec la même valeur, précédée de `yardget-` (par exemple `yardget-1.00essai5`).
3. Remplace sur GitHub les fichiers modifiés. Le téléphone récupère la nouvelle version à la prochaine ouverture (parfois la suivante).

Les livraisons après la 1.00 ne contiennent que les fichiers de fonctionnement modifiés : les images (dossier `icons/`) restent celles déjà présentes sur GitHub, sauf changement.

Si tu ajoutes un nouveau fichier JavaScript, ajoute-le aussi à la liste `SHELL` dans `sw.js`.

## Données et sauvegarde

- Les données sont enregistrées dans le stockage local de Chrome, sous la clé `yardget:v1`.
- Elles sont perdues si tu effaces les données de Chrome ou du site, si tu désinstalles l'appli en supprimant ses données, ou si tu changes de téléphone.
- **Réglages → Exporter** télécharge un fichier `yardget-sauvegarde-AAAA-MM-JJ.json` à garder ailleurs (Drive, e-mail). **Importer** le recharge, par exemple sur un nouveau téléphone. L'appli rappelle de sauvegarder une fois par mois.
- Les montants sont stockés en centimes pour éviter les erreurs d'arrondi.

## Tester sur un ordinateur

Les modules JavaScript ne fonctionnent pas en ouvrant `index.html` directement. Lance un petit serveur dans le dossier :

```
python3 -m http.server 8000
```

puis ouvre `http://localhost:8000`. Dans Chrome, les outils de développement (F12) permettent de simuler un téléphone. La carte d'installation n'apparaît qu'en simulation tactile (téléphone).

## Organisation du code

```
index.html              page unique
manifest.webmanifest    nom, icônes, mode plein écran
sw.js                   cache hors connexion
css/styles.css          thèmes clair et sombre, composants
icons/                  logo (anneau) aux différentes tailles
js/app.js               navigation, rendu, événements
js/store.js             données : chargement, sauvegarde, actions, abonnements automatiques
js/calc.js              calculs : reste à dépenser, alertes, moyennes, suggestions, séries
js/catalog.js           couleurs, icônes, catégories par défaut
js/charts.js            anneau et barres en SVG
js/components.js        éléments d'interface réutilisés
js/sheets.js            formulaires (dépense, abonnement, revenu, catégorie, objectif…) et écran de bienvenue
js/install.js           carte « Installe Yardget » (téléphone uniquement)
js/version.js           numéro de version affiché dans les réglages
js/views/               écrans : accueil, dépenses, budget, analyse, réglages
```

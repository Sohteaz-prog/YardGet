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

## Fichiers

Tous les fichiers sont à la racine, sans dossier : on peut les envoyer un par un sur GitHub.

```
index.html              page unique
app.js                  tout le code de l'appli (fichier généré, ne pas modifier à la main)
styles.css              thèmes clair et sombre, composants
sw.js                   cache hors connexion
manifest.webmanifest    nom, icônes, mode plein écran
icon.svg, icon-192.png, icon-512.png, icon-maskable-512.png, apple-touch-icon.png   logo (anneau)
README.md               ce document
```

Le code source détaillé (un fichier par écran et par rôle) est conservé dans les documents du projet Claude, dossier `claude/code/`. `app.js` est produit à partir de lui à chaque livraison.

## Mettre en ligne avec GitHub Pages

1. Crée un dépôt sur GitHub (public, ou privé avec un compte qui permet Pages).
2. **Add file → Upload files** : envoie tous les fichiers du zip à la racine du dépôt, puis **Commit changes**.
3. Dans le dépôt : **Settings → Pages → Build and deployment → Source : Deploy from a branch**, branche `main`, dossier `/ (root)`, puis **Save**.
4. Après une ou deux minutes, l'adresse s'affiche en haut de la page Pages (du type `https://ton-pseudo.github.io/nom-du-depot/`).

Aucune compilation n'est nécessaire de ton côté.

## Installer sur Android

1. Ouvre l'adresse dans **Chrome**.
2. Touche **Installer** dans la carte proposée par l'appli, ou passe par le menu ⋮ → **Ajouter à l'écran d'accueil** → **Installer**.
3. L'appli s'ouvre alors en plein écran, fonctionne hors connexion, et Chrome protège ses données.

## Publier une mise à jour

1. Envoie sur GitHub les fichiers du nouveau zip (**Add file → Upload files**) : ils remplacent les anciens du même nom.
2. Les livraisons après la 1.00 ne contiennent que les fichiers modifiés ; les images restent celles déjà présentes, sauf changement.
3. Le numéro de version est déjà à jour dans les fichiers livrés. Le téléphone récupère la nouvelle version à la prochaine ouverture (parfois la suivante) ; la version affichée en bas des réglages permet de le vérifier.

## Si la page reste blanche ou affiche « Yardget ne s'est pas chargé »

Un fichier manque à la racine du dépôt (le plus souvent `app.js` ou `styles.css`), ou il est rangé dans un dossier. Vérifie la liste des fichiers ci-dessus, renvoie ceux qui manquent, puis recharge la page.

## Données et sauvegarde

- Les données sont enregistrées dans le stockage local de Chrome, sous la clé `yardget:v1`.
- Elles sont perdues si tu effaces les données de Chrome ou du site, si tu désinstalles l'appli en supprimant ses données, ou si tu changes de téléphone.
- **Réglages → Exporter** télécharge un fichier `yardget-sauvegarde-AAAA-MM-JJ.json` à garder ailleurs (Drive, e-mail). **Importer** le recharge, par exemple sur un nouveau téléphone. L'appli rappelle de sauvegarder une fois par mois.
- Les montants sont stockés en centimes pour éviter les erreurs d'arrondi.

## Tester sur un ordinateur

Lance un petit serveur dans le dossier qui contient les fichiers :

```
python3 -m http.server 8000
```

puis ouvre `http://localhost:8000`. Dans Chrome, les outils de développement (F12) permettent de simuler un téléphone. La carte d'installation n'apparaît qu'en simulation tactile (téléphone).

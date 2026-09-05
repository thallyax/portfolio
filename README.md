# Portfolio — guide de démarrage

## Arborescence

```
portfolio/
├── index.html          Accueil
├── qui-je-suis.html    Page « Qui je suis » + CV
├── projets.html         Galerie de projets filtrable
├── contact.html          Page de contact
├── css/
│   └── style.css        Toute la feuille de style (variables en haut du fichier)
├── js/
│   ├── main.js           Navigation, menu mobile, spotlight du hero, révélation au scroll
│   ├── projects.js       Filtres de la galerie + lightbox de la section Bonus
│   └── contact.js        Validation du formulaire de contact
└── assets/
    ├── images/           Toutes les images (portraits, projets, mosaïque, bonus…)
    ├── cv/                Votre CV au format PDF
    └── videos/            Vos vidéos de montage
```

Aucune dépendance à installer : ouvrez simplement `index.html` dans un navigateur,
ou déposez le dossier tel quel sur votre hébergement.

## Ce qu'il faut remplacer

Tous les emplacements à personnaliser sont signalés par un commentaire `🔧` dans le code.

1. **Votre nom** — remplacez « Prénom Nom » dans les 4 pages (logo, titres, footer, balises `<title>`/`<meta>`).
2. **Vos photos** — déposez vos fichiers dans `assets/images/` en respectant les noms utilisés
   (`portrait.jpg`, `portrait-large.jpg`, `projet-site-1.jpg`…), ou modifiez les chemins `src`
   directement dans le HTML. Tant qu'une image n'existe pas, un espace réservé s'affiche
   automatiquement à sa place (via l'attribut `onerror`) — rien ne casse visuellement.
3. **Votre CV** — placez le PDF dans `assets/cv/cv-prenom-nom.pdf` (ou changez le nom de fichier
   dans `qui-je-suis.html`). Il s'affichera automatiquement dans le cadre prévu.
4. **Vos vidéos** — déposez vos fichiers dans `assets/videos/`.
5. **Vos liens réels** — email, LinkedIn, Instagram, boutons « Voir le projet » / « Code » :
   cherchez les `href="#"` et `votre-profil` / `votre-compte` dans le HTML.
6. **Le contenu des projets** — titres, descriptions, technologies, catégories : chaque carte
   de `projets.html` est un bloc `<article class="card project-item">` autonome, facile à dupliquer
   pour ajouter un projet.
7. **L'envoi du formulaire** — `js/contact.js` valide les champs mais n'envoie rien par défaut
   (voir la fonction `sendMessage`). Branchez-y votre service d'envoi (endpoint personnel,
   Formspree, EmailJS…).

## Identité visuelle

- **Couleurs** : blanc cassé / noir encre / gris chaud + un seul accent ambre (`--accent`),
  défini dans `css/style.css` (section VARIABLES). Changez ces valeurs pour ajuster toute
  la palette du site en une fois.
- **Typographies** : Fraunces (titres), Inter (texte courant), Space Mono (petites capitales,
  catégories, dates) — chargées via Google Fonts dans le `<head>` de chaque page.
- **Signature** : un halo lumineux discret suit le curseur dans le hero de l'accueil, comme
  une lumière de scène — désactivé automatiquement sur mobile et si votre système demande
  de réduire les animations.

## Accessibilité & performance

- Focus clavier visible partout, `aria-current` sur le lien de navigation actif.
- `prefers-reduced-motion` respecté (animations coupées si l'utilisateur le demande).
- Images en `loading="lazy"` recommandé une fois vos vraies photos ajoutées.
- Filtres et lightbox fonctionnent sans dépendance externe (JavaScript natif).

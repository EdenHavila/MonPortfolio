# Portfolio — Eden Havila Kouame

Portfolio professionnel statique (HTML/CSS/JS natifs, sans framework ni étape de build). Aucune dépendance à installer : ouvrir `index.html` dans un navigateur suffit.

## Structure

```
portfolio/
├── index.html              Structure et contenu uniquement
├── css/
│   ├── variables.css        Design tokens : couleurs, typographie, espacements
│   ├── base.css              Reset, typographie de base, scaffolding de section
│   ├── components.css        Boutons, tags, cartes, badges — réutilisés partout
│   ├── navbar.css             Navigation fixe + menu mobile
│   ├── hero.css                Section d'accueil + panneau visuel
│   ├── sections.css             À propos / Expertise / Projets / Certifications / Expérience / Activité
│   ├── contact.css               Bandeau de contact + formulaire
│   ├── footer.css                 Pied de page
│   └── responsive.css              Ajustements globaux transverses
├── js/
│   ├── main.js               Point d'entrée — importe et initialise les modules
│   └── modules/
│       ├── navigation.js       Menu mobile
│       ├── scroll-reveal.js     Apparition progressive au scroll
│       ├── network-animation.js  Animation canvas du hero
│       └── contact-form.js        Validation + soumission du formulaire
└── assets/
    ├── cv/                     Dépose ton CV en PDF ici
    └── certs/                  Logos des organismes de certification
```

## Ajouter ton CV

1. Dépose ton fichier PDF dans `assets/cv/`, par ex. `CV-Eden-Havila-Kouame.pdf`.
2. Si le nom de fichier diffère de celui déjà présent dans `index.html`, mets à jour le `href` du bouton "Télécharger mon CV" dans la navbar :
   ```html
   <a href="assets/cv/TON-FICHIER.pdf" download class="btn btn-ghost btn-small">Télécharger mon CV</a>
   ```
   L'attribut `download` déclenche un téléchargement direct plutôt qu'une ouverture dans un nouvel onglet.

## Gérer les certifications

Chaque certification est une carte dans la section `#certifications` d'`index.html`. Pour en ajouter une, dupliquer un bloc `.cert-card` existant et remplir :

- **`[Certification]`** → nom exact de la certification (ex. "CEH — Certified Ethical Hacker")
- **`[Organisme]`** → organisme certificateur (ex. "EC-Council")
- **`[Année]`** → année d'obtention
- **Lien "Vérifier"** → URL de vérification publique (badge Credly, page de vérification officielle de l'organisme, etc.). Retirer le lien entièrement si aucune vérification publique n'existe.
- **Logo** (optionnel) → dépose le fichier dans `assets/certs/`, puis dans la carte, commente la ligne `<div class="cert-badge">` (initiales par défaut) et décommente la ligne `<img class="cert-badge cert-badge--img">` en pointant vers ton fichier. Sans logo, des initiales génériques s'affichent automatiquement — aucune carte ne casse visuellement en attendant.

## Personnaliser

- **Couleurs, polices, espacements** → tout se change dans `css/variables.css`. Le reste du CSS consomme ces variables, rien d'autre à toucher pour un rethème complet.
- **Contenu** (bio, projets, certifications, expérience, liens) → directement dans `index.html`, repérable par les placeholders entre crochets, ex. `[Certification]`, `[Poste]`, `[X]`.
- **Formulaire de contact** → aucun backend n'est branché. Le point d'intégration est la fonction `sendMessage()` dans `js/modules/contact-form.js` : la remplacer par un appel `fetch` vers votre service (API, Formspree, EmailJS...) active l'envoi réel sans toucher au reste du site.
- **Retirer/désactiver une fonctionnalité** (ex. l'animation réseau) → commenter son import et son appel dans `js/main.js`, chaque module est indépendant.

## Notes techniques

- Les scripts sont des modules ES (`type="module"`) : pour un test en local via `file://`, certains navigateurs bloquent les imports de modules par sécurité. Utiliser un petit serveur local si besoin, par ex. :
  ```bash
  python3 -m http.server 8000
  ```
  puis ouvrir `http://localhost:8000`.
- `prefers-reduced-motion` est respecté (animations désactivées automatiquement si l'utilisateur l'a demandé au niveau système).
- Polices chargées via Google Fonts (Inter, IBM Plex Sans, IBM Plex Mono) — nécessite une connexion internet ; pour un usage hors-ligne, héberger les fichiers de police localement et ajuster les balises `<link>` dans `index.html`.

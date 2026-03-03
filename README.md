# Archive de la Wii U

Un projet de refonte brutaliste honorant la console Nintendo Wii U avec quelques touches interactives.

La charte graphique est inspirée des agences digitales modernes "anti-design" : lignes très appuyées, bruit statique en arrière-plan (noise filter), système de grille stricte, et typographies agressives et textuelles (Archivo Black & Space Mono), avec les couleurs caractéristiques de l'époque Wii U.

## Fonctionnalités
- **Design Néo-Brutaliste**
- **Architecture Vue.js v3** : Simplifie l'organisation des différentes sections.
- **Intégration robuste de Three.js** : Plus aucune image 2D statique n'est utilisée pour illustrer la console ! À la place, les blocs intègrent différents composants de fenêtres 3D.
- **Différents modèles 3D en full code** :
  - Le Wii U GamePad
  - La console (corps de la Wii U)
  - Le disque Wii U
- **Interactivité 3D** : Grâce à `OrbitControls`, vous pouvez faire pivoter, zoomer et observer ces créations sous tous les angles avec votre souris.

## Hébergement / Lancement
Comme le projet ne nécessite pas de backend, ouvrez simplement le fichier `index.html` dans votre navigateur ou lancez-le via un environnement comme Live Server.

## Technos utilisées
- HTML5 / CSS3
- Vue.js (CDN)
- Three.js (CDN) + OrbitControls.js

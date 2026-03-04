# Archive Historique de la Wii U

Un projet de scrollytelling interactif rendant hommage à la console Nintendo Wii U. Ce site combine une interface moderne et minimaliste avec une intégration 3D poussée pour retracer l'histoire, les innovations et les jeux marquants de cette plateforme.

## 🚀 Concept & Design
La charte graphique adopte un style **Néo-Brutaliste Premium**, avec des contrastes forts, une typographie imposante (**Archivo Black**) et un accent sur le bleu Wii U officiel (`#0094C8`). 

L'expérience est dictée par le **scroll** : à mesure que vous descendez, le modèle 3D de la console et du GamePad navigue dans l'espace, zoomant sur des détails spécifiques ou s'écartant pour laisser place au texte informatif.

## 🛠 Fonctionnalités Techniques
- **Scrollytelling 3D Interactif** : Utilisation de **Three.js** pour projeter un modèle GLTF réaliste.
- **Caméra Dynamique** : Les positions, angles et champs de vision de la caméra sont interpolés (lerp) pour des transitions fluides.
- **Performance Optimisée** : Rendu à 60 FPS avec gestion adaptative du ratio de pixels.
- **Architecture Moderne** :
  - **Three.js** pour le moteur 3D.
  - **Vanilla JS & CSS3** pour une légèreté maximale.
  - **Responsive Design** : L'interface s'adapte à la taille de l'écran.

## 📖 Contenu de l'Archive
- **Le GamePad** : Focus sur la manette révolutionnaire et ses capacités.
- **La Console** : Détails techniques et hardware.
- **Miiverse** : Retour sur le réseau social précurseur de Nintendo.
- **Chronologie** : Les dates clés de 2011 à la fin du support.
- **Ludothèque** : Les jeux qui ont défini la console (Mario Kart 8, Splatoon, Zelda BotW).

## 💻 Installation Locale
Le projet est entièrement statique. Pour le tester localement :
1. Clonez le dépôt.
2. Ouvrez `index.html` avec une extension type "Live Server" (indispensable pour charger le modèle 3D via GLTF).

---
*Projet réalisé dans le cadre d'une étude sur l'interactivité web et l'histoire du jeu vidéo.*

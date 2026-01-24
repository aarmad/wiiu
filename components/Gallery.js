// Composant Galerie d'images avec images réelles
const Gallery = {
    template: `
    <div class="gallery-container">
        <div class="gallery-item" v-for="(item, index) in galleryItems" :key="index">
            <div class="gallery-image">
                <img :src="item.image" :alt="item.title" loading="lazy">
            </div>
            <div class="gallery-caption">
                <h4>{{ item.title }}</h4>
                <p>{{ item.description }}</p>
            </div>
        </div>
    </div>
    `,
    
    data() {
        return {
            galleryItems: [
                {
                    title: "Wii U GamePad",
                    description: "La manette révolutionnaire avec écran tactile intégré",
                    image: "assets/images/wiiu-gamepad.jpg"
                },
                {
                    title: "Console Wii U",
                    description: "La console elle-même, compacte et élégante",
                    image: "assets/images/wiiu-console.jpeg"
                },
                {
                    title: "Super Mario 3D World",
                    description: "Un des jeux les plus acclamés de la plateforme",
                    image: "assets/images/mario-3d-world.jpg"
                },
                {
                    title: "Splatoon",
                    description: "La nouvelle franchise qui a conquis les joueurs",
                    image: "assets/images/splatoon-wiiu.jpeg"
                },
                {
                    title: "The Legend of Zelda: Breath of the Wild",
                    description: "Le chef-d'œuvre qui a marqué la fin de la Wii U",
                    image: "assets/images/zelda-botw.jpg"
                },
                {
                    title: "Mario Kart 8",
                    description: "Le jeu de course le plus vendu sur Wii U",
                    image: "assets/images/mario-kart-8.jpg"
                },
                {
                    title: "Accessoires Wii U",
                    description: "Les différents accessoires disponibles pour la console",
                    image: "assets/images/wiiu-accessories.jpg"
                },
                {
                    title: "Miiverse",
                    description: "Le réseau social intégré à la Wii U",
                    image: "assets/images/wiiu-miiverse.jpg"
                }
            ]
        };
    }
};
// Composant Timeline interactive
const Timeline = {
    template: `
    <div class="timeline-container">
        <div class="timeline-item" v-for="item in timelineItems" :key="item.id">
            <div class="timeline-content fade-in">
                <span class="date">{{ item.date }}</span>
                <h4>{{ item.title }}</h4>
                <p>{{ item.description }}</p>
            </div>
        </div>
    </div>
    `,
    
    data() {
        return {
            timelineItems: [
                {
                    id: 1,
                    date: "Juin 2011",
                    title: "Présentation à l'E3",
                    description: "La Wii U est officiellement dévoilée lors de l'E3 2011, avec une démonstration du GamePad à écran tactile intégré."
                },
                {
                    id: 2,
                    date: "Novembre 2012",
                    title: "Sortie mondiale",
                    description: "La Wii U sort en Amérique du Nord le 18 novembre, puis au Japon et en Europe en décembre."
                },
                {
                    id: 3,
                    date: "Décembre 2012",
                    title: "Lancement de Miiverse",
                    description: "Le réseau social Miiverse est lancé, permettant aux joueurs de partager des expériences de jeu."
                },
                {
                    id: 4,
                    date: "Novembre 2013",
                    title: "Sortie de Super Mario 3D World",
                    description: "Considéré comme l'un des meilleurs jeux de la plateforme, il démontre le potentiel du jeu multijoueur sur Wii U."
                },
                {
                    id: 5,
                    date: "Mai 2014",
                    title: "Sortie de Mario Kart 8",
                    description: "Le jeu devient le titre le plus vendu de la console, avec plus de 8 millions d'exemplaires vendus."
                },
                {
                    id: 6,
                    date: "Mai 2015",
                    title: "Sortie de Splatoon",
                    description: "Nouvelle franchise Nintendo qui connaît un succès immédiat et qui sera portée sur la Nintendo Switch."
                },
                {
                    id: 7,
                    date: "Mars 2017",
                    title: "Sortie de The Legend of Zelda: Breath of the Wild",
                    description: "Le jeu est sorti simultanément sur Wii U et Nintendo Switch, marquant la fin de la production de jeux pour la Wii U."
                },
                {
                    id: 8,
                    date: "Janvier 2017",
                    title: "Annonce de la Nintendo Switch",
                    description: "Nintendo annonce la Switch, qui reprend plusieurs concepts de la Wii U en les améliorant considérablement."
                },
                {
                    id: 9,
                    date: "Janvier 2019",
                    title: "Fin du support en ligne",
                    description: "Nintendo met fin au support en ligne de la Wii U, marquant la fin définitive du cycle de vie de la console."
                }
            ]
        };
    }
};
// Composant Timeline interactive corrigé
const Timeline = {
    template: `
    <div class="timeline-container">
        <div class="timeline-item" 
             v-for="(item, index) in timelineItems" 
             :key="item.id"
             :class="{
                 'visible': isItemVisible(index),
                 'timeline-item-enter': isItemVisible(index)
             }"
             :style="getItemStyle(index)">
            <div class="timeline-content">
                <span class="date">{{ item.date }}</span>
                <h4>{{ item.title }}</h4>
                <p>{{ item.description }}</p>
                <div class="timeline-decoration" :class="'decoration-' + (index % 3)"></div>
            </div>
        </div>
        
        <!-- Ligne de timeline animée -->
        <div class="timeline-line">
            <div class="timeline-progress" :style="progressStyle"></div>
        </div>
        
        <!-- Points de navigation -->
        <div class="timeline-navigation">
            <button v-for="(item, index) in timelineItems" 
                    :key="'nav-' + item.id"
                    class="timeline-dot"
                    :class="{ active: currentIndex === index }"
                    @click="scrollToItem(index)"
                    :title="item.date + ' - ' + item.title">
                <span class="dot-tooltip">{{ item.date }}</span>
            </button>
        </div>
    </div>
    `,
    
    props: {
        isVisible: {
            type: Boolean,
            default: false
        }
    },
    
    data() {
        return {
            timelineItems: [
                {
                    id: 1,
                    date: "Juin 2011",
                    title: "Présentation à l'E3",
                    description: "La Wii U est officiellement dévoilée lors de l'E3 2011, avec une démonstration du GamePad à écran tactile intégré. La réaction est mitigée, beaucoup ne comprenant pas s'il s'agit d'une nouvelle console ou d'un accessoire pour la Wii."
                },
                {
                    id: 2,
                    date: "Novembre 2012",
                    title: "Sortie mondiale",
                    description: "La Wii U sort en Amérique du Nord le 18 novembre, puis au Japon et en Europe en décembre. Deux modèles sont disponibles : Basic (8Go) et Deluxe (32Go). Les ventes démarrent bien mais ralentissent rapidement."
                },
                {
                    id: 3,
                    date: "Décembre 2012",
                    title: "Lancement de Miiverse",
                    description: "Le réseau social Miiverse est lancé, permettant aux joueurs de partager des expériences de jeu, des dessins et des messages. C'est une innovation majeure mais qui peine à trouver son public."
                },
                {
                    id: 4,
                    date: "Novembre 2013",
                    title: "Sortie de Super Mario 3D World",
                    description: "Considéré comme l'un des meilleurs jeux de la plateforme, il démontre le potentiel du jeu multijoueur sur Wii U avec des graphismes colorés et une jouabilité inventive."
                },
                {
                    id: 5,
                    date: "Mai 2014",
                    title: "Sortie de Mario Kart 8",
                    description: "Le jeu devient le titre le plus vendu de la console, avec plus de 8 millions d'exemplaires vendus. Ses graphismes HD et sa jouabilité fluide en font un succès critique et commercial."
                },
                {
                    id: 6,
                    date: "Mai 2015",
                    title: "Sortie de Splatoon",
                    description: "Nouvelle franchise Nintendo qui connaît un succès immédiat. Le jeu démontre la capacité de Nintendo à créer de nouvelles IP innovantes et sera porté avec succès sur la Nintendo Switch."
                },
                {
                    id: 7,
                    date: "Mars 2017",
                    title: "Sortie de The Legend of Zelda: Breath of the Wild",
                    description: "Le jeu est sorti simultanément sur Wii U et Nintendo Switch, marquant la fin de la production de jeux pour la Wii U. Il reçoit des critiques dithyrambiques et est considéré comme l'un des meilleurs jeux de tous les temps."
                },
                {
                    id: 8,
                    date: "Janvier 2017",
                    title: "Annonce de la Nintendo Switch",
                    description: "Nintendo annonce la Switch, qui reprend plusieurs concepts de la Wii U en les améliorant considérablement. Le GamePad devient les Joy-Cons détachables et le concept de console hybride est perfectionné."
                },
                {
                    id: 9,
                    date: "Janvier 2019",
                    title: "Fin du support en ligne",
                    description: "Nintendo met fin au support en ligne de la Wii U, marquant la fin définitive du cycle de vie de la console. Miiverse avait déjà été fermé en novembre 2017."
                }
            ],
            currentIndex: 0,
            visibleItems: [],
            progress: 0
        };
    },
    
    computed: {
        progressStyle() {
            return {
                width: `${this.progress}%`
            };
        }
    },
    
    methods: {
        isItemVisible(index) {
            return this.visibleItems.includes(index) || this.isVisible;
        },
        
        getItemStyle(index) {
            const delay = index * 0.2;
            return {
                animationDelay: `${delay}s`,
                transitionDelay: `${delay}s`
            };
        },
        
        scrollToItem(index) {
            this.currentIndex = index;
            const element = document.querySelector(`.timeline-item:nth-child(${index + 1})`);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        },
        
        updateVisibleItems() {
            const items = document.querySelectorAll('.timeline-item');
            const newVisibleItems = [];
            
            items.forEach((item, index) => {
                const rect = item.getBoundingClientRect();
                const windowHeight = window.innerHeight || document.documentElement.clientHeight;
                
                if (rect.top <= windowHeight * 0.75 && rect.bottom >= windowHeight * 0.25) {
                    newVisibleItems.push(index);
                }
            });
            
            this.visibleItems = newVisibleItems;
            
            // Mettre à jour la progression
            if (newVisibleItems.length > 0) {
                this.currentIndex = newVisibleItems[0];
                this.progress = ((this.currentIndex + 1) / this.timelineItems.length) * 100;
            }
        },
        
        handleScroll() {
            this.updateVisibleItems();
        }
    },
    
    mounted() {
        // Initialiser les éléments visibles
        this.$nextTick(() => {
            this.updateVisibleItems();
        });
        
        // Ajouter l'écouteur de défilement
        window.addEventListener('scroll', this.handleScroll);
        
        // Animation d'entrée progressive
        setTimeout(() => {
            if (this.isVisible) {
                this.visibleItems = Array.from({ length: this.timelineItems.length }, (_, i) => i);
            }
        }, 300);
    },
    
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    
    watch: {
        isVisible(newVal) {
            if (newVal) {
                // Animer l'apparition des éléments
                setTimeout(() => {
                    this.visibleItems = Array.from({ length: this.timelineItems.length }, (_, i) => i);
                }, 500);
            }
        }
    }
};
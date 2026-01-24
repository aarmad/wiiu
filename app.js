// Application Vue principale
const { createApp, ref, onMounted, computed } = Vue;

// Définition des composants
const App = {
    template: `
    <div>
        <Header :active-section="activeSection" @nav-click="scrollToSection" />
        
        <main>
            <section id="accueil" class="hero">
                <div class="container">
                    <div class="hero-content fade-in" :class="{visible: heroVisible}">
                        <h1>L'Histoire de la <span>Wii U</span></h1>
                        <p>Découvrez l'histoire fascinante de la console Nintendo la plus méconnue, ses innovations et son héritage qui a conduit à la révolution Switch.</p>
                        <button class="btn" @click="scrollToSection('chronologie')">
                            Explorer l'histoire <i class="fas fa-arrow-down"></i>
                        </button>
                    </div>
                </div>
                <ThreeScene />
            </section>
            
            <section id="contexte" class="contexte">
                <div class="container">
                    <div class="section-title fade-in" :class="{visible: sectionVisible.contexte}">
                        <h2>Contexte avant la sortie</h2>
                        <p>Le succès phénoménal de la Wii et les attentes pour sa successeur</p>
                    </div>
                    
                    <div class="content-grid">
                        <div class="content-card fade-in" :class="{visible: sectionVisible.contexte}">
                            <h3><i class="fas fa-gamepad"></i> L'ère de la Wii</h3>
                            <p>La Wii, sortie en 2006, a révolutionné le jeu vidéo en attirant un public non traditionnel grâce à ses manettes à détection de mouvement. Avec plus de 101 millions d'unités vendues, elle a établi un record pour Nintendo.</p>
                            <p>Cependant, à la fin de son cycle de vie, la Wii montrait ses limites techniques face à la concurrence de la PlayStation 3 et de la Xbox 360.</p>
                        </div>
                        
                        <div class="content-card fade-in" :class="{visible: sectionVisible.contexte}">
                            <h3><i class="fas fa-users"></i> Les attentes des fans</h3>
                            <p>Les joueurs attendaient une console plus puissante qui combinerait l'approche innovante de la Wii avec des graphismes HD et un écosystème en ligne robuste.</p>
                            <p>Nintendo devait répondre à la montée en puissance des jeux mobiles tout en conservant son identité unique.</p>
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="lancement" class="lancement">
                <div class="container">
                    <div class="section-title fade-in" :class="{visible: sectionVisible.lancement}">
                        <h2>Lancement de la Wii U</h2>
                        <p>Dates clés, marketing et fonctionnalités présentées au public</p>
                    </div>
                    
                    <div class="content-card fade-in" :class="{visible: sectionVisible.lancement}">
                        <h3><i class="fas fa-calendar-alt"></i> Dates importantes</h3>
                        <p>La Wii U a été officiellement dévoilée à l'E3 2011, mais son GamePad unique a créé une certaine confusion quant à savoir s'il s'agissait d'une nouvelle console ou d'un accessoire pour la Wii.</p>
                        <p>Elle est sortie en Amérique du Nord le 18 novembre 2012, puis au Japon le 8 décembre 2012 et en Europe le 30 novembre 2012.</p>
                    </div>
                    
                    <div class="content-card fade-in" :class="{visible: sectionVisible.lancement}">
                        <h3><i class="fas fa-bullhorn"></i> Problèmes de marketing</h3>
                        <p>Le nom "Wii U" n'a pas aidé à clarifier qu'il s'agissait d'une nouvelle console. Beaucoup de consommateurs pensaient qu'il s'agissait simplement d'un nouvel accessoire pour la Wii.</p>
                        <p>Les publicités mettaient l'accent sur le GamePad mais ne montraient pas clairement la console elle-même, ajoutant à la confusion.</p>
                    </div>
                </div>
            </section>
            
            <section id="innovations" class="innovations">
                <div class="container">
                    <div class="section-title fade-in" :class="{visible: sectionVisible.innovations}">
                        <h2>Innovations de la Wii U</h2>
                        <p>Les fonctionnalités avant-gardistes qui ont marqué leur époque</p>
                    </div>
                    
                    <div class="content-grid">
                        <div class="content-card fade-in" :class="{visible: sectionVisible.innovations}">
                            <h3><i class="fas fa-tablet-alt"></i> Le GamePad révolutionnaire</h3>
                            <p>Le GamePad de la Wii U était une manette avec un écran tactile intégré de 6,2 pouces, permettant le jeu asynchrone et l'affichage secondaire.</p>
                            <p>Il offrait également la fonctionnalité "Off-TV Play", permettant de jouer à certains jeux uniquement sur l'écran du GamePad sans avoir besoin d'une télévision.</p>
                        </div>
                        
                        <div class="content-card fade-in" :class="{visible: sectionVisible.innovations}">
                            <h3><i class="fas fa-comments"></i> Miiverse : Le réseau social Nintendo</h3>
                            <p>Miiverse était un réseau social intégré à la Wii U où les joueurs pouvaient partager des captures d'écran, des dessins et discuter de jeux.</p>
                            <p>Bien qu'innovant, il a été fermé en 2017, mais certains de ses concepts ont été intégrés à la Nintendo Switch.</p>
                        </div>
                        
                        <div class="content-card fade-in" :class="{visible: sectionVisible.innovations}">
                            <h3><i class="fas fa-backward"></i> Rétrocompatibilité</h3>
                            <p>La Wii U était rétrocompatible avec tous les jeux et accessoires Wii, permettant aux joueurs de conserver leur bibliothèque de jeux.</p>
                            <p>Elle proposait également un service de jeux virtuels avec des titres des consoles Nintendo précédentes (NES, SNES, N64, etc.).</p>
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="problemes" class="problemes">
                <div class="container">
                    <div class="section-title fade-in" :class="{visible: sectionVisible.problemes}">
                        <h2>Problèmes et défis</h2>
                        <p>Les difficultés qui ont entravé le succès de la console</p>
                    </div>
                    
                    <div class="content-card fade-in" :class="{visible: sectionVisible.problemes}">
                        <h3><i class="fas fa-chart-line"></i> Ventes décevantes</h3>
                        <p>La Wii U n'a vendu qu'environ 13,56 millions d'unités dans le monde, ce qui en fait la console Nintendo la moins vendue de l'histoire après la Virtual Boy.</p>
                        <p>Le manque de jeux au lancement et les longues périodes de sécheresse entre les sorties majeures ont découragé les acheteurs potentiels.</p>
                    </div>
                    
                    <div class="content-card fade-in" :class="{visible: sectionVisible.problemes}">
                        <h3><i class="fas fa-gamepad"></i> Catalogue de jeux limité</h3>
                        <p>Bien que la Wii U ait eu des jeux d'excellente qualité comme "Super Mario 3D World", "The Legend of Zelda: Breath of the Wild" et "Splatoon", leur nombre était trop limité.</p>
                        <p>Le support des éditeurs tiers était faible, avec peu de jeux AAA contemporains disponibles sur la plateforme.</p>
                    </div>
                </div>
            </section>
            
            <section id="heritage" class="heritage">
                <div class="container">
                    <div class="section-title fade-in" :class="{visible: sectionVisible.heritage}">
                        <h2>Héritage de la Wii U</h2>
                        <p>Comment la Wii U a influencé la Nintendo Switch et l'avenir de Nintendo</p>
                    </div>
                    
                    <div class="content-card fade-in" :class="{visible: sectionVisible.heritage}">
                        <h3><i class="fas fa-lightbulb"></i> L'influence sur la Switch</h3>
                        <p>La Wii U a servi de banc d'essai pour de nombreuses fonctionnalités qui ont ensuite été perfectionnées dans la Nintendo Switch.</p>
                        <p>Le concept de jeu sur tablette avec la fonction "Off-TV Play" a évolué pour devenir le mode portable de la Switch. Le GamePad a inspiré les Joy-Cons détachables.</p>
                    </div>
                    
                    <div class="content-card fade-in" :class="{visible: sectionVisible.heritage}">
                        <h3><i class="fas fa-seedling"></i> Une console avant-gardiste</h3>
                        <p>Malgré son échec commercial, la Wii U était technologiquement innovante et a introduit des concepts qui sont devenus courants aujourd'hui.</p>
                        <p>De nombreux jeux Wii U ont été réédités sur Switch avec un grand succès, prouvant que la qualité était présente mais mal commercialisée.</p>
                    </div>
                </div>
            </section>
            
            <section id="chronologie" class="chronologie">
                <div class="container">
                    <div class="section-title fade-in" :class="{visible: sectionVisible.chronologie}">
                        <h2>Chronologie interactive</h2>
                        <p>Les moments clés de l'histoire de la Wii U</p>
                    </div>
                    
                    <Timeline />
                </div>
            </section>
            
            <section id="galerie" class="galerie">
                <div class="container">
                    <div class="section-title fade-in" :class="{visible: sectionVisible.galerie}">
                        <h2>Galerie Wii U</h2>
                        <p>Découvrez la console, ses accessoires et ses jeux emblématiques</p>
                    </div>
                    
                    <Gallery />
                </div>
            </section>
        </main>
        
        <Footer />
    </div>
    `,
    
    components: {
        Header,
        ThreeScene,
        Timeline,
        Gallery,
        Footer
    },
    
    setup() {
        const activeSection = ref('accueil');
        const heroVisible = ref(false);
        const sectionVisible = ref({
            contexte: false,
            lancement: false,
            innovations: false,
            problemes: false,
            heritage: false,
            chronologie: false,
            galerie: false
        });
        
        const scrollToSection = (sectionId) => {
            const element = document.getElementById(sectionId);
            if (element) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        };
        
        const handleScroll = () => {
            // Mettre à jour la section active pour la navigation
            const sections = document.querySelectorAll('section');
            const scrollPosition = window.pageYOffset + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    activeSection.value = sectionId;
                }
            });
            
            // Gérer les animations au défilement
            heroVisible.value = window.scrollY < window.innerHeight;
            
            const fadeElements = document.querySelectorAll('.fade-in');
            fadeElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                    
                    // Identifier de quelle section fait partie l'élément
                    let parentSection = element;
                    while (parentSection && parentSection.tagName !== 'SECTION') {
                        parentSection = parentSection.parentElement;
                    }
                    
                    if (parentSection) {
                        const sectionId = parentSection.getAttribute('id');
                        if (sectionId && sectionVisible.value.hasOwnProperty(sectionId)) {
                            sectionVisible.value[sectionId] = true;
                        }
                    }
                }
            });
        };
        
        onMounted(() => {
            // Initialiser les animations
            heroVisible.value = true;
            
            // Ajouter l'écouteur de défilement
            window.addEventListener('scroll', handleScroll);
            
            // Déclencher une fois au chargement
            setTimeout(handleScroll, 100);
        });
        
        return {
            activeSection,
            heroVisible,
            sectionVisible,
            scrollToSection
        };
    }
};

// Initialiser l'application Vue
createApp(App).mount('#app');
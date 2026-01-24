// Composant Header avec animations différentes par section
const Header = {
    template: `
    <header class="header" :class="{
        scrolled: isScrolled,
        'section-contexte': activeSection === 'contexte',
        'section-lancement': activeSection === 'lancement',
        'section-innovations': activeSection === 'innovations',
        'section-problemes': activeSection === 'problemes',
        'section-heritage': activeSection === 'heritage',
        'section-chronologie': activeSection === 'chronologie',
        'section-galerie': activeSection === 'galerie'
    }">
        <div class="nav-container">
            <a href="#" class="logo" @click.prevent="scrollToTop">
                <i class="fas fa-gamepad"></i>
                <span class="logo-text">Wii U <span class="logo-highlight">History</span></span>
                <span class="active-section-indicator">{{ getActiveSectionName() }}</span>
            </a>
            
            <button class="menu-toggle" @click="toggleMenu">
                <i class="fas" :class="menuOpen ? 'fa-times' : 'fa-bars'"></i>
            </button>
            
            <ul class="nav-menu" :class="{active: menuOpen}">
                <li v-for="section in sections" :key="section.id">
                    <a 
                        :href="'#' + section.id" 
                        :class="{
                            active: activeSection === section.id,
                            [section.id + '-link']: true
                        }" 
                        @click.prevent="handleNavClick(section.id)"
                    >
                        <i :class="section.icon"></i>
                        <span class="nav-text">{{ section.name }}</span>
                        <span class="nav-underline"></span>
                    </a>
                </li>
            </ul>
        </div>
        
        <!-- Animation background selon la section active -->
        <div class="header-animation-bg" :class="'bg-' + activeSection"></div>
        
        <!-- Effet parallax pour certaines sections -->
        <div class="parallax-layers" v-if="showParallax">
            <div class="parallax-layer layer-1" :style="parallaxStyle(0.2)"></div>
            <div class="parallax-layer layer-2" :style="parallaxStyle(0.4)"></div>
            <div class="parallax-layer layer-3" :style="parallaxStyle(0.6)"></div>
        </div>
        
        <!-- Animation de particules pour certaines sections -->
        <div class="particles-container" v-if="showParticles" ref="particlesContainer"></div>
        
        <!-- Effet de transition entre sections -->
        <div class="section-transition" :class="'transition-' + activeSection"></div>
    </header>
    `,
    
    props: ['activeSection'],
    
    data() {
        return {
            isScrolled: false,
            menuOpen: false,
            scrollY: 0,
            sections: [
                { id: 'contexte', name: 'Contexte', icon: 'fas fa-history' },
                { id: 'lancement', name: 'Lancement', icon: 'fas fa-rocket' },
                { id: 'innovations', name: 'Innovations', icon: 'fas fa-lightbulb' },
                { id: 'problemes', name: 'Problèmes', icon: 'fas fa-exclamation-triangle' },
                { id: 'heritage', name: 'Héritage', icon: 'fas fa-seedling' },
                { id: 'chronologie', name: 'Chronologie', icon: 'fas fa-stream' },
                { id: 'galerie', name: 'Galerie', icon: 'fas fa-images' }
            ]
        };
    },
    
    computed: {
        showParallax() {
            // Afficher l'effet parallax pour certaines sections
            return ['innovations', 'chronologie', 'galerie'].includes(this.activeSection);
        },
        
        showParticles() {
            // Afficher les particules pour certaines sections
            return ['contexte', 'heritage'].includes(this.activeSection);
        }
    },
    
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        this.initParticles();
    },
    
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        this.destroyParticles();
    },
    
    methods: {
        handleScroll() {
            this.isScrolled = window.scrollY > 50;
            this.scrollY = window.scrollY;
        },
        
        toggleMenu() {
            this.menuOpen = !this.menuOpen;
        },
        
        handleNavClick(sectionId) {
            this.$emit('nav-click', sectionId);
            this.menuOpen = false;
        },
        
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            this.menuOpen = false;
        },
        
        getActiveSectionName() {
            const section = this.sections.find(s => s.id === this.activeSection);
            return section ? section.name : 'Accueil';
        },
        
        parallaxStyle(speed) {
            if (!this.showParallax) return {};
            const yOffset = this.scrollY * speed;
            return {
                transform: `translateY(${yOffset}px)`
            };
        },
        
        initParticles() {
            // Initialisation simple des particules
            if (!this.showParticles || !this.$refs.particlesContainer) return;
            
            const container = this.$refs.particlesContainer;
            const particleCount = this.activeSection === 'contexte' ? 15 : 25;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Taille aléatoire
                const size = Math.random() * 4 + 2;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // Position aléatoire
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                
                // Couleur selon la section
                if (this.activeSection === 'contexte') {
                    particle.style.backgroundColor = '#e60012'; // Rouge Nintendo
                } else {
                    particle.style.backgroundColor = '#0094C8'; // Bleu Wii U
                }
                
                // Animation
                const duration = Math.random() * 3 + 2;
                particle.style.animation = `float ${duration}s infinite ease-in-out`;
                particle.style.animationDelay = `${Math.random() * 2}s`;
                
                container.appendChild(particle);
            }
        },
        
        destroyParticles() {
            if (this.$refs.particlesContainer) {
                this.$refs.particlesContainer.innerHTML = '';
            }
        }
    },
    
    watch: {
        activeSection(newSection, oldSection) {
            // Recréer les particules quand on change de section
            if (this.showParticles) {
                this.destroyParticles();
                this.$nextTick(() => {
                    this.initParticles();
                });
            }
        }
    }
};
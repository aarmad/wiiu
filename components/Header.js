// Composant Header avec navigation
const Header = {
    template: `
    <header class="header" :class="{scrolled: isScrolled}">
        <div class="nav-container">
            <a href="#" class="logo" @click.prevent="scrollToTop">
                <i class="fas fa-gamepad"></i>
                Wii U <span>History</span>
            </a>
            
            <button class="menu-toggle" @click="toggleMenu">
                <i class="fas fa-bars"></i>
            </button>
            
            <ul class="nav-menu" :class="{active: menuOpen}">
                <li><a href="#contexte" :class="{active: activeSection === 'contexte'}" @click.prevent="handleNavClick('contexte')">Contexte</a></li>
                <li><a href="#lancement" :class="{active: activeSection === 'lancement'}" @click.prevent="handleNavClick('lancement')">Lancement</a></li>
                <li><a href="#innovations" :class="{active: activeSection === 'innovations'}" @click.prevent="handleNavClick('innovations')">Innovations</a></li>
                <li><a href="#problemes" :class="{active: activeSection === 'problemes'}" @click.prevent="handleNavClick('problemes')">Problèmes</a></li>
                <li><a href="#heritage" :class="{active: activeSection === 'heritage'}" @click.prevent="handleNavClick('heritage')">Héritage</a></li>
                <li><a href="#chronologie" :class="{active: activeSection === 'chronologie'}" @click.prevent="handleNavClick('chronologie')">Chronologie</a></li>
                <li><a href="#galerie" :class="{active: activeSection === 'galerie'}" @click.prevent="handleNavClick('galerie')">Galerie</a></li>
            </ul>
        </div>
    </header>
    `,
    
    props: ['activeSection'],
    
    data() {
        return {
            isScrolled: false,
            menuOpen: false
        };
    },
    
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    
    methods: {
        handleScroll() {
            this.isScrolled = window.scrollY > 50;
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
        }
    }
};
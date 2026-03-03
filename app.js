// Application Vue principale
const { createApp, ref, onMounted } = Vue;

const App = {
    template: `
    <div class="brutalist-grid">
        <!-- HEADER ROW -->
        <div class="grid-item head-logo">
            <h1>wii u</h1>
        </div>
        <div class="grid-item head-title">
            <h2>bienvenue dans l'archive de la console perdue de nintendo</h2>
        </div>

        <!-- NAVIGATION ROW -->
        <div class="grid-item nav-cell" @click="scrollTo('about')">
            <span>à propos</span> <span class="nav-arrow">↗</span>
        </div>
        <div class="grid-item nav-cell" @click="scrollTo('innovations')">
            <span>innovations</span> <span class="nav-arrow">↗</span>
        </div>
        <div class="grid-item nav-cell" @click="scrollTo('legacy')">
            <span>héritage</span> <span class="nav-arrow">↗</span>
        </div>

        <!-- ABOUT SECTION -->
        <div id="about" class="grid-item history-cell">
            <h3>Notre histoire</h3>
            <p>En 2012, Nintendo a introduit la Wii U, successeur de l'incroyablement populaire Wii. Elle présentait un GamePad unique avec un écran tactile intégré, visant à combler le fossé entre les joueurs occasionnels et hardcore.</p>
            <p>Malgré ses concepts novateurs, elle a eu du mal à trouver un public massif, ne s'écoulant qu'à 13,56 millions d'exemplaires dans le monde. Pourtant, elle a ouvert la voie à l'avenir hybride du jeu vidéo.</p>
        </div>
        
        <div class="grid-item center-3d-cell">
            <ThreeScene model="gamepad" />
        </div>
        
        <div class="grid-item history-cell vision-cell">
            <p>La vision était de créer une expérience à double écran, permettant un multijoueur asynchrone et le mode Off-TV Play. Cette idée a finalement évolué pour donner naissance à l'énorme succès qu'est la Nintendo Switch.</p>
        </div>

        <!-- NOWADAYS ROW -->
        <div class="grid-item nowadays-title">
            <h3>De nos jours</h3>
        </div>
        <div class="grid-item nowadays-content-1">
            <p>Depuis l'arrêt de sa production en 2017, la Wii U est devenue culte. Beaucoup de ses meilleurs jeux ont été portés sur la Nintendo Switch, prouvant que sa ludothèque était d'excellente qualité.</p>
        </div>
        <div class="grid-item nowadays-content-2">
            <p>Le GamePad reste un matériel unique qui offrait des possibilités qu'aucune autre console ne pouvait reproduire, comme le gameplay asymétrique dans Nintendo Land.</p>
        </div>
        <div class="grid-item nowadays-content-3">
            <p style="font-weight: bold; font-size: 1.2rem; text-align:right;">« Nous avons une place spéciale dans nos cœurs pour la Wii U. Ce fut une magnifique transition. »</p>
        </div>

        <!-- BANNER ROW -->
        <div class="grid-item banner-row">
            <div class="banner-text">innovations innovations innovations innovations innovations</div>
        </div>

        <!-- INNOVATIONS SECTION -->
        <div id="innovations" class="grid-item service-cell">
            <h3>La Console</h3>
            <p>Une machine compacte avec des bords arrondis, dotée de la première architecture HD de Nintendo. Elle a discrètement posé les bases de l'écosystème moderne de la firme.</p>
            <div class="learn-more">En savoir plus</div>
        </div>
        
        <div class="grid-item service-3d-cell">
            <ThreeScene model="console" />
        </div>
        
        <div class="grid-item service-cell-2">
            <h3>Miiverse</h3>
            <p>La première tentative de Nintendo de créer un réseau social dédié. Les joueurs pouvaient partager des dessins, des captures d'écran et des astuces directement depuis leur console, favorisant une communauté bienveillante.</p>
            <div class="learn-more">En savoir plus</div>
        </div>

        <!-- GAMES / LEGACY -->
        <div id="legacy" class="grid-item success-banner">
            <h3>Titres de Légende</h3>
        </div>
        
        <div class="grid-item history-cell">
            <h3>Zelda: Breath of the Wild ↗</h3>
            <p>Sorti simultanément comme le chant du cygne de la Wii U et titre de lancement de la Switch, il est devenu l'un des plus grands jeux de tous les temps.</p>
        </div>
        <div class="grid-item history-cell">
            <h3>Splatoon ↗</h3>
            <p>Une toute nouvelle licence qui a révolutionné les jeux de tir multijoueurs. La carte affichée sur le GamePad était cruciale pour son gameplay novateur basé sur la peinture.</p>
        </div>
        <div class="grid-item history-cell">
            <h3>Super Mario 3D World ↗</h3>
            <p>Une masterclass en conception de niveaux qui a donné vie au jeu Mario 3D à 4 joueurs, prouvant que la Wii U pouvait offrir un plaisir multijoueur local inégalé.</p>
        </div>

        <!-- CONTACTS STRIP -->
        <div class="grid-item nowadays-title" style="background:#000; color:#fff;">
            <h3>Dites-nous tout</h3>
        </div>

        <!-- CONTACT & FORM -->
        <div class="grid-item contact-left">
            <h3>Nous savons</h3>
            <p>Les meilleurs souvenirs surviennent de manière inattendue. C'est pourquoi nous archivons la Wii U. Partagez avec nous votre moment GamePad préféré.</p>
            
            <div style="width: 200px; height: 200px; border-radius: 50%; background: #0094C8; margin-top:2rem; display:flex; align-items:center; justify-content:center; color:white; font-size:3rem; border: var(--grid-border);">*</div>
        </div>
        
        <div class="grid-item contact-form-side">
            <h3>Parlons-en</h3>
            <div style="display:flex; gap:1rem; margin-top:1rem;">
                <div style="flex:1;">
                    <label>Nom</label>
                    <input type="text" class="brutal-input" placeholder="Miyamoto">
                </div>
                <div style="flex:1;">
                    <label>E-mail</label>
                    <input type="text" class="brutal-input" placeholder="mario@nintendo.com">
                </div>
            </div>
            <div>
                <label>Sujet</label>
                <textarea class="brutal-input" rows="4"></textarea>
            </div>
            <button class="brutal-btn">ENVOYER ↗</button>
            
            <div style="margin-top:2rem;">
                <h3>Suivez-nous</h3>
                <div style="display:flex; gap:1rem; font-size:2rem; margin-top:1rem;">
                    <i class="fab fa-twitter"></i>
                    <i class="fab fa-facebook"></i>
                    <i class="fab fa-instagram"></i>
                    <i class="fab fa-reddit"></i>
                </div>
            </div>
        </div>

        <!-- FOOTER -->
        <div class="grid-item head-logo" style="border-right:var(--grid-border); border-bottom:none;">
            <h2>wii u</h2>
        </div>
        <div class="grid-item" style="grid-column: span 3; border-right:var(--grid-border); border-bottom:none; display:flex; flex-direction:column; gap:0.5rem; text-transform:uppercase;">
            <div style="border-bottom: var(--grid-border); padding-bottom: 0.5rem;"><strong>à propos ↗</strong></div>
            <div>notre histoire</div>
            <div>équipe</div>
            <div>jeux</div>
        </div>
        <div class="grid-item" style="grid-column: span 3; border-right:var(--grid-border); border-bottom:none; display:flex; flex-direction:column; gap:0.5rem; text-transform:uppercase;">
            <div style="border-bottom: var(--grid-border); padding-bottom: 0.5rem;"><strong>innovations ↗</strong></div>
            <div>gamepad</div>
            <div>miiverse</div>
            <div>off-tv play</div>
        </div>
        <div class="grid-item" style="grid-column: span 3; border-bottom:none; display:flex; flex-direction:column; gap:0.5rem;">
            <div style="border-bottom: var(--grid-border); padding-bottom: 0.5rem; text-transform:uppercase;"><strong>contacts ↗</strong></div>
            <div>info@wiiuarchive.com</div>
            <div>pr@wiiuarchive.com</div>
            <div>+1 800-255-3700</div>
        </div>

        <div class="copyright">
            Copyright © 2026 Wii U Archive. Tous droits réservés. <strong>Politique de confidentialité</strong> et <strong>Conditions d'utilisation</strong>
        </div>
    </div>
    `,

    components: {
        ThreeScene
    },

    setup() {
        const scrollTo = (id) => {
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        };

        return {
            scrollTo
        };
    }
};

// Initialiser l'application Vue
createApp(App).mount('#app');
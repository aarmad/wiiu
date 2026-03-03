/* ===================================================
   WII U ARCHIVE — APPLICATION VUE
   =================================================== */
const { createApp, onMounted, ref } = Vue;

/* ──── Données de la timeline ─── */
const TIMELINE = [
    { date: "Juin 2011", title: "Présentation à l'E3", desc: "La Wii U est officiellement dévoilée lors de l'E3 avec une démonstration du GamePad à écran tactile. La réaction est mitigée." },
    { date: "Nov 2012", title: "Sortie mondiale", desc: "Sortie en Amérique du Nord le 18 novembre, puis au Japon et en Europe. Deux modèles disponibles : Basic (8 Go) et Deluxe (32 Go)." },
    { date: "Déc 2012", title: "Lancement de Miiverse", desc: "Le réseau social Miiverse est lancé, permettant aux joueurs de partager dessins et messages. Une innovation sans précédent." },
    { date: "Nov 2013", title: "Super Mario 3D World", desc: "Considéré comme l'un des meilleurs jeux de la plateforme, il démontre le potentiel du multijoueur local sur Wii U." },
    { date: "Mai 2014", title: "Mario Kart 8", desc: "Devient le titre le plus vendu de la console avec 8+ millions d'exemplaires. Ses graphismes HD et sa jouabilité en font un succès." },
    { date: "Mai 2015", title: "Splatoon", desc: "Nouvelle franchise Nintendo qui connaît un succès immédiat. Un shooter à l'encre total­lement novateur." },
    { date: "Mars 2017", title: "Zelda: Breath of the Wild", desc: "Le jeu marque la fin de la Wii U. Il reçoit des critiques dithyrambiques et est considéré comme l'un des meilleurs jeux de tous les temps." },
    { date: "Jan 2017", title: "Annonce de la Nintendo Switch", desc: "Nintendo annonce la Switch, qui reprend les concepts de la Wii U en les améliorant considérablement." },
    { date: "Jan 2019", title: "Fin du support en ligne", desc: "Nintendo met fin au support en ligne, marquant la fin définitive du cycle de vie de la console." },
];

/* ──── Données des jeux ─── */
const GAMES = [
    { title: "The Legend of Zelda: Breath of the Wild", tag: "Action / Aventure", desc: "Chef-d'œuvre sorti en même temps sur Wii U et Switch, il a redéfini l'open world.", num: "01", featured: true },
    { title: "Splatoon", tag: "Shooter", desc: "Révolution du genre TPS avec sa galerie de peinture multijoueur.", num: "02" },
    { title: "Mario Kart 8", tag: "Course", desc: "8 millions d'exemplaires vendus, toujours considéré comme le meilleur épisode.", num: "03" },
    { title: "Super Mario 3D World", tag: "Platformer", desc: "Perle du platformer coopératif, portée avec succès sur Switch.", num: "04" },
    { title: "Bayonetta 2", tag: "Action", desc: "Exclusivité Wii U sauvée par Nintendo, accueillie comme un chef-d'œuvre.", num: "05" },
];

/* ──── App principale ─── */
const App = {
    components: { ThreeScene },

    template: `
<!-- ═══ NAVBAR ═══ -->
<nav class="nav">
    <div class="nav-logo">Wii<span>U.</span></div>
    <ul class="nav-links">
        <li><a href="#histoire">Histoire</a></li>
        <li><a href="#innovations">Innovations</a></li>
        <li><a href="#timeline">Chronologie</a></li>
        <li><a href="#jeux">Jeux</a></li>
    </ul>
    <a href="#contact" class="nav-cta">Nous contacter</a>
</nav>

<!-- ═══ HERO ═══ -->
<section class="hero" id="accueil">
    <div class="hero-left">
        <div class="hero-eyebrow">
            <span class="hero-eyebrow-dot"></span>
            Archive interactive &mdash; 2011–2019
        </div>
        <div class="hero-title display display-xl">
            <div>LA CONSOLE</div>
            <div class="accent-word">PERDUE</div>
            <div>DE NINTENDO.</div>
        </div>
        <p class="body-md hero-subtitle">
            Découvrez l'histoire fascinante de la Wii U, la console 8e génération de Nintendo. 
            Mal comprise à sa sortie, elle a pourtant révolutionné le jeu vidéo et donné naissance à la Switch.
        </p>
        <div class="hero-actions">
            <button class="btn-primary" onclick="document.getElementById('timeline').scrollIntoView({behavior:'smooth'})">
                Explorer l'histoire ↗
            </button>
            <button class="btn-ghost" onclick="document.getElementById('innovations').scrollIntoView({behavior:'smooth'})">
                <i class="fas fa-gamepad"></i> Innovations
            </button>
        </div>
    </div>

    <div class="hero-canvas-wrapper">
        <ThreeScene model="gltf" />
    </div>

    <div class="hero-stats">
        <div class="stat-card">
            <div class="stat-number">13<span>M</span></div>
            <div class="stat-label">Consoles vendues</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">208<span>+</span></div>
            <div class="stat-label">Jeux au catalogue</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">8<span>ans</span></div>
            <div class="stat-label">Avant la Switch</div>
        </div>
    </div>
</section>

<!-- ═══ TICKER ═══ -->
<div class="ticker">
    <div class="ticker-inner">
        <span class="ticker-item">GamePad</span>
        <span class="ticker-sep">✦</span>
        <span class="ticker-item">Miiverse</span>
        <span class="ticker-sep">✦</span>
        <span class="ticker-item">Off-TV Play</span>
        <span class="ticker-sep">✦</span>
        <span class="ticker-item">HD Nintendo</span>
        <span class="ticker-sep">✦</span>
        <span class="ticker-item">Asymétrique</span>
        <span class="ticker-sep">✦</span>
        <span class="ticker-item">GamePad</span>
        <span class="ticker-sep">✦</span>
        <span class="ticker-item">Miiverse</span>
        <span class="ticker-sep">✦</span>
        <span class="ticker-item">Off-TV Play</span>
        <span class="ticker-sep">✦</span>
        <span class="ticker-item">HD Nintendo</span>
        <span class="ticker-sep">✦</span>
        <span class="ticker-item">Asymétrique</span>
        <span class="ticker-sep">✦</span>
    </div>
</div>

<!-- ═══ HISTOIRE ═══ -->
<section class="info-section" id="histoire">
    <div class="container">
        <div class="info-grid fade-up">
            <div class="info-text">
                <div class="tag">Contexte</div>
                <h2 class="display display-lg">
                    L'ère<br><span class="accent-word">Wii U.</span>
                </h2>
                <p class="body-md">
                    En 2012, forte du succès phénoménal de la Wii (101 millions d'unités), Nintendo a lancé sa successeure : la Wii U. 
                    Première console HD de la firme, elle embarquait un GamePad révolutionnaire équipé d'un écran tactile de 6,2 pouces.
                </p>
                <p class="body-md">
                    Malgré des idées brillantes, la communication autour de la console prêta à confusion : beaucoup pensaient le GamePad n'être qu'un accessoire pour la Wii.
                </p>
                <ul class="feature-list">
                    <li>Première console Nintendo avec affichage 1080p</li>
                    <li>Rétrocompatibilité totale avec la Wii et ses accessoires</li>
                    <li>Réseau social intégré : Miiverse</li>
                    <li>Mode Off-TV Play : jouer sans téléviseur</li>
                </ul>
            </div>
            <div class="mini-canvas-wrapper" style="aspect-ratio: 4/3;">
                <ThreeScene model="console" />
                <div class="canvas-hint">🖱 Glisser pour explorer</div>
            </div>
        </div>
    </div>
</section>

<!-- ═══ INNOVATIONS ═══ -->
<section class="info-section" id="innovations" style="background: var(--surface);">
    <div class="container">
        <div class="info-grid reverse fade-up">
            <div class="mini-canvas-wrapper" style="aspect-ratio: 1;">
                <ThreeScene model="gltf" />
                <div class="canvas-hint">🖱 Glisser pour explorer</div>
            </div>
            <div class="info-text">
                <div class="tag lime">Innovation</div>
                <h2 class="display display-lg">
                    Le<br><span class="accent-word">GamePad.</span>
                </h2>
                <p class="body-md">
                    Le GamePad est la pièce maîtresse de la Wii U. Avec son écran tactile de 6,2 pouces, sa caméra, son micro et son NFC, 
                    il offrait une fenêtre supplémentaire sur le monde du jeu.
                </p>
                <p class="body-md">
                    Une idée révolutionnaire qui a inspiré directement les Joy-Cons de la Nintendo Switch.
                </p>
                <ul class="feature-list">
                    <li>Écran tactile résistif de 6,2 pouces</li>
                    <li>Gyroscope 6 axes & accéléromètre</li>
                    <li>Caméra frontale, micro et haut-parleurs intégrés</li>
                    <li>Technologie NFC pour les Amiibo</li>
                </ul>
            </div>
        </div>
    </div>
</section>

<!-- ═══ TIMELINE ═══ -->
<section class="timeline-section" id="timeline">
    <div class="container">
        <div class="section-header fade-up">
            <div class="tag">Chronologie</div>
            <h2 class="display display-lg">Moments<br><span class="accent-word">clés.</span></h2>
        </div>

        <div class="timeline-outer">
            <div class="timeline-line"></div>
            <div class="tl-items">
                <div class="tl-item" v-for="(ev, i) in events" :key="i" :class="{ visible: visibleItems.includes(i) }" :data-index="i">
                    <div class="tl-content">
                        <div class="tl-date">{{ ev.date }}</div>
                        <h4>{{ ev.title }}</h4>
                        <p>{{ ev.desc }}</p>
                    </div>
                    <div class="tl-dot"><div class="tl-dot-inner"></div></div>
                    <div class="tl-empty"></div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ═══ JEUX ═══ -->
<section class="games-section" id="jeux">
    <div class="container">
        <div class="section-header fade-up">
            <div class="tag red">Catalogue</div>
            <h2 class="display display-lg">Jeux<br><span class="red-word">légendaires.</span></h2>
        </div>

        <div class="games-bento">
            <div v-for="(game, i) in games" :key="i" class="game-card fade-up" :class="{ featured: game.featured }">
                <div class="game-num">{{ game.num }}</div>
                <div class="game-tag">{{ game.tag }}</div>
                <h3>{{ game.title }}</h3>
                <p>{{ game.desc }}</p>
                <div class="arrow-link">En savoir plus ↗</div>
            </div>
        </div>
    </div>
</section>

<!-- ═══ GRAND TEXTE ═══ -->
<div class="big-marquee">
    <div class="display display-xl">
        CONCEPTION<br>
        <span class="accent-word">INGÉNIOSITÉ</span><br>
        HÉRITAGE
    </div>
</div>

<!-- ═══ CONTACT ═══ -->
<section class="info-section" id="contact" style="background: var(--surface);">
    <div class="container">
        <div class="info-grid fade-up">
            <div class="info-text">
                <div class="tag lime">Contact</div>
                <h2 class="display display-lg">Parlons-<br>en<span class="accent-word">.</span></h2>
                <p class="body-md">Les meilleurs souvenirs viennent de façon inattendue. Partagez votre moment GamePad préféré avec nous.</p>
                <div class="mini-canvas-wrapper" style="aspect-ratio:1; margin-top:2rem; max-width:260px;">
                    <ThreeScene model="disc" />
                    <div class="canvas-hint">Le Wii U Optical Disc</div>
                </div>
            </div>
            <div style="display:flex;flex-direction:column;gap:1.2rem;">
                <div style="display:flex;gap:1rem;">
                    <div style="flex:1;display:flex;flex-direction:column;gap:0.4rem;">
                        <label style="font-size:0.8rem;color:var(--muted);text-transform:uppercase;letter-spacing:0.06em;">Nom</label>
                        <input type="text" placeholder="Miyamoto" style="background:var(--surface2);border:1px solid var(--border);color:var(--white);padding:0.8rem 1rem;border-radius:10px;font-family:var(--font-body);font-size:0.9rem;outline:none;">
                    </div>
                    <div style="flex:1;display:flex;flex-direction:column;gap:0.4rem;">
                        <label style="font-size:0.8rem;color:var(--muted);text-transform:uppercase;letter-spacing:0.06em;">Email</label>
                        <input type="email" placeholder="mario@nintendo.com" style="background:var(--surface2);border:1px solid var(--border);color:var(--white);padding:0.8rem 1rem;border-radius:10px;font-family:var(--font-body);font-size:0.9rem;outline:none;">
                    </div>
                </div>
                <div style="display:flex;flex-direction:column;gap:0.4rem;">
                    <label style="font-size:0.8rem;color:var(--muted);text-transform:uppercase;letter-spacing:0.06em;">Message</label>
                    <textarea rows="5" placeholder="Votre souvenir de la Wii U..." style="background:var(--surface2);border:1px solid var(--border);color:var(--white);padding:0.8rem 1rem;border-radius:10px;font-family:var(--font-body);font-size:0.9rem;outline:none;resize:vertical;"></textarea>
                </div>
                <button class="btn-primary" style="align-self:flex-start;">Envoyer ↗</button>
            </div>
        </div>
    </div>
</section>

<!-- ═══ FOOTER ═══ -->
<footer class="footer">
    <div class="container">
        <div class="footer-top">
            <div class="footer-brand">
                <div class="nav-logo" style="font-size:2rem;">Wii<span style="color:var(--accent)">U.</span></div>
                <p>Archive interactive dédiée à la Nintendo Wii U, la console qui était en avance sur son époque. Réalisée avec Three.js & Vue.js.</p>
            </div>
            <div class="footer-col">
                <h5>Navigation</h5>
                <ul>
                    <li><a href="#histoire">Notre histoire</a></li>
                    <li><a href="#innovations">Innovations</a></li>
                    <li><a href="#timeline">Chronologie</a></li>
                    <li><a href="#jeux">Jeux</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h5>Innovations</h5>
                <ul>
                    <li><a href="#">GamePad</a></li>
                    <li><a href="#">Miiverse</a></li>
                    <li><a href="#">Off-TV Play</a></li>
                    <li><a href="#">Affichage HD</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h5>Contact</h5>
                <ul>
                    <li><a href="#">info@wiiuarchive.fr</a></li>
                    <li><a href="#">Twitter / X</a></li>
                    <li><a href="#">Instagram</a></li>
                    <li><a href="#">GitHub</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <span>© 2026 Wii U Archive. Tous droits réservés.</span>
            <span>Fait avec ♥ &amp; Three.js</span>
        </div>
    </div>
</footer>
    `,

    setup() {
        const visibleItems = ref([]);
        const events = TIMELINE;
        const games = GAMES;

        onMounted(() => {
            /* IntersectionObserver pour la timeline */
            const obs = new IntersectionObserver((entries) => {
                entries.forEach(e => {
                    const idx = parseInt(e.target.dataset.index);
                    if (e.isIntersecting && !visibleItems.value.includes(idx)) {
                        visibleItems.value.push(idx);
                    }
                });
            }, { rootMargin: '-15% 0px -15% 0px' });

            setTimeout(() => {
                document.querySelectorAll('.tl-item').forEach(el => obs.observe(el));
            }, 300);

            /* fade-up générique */
            const fuObs = new IntersectionObserver((entries) => {
                entries.forEach(e => {
                    if (e.isIntersecting) { e.target.classList.add('visible'); fuObs.unobserve(e.target); }
                });
            }, { threshold: 0.12 });

            setTimeout(() => {
                document.querySelectorAll('.fade-up').forEach(el => fuObs.observe(el));
            }, 100);
        });

        return { visibleItems, events, games };
    }
};

createApp(App).mount('#app');
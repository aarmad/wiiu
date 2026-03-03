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
            <h2>welcome to nintendo's lost console archive</h2>
        </div>

        <!-- NAVIGATION ROW -->
        <div class="grid-item nav-cell" @click="scrollTo('about')">
            <span>about it</span> <span class="nav-arrow">↗</span>
        </div>
        <div class="grid-item nav-cell" @click="scrollTo('innovations')">
            <span>innovations</span> <span class="nav-arrow">↗</span>
        </div>
        <div class="grid-item nav-cell" @click="scrollTo('legacy')">
            <span>legacy</span> <span class="nav-arrow">↗</span>
        </div>

        <!-- ABOUT SECTION -->
        <div id="about" class="grid-item history-cell">
            <h3>Our history</h3>
            <p>Back then in 2012, Nintendo introduced the Wii U, a successor to the incredibly successful Wii. It featured a unique GamePad with a built-in touchscreen, aiming to bridge the gap between casual and hardcore gamers.</p>
            <p>Despite its innovative concepts, it struggled to find a massive audience, selling only 13.56 million units worldwide. Yet, it paved the way for the hybrid future of gaming.</p>
        </div>
        
        <div class="grid-item center-3d-cell">
            <ThreeScene />
        </div>
        
        <div class="grid-item history-cell vision-cell">
            <p>The vision was to create a dual-screen experience, allowing asynchronous multiplayer and Off-TV Play. This idea eventually evolved into the massively successful Nintendo Switch.</p>
        </div>

        <!-- NOWADAYS ROW -->
        <div class="grid-item nowadays-title">
            <h3>Nowadays</h3>
        </div>
        <div class="grid-item nowadays-content-1">
            <p>After being discontinued in 2017, the Wii U has become a cult classic. Many of its best games have been ported to the Nintendo Switch, proving its software library was top-tier.</p>
        </div>
        <div class="grid-item nowadays-content-2">
            <p>The GamePad remains a unique piece of hardware that offered possibilities no other console could replicate, such as the asymmetric gameplay in Nintendoland.</p>
        </div>
        <div class="grid-item nowadays-content-3">
            <p style="font-weight: bold; font-size: 1.2rem; text-align:right;">“We have a special place in our hearts for the Wii U. It was a beautiful transition.”</p>
        </div>

        <!-- BANNER ROW -->
        <div class="grid-item banner-row">
            <div class="banner-text">innovations innovations innovations innovations innovations</div>
        </div>

        <!-- INNOVATIONS SECTION -->
        <div id="innovations" class="grid-item service-cell">
            <h3>The GamePad</h3>
            <p>A controller with a 6.2-inch touchscreen, camera, microphone, and NFC support. It allowed players to experience a second window into the game world.</p>
            <div class="learn-more">Learn More</div>
        </div>
        
        <div class="grid-item service-3d-cell">
            <ThreeScene />
        </div>
        
        <div class="grid-item service-cell-2">
            <h3>Miiverse</h3>
            <p>Nintendo's first attempt at a dedicated social network. Players could share drawings, screenshots, and tips directly from their console, fostering a wholesome community.</p>
            <div class="learn-more">Learn More</div>
        </div>

        <!-- GAMES / LEGACY -->
        <div id="legacy" class="grid-item success-banner">
            <h3>Legacy Cases</h3>
        </div>
        
        <div class="grid-item history-cell">
            <h3>Zelda: Breath of the Wild ↗</h3>
            <p>Released simultaneously as a swan song for the Wii U and a launch title for the Switch, it became one of the greatest games ever made.</p>
        </div>
        <div class="grid-item history-cell">
            <h3>Splatoon ↗</h3>
            <p>A completely new IP that revolutionized multiplayer shooters. The GamePad map functionality was crucial to its innovative paint-based gameplay.</p>
        </div>
        <div class="grid-item history-cell">
            <h3>Super Mario 3D World ↗</h3>
            <p>A masterclass in level design that brought 4-player 3D Mario to life, proving the Wii U could deliver unparalleled local multiplayer fun.</p>
        </div>

        <!-- CONTACTS STRIP -->
        <div class="grid-item nowadays-title" style="background:#000; color:#fff;">
            <h3>tell us</h3>
        </div>

        <!-- CONTACT & FORM -->
        <div class="grid-item contact-left">
            <h3>We know</h3>
            <p>The best memories come unexpectedly. That's why we archive the Wii U. Share your favorite GamePad moment with us.</p>
            
            <div style="width: 200px; height: 200px; border-radius: 50%; background: #0094C8; margin-top:2rem; display:flex; align-items:center; justify-content:center; color:white; font-size:3rem; border: var(--grid-border);">*</div>
        </div>
        
        <div class="grid-item contact-form-side">
            <h3>Let's Talk</h3>
            <div style="display:flex; gap:1rem; margin-top:1rem;">
                <div style="flex:1;">
                    <label>Name</label>
                    <input type="text" class="brutal-input" placeholder="Miyamoto">
                </div>
                <div style="flex:1;">
                    <label>Email</label>
                    <input type="text" class="brutal-input" placeholder="mario@nintendo.com">
                </div>
            </div>
            <div>
                <label>Subject</label>
                <textarea class="brutal-input" rows="4"></textarea>
            </div>
            <button class="brutal-btn">SUBMIT ↗</button>
            
            <div style="margin-top:2rem;">
                <h3>Follow us</h3>
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
            <div style="border-bottom: var(--grid-border); padding-bottom: 0.5rem;"><strong>about it ↗</strong></div>
            <div>our history</div>
            <div>team</div>
            <div>cases</div>
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
            Copyright © 2026 Wii U Archive. All rights reserved. <strong>Privacy Policy</strong> and <strong>Conditions of Use</strong>
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
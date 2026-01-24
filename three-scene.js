// Composant Three.js pour la scène 3D de la Wii U - Version avec objet centré
const ThreeScene = {
    template: '<div class="three-scene-container" ref="sceneContainer"></div>',
    
    mounted() {
        this.initThreeJS();
        this.animate();
        
        // Redimensionner la scène quand la fenêtre change de taille
        window.addEventListener('resize', this.onWindowResize);
    },
    
    beforeUnmount() {
        // Nettoyer lors de la destruction du composant
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        
        window.removeEventListener('resize', this.onWindowResize);
        
        if (this.renderer) {
            this.renderer.dispose();
        }
    },
    
    methods: {
        initThreeJS() {
            // Créer la scène
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0x001122);
            
            // Créer la caméra
            const container = this.$refs.sceneContainer;
            const width = container.clientWidth;
            const height = container.clientHeight;
            
            this.camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
            this.camera.position.set(0, 2, 8);
            
            // Créer le renderer
            this.renderer = new THREE.WebGLRenderer({ 
                antialias: true, 
                alpha: true,
                powerPreference: "high-performance"
            });
            this.renderer.setSize(width, height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            container.appendChild(this.renderer.domElement);
            
            // Ajouter des lumières
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            this.scene.add(ambientLight);
            
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(3, 10, 5);
            directionalLight.castShadow = true;
            directionalLight.shadow.mapSize.width = 1024;
            directionalLight.shadow.mapSize.height = 1024;
            this.scene.add(directionalLight);
            
            // Ajouter une lumière spécifique pour mettre en valeur la console
            const spotlight = new THREE.SpotLight(0x0094C8, 0.6);
            spotlight.position.set(0, 8, 2);
            spotlight.angle = Math.PI / 8;
            spotlight.penumbra = 0.2;
            spotlight.decay = 1.5;
            spotlight.distance = 30;
            spotlight.castShadow = true;
            this.scene.add(spotlight);
            
            // Lumière d'accentuation supplémentaire
            const backLight = new THREE.PointLight(0x4db8e0, 0.3);
            backLight.position.set(0, 3, -5);
            this.scene.add(backLight);
            
            // Créer le GamePad stylisé de la Wii U
            this.createGamePad();
            
            // Ajouter des particules pour l'effet de fond
            this.createParticles();
            
            // Ajouter un sol pour les ombres
            this.createGround();
        },
        
        createGamePad() {
            // Groupe principal pour le GamePad
            this.gamePad = new THREE.Group();
            
            // Corps principal du GamePad (une boîte arrondie)
            const bodyGeometry = new THREE.BoxGeometry(4.5, 0.4, 2.7);
            const bodyMaterial = new THREE.MeshPhongMaterial({ 
                color: 0x222222,
                shininess: 50,
                specular: 0x222222
            });
            const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
            body.castShadow = true;
            body.receiveShadow = true;
            this.gamePad.add(body);
            
            // Écran tactile du GamePad
            const screenGeometry = new THREE.BoxGeometry(3.8, 0.05, 2.0);
            const screenMaterial = new THREE.MeshPhongMaterial({ 
                color: 0x0094C8,
                emissive: 0x004466,
                emissiveIntensity: 0.4,
                shininess: 150,
                specular: 0x222222
            });
            const screen = new THREE.Mesh(screenGeometry, screenMaterial);
            screen.position.y = 0.23;
            screen.castShadow = true;
            this.gamePad.add(screen);
            
            // Effet d'écran allumé
            const screenGlowGeometry = new THREE.BoxGeometry(3.9, 0.01, 2.1);
            const screenGlowMaterial = new THREE.MeshBasicMaterial({ 
                color: 0x0094C8,
                transparent: true,
                opacity: 0.3
            });
            const screenGlow = new THREE.Mesh(screenGlowGeometry, screenGlowMaterial);
            screenGlow.position.y = 0.26;
            this.gamePad.add(screenGlow);
            
            // Joysticks
            this.createJoystick(-1.4, 0.23, -0.7, 0x333333);
            this.createJoystick(1.4, 0.23, -0.7, 0x333333);
            
            // Boutons ABXY
            this.createButton(-0.4, 0.23, 0.5, 0.25, 0xe60012); // A (rouge)
            this.createButton(0.4, 0.23, 0.5, 0.25, 0x00a300);  // B (vert)
            this.createButton(-0.7, 0.23, 0.8, 0.25, 0xffff00); // X (jaune)
            this.createButton(0.7, 0.23, 0.8, 0.25, 0x0094C8);  // Y (bleu Wii U)
            
            // Boutons Start/Select
            this.createButton(-0.3, 0.23, -1.1, 0.18, 0x666666);
            this.createButton(0.3, 0.23, -1.1, 0.18, 0x666666);
            
            // D-Pad
            this.createDPad(-1.4, 0.23, 0.5);
            
            // Boutons L/R
            this.createBumper(-2.1, 0.5, -0.2, 0x222222); // L
            this.createBumper(2.1, 0.5, -0.2, 0x222222);  // R
            
            // Boutons ZL/ZR
            this.createTrigger(-2.0, 0.7, -0.2, 0x222222); // ZL
            this.createTrigger(2.0, 0.7, -0.2, 0x222222);  // ZR
            
            // Logo Nintendo sur l'avant
            this.createLogo(0, 0.23, -1.4);
            
            // Positionner et ajouter le GamePad à la scène
            // Centrer le GamePad en ajustant sa position
            this.gamePad.position.y = 1.5; // Un peu plus haut pour être mieux centré verticalement
            this.scene.add(this.gamePad);
        },
        
        createJoystick(x, y, z, color) {
            const stickGroup = new THREE.Group();
            
            const stickGeometry = new THREE.CylinderGeometry(0.18, 0.18, 0.3, 16);
            const stickMaterial = new THREE.MeshPhongMaterial({ 
                color: color,
                shininess: 30
            });
            const stick = new THREE.Mesh(stickGeometry, stickMaterial);
            stick.position.set(0, 0.15, 0);
            stick.castShadow = true;
            
            const baseGeometry = new THREE.CylinderGeometry(0.32, 0.32, 0.08, 16);
            const baseMaterial = new THREE.MeshPhongMaterial({ 
                color: 0x111111,
                shininess: 20
            });
            const base = new THREE.Mesh(baseGeometry, baseMaterial);
            base.castShadow = true;
            
            stickGroup.add(stick);
            stickGroup.add(base);
            stickGroup.position.set(x, y, z);
            
            this.gamePad.add(stickGroup);
        },
        
        createButton(x, y, z, size, color) {
            const geometry = new THREE.CylinderGeometry(size, size, 0.15, 16);
            const material = new THREE.MeshPhongMaterial({ 
                color: color,
                shininess: 80
            });
            const button = new THREE.Mesh(geometry, material);
            button.position.set(x, y + 0.075, z);
            button.castShadow = true;
            this.gamePad.add(button);
        },
        
        createDPad(x, y, z) {
            const dPadGroup = new THREE.Group();
            
            // Centre du D-Pad
            const centerGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.15, 16);
            const centerMaterial = new THREE.MeshPhongMaterial({ 
                color: 0x222222,
                shininess: 30
            });
            const center = new THREE.Mesh(centerGeometry, centerMaterial);
            center.position.set(0, 0.075, 0);
            center.castShadow = true;
            dPadGroup.add(center);
            
            // Directions du D-Pad (haut, bas, gauche, droite)
            const directions = [
                { x: 0, z: 0.45, rotation: 0, label: 'haut' },
                { x: 0, z: -0.45, rotation: 0, label: 'bas' },
                { x: -0.45, z: 0, rotation: Math.PI / 2, label: 'gauche' },
                { x: 0.45, z: 0, rotation: Math.PI / 2, label: 'droite' }
            ];
            
            directions.forEach(dir => {
                const directionGeometry = new THREE.BoxGeometry(0.5, 0.15, 0.25);
                const directionMaterial = new THREE.MeshPhongMaterial({ 
                    color: 0x222222,
                    shininess: 30
                });
                const direction = new THREE.Mesh(directionGeometry, directionMaterial);
                direction.position.set(dir.x, 0.075, dir.z);
                direction.rotation.y = dir.rotation;
                direction.castShadow = true;
                dPadGroup.add(direction);
            });
            
            dPadGroup.position.set(x, y, z);
            this.gamePad.add(dPadGroup);
        },
        
        createBumper(x, y, z, color) {
            const geometry = new THREE.BoxGeometry(0.7, 0.15, 0.35);
            const material = new THREE.MeshPhongMaterial({ 
                color: color,
                shininess: 40
            });
            const bumper = new THREE.Mesh(geometry, material);
            bumper.position.set(x, y, z);
            bumper.castShadow = true;
            this.gamePad.add(bumper);
        },
        
        createTrigger(x, y, z, color) {
            const geometry = new THREE.BoxGeometry(0.6, 0.25, 0.3);
            const material = new THREE.MeshPhongMaterial({ 
                color: color,
                shininess: 40
            });
            const trigger = new THREE.Mesh(geometry, material);
            trigger.position.set(x, y, z);
            trigger.castShadow = true;
            this.gamePad.add(trigger);
        },
        
        createLogo(x, y, z) {
            const logoGroup = new THREE.Group();
            
            // Fond du logo
            const backgroundGeometry = new THREE.BoxGeometry(1.2, 0.3, 0.05);
            const backgroundMaterial = new THREE.MeshPhongMaterial({ 
                color: 0x111111,
                shininess: 30
            });
            const background = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
            background.position.set(0, 0, 0);
            logoGroup.add(background);
            
            // Texte Nintendo (simplifié avec des formes)
            const nintendoColor = 0xe60012; // Rouge Nintendo
            
            // Lettre N (simplifiée)
            const nGeometry = new THREE.BoxGeometry(0.15, 0.2, 0.06);
            const nMaterial = new THREE.MeshPhongMaterial({ color: nintendoColor });
            const n1 = new THREE.Mesh(nGeometry, nMaterial);
            n1.position.set(-0.4, 0, 0.03);
            logoGroup.add(n1);
            
            const n2 = new THREE.Mesh(nGeometry, nMaterial);
            n2.position.set(-0.2, 0, 0.03);
            logoGroup.add(n2);
            
            // Lettre i (simplifiée)
            const iGeometry = new THREE.BoxGeometry(0.1, 0.2, 0.06);
            const iMaterial = new THREE.MeshPhongMaterial({ color: nintendoColor });
            const i = new THREE.Mesh(iGeometry, iMaterial);
            i.position.set(0, 0, 0.03);
            logoGroup.add(i);
            
            // Point du i
            const dotGeometry = new THREE.SphereGeometry(0.04, 8, 8);
            const dotMaterial = new THREE.MeshPhongMaterial({ color: nintendoColor });
            const dot = new THREE.Mesh(dotGeometry, dotMaterial);
            dot.position.set(0, 0.14, 0.03);
            logoGroup.add(dot);
            
            // Lettre N (simplifiée) - deuxième partie
            const n3 = new THREE.Mesh(nGeometry, nMaterial);
            n3.position.set(0.2, 0, 0.03);
            logoGroup.add(n3);
            
            const n4 = new THREE.Mesh(nGeometry, nMaterial);
            n4.position.set(0.4, 0, 0.03);
            logoGroup.add(n4);
            
            logoGroup.position.set(x, y, z);
            this.gamePad.add(logoGroup);
        },
        
        createParticles() {
            const particleCount = 300;
            const particles = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);
            const sizes = new Float32Array(particleCount);
            
            for (let i = 0; i < particleCount * 3; i += 3) {
                // Positions aléatoires dans un espace derrière et autour du GamePad
                const radius = 5 + Math.random() * 8;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.random() * Math.PI;
                
                positions[i] = radius * Math.sin(phi) * Math.cos(theta);
                positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta) - 2;
                positions[i + 2] = radius * Math.cos(phi) - 5;
                
                // Couleurs bleues pour correspondre au thème
                colors[i] = 0; // R
                colors[i + 1] = 0.4 + Math.random() * 0.6; // G
                colors[i + 2] = 0.7 + Math.random() * 0.3; // B
                
                // Taille aléatoire
                sizes[i / 3] = Math.random() * 0.15 + 0.05;
            }
            
            particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
            
            const particleMaterial = new THREE.PointsMaterial({
                size: 0.1,
                vertexColors: true,
                transparent: true,
                opacity: 0.5,
                sizeAttenuation: true
            });
            
            this.particleSystem = new THREE.Points(particles, particleMaterial);
            this.scene.add(this.particleSystem);
        },
        
        createGround() {
            // Créer un sol discret pour les ombres
            const groundGeometry = new THREE.PlaneGeometry(20, 20);
            const groundMaterial = new THREE.ShadowMaterial({
                color: 0x000000,
                opacity: 0.2
            });
            const ground = new THREE.Mesh(groundGeometry, groundMaterial);
            ground.rotation.x = -Math.PI / 2;
            ground.position.y = -0.5;
            ground.receiveShadow = true;
            this.scene.add(ground);
        },
        
        animate() {
            this.animationFrameId = requestAnimationFrame(this.animate);
            
            // Faire tourner le GamePad
            if (this.gamePad) {
                // Rotation lente et régulière
                this.gamePad.rotation.y += 0.003;
                
                // Légère oscillation verticale
                this.gamePad.position.y = 1.5 + Math.sin(Date.now() * 0.001) * 0.1;
                
                // Légère inclinaison pour un effet plus naturel
                this.gamePad.rotation.x = Math.sin(Date.now() * 0.0007) * 0.05;
            }
            
            // Faire tourner les particules
            if (this.particleSystem) {
                this.particleSystem.rotation.y += 0.0008;
                this.particleSystem.rotation.x += 0.0003;
            }
            
            // Animation subtile de la caméra
            if (this.camera) {
                // Légère oscillation de la caméra pour un effet dynamique
                const time = Date.now() * 0.0005;
                this.camera.position.x = Math.sin(time) * 0.5;
                this.camera.position.z = 8 + Math.cos(time * 0.7) * 0.3;
                
                // La caméra regarde toujours le GamePad
                this.camera.lookAt(this.gamePad ? this.gamePad.position : this.scene.position);
            }
            
            // Rendu de la scène
            if (this.renderer && this.scene && this.camera) {
                this.renderer.render(this.scene, this.camera);
            }
        },
        
        onWindowResize() {
            const container = this.$refs.sceneContainer;
            if (!container || !this.camera || !this.renderer) return;
            
            const width = container.clientWidth;
            const height = container.clientHeight;
            
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
            
            // Ajuster la position de la caméra en fonction de l'aspect ratio
            // Pour garder l'objet bien centré
            if (width / height > 1.5) {
                // Écran large : zoomer un peu
                this.camera.position.z = 7;
            } else {
                // Écran étroit ou carré : reculer pour tout voir
                this.camera.position.z = 8;
            }
        }
    }
};
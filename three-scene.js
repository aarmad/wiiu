/* ===================================================
   WII U ARCHIVE — SCENE THREE.JS (GLTF + fallback)
   =================================================== */
const ThreeScene = {
    props: {
        model: { type: String, default: 'gltf' },
        canvasId: { type: String, default: '' },
        autoRotate: { type: Boolean, default: false }
    },
    template: `
    <div class="mini-canvas-wrapper" ref="wrapper">
        <canvas ref="canvas"></canvas>
        <div class="canvas-hint">🖱 Glisser pour explorer</div>
    </div>`,

    mounted() {
        this.init();
        this.animate();
        this._resizeObserver = new ResizeObserver(() => this.onResize());
        this._resizeObserver.observe(this.$refs.wrapper);
    },
    beforeUnmount() {
        if (this.animId) cancelAnimationFrame(this.animId);
        if (this._resizeObserver) this._resizeObserver.disconnect();
        if (this.renderer) this.renderer.dispose();
    },

    methods: {
        init() {
            const canvas = this.$refs.canvas;
            const wrap = this.$refs.wrapper;
            const W = wrap.clientWidth || 600;
            const H = wrap.clientHeight || 600;

            /* Scene */
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0x111111);

            /* Camera */
            this.camera = new THREE.PerspectiveCamera(40, W / H, 0.01, 1000);
            this.camera.position.set(0, 1, 5);

            /* Renderer */
            this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            this.renderer.setSize(W, H);
            this.renderer.outputEncoding = THREE.sRGBEncoding;
            this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
            this.renderer.toneMappingExposure = 1.2;
            this.renderer.shadowMap.enabled = true;

            /* Controls */
            if (THREE.OrbitControls) {
                this.controls = new THREE.OrbitControls(this.camera, canvas);
                this.controls.enableDamping = true;
                this.controls.dampingFactor = 0.07;
                this.controls.enableZoom = true;
                this.controls.autoRotate = true;
                this.controls.autoRotateSpeed = 1.2;
                this.controls.minDistance = 2;
                this.controls.maxDistance = 12;
                this.controls.target.set(0, 0.3, 0);
            }

            /* Lights */
            this.scene.add(new THREE.AmbientLight(0xffffff, 0.6));

            const key = new THREE.DirectionalLight(0xffffff, 1.4);
            key.position.set(3, 6, 4);
            key.castShadow = true;
            this.scene.add(key);

            const fill = new THREE.DirectionalLight(0x4488ff, 0.4);
            fill.position.set(-4, 2, -3);
            this.scene.add(fill);

            const rim = new THREE.DirectionalLight(0xc3f53c, 0.6);
            rim.position.set(0, 5, -6);
            this.scene.add(rim);

            /* Load model */
            if (this.model === 'gltf' && typeof THREE.GLTFLoader !== 'undefined') {
                this.loadGLTF();
            } else if (this.model === 'console') {
                this.buildConsole();
            } else if (this.model === 'disc') {
                this.buildDisc();
            } else {
                this.buildGamepad();
            }

            /* Ground shadow */
            const ground = new THREE.Mesh(
                new THREE.PlaneGeometry(30, 30),
                new THREE.ShadowMaterial({ opacity: 0.25 })
            );
            ground.rotation.x = -Math.PI / 2;
            ground.position.y = -1.8;
            ground.receiveShadow = true;
            this.scene.add(ground);
        },

        /* ─── GLTF loader ─── */
        loadGLTF() {
            const loader = new THREE.GLTFLoader();
            loader.load(
                'assets/wiiu/scene.gltf',
                (gltf) => {
                    const model = gltf.scene;

                    /* Centre et redimensionne */
                    const box = new THREE.Box3().setFromObject(model);
                    const center = box.getCenter(new THREE.Vector3());
                    const size = box.getSize(new THREE.Vector3());
                    const maxDim = Math.max(size.x, size.y, size.z);
                    const scale = 3.5 / maxDim;

                    model.position.sub(center.multiplyScalar(scale));
                    model.scale.setScalar(scale);

                    model.traverse(child => {
                        if (child.isMesh) {
                            child.castShadow = true;
                            child.receiveShadow = true;
                        }
                    });

                    this.mainObject = model;
                    this.scene.add(model);

                    /* Reculer la caméra en fonction de la taille */
                    const dist = (maxDim / 2) / Math.tan((Math.PI * 40) / 360) * 1.4;
                    this.camera.position.set(0, size.y * scale * 0.3, Math.min(dist, 8));
                    if (this.controls) this.controls.target.set(0, 0, 0);
                },
                null,
                (err) => {
                    console.warn('GLTF load error, falling back to gamepad geometry', err);
                    this.buildGamepad();
                }
            );
        },

        /* ─── Fallback: Gamepad ─── */
        buildGamepad() {
            const g = this.mainObject = new THREE.Group();

            const body = new THREE.Mesh(
                new THREE.BoxGeometry(4.5, 0.4, 2.7),
                new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.3, metalness: 0.3 })
            );
            body.castShadow = true;
            g.add(body);

            /* Grips */
            [-1.8, 1.8].forEach(x => {
                const grip = new THREE.Mesh(
                    new THREE.BoxGeometry(0.8, 0.5, 2.0),
                    new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.5 })
                );
                grip.position.set(x, -0.15, 0);
                g.add(grip);
            });

            /* Screen */
            const screen = new THREE.Mesh(
                new THREE.BoxGeometry(3.8, 0.05, 2.0),
                new THREE.MeshStandardMaterial({ color: 0x0094C8, emissive: 0x0094C8, emissiveIntensity: 0.3, roughness: 0.1 })
            );
            screen.position.y = 0.23;
            g.add(screen);

            /* Buttons */
            const bColors = [0xe60012, 0x00a300, 0xffcc00, 0x0094C8];
            const bPos = [[-0.4, 0.23, 0.5], [0.4, 0.23, 0.5], [-0.7, 0.23, 0.8], [0.7, 0.23, 0.8]];
            bPos.forEach(([x, y, z], i) => {
                const btn = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.2, 0.2, 0.12, 16),
                    new THREE.MeshStandardMaterial({ color: bColors[i], roughness: 0.2, metalness: 0.4 })
                );
                btn.position.set(x, y + 0.06, z);
                g.add(btn);
            });

            g.position.y = 0.5;
            this.scene.add(g);
        },

        /* ─── Fallback: Console ─── */
        buildConsole() {
            const g = this.mainObject = new THREE.Group();
            const body = new THREE.Mesh(
                new THREE.BoxGeometry(4, 1.2, 5.5),
                new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.2, metalness: 0.5 })
            );
            body.castShadow = true;
            g.add(body);
            g.position.y = 0.6;
            this.scene.add(g);
        },

        /* ─── Fallback: Disc ─── */
        buildDisc() {
            const g = this.mainObject = new THREE.Group();
            const disc = new THREE.Mesh(
                new THREE.CylinderGeometry(2, 2, 0.05, 64),
                new THREE.MeshStandardMaterial({ color: 0x0094C8, roughness: 0.05, metalness: 0.9 })
            );
            disc.castShadow = true;
            g.add(disc);
            g.position.y = 1;
            this.scene.add(g);
            this._spinDisc = true;
        },

        /* ─── Render loop ─── */
        animate() {
            this.animId = requestAnimationFrame(this.animate);

            if (this.controls) this.controls.update();

            if (this._spinDisc && this.mainObject) {
                this.mainObject.rotation.y += 0.015;
            }

            if (this.renderer && this.scene && this.camera) {
                this.renderer.render(this.scene, this.camera);
            }
        },

        onResize() {
            const wrap = this.$refs.wrapper;
            if (!wrap || !this.camera || !this.renderer) return;
            const W = wrap.clientWidth;
            const H = wrap.clientHeight;
            this.camera.aspect = W / H;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(W, H);
        }
    }
};
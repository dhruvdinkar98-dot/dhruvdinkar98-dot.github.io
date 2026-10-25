// Ninja Combat Academy - 3D Interactive WebGL Armory Forge
// Powered by Three.js & OrbitControls - 100% Procedural High-Fidelity 3D Models

class Shinobi3DArmory {
    constructor(containerId = "three-katana-viewport") {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.currentWeaponMesh = null;
        this.particleSystem = null;
        this.activeWeapon = "katana";
        this.activeSteel = "tamahagane";
        this.isFlourishing = false;
        this.autoRotate = true;

        this.steelProfiles = {
            tamahagane: {
                name: "Tamahagane Folded Steel",
                bladeColor: 0xd8dde6,
                roughness: 0.15,
                metalness: 0.95,
                emissive: 0x000000,
                particleColor: 0xe5a93c,
                tsubaColor: 0x222222,
                wrapColor: 0x111111
            },
            muramasa: {
                name: "Muramasa Cursed Crimson",
                bladeColor: 0xff1e40,
                roughness: 0.12,
                metalness: 0.98,
                emissive: 0x880015,
                particleColor: 0xff0033,
                tsubaColor: 0x3d0208,
                wrapColor: 0x550000
            },
            yami: {
                name: "Yami Shadow Obsidian",
                bladeColor: 0x1a1a24,
                roughness: 0.25,
                metalness: 0.92,
                emissive: 0x19082b,
                particleColor: 0x9d4edd,
                tsubaColor: 0x111118,
                wrapColor: 0x0a0a0f
            },
            raijin: {
                name: "Raijin Cyber Gold & Thunder",
                bladeColor: 0xffd700,
                roughness: 0.1,
                metalness: 0.99,
                emissive: 0x664400,
                particleColor: 0xffea00,
                tsubaColor: 0xb8860b,
                wrapColor: 0x241d05
            }
        };

        this.init();
    }

    init() {
        if (typeof THREE === "undefined") {
            console.warn("Three.js not loaded yet. Waiting...");
            setTimeout(() => this.init(), 100);
            return;
        }

        const width = this.container.clientWidth || 600;
        const height = this.container.clientHeight || 450;

        // 1. Scene
        this.scene = new THREE.Scene();
        this.scene.background = null; // Transparent so glassmorphism shows!

        // 2. Camera
        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        this.camera.position.set(0, 1.2, 5.5);

        // 3. Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.container.appendChild(this.renderer.domElement);

        // 4. OrbitControls
        if (typeof THREE.OrbitControls !== "undefined") {
            this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
            this.controls.enableDamping = true;
            this.controls.dampingFactor = 0.05;
            this.controls.maxDistance = 8;
            this.controls.minDistance = 2;
            this.controls.autoRotate = this.autoRotate;
            this.controls.autoRotateSpeed = 1.2;
        }

        // 5. Lighting
        this.setupLighting();

        // 6. Particles
        this.setupAtmosphericParticles();

        // 7. Load Default Katana
        this.buildWeapon(this.activeWeapon);

        // 8. Resize listener
        window.addEventListener("resize", () => this.onWindowResize());

        // 9. Render Loop
        this.animate();
    }

    setupLighting() {
        // Ambient soft fill
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        this.scene.add(ambientLight);

        // Key light (Samurai Crimson)
        this.keyLight = new THREE.DirectionalLight(0xd90429, 2.5);
        this.keyLight.position.set(5, 5, 4);
        this.scene.add(this.keyLight);

        // Rim light (Gold edge shimmer)
        this.rimLight = new THREE.DirectionalLight(0xe5a93c, 2.8);
        this.rimLight.position.set(-5, -2, -3);
        this.scene.add(this.rimLight);

        // Top glint spotlight
        this.spotLight = new THREE.SpotLight(0xffffff, 2.0);
        this.spotLight.position.set(0, 7, 3);
        this.spotLight.angle = Math.PI / 4;
        this.spotLight.penumbra = 0.8;
        this.scene.add(this.spotLight);
    }

    setupAtmosphericParticles() {
        const particleCount = 120;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const scales = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 8;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
            scales[i] = Math.random() * 0.06 + 0.02;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

        const material = new THREE.PointsMaterial({
            color: this.steelProfiles[this.activeSteel].particleColor,
            size: 0.06,
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending
        });

        this.particleSystem = new THREE.Points(geometry, material);
        this.scene.add(this.particleSystem);
    }

    buildWeapon(type) {
        if (this.currentWeaponMesh) {
            this.scene.remove(this.currentWeaponMesh);
            this.currentWeaponMesh = null;
        }

        const profile = this.steelProfiles[this.activeSteel];

        if (type === "katana") {
            this.currentWeaponMesh = this.createKatanaGroup(profile);
        } else if (type === "shuriken") {
            this.currentWeaponMesh = this.createShurikenGroup(profile);
        } else if (type === "kunai") {
            this.currentWeaponMesh = this.createKunaiGroup(profile);
        }

        if (this.currentWeaponMesh) {
            this.scene.add(this.currentWeaponMesh);
        }
    }

    // High Precision Procedural Katana
    createKatanaGroup(profile) {
        const katana = new THREE.Group();

        // 1. Blade Material
        const bladeMat = new THREE.MeshStandardMaterial({
            color: profile.bladeColor,
            metalness: profile.metalness,
            roughness: profile.roughness,
            emissive: profile.emissive,
            emissiveIntensity: 0.4
        });

        // Blade Geometry (Curved Katana Blade)
        const bladeShape = new THREE.Shape();
        bladeShape.moveTo(0, 0);
        bladeShape.lineTo(0.08, 0.02);
        bladeShape.lineTo(0.08, 2.8);
        bladeShape.lineTo(0.03, 3.2); // Kissaki tip
        bladeShape.lineTo(0, 3.15);
        bladeShape.lineTo(0, 0);

        const extrudeSettings = {
            steps: 4,
            depth: 0.016,
            bevelEnabled: true,
            bevelThickness: 0.008,
            bevelSize: 0.008,
            bevelSegments: 3
        };

        const bladeGeo = new THREE.ExtrudeGeometry(bladeShape, extrudeSettings);
        const bladeMesh = new THREE.Mesh(bladeGeo, bladeMat);
        bladeMesh.position.set(-0.04, 0.1, -0.008);
        katana.add(bladeMesh);

        // 2. Gold Habaki (Blade Collar)
        const habakiGeo = new THREE.BoxGeometry(0.12, 0.14, 0.05);
        const habakiMat = new THREE.MeshStandardMaterial({
            color: 0xe5a93c,
            metalness: 0.9,
            roughness: 0.2
        });
        const habaki = new THREE.Mesh(habakiGeo, habakiMat);
        habaki.position.set(0, 0.08, 0);
        katana.add(habaki);

        // 3. Tsuba Guard (Ornate circular/square disc)
        const tsubaGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.04, 32);
        const tsubaMat = new THREE.MeshStandardMaterial({
            color: profile.tsubaColor,
            metalness: 0.85,
            roughness: 0.4
        });
        const tsuba = new THREE.Mesh(tsubaGeo, tsubaMat);
        tsuba.position.set(0, 0, 0);
        katana.add(tsuba);

        // 4. Tsuka (Hilt Handle)
        const tsukaGeo = new THREE.CylinderGeometry(0.08, 0.09, 1.1, 16);
        const tsukaMat = new THREE.MeshStandardMaterial({
            color: profile.wrapColor,
            roughness: 0.7,
            metalness: 0.1
        });
        const tsuka = new THREE.Mesh(tsukaGeo, tsukaMat);
        tsuka.position.set(0, -0.56, 0);
        katana.add(tsuka);

        // 5. Kashira (Pommel Cap)
        const kashiraGeo = new THREE.CylinderGeometry(0.095, 0.07, 0.08, 16);
        const kashiraMat = new THREE.MeshStandardMaterial({
            color: 0xe5a93c,
            metalness: 0.9,
            roughness: 0.3
        });
        const kashira = new THREE.Mesh(kashiraGeo, kashiraMat);
        kashira.position.set(0, -1.14, 0);
        katana.add(kashira);

        // Position katana dynamically angled in space
        katana.rotation.z = Math.PI / 4;
        katana.rotation.x = 0.2;
        katana.position.set(0, -0.4, 0);

        return katana;
    }

    // 4-Point Senban Shuriken (Throwing Star)
    createShurikenGroup(profile) {
        const shuriken = new THREE.Group();

        const bladeMat = new THREE.MeshStandardMaterial({
            color: profile.bladeColor,
            metalness: profile.metalness,
            roughness: profile.roughness,
            emissive: profile.emissive,
            emissiveIntensity: 0.5
        });

        const shape = new THREE.Shape();
        const rOuter = 1.6;
        const rInner = 0.45;
        const points = 4;

        for (let i = 0; i < points * 2; i++) {
            const angle = (i * Math.PI) / points;
            const radius = i % 2 === 0 ? rOuter : rInner;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            if (i === 0) shape.moveTo(x, y);
            else shape.lineTo(x, y);
        }
        shape.closePath();

        // Center circular hole
        const holePath = new THREE.Path();
        holePath.absarc(0, 0, 0.22, 0, Math.PI * 2, true);
        shape.holes.push(holePath);

        const extrudeSettings = {
            steps: 2,
            depth: 0.04,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.03,
            bevelSegments: 4
        };

        const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        geom.center();
        const mesh = new THREE.Mesh(geom, bladeMat);
        shuriken.add(mesh);

        shuriken.rotation.x = Math.PI / 6;
        return shuriken;
    }

    // Tactical Ninja Kunai Dagger
    createKunaiGroup(profile) {
        const kunai = new THREE.Group();

        const bladeMat = new THREE.MeshStandardMaterial({
            color: profile.bladeColor,
            metalness: profile.metalness,
            roughness: profile.roughness,
            emissive: profile.emissive,
            emissiveIntensity: 0.4
        });

        // Leaf Blade
        const bladeShape = new THREE.Shape();
        bladeShape.moveTo(0, 0);
        bladeShape.lineTo(0.3, 0.4);
        bladeShape.lineTo(0.2, 1.8);
        bladeShape.lineTo(0, 2.4); // Razor spear point
        bladeShape.lineTo(-0.2, 1.8);
        bladeShape.lineTo(-0.3, 0.4);
        bladeShape.closePath();

        const bladeGeo = new THREE.ExtrudeGeometry(bladeShape, {
            steps: 2,
            depth: 0.03,
            bevelEnabled: true,
            bevelThickness: 0.02,
            bevelSize: 0.02,
            bevelSegments: 3
        });
        bladeGeo.center();
        const blade = new THREE.Mesh(bladeGeo, bladeMat);
        blade.position.set(0, 0.8, 0);
        kunai.add(blade);

        // Handle
        const handleGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.9, 16);
        const handleMat = new THREE.MeshStandardMaterial({
            color: profile.wrapColor,
            roughness: 0.8
        });
        const handle = new THREE.Mesh(handleGeo, handleMat);
        handle.position.set(0, -0.45, 0);
        kunai.add(handle);

        // Ring Pommel
        const ringGeo = new THREE.TorusGeometry(0.18, 0.045, 16, 32);
        const ringMat = new THREE.MeshStandardMaterial({
            color: profile.bladeColor,
            metalness: 0.9,
            roughness: 0.2
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.set(0, -0.98, 0);
        kunai.add(ring);

        kunai.rotation.z = Math.PI / 4;
        kunai.position.set(0, 0, 0);
        return kunai;
    }

    setSteel(steelKey) {
        if (!this.steelProfiles[steelKey]) return;
        this.activeSteel = steelKey;
        this.buildWeapon(this.activeWeapon);

        if (this.particleSystem) {
            this.particleSystem.material.color.setHex(this.steelProfiles[steelKey].particleColor);
        }

        if (this.keyLight) {
            this.keyLight.color.setHex(this.steelProfiles[steelKey].particleColor);
        }

        if (window.shinobiAudio) {
            window.shinobiAudio.playSwordSlash(1.2);
        }
    }

    setWeapon(weaponKey) {
        this.activeWeapon = weaponKey;
        this.buildWeapon(weaponKey);
        if (window.shinobiAudio) {
            window.shinobiAudio.playShurikenThrow();
        }
    }

    // Dynamic 3D Sword Flourish Slash Animation
    flourish() {
        if (this.isFlourishing || !this.currentWeaponMesh) return;
        this.isFlourishing = true;

        if (window.shinobiAudio) {
            window.shinobiAudio.playSwordSlash();
        }

        const startRotX = this.currentWeaponMesh.rotation.x;
        const startRotY = this.currentWeaponMesh.rotation.y;
        const startRotZ = this.currentWeaponMesh.rotation.z;
        const startTime = Date.now();
        const duration = 900; // ms

        const animateFlourish = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = Math.sin(progress * Math.PI);

            this.currentWeaponMesh.rotation.y = startRotY + progress * Math.PI * 4;
            this.currentWeaponMesh.rotation.z = startRotZ + ease * Math.PI;
            this.currentWeaponMesh.position.y = -0.4 + ease * 0.8;

            if (progress < 1) {
                requestAnimationFrame(animateFlourish);
            } else {
                this.currentWeaponMesh.rotation.x = startRotX;
                this.currentWeaponMesh.rotation.y = startRotY;
                this.currentWeaponMesh.rotation.z = startRotZ;
                this.currentWeaponMesh.position.y = -0.4;
                this.isFlourishing = false;
                if (window.shinobiAudio) {
                    window.shinobiAudio.playSwordClash();
                }
            }
        };
        animateFlourish();
    }

    onWindowResize() {
        if (!this.container || !this.renderer || !this.camera) return;
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (this.controls) {
            this.controls.update();
        }

        // Particle floating motion
        if (this.particleSystem) {
            this.particleSystem.rotation.y += 0.0015;
            this.particleSystem.rotation.x += 0.0008;
        }

        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }
}

window.Shinobi3DArmory = Shinobi3DArmory;

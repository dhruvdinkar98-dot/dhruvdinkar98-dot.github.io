// Ninja Combat Academy - Kuji-In Mystic Mandala, Smoke Bomb Vanish & 3D Tilt Engine

class ShinobiKujiNexus {
    constructor() {
        this.mandalaModal = null;
        this.smokeCanvas = null;
        this.init();
    }

    init() {
        this.setupSmokeCanvas();
        this.setupMandalaModal();
        this.setupCardTilt();
        this.bindEvents();
    }

    setupSmokeCanvas() {
        this.smokeCanvas = document.createElement("canvas");
        this.smokeCanvas.id = "smoke-bomb-canvas";
        this.smokeCanvas.style.position = "fixed";
        this.smokeCanvas.style.inset = "0";
        this.smokeCanvas.style.width = "100%";
        this.smokeCanvas.style.height = "100%";
        this.smokeCanvas.style.pointerEvents = "none";
        this.smokeCanvas.style.zIndex = "99998";
        document.body.appendChild(this.smokeCanvas);
    }

    setupMandalaModal() {
        this.mandalaModal = document.createElement("div");
        this.mandalaModal.id = "kuji-mandala-modal";
        this.mandalaModal.className = "kuji-mandala-overlay";
        this.mandalaModal.innerHTML = `
            <div class="mandala-backdrop"></div>
            <div class="mandala-container">
                <canvas id="mandala-canvas" width="600" height="600"></canvas>
                <div class="mandala-info-card glass-panel" id="mandala-card-content">
                    <button class="mandala-close-btn" id="mandala-close">✕</button>
                    <div class="mandala-kanji" id="mandala-kanji">臨</div>
                    <h3 class="mandala-title" id="mandala-title">RIN (臨) — Strength of Mind & Body</h3>
                    <span class="mandala-chakra" id="mandala-chakra">Mudra: Dokko-in | Chakra: Root / Fudōshin</span>
                    <div class="mandala-mantra" id="mandala-mantra">Mantra: On baishiraman taya sowaka</div>
                    <p class="mandala-desc" id="mandala-desc">Overcomes fear, hesitation, and panic. Anchors the nervous system like an immovable steel root deep into the earth before entering battle.</p>
                    <button class="btn-primary" id="mandala-chant-btn" style="width: 100%; margin-top: 14px;">Chant Syllable & Awaken Ki</button>
                </div>
            </div>
        `;
        document.body.appendChild(this.mandalaModal);

        document.getElementById("mandala-close").addEventListener("click", () => {
            this.mandalaModal.classList.remove("active");
        });
        this.mandalaModal.addEventListener("click", (e) => {
            if (e.target === this.mandalaModal) this.mandalaModal.classList.remove("active");
        });

        document.getElementById("mandala-chant-btn").addEventListener("click", () => {
            if (window.shinobiAudio) {
                window.shinobiAudio.playSingingBowl(528);
                window.shinobiAudio.playGong();
            }
        });
    }

    bindEvents() {
        // Smoke bomb button trigger
        document.querySelectorAll(".trigger-smoke-bomb").forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                this.triggerSmokeVanish();
            });
        });

        // Secret keyboard hotkey: 'S' for Shinobi Vanish!
        window.addEventListener("keydown", (e) => {
            if (e.key === "s" || e.key === "S") {
                if (e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
                    this.triggerSmokeVanish();
                }
            }
        });
    }

    // Sacred Geometry Kuji-In Trigger
    openSeal(sealData) {
        if (!this.mandalaModal) return;
        this.mandalaModal.classList.add("active");

        const kanjiEl = document.getElementById("mandala-kanji");
        const titleEl = document.getElementById("mandala-title");
        const chakraEl = document.getElementById("mandala-chakra");
        const mantraEl = document.getElementById("mandala-mantra");
        const descEl = document.getElementById("mandala-desc");

        if (kanjiEl) kanjiEl.innerText = sealData.kanji;
        if (titleEl) titleEl.innerText = `${sealData.syllable} (${sealData.kanji}) — ${sealData.meaning}`;
        if (chakraEl) chakraEl.innerText = `Mudra: ${sealData.mudra} | Resonance: ${sealData.chakra}`;
        if (mantraEl) mantraEl.innerText = `Mantra: "${sealData.mantra}"`;
        if (descEl) descEl.innerText = sealData.guidance;

        if (window.shinobiAudio) {
            window.shinobiAudio.playSingingBowl(432);
        }

        this.drawMandala(sealData);
    }

    drawMandala(sealData) {
        const canvas = document.getElementById("mandala-canvas");
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;

        let angle = 0;
        const render = () => {
            if (!this.mandalaModal.classList.contains("active")) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            angle += 0.008;

            ctx.save();
            ctx.translate(cx, cy);

            // Outer ring
            ctx.strokeStyle = "rgba(229, 169, 60, 0.4)";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, 220, 0, Math.PI * 2);
            ctx.stroke();

            // Concentric 8-point stars
            const rays = 12;
            ctx.strokeStyle = "rgba(217, 4, 41, 0.5)";
            for (let i = 0; i < rays; i++) {
                const a = (i * Math.PI * 2) / rays + angle;
                ctx.beginPath();
                ctx.moveTo(Math.cos(a) * 80, Math.sin(a) * 80);
                ctx.lineTo(Math.cos(a) * 220, Math.sin(a) * 220);
                ctx.stroke();
            }

            // Reverse rotating inner hexagon
            ctx.rotate(-angle * 2);
            ctx.strokeStyle = "rgba(255, 209, 102, 0.7)";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            const hex = 6;
            for (let i = 0; i < hex; i++) {
                const a = (i * Math.PI * 2) / hex;
                const x = Math.cos(a) * 140;
                const y = Math.sin(a) * 140;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.stroke();

            // Center pulsating glow
            const pulse = Math.sin(angle * 4) * 15 + 65;
            const grad = ctx.createRadialGradient(0, 0, 10, 0, 0, pulse);
            grad.addColorStop(0, "rgba(239, 35, 60, 0.9)");
            grad.addColorStop(1, "rgba(239, 35, 60, 0)");
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(0, 0, pulse, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
            requestAnimationFrame(render);
        };
        render();
    }

    // Volumetric Smoke Bomb Vanish Blast
    triggerSmokeVanish() {
        const ctx = this.smokeCanvas.getContext("2d");
        const w = this.smokeCanvas.width = window.innerWidth;
        const h = this.smokeCanvas.height = window.innerHeight;

        if (window.shinobiAudio) {
            window.shinobiAudio.playSmokeBomb();
        }

        const smokePuffs = [];
        const puffCount = 85;

        for (let i = 0; i < puffCount; i++) {
            smokePuffs.push({
                x: w / 2 + (Math.random() - 0.5) * 150,
                y: h / 2 + (Math.random() - 0.5) * 150,
                vx: (Math.random() - 0.5) * 28,
                vy: (Math.random() - 0.5) * 28,
                radius: Math.random() * 40 + 20,
                growth: Math.random() * 4 + 2,
                alpha: Math.random() * 0.7 + 0.3,
                color: Math.random() > 0.4 ? "20, 20, 26" : "217, 4, 41"
            });
        }

        let frames = 0;
        const animateSmoke = () => {
            frames++;
            ctx.clearRect(0, 0, w, h);

            smokePuffs.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vx *= 0.95;
                p.vy *= 0.95;
                p.radius += p.growth;
                p.alpha -= 0.012;

                if (p.alpha > 0) {
                    ctx.save();
                    const grad = ctx.createRadialGradient(p.x, p.y, p.radius * 0.1, p.x, p.y, p.radius);
                    grad.addColorStop(0, `rgba(${p.color}, ${p.alpha})`);
                    grad.addColorStop(1, `rgba(${p.color}, 0)`);
                    ctx.fillStyle = grad;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                }
            });

            if (frames < 75) {
                requestAnimationFrame(animateSmoke);
            } else {
                ctx.clearRect(0, 0, w, h);
                // Reveal Inner Sanctum VIP Pass
                if (window.openBookingModal) {
                    window.openBookingModal("VIP Inner Sanctum: Masterpass by Sensei Dhruv");
                }
            }
        };
        animateSmoke();
    }

    // 3D Card Perspective Tilt Engine
    setupCardTilt() {
        // Apply to glass panels
        const cards = document.querySelectorAll(".glass-panel, .discipline-card, .pricing-card");
        cards.forEach(card => {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const cx = rect.width / 2;
                const cy = rect.height / 2;
                const rotX = ((y - cy) / cy) * -9; // Max 9 deg tilt
                const rotY = ((x - cx) / cx) * 9;

                card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            });
        });
    }
}

window.shinobiKujiNexus = new ShinobiKujiNexus();

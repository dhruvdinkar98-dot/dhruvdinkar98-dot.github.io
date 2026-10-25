// Ninja Combat Academy - Interactive Shinobi Blade Slicer
// High-performance canvas cutting mechanics with real-time geometric mesh slicing,
// particle spark physics, slow-motion Zanshin bullet-time, and procedural audio.

class ShinobiBladeGame {
    constructor(canvasId = "blade-combat-canvas") {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext("2d");
        this.width = this.canvas.width = this.canvas.parentElement.clientWidth || 800;
        this.height = this.canvas.height = 480;

        this.isRunning = false;
        this.score = 0;
        this.combo = 0;
        this.comboTimer = 0;
        this.highScore = parseInt(localStorage.getItem("nca_blade_highscore") || "0");
        this.timeScale = 1.0;
        this.slowMoTimer = 0;

        this.targets = [];
        this.slicedPieces = [];
        this.particles = [];
        this.slashTrail = [];

        this.isPointerDown = false;
        this.lastPointer = null;

        this.initEvents();
    }

    initEvents() {
        window.addEventListener("resize", () => {
            if (!this.canvas || !this.canvas.parentElement) return;
            this.width = this.canvas.width = this.canvas.parentElement.clientWidth;
            this.height = this.canvas.height = 480;
        });

        // Pointer / Touch tracking
        const handlePointerMove = (x, y) => {
            const rect = this.canvas.getBoundingClientRect();
            const px = x - rect.left;
            const py = y - rect.top;

            this.slashTrail.push({ x: px, y: py, age: 0 });

            if (this.lastPointer && this.isRunning) {
                this.checkSliceCollisions(this.lastPointer, { x: px, y: py });
            }
            this.lastPointer = { x: px, y: py };
        };

        this.canvas.addEventListener("mousemove", (e) => handlePointerMove(e.clientX, e.clientY));
        this.canvas.addEventListener("touchmove", (e) => {
            if (e.touches.length > 0) {
                handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
                e.preventDefault();
            }
        }, { passive: false });

        this.canvas.addEventListener("mousedown", () => {
            this.isPointerDown = true;
            if (window.shinobiAudio) window.shinobiAudio.playSwordSlash(1.1);
        });
        window.addEventListener("mouseup", () => {
            this.isPointerDown = false;
            this.lastPointer = null;
        });

        this.canvas.addEventListener("touchstart", (e) => {
            this.isPointerDown = true;
            if (e.touches.length > 0) {
                const rect = this.canvas.getBoundingClientRect();
                this.lastPointer = { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
            }
        });
        this.canvas.addEventListener("touchend", () => {
            this.isPointerDown = false;
            this.lastPointer = null;
        });
    }

    start() {
        this.isRunning = true;
        this.score = 0;
        this.combo = 0;
        this.targets = [];
        this.slicedPieces = [];
        this.particles = [];
        this.slashTrail = [];
        this.timeScale = 1.0;
        this.slowMoTimer = 0;

        if (window.shinobiAudio) {
            window.shinobiAudio.playGong();
            window.shinobiAudio.startTaikoDrums();
        }

        this.updateHUD();
        this.loop();
    }

    stop() {
        this.isRunning = false;
        if (window.shinobiAudio) {
            window.shinobiAudio.stopTaikoDrums();
        }
    }

    spawnTarget() {
        if (!this.isRunning) return;
        const types = ["bamboo", "dummy", "shuriken", "smokebomb"];
        const rand = Math.random();
        let type = "bamboo";
        if (rand > 0.85) type = "smokebomb";
        else if (rand > 0.6) type = "shuriken";
        else if (rand > 0.35) type = "dummy";

        const radius = type === "bamboo" ? 36 : (type === "shuriken" ? 28 : (type === "smokebomb" ? 30 : 42));
        const x = Math.random() * (this.width - 200) + 100;
        const target = {
            id: Math.random(),
            type: type,
            x: x,
            y: this.height + radius + 10,
            radius: radius,
            vx: (Math.random() - 0.5) * 3,
            vy: -(Math.random() * 4 + 11),
            gravity: 0.28,
            rotation: 0,
            vRot: (Math.random() - 0.5) * 0.1,
            color: type === "bamboo" ? "#2a9d8f" : (type === "shuriken" ? "#e63946" : (type === "smokebomb" ? "#9d4edd" : "#e5a93c"))
        };
        this.targets.push(target);
    }

    checkSliceCollisions(p1, p2) {
        // Line-segment to circle collision detection
        for (let i = this.targets.length - 1; i >= 0; i--) {
            const t = this.targets[i];
            const dist = this.distToSegment(t.x, t.y, p1.x, p1.y, p2.x, p2.y);

            if (dist < t.radius) {
                // Sliced!
                this.targets.splice(i, 1);
                this.sliceTarget(t, p1, p2);
            }
        }
    }

    distToSegment(px, py, x1, y1, x2, y2) {
        const l2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
        if (l2 === 0) return Math.hypot(px - x1, py - y1);
        let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
        t = Math.max(0, Math.min(1, t));
        return Math.hypot(px - (x1 + t * (x2 - x1)), py - (y1 + t * (y2 - y1)));
    }

    sliceTarget(target, p1, p2) {
        // Calculate slice angle
        const sliceAngle = Math.atan2(p2.y - p1.y, p2.x - p1.x);

        // Sound & FX
        if (window.shinobiAudio) {
            window.shinobiAudio.playSwordClash();
        }

        // Special: Smoke bomb slow-motion trigger!
        if (target.type === "smokebomb") {
            this.triggerZanshinSlowMo();
        }

        // Increment Combo
        this.combo++;
        this.comboTimer = 90; // frames
        const multiplier = Math.min(this.combo, 8);
        const basePoints = target.type === "shuriken" ? 250 : (target.type === "smokebomb" ? 300 : 100);
        const earned = basePoints * multiplier;
        this.score += earned;

        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem("nca_blade_highscore", this.highScore);
        }

        this.updateHUD(earned, target.x, target.y);

        // Create 2 split half pieces
        const spreadSpeed = 3.5;
        const normAngle = sliceAngle + Math.PI / 2;

        this.slicedPieces.push({
            type: target.type,
            radius: target.radius,
            color: target.color,
            x: target.x,
            y: target.y,
            vx: target.vx + Math.cos(normAngle) * spreadSpeed,
            vy: target.vy + Math.sin(normAngle) * spreadSpeed,
            gravity: 0.35,
            rotation: target.rotation,
            vRot: 0.12,
            sliceAngle: sliceAngle,
            half: 1,
            life: 60
        });

        this.slicedPieces.push({
            type: target.type,
            radius: target.radius,
            color: target.color,
            x: target.x,
            y: target.y,
            vx: target.vx - Math.cos(normAngle) * spreadSpeed,
            vy: target.vy - Math.sin(normAngle) * spreadSpeed,
            gravity: 0.35,
            rotation: target.rotation,
            vRot: -0.12,
            sliceAngle: sliceAngle,
            half: 2,
            life: 60
        });

        // Erupt sparks & splinters
        const sparkCount = 18;
        for (let j = 0; j < sparkCount; j++) {
            const spd = Math.random() * 7 + 2;
            const ang = sliceAngle + (Math.random() - 0.5) * 1.5;
            this.particles.push({
                x: target.x,
                y: target.y,
                vx: Math.cos(ang) * spd,
                vy: Math.sin(ang) * spd,
                gravity: 0.22,
                color: target.type === "shuriken" ? "#ff2a5f" : "#ffd166",
                radius: Math.random() * 3 + 1,
                life: 35
            });
        }
    }

    triggerZanshinSlowMo() {
        this.timeScale = 0.28;
        this.slowMoTimer = 180; // ~3.5 seconds
        if (window.shinobiAudio) {
            window.shinobiAudio.playSmokeBomb();
            window.shinobiAudio.playSlowMoSound();
        }
    }

    updateHUD(lastEarned = 0, px = 0, py = 0) {
        const scoreEl = document.getElementById("blade-score");
        const comboEl = document.getElementById("blade-combo");
        const highEl = document.getElementById("blade-highscore");
        if (scoreEl) scoreEl.innerText = this.score;
        if (comboEl) comboEl.innerText = `x${this.combo}`;
        if (highEl) highEl.innerText = this.highScore;
    }

    loop() {
        if (!this.isRunning) return;

        // Clear canvas
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Update timeScale
        if (this.slowMoTimer > 0) {
            this.slowMoTimer--;
            if (this.slowMoTimer <= 0) {
                this.timeScale = 1.0;
            }
        }

        // Combo timeout
        if (this.comboTimer > 0) {
            this.comboTimer--;
            if (this.comboTimer <= 0) {
                this.combo = 0;
                this.updateHUD();
            }
        }

        // Random Spawner
        if (Math.random() < 0.035 * this.timeScale && this.targets.length < 5) {
            this.spawnTarget();
        }

        // 1. Update & Draw Active Targets
        for (let i = this.targets.length - 1; i >= 0; i--) {
            const t = this.targets[i];
            t.vy += t.gravity * this.timeScale;
            t.x += t.vx * this.timeScale;
            t.y += t.vy * this.timeScale;
            t.rotation += t.vRot * this.timeScale;

            // Render Target
            this.drawTarget(t);

            // Remove fallen
            if (t.y > this.height + 80) {
                this.targets.splice(i, 1);
                this.combo = 0; // dropped item resets combo
                this.updateHUD();
            }
        }

        // 2. Update & Draw Sliced Pieces
        for (let i = this.slicedPieces.length - 1; i >= 0; i--) {
            const p = this.slicedPieces[i];
            p.vy += p.gravity * this.timeScale;
            p.x += p.vx * this.timeScale;
            p.y += p.vy * this.timeScale;
            p.rotation += p.vRot * this.timeScale;
            p.life--;

            this.drawSlicedHalf(p);

            if (p.life <= 0 || p.y > this.height + 100) {
                this.slicedPieces.splice(i, 1);
            }
        }

        // 3. Update & Draw Sparks
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const pt = this.particles[i];
            pt.vy += pt.gravity * this.timeScale;
            pt.x += pt.vx * this.timeScale;
            pt.y += pt.vy * this.timeScale;
            pt.life--;

            this.ctx.beginPath();
            this.ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = pt.color;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = pt.color;
            this.ctx.fill();

            if (pt.life <= 0) this.particles.splice(i, 1);
        }

        // 4. Draw Neon Blade Slash Trail
        this.drawSlashTrail();

        // 5. Draw Zanshin SlowMo Overlay Vignette
        if (this.timeScale < 1.0) {
            this.ctx.save();
            const grad = this.ctx.createRadialGradient(this.width / 2, this.height / 2, 80, this.width / 2, this.height / 2, this.width / 1.5);
            grad.addColorStop(0, "rgba(157, 78, 221, 0)");
            grad.addColorStop(1, "rgba(157, 78, 221, 0.28)");
            this.ctx.fillStyle = grad;
            this.ctx.fillRect(0, 0, this.width, this.height);

            this.ctx.font = "bold 24px Cinzel, serif";
            this.ctx.fillStyle = "#ffd166";
            this.ctx.shadowColor = "#9d4edd";
            this.ctx.shadowBlur = 14;
            this.ctx.textAlign = "center";
            this.ctx.fillText("⚡ ZANSHIN BULLET TIME ACTIVE ⚡", this.width / 2, 45);
            this.ctx.restore();
        }

        requestAnimationFrame(() => this.loop());
    }

    drawTarget(t) {
        this.ctx.save();
        this.ctx.translate(t.x, t.y);
        this.ctx.rotate(t.rotation);

        if (t.type === "bamboo") {
            // Tatami bamboo roll
            this.ctx.fillStyle = "#2a9d8f";
            this.ctx.strokeStyle = "#e5a93c";
            this.ctx.lineWidth = 3;
            this.ctx.beginPath();
            this.ctx.roundRect(-t.radius, -t.radius * 1.3, t.radius * 2, t.radius * 2.6, 10);
            this.ctx.fill();
            this.ctx.stroke();

            // Kanji watermark on bamboo
            this.ctx.font = "bold 20px 'Noto Serif JP', serif";
            this.ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
            this.ctx.textAlign = "center";
            this.ctx.fillText("竹", 0, 7);
        } else if (t.type === "shuriken") {
            // 4-point iron shuriken
            this.ctx.fillStyle = "#ef233c";
            this.ctx.strokeStyle = "#fff";
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            const pts = 4;
            for (let i = 0; i < pts * 2; i++) {
                const a = (i * Math.PI) / pts;
                const r = i % 2 === 0 ? t.radius : t.radius * 0.35;
                const x = Math.cos(a) * r;
                const y = Math.sin(a) * r;
                if (i === 0) this.ctx.moveTo(x, y);
                else this.ctx.lineTo(x, y);
            }
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.stroke();

            // Center ring
            this.ctx.beginPath();
            this.ctx.arc(0, 0, 5, 0, Math.PI * 2);
            this.ctx.fillStyle = "#000";
            this.ctx.fill();
        } else if (t.type === "smokebomb") {
            // Mystic smoke pot
            this.ctx.fillStyle = "#9d4edd";
            this.ctx.shadowColor = "#9d4edd";
            this.ctx.shadowBlur = 20;
            this.ctx.beginPath();
            this.ctx.arc(0, 0, t.radius, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.font = "bold 22px 'Noto Serif JP', serif";
            this.ctx.fillStyle = "#fff";
            this.ctx.textAlign = "center";
            this.ctx.fillText("煙", 0, 8);
        } else {
            // Wooden dummy head
            this.ctx.fillStyle = "#b08968";
            this.ctx.strokeStyle = "#e5a93c";
            this.ctx.lineWidth = 3;
            this.ctx.beginPath();
            this.ctx.arc(0, 0, t.radius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();

            this.ctx.font = "bold 24px 'Noto Serif JP', serif";
            this.ctx.fillStyle = "#2d1500";
            this.ctx.textAlign = "center";
            this.ctx.fillText("武", 0, 8);
        }

        this.ctx.restore();
    }

    drawSlicedHalf(p) {
        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rotation);

        this.ctx.fillStyle = p.color;
        this.ctx.beginPath();
        if (p.half === 1) {
            this.ctx.arc(0, 0, p.radius, p.sliceAngle, p.sliceAngle + Math.PI);
        } else {
            this.ctx.arc(0, 0, p.radius, p.sliceAngle + Math.PI, p.sliceAngle + Math.PI * 2);
        }
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();
    }

    drawSlashTrail() {
        if (this.slashTrail.length < 2) return;

        this.ctx.save();
        for (let i = 1; i < this.slashTrail.length; i++) {
            const p1 = this.slashTrail[i - 1];
            const p2 = this.slashTrail[i];
            const progress = i / this.slashTrail.length;

            this.ctx.beginPath();
            this.ctx.moveTo(p1.x, p1.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.lineWidth = progress * 7 + 1;
            this.ctx.strokeStyle = `rgba(239, 35, 60, ${progress})`;
            this.ctx.shadowColor = "#ffd166";
            this.ctx.shadowBlur = 12;
            this.ctx.lineCap = "round";
            this.ctx.stroke();
        }
        this.ctx.restore();

        // Age trail points
        for (let i = this.slashTrail.length - 1; i >= 0; i--) {
            this.slashTrail[i].age++;
            if (this.slashTrail[i].age > 12) {
                this.slashTrail.splice(i, 1);
            }
        }
    }
}

window.ShinobiBladeGame = ShinobiBladeGame;

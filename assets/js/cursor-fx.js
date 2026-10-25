// Ninja Combat Academy - Interactive Blade Cursor & Kinetic Spark Physics
// Draws an interactive glowing Kenki ribbon trail & click spark burst on canvas

class ShinobiCursorFX {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.canvas.id = "shinobi-cursor-canvas";
        this.canvas.style.position = "fixed";
        this.canvas.style.top = "0";
        this.canvas.style.left = "0";
        this.canvas.style.width = "100%";
        this.canvas.style.height = "100%";
        this.canvas.style.pointerEvents = "none";
        this.canvas.style.zIndex = "99999";
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext("2d");
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;

        this.trail = [];
        this.sparks = [];
        this.mouse = { x: -100, y: -100 };
        this.enabled = true;

        this.init();
    }

    init() {
        window.addEventListener("resize", () => {
            this.width = this.canvas.width = window.innerWidth;
            this.height = this.canvas.height = window.innerHeight;
        });

        window.addEventListener("mousemove", (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.trail.push({ x: e.clientX, y: e.clientY, age: 0 });
            if (this.trail.length > 24) this.trail.shift();
        });

        window.addEventListener("mousedown", (e) => {
            this.emitSparks(e.clientX, e.clientY);
        });

        this.animate();
    }

    emitSparks(x, y) {
        const count = 16;
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 6 + 2;
            this.sparks.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 2,
                gravity: 0.25,
                color: Math.random() > 0.4 ? "#ef233c" : "#ffd166",
                radius: Math.random() * 2.5 + 1,
                life: 30
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // 1. Draw glowing ribbon trail
        if (this.trail.length > 2) {
            this.ctx.save();
            for (let i = 1; i < this.trail.length; i++) {
                const p1 = this.trail[i - 1];
                const p2 = this.trail[i];
                const progress = i / this.trail.length;

                this.ctx.beginPath();
                this.ctx.moveTo(p1.x, p1.y);
                this.ctx.lineTo(p2.x, p2.y);
                this.ctx.lineWidth = progress * 6 + 1;
                this.ctx.strokeStyle = `rgba(217, 4, 41, ${progress * 0.8})`;
                this.ctx.shadowColor = "#e5a93c";
                this.ctx.shadowBlur = 10;
                this.ctx.lineCap = "round";
                this.ctx.stroke();
            }
            this.ctx.restore();

            for (let i = this.trail.length - 1; i >= 0; i--) {
                this.trail[i].age++;
                if (this.trail[i].age > 18) this.trail.splice(i, 1);
            }
        }

        // 2. Draw sparks
        for (let i = this.sparks.length - 1; i >= 0; i--) {
            const s = this.sparks[i];
            s.vy += s.gravity;
            s.x += s.vx;
            s.y += s.vy;
            s.life--;

            this.ctx.beginPath();
            this.ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = s.color;
            this.ctx.shadowBlur = 8;
            this.ctx.shadowColor = s.color;
            this.ctx.fill();

            if (s.life <= 0) this.sparks.splice(i, 1);
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Only enable on desktop / pointer devices
if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("DOMContentLoaded", () => {
        window.shinobiCursor = new ShinobiCursorFX();
    });
}

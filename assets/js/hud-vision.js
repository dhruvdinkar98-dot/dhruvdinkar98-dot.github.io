// Ninja Combat Academy - Tactical HUD Vision Shifter
// Real-time CSS Filter & SVG Shader Matrix Shifter
// Modes: Standard, Night Vision (NVG), Thermal Infrared, Sumi-e Ink Wash, Cyberpunk Neo-Shinobi

class ShinobiVisionHUD {
    constructor() {
        this.currentMode = "standard";
        this.init();
    }

    init() {
        this.setupDOM();
        this.bindEvents();
    }

    setupDOM() {
        // Create Tactical HUD Overlay container
        const hudOverlay = document.createElement("div");
        hudOverlay.id = "tactical-hud-overlay";
        hudOverlay.className = "hud-overlay";
        hudOverlay.innerHTML = `
            <div class="hud-telemetry top-left">
                <span>SYS: SHINOBI-OS v4.2</span>
                <span>HONBU HQ: 27.4924° N, 77.6737° E</span>
                <span>STATUS: ACTIVE_DEFENSE</span>
            </div>
            <div class="hud-telemetry top-right">
                <span>FPS: 60 | PING: 12ms</span>
                <span>GRID: MATHURA_TATAMI_SECTOR</span>
            </div>
            <div class="hud-compass-bar">
                <span>W • • • NW • • • N (350°) • • • NE • • • E</span>
            </div>
            <div class="hud-scanlines"></div>
            <div class="hud-reticle"></div>
        `;
        document.body.appendChild(hudOverlay);
    }

    bindEvents() {
        // Listen to vision buttons in top bar or navigation
        document.querySelectorAll(".vision-mode-pill").forEach(pill => {
            pill.addEventListener("click", () => {
                const mode = pill.getAttribute("data-vision");
                this.setMode(mode);
            });
        });

        // Reticle follows cursor when in tactical mode
        const reticle = document.querySelector(".hud-reticle");
        window.addEventListener("mousemove", (e) => {
            if (reticle && (this.currentMode === "thermal" || this.currentMode === "nvg")) {
                reticle.style.transform = `translate(${e.clientX - 25}px, ${e.clientY - 25}px)`;
            }
        });
    }

    setMode(mode) {
        document.body.classList.remove("vision-nvg", "vision-thermal", "vision-sumie", "vision-cyber");
        document.querySelectorAll(".vision-mode-pill").forEach(p => p.classList.remove("active"));

        const activePill = document.querySelector(`.vision-mode-pill[data-vision="${mode}"]`);
        if (activePill) activePill.classList.add("active");

        this.currentMode = mode;

        if (mode === "nvg") {
            document.body.classList.add("vision-nvg");
            if (window.shinobiAudio) window.shinobiAudio.playHyoshigi();
        } else if (mode === "thermal") {
            document.body.classList.add("vision-thermal");
            if (window.shinobiAudio) window.shinobiAudio.playSwordSlash(1.4);
        } else if (mode === "sumie") {
            document.body.classList.add("vision-sumie");
            if (window.shinobiAudio) window.shinobiAudio.playGong();
        } else if (mode === "cyber") {
            document.body.classList.add("vision-cyber");
            if (window.shinobiAudio) window.shinobiAudio.playShurikenThrow();
        } else {
            if (window.shinobiAudio) window.shinobiAudio.playClick();
        }
    }
}

window.shinobiVisionHUD = new ShinobiVisionHUD();

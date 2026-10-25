// Ninja Combat Academy - Luxury Premium Features Engine
// 1. 360° Honbu Dojo Virtual Tatami Tour
// 2. Kata Video Biomechanics Analyzer & Slow-Mo Scrubber
// 3. Warrior Aptitude Radar Chart (Canvas 5-Axis)
// 4. Verifiable Black Belt Dan Certificate Registry

class ShinobiPremiumFeatures {
    constructor() {
        this.init();
    }

    init() {
        // this.initDojoTour(); (removed as requested)
        // this.initKataAnalyzer(); (removed as requested)
        this.initWarriorRadar();
        this.initRegistrySearch();
        this.initVIPApplication();
    }

    /* ------------------------------------------------------------
       1. 360° HONBU DOJO VIRTUAL TATAMI TOUR
       ------------------------------------------------------------ */
    initDojoTour() {
        const rooms = [
            {
                id: "tatami-hall",
                title: "Main Tatami Training Hall",
                icon: "🥋",
                sub: "Flagship Floor • 150 sq. meters",
                image: "assets/images/ai_dojo_tatami_light.jpg",
                specs: ["Spring-Loaded Mats", "Capacity: 35 Trainees", "Full-Length Mirrors", "Wooden Makiwara"],
                desc: "The primary combat hall at the Mathura Honbu Dojo. Fitted with high-impact shock-absorbing tatami flooring designed for safe full-force Ukemi breakfalls and unconstrained sparring.",
                hotspots: [
                    { x: 35, y: 45, label: "Makiwara Striking Posts" },
                    { x: 70, y: 30, label: "Kamiza Sacred Shrine" }
                ]
            },
            {
                id: "kamiza-shrine",
                title: "Kamiza & Sacred Lineage Altar",
                icon: "⛩️",
                sub: "Ancestral Shrine & Scroll Alcove",
                image: "assets/images/ai_scroll_wisdom_light.jpg",
                specs: ["Bansenshūkai Scrolls", "Traditional Cedar Altar", "Red Oak Bokken Rack", "Meditation Mat"],
                desc: "The spiritual focal point of the academy. Where students and master bow (Rei) before stepping onto the mats. Houses original brush calligraphy scrolls representing the 9 Virtues of the Shinobi.",
                hotspots: [
                    { x: 50, y: 50, label: "Ancestral Scroll Shrine" }
                ]
            },
            {
                id: "armory-vault",
                title: "Budo Weapons Vault",
                icon: "⚔️",
                sub: "Forged Steel & Traditional Timber",
                image: "assets/images/ai_kenjutsu_duel_light.jpg",
                specs: ["30+ Hand-Forged Blades", "Oak Bo Staffs", "Kusarigama Chained Sickles", "Foam Sparring Trainers"],
                desc: "Temperature-controlled armory safeguarding the academy's collection of historical and contemporary Japanese weapons. Trainees progress from padded wooden weapons to unsharpened Iaito.",
                hotspots: [
                    { x: 40, y: 55, label: "Katana Sword Racks" }
                ]
            },
            {
                id: "zen-garden",
                title: "Seiza Zen Rock Garden",
                icon: "🪨",
                sub: "Breathwork & Meditation Deck",
                image: "assets/images/ai_meditation_zen_light.jpg",
                specs: ["Bamboo Water Fountain", "Raked Gravel Mandala", "Open-Air Seating", "Kuji-In Practice"],
                desc: "Outdoor sanctuary adjacent to the main hall. Dedicated to breath cultivation (Tanden Kokyū), post-combat cardiovascular recovery, and Kuji-In hand seal integration.",
                hotspots: [
                    { x: 60, y: 40, label: "Meditation Deck" }
                ]
            },
            {
                id: "outdoor-rig",
                title: "Wilderness Agility Obstacle Rig",
                icon: "🌲",
                sub: "Outdoor Scaling & Stealth Course",
                image: "assets/images/ai_hero_katana_light.jpg",
                specs: ["Climbing Ropes", "Balance Beams", "Stone Wall Infiltration", "All-Terrain Sprinting"],
                desc: "Specialized outdoor tactical course for natural movement, vaulting (Parkour), high-impact leaps, and endurance obstacle navigation.",
                hotspots: [
                    { x: 55, y: 35, label: "Vertical Wall Scaling Rig" }
                ]
            }
        ];

        const listContainer = document.getElementById("tour-rooms-list");
        const displayContainer = document.getElementById("tour-display-card");
        if (!listContainer || !displayContainer) return;

        let activeIndex = 0;

        function renderRooms() {
            listContainer.innerHTML = rooms.map((r, i) => `
                <div class="tour-room-btn ${i === activeIndex ? 'active' : ''}" data-room-idx="${i}">
                    <span class="room-btn-icon">${r.icon}</span>
                    <div style="display: flex; flex-direction: column; gap: 3px;">
                        <strong class="room-btn-title" style="display: block; line-height: 1.3;">${r.title}</strong>
                        <span class="room-btn-sub" style="display: block; line-height: 1.3;">${r.sub}</span>
                    </div>
                </div>
            `).join("");

            listContainer.querySelectorAll(".tour-room-btn").forEach(btn => {
                btn.addEventListener("click", () => {
                    activeIndex = parseInt(btn.getAttribute("data-room-idx"));
                    renderRooms();
                    renderDisplay(rooms[activeIndex]);
                    if (window.shinobiAudio) window.shinobiAudio.playClick();
                });
            });
        }

        function renderDisplay(room) {
            displayContainer.innerHTML = `
                <div class="tour-image-viewport">
                    <img src="${room.image}" alt="${room.title}">
                    ${room.hotspots.map(h => `
                        <div class="tour-hotspot" style="top: ${h.y}%; left: ${h.x}%;" title="${h.label}">✦</div>
                    `).join("")}
                </div>
                <div class="tour-room-details">
                    <h3>${room.title}</h3>
                    <div class="tour-specs-badges">
                        ${room.specs.map(s => `<span class="tour-spec-pill">✓ ${s}</span>`).join("")}
                    </div>
                    <p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-slate);">${room.desc}</p>
                </div>
            `;
        }

        renderRooms();
        renderDisplay(rooms[0]);
    }

    /* ------------------------------------------------------------
       2. KATA VIDEO BIOMECHANICS ANALYZER & SLOW-MO SCRUBBER
       ------------------------------------------------------------ */
    initKataAnalyzer() {
        const video = document.getElementById("analyzer-video");
        const speedBtns = document.querySelectorAll(".scrub-speed-btn");
        const stepBtn = document.getElementById("btn-analyzer-step");
        const playBtn = document.getElementById("btn-analyzer-play");
        const toggleLinesBtn = document.getElementById("btn-toggle-vectors");
        const vectorOverlay = document.getElementById("analyzer-vectors");

        if (!video) return;

        if (speedBtns) {
            speedBtns.forEach(btn => {
                btn.addEventListener("click", () => {
                    speedBtns.forEach(b => b.classList.remove("active"));
                    btn.classList.add("active");
                    const spd = parseFloat(btn.getAttribute("data-speed"));
                    video.playbackRate = spd;
                    if (window.shinobiAudio) window.shinobiAudio.playClick();
                });
            });
        }

        if (stepBtn) {
            stepBtn.addEventListener("click", () => {
                video.pause();
                video.currentTime += 0.04; // Advance 1 frame (25 fps)
                if (window.shinobiAudio) window.shinobiAudio.playSwordSlash(1.5);
            });
        }

        if (playBtn) {
            playBtn.addEventListener("click", () => {
                if (video.paused) {
                    video.play();
                    playBtn.innerText = "Pause";
                } else {
                    video.pause();
                    playBtn.innerText = "Play";
                }
            });
        }

        if (toggleLinesBtn && vectorOverlay) {
            toggleLinesBtn.addEventListener("click", () => {
                const isHidden = vectorOverlay.style.display === "none";
                vectorOverlay.style.display = isHidden ? "block" : "none";
                toggleLinesBtn.classList.toggle("active", isHidden);
            });
        }
    }

    /* ------------------------------------------------------------
       3. WARRIOR APTITUDE RADAR CHART (5-AXIS CANVAS)
       ------------------------------------------------------------ */
    initWarriorRadar() {
        const canvas = document.getElementById("warrior-radar-canvas");
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        const sliders = {
            reaction: document.getElementById("iq-reaction"),
            spatial: document.getElementById("iq-spatial"),
            mind: document.getElementById("iq-mind"),
            ukemi: document.getElementById("iq-ukemi"),
            weapons: document.getElementById("iq-weapons")
        };

        const scoreEl = document.getElementById("iq-composite-score");
        const tierEl = document.getElementById("iq-composite-tier");

        const axes = [
            { key: "reaction", label: "Reaction Speed", default: 85 },
            { key: "spatial", label: "Distance Control (Ma-ai)", default: 80 },
            { key: "mind", label: "Fudōshin Mindset", default: 90 },
            { key: "ukemi", label: "Ukemi Breakfalls", default: 78 },
            { key: "weapons", label: "Weapon Dexterity", default: 82 }
        ];

        function drawRadar() {
            const w = canvas.width = 440;
            const h = canvas.height = 440;
            const cx = w / 2;
            const cy = h / 2;
            const radius = 125;

            ctx.clearRect(0, 0, w, h);

            // 1. Draw web grid circles
            const levels = 5;
            for (let lvl = 1; lvl <= levels; lvl++) {
                const r = (radius / levels) * lvl;
                ctx.beginPath();
                for (let i = 0; i < 5; i++) {
                    const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
                    const x = cx + Math.cos(angle) * r;
                    const y = cy + Math.sin(angle) * r;
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.strokeStyle = "rgba(15, 23, 42, 0.1)";
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            // 2. Draw spokes and labels
            ctx.font = "bold 12px 'Plus Jakarta Sans', sans-serif";
            ctx.fillStyle = "#090d16";
            ctx.textAlign = "center";
            for (let i = 0; i < 5; i++) {
                const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
                ctx.beginPath();
                ctx.moveTo(cx, cy);
                ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
                ctx.strokeStyle = "rgba(15, 23, 42, 0.15)";
                ctx.stroke();

                // Labels
                const lx = cx + Math.cos(angle) * (radius + 28);
                const ly = cy + Math.sin(angle) * (radius + 28) + 4;
                ctx.fillText(axes[i].label, lx, ly);
            }

            // 3. Draw polygon data shape
            const vals = axes.map(a => {
                const input = sliders[a.key];
                return input ? parseInt(input.value) : a.default;
            });

            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
                const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
                const r = (vals[i] / 100) * radius;
                const x = cx + Math.cos(angle) * r;
                const y = cy + Math.sin(angle) * r;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();

            // Gradient Fill
            const grad = ctx.createRadialGradient(cx, cy, 20, cx, cy, radius);
            grad.addColorStop(0, "rgba(217, 4, 41, 0.45)");
            grad.addColorStop(1, "rgba(217, 119, 6, 0.2)");
            ctx.fillStyle = grad;
            ctx.fill();
            ctx.strokeStyle = "#d90429";
            ctx.lineWidth = 2.5;
            ctx.stroke();

            // Calculate Composite Score
            const avg = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
            if (scoreEl) scoreEl.innerText = `${avg} / 100`;

            let tier = "Novice Disciple (Minarai)";
            if (avg >= 88) tier = "★ Master Candidate (Jonin Grade)";
            else if (avg >= 75) tier = "Senior Operative (Chunin Grade)";
            else if (avg >= 60) tier = "Field Practitioner (Genin Grade)";
            if (tierEl) tierEl.innerText = tier;
        }

        // Attach slider change listeners
        Object.keys(sliders).forEach(key => {
            const input = sliders[key];
            if (input) {
                input.addEventListener("input", () => {
                    const valDisplay = document.getElementById(`val-${key}`);
                    if (valDisplay) valDisplay.innerText = `${input.value}%`;
                    drawRadar();
                });
            }
        });

        drawRadar();
    }

    /* ------------------------------------------------------------
       4. VERIFIABLE BLACK BELT DAN CERTIFICATE REGISTRY
       ------------------------------------------------------------ */
    initRegistrySearch() {
        const searchInput = document.getElementById("registry-search-input");
        const tableBody = document.getElementById("registry-table-body");
        if (!searchInput || !tableBody) return;

        const graduates = [
            { name: "Sensei Ninja Dhruv", rank: "1st Dan Black Belt (Shodan)", year: "Headmaster", certHash: "SHA-NCA-HONBU-001", status: "Active Headmaster" },
            { name: "Rajeshwar Sharma", rank: "1st Dan Black Belt (Shodan)", year: "2025", certHash: "SHA-NCA-MTH-108", status: "Verified Active" },
            { name: "Ananya Deshmukh", rank: "1st Dan Black Belt (Shodan)", year: "2024", certHash: "SHA-NCA-MUM-204", status: "Verified Active" },
            { name: "Vikramjit Singh", rank: "1st Dan Black Belt (Shodan)", year: "2025", certHash: "SHA-NCA-DEL-319", status: "Verified Active" },
            { name: "David M.", rank: "1st Dan Black Belt (Shodan)", year: "2026", certHash: "SHA-NCA-LDN-412", status: "Verified International" },
            { name: "Pooja V. Nair", rank: "1st Dan Black Belt (Shodan)", year: "2025", certHash: "SHA-NCA-BLR-502", status: "Verified Active" }
        ];

        function renderRows(list) {
            tableBody.innerHTML = list.map(g => `
                <tr>
                    <td><strong>${g.name}</strong></td>
                    <td style="color: var(--text-onyx); font-weight: 700;">${g.rank}</td>
                    <td>${g.year}</td>
                    <td><span class="hash-badge">${g.certHash}</span></td>
                    <td><span style="color: #059669; font-weight: 700;">● ${g.status}</span></td>
                </tr>
            `).join("");
        }

        renderRows(graduates);

        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = graduates.filter(g => 
                g.name.toLowerCase().includes(query) ||
                g.rank.toLowerCase().includes(query) ||
                g.certHash.toLowerCase().includes(query)
            );
            renderRows(filtered);
        });
    }

    /* ------------------------------------------------------------
       5. VIP SELECTIVE ADMISSION APPLICATION HOOKS
       ------------------------------------------------------------ */
    initVIPApplication() {
        document.querySelectorAll(".trigger-vip-apply").forEach(btn => {
            btn.addEventListener("click", () => {
                if (window.openBookingModal) {
                    window.openBookingModal("VIP Elite Mentorship Audition with Sensei Dhruv");
                }
            });
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    window.shinobiPremiumFeatures = new ShinobiPremiumFeatures();
});

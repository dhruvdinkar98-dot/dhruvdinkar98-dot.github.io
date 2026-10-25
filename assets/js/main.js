// Ninja Combat Academy - Interactive Application Controller
// Orchestrates interactive armory, quizzes, reflex drills, smart Sensei AI, and booking systems

document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initHeroEffects();
    initDisciplines();
    initWeaponsArmory();
    init3DForge();
    initBladeGame();
    initKujiNexus();
    initGlobalNetwork();
    initBeltPath();
    initQuiz();
    initSchedules();
    initReflexTrainer();
    initCadenceDrill();
    initTestimonialsAndVirtues();
    initFAQ();
    initPricing();
    initSenseiAI();
    initBookingModal();
    initSoundControls();

    // Direct Anchor or Query Parameter Auto-Scroll
    const urlParams = new URLSearchParams(window.location.search);
    const targetFocus = urlParams.get('focus') || (window.location.hash ? window.location.hash.substring(1) : null);
    if (targetFocus) {
        const el = document.getElementById(targetFocus);
        if (el) {
            el.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
    }
});

/* ============================================================
   1. NAVIGATION & SOUND HEADER
   ============================================================ */
function initNavigation() {
    const nav = document.querySelector(".navbar");
    const mobileToggle = document.getElementById("mobile-menu-toggle");
    const navLinks = document.getElementById("nav-links");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    });

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");
            mobileToggle.setAttribute("aria-expanded", isOpen);
            mobileToggle.classList.toggle("active");
            if (window.shinobiAudio) window.shinobiAudio.playClick();
        });

        // Close on link click
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                mobileToggle.classList.remove("active");
            });
        });
    }

    // Smooth anchor scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
                if (window.shinobiAudio) window.shinobiAudio.playClick();
            }
        });
    });
}

function initSoundControls() {
    const soundToggle = document.getElementById("sound-toggle-btn");
    const ambientToggle = document.getElementById("ambient-toggle-btn");
    const taikoToggle = document.getElementById("taiko-toggle-btn");

    function updateSoundUI() {
        const isMuted = window.shinobiAudio.isMuted;
        if (soundToggle) {
            soundToggle.innerHTML = isMuted ? 
                `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg><span>Sound Off</span>` :
                `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg><span>Sound On</span>`;
            soundToggle.classList.toggle("active", !isMuted);
        }
    }

    if (soundToggle) {
        soundToggle.addEventListener("click", () => {
            const muted = window.shinobiAudio.toggleMute();
            updateSoundUI();
            if (!muted) {
                window.shinobiAudio.playShurikenThrow();
            }
        });
        updateSoundUI();
    }

    if (ambientToggle) {
        ambientToggle.addEventListener("click", () => {
            const active = window.shinobiAudio.toggleAmbient();
            ambientToggle.classList.toggle("playing", active);
            ambientToggle.setAttribute("title", active ? "Pause Meditative Dojo Ambience" : "Play Meditative Dojo Ambience");
            ambientToggle.innerHTML = active ? 
                `<span class="sound-wave active"><span></span><span></span><span></span></span><span>Zen Drone Active</span>` :
                `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg><span>Zen Ambient</span>`;
        });
    }

    if (taikoToggle) {
        taikoToggle.addEventListener("click", () => {
            const active = window.shinobiAudio.toggleTaikoDrums();
            taikoToggle.classList.toggle("playing", active);
            taikoToggle.setAttribute("title", active ? "Pause Taiko War Cadence" : "Start Taiko War Cadence");
            taikoToggle.innerHTML = active ?
                `<span class="sound-wave active"><span></span><span></span><span></span></span><span>Taiko Active</span>` :
                `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg><span>Taiko Cadence</span>`;
        });
    }

    // Attach subtle hover sound to main interactive buttons
    document.querySelectorAll(".btn-primary, .btn-action, .tab-btn").forEach(el => {
        el.addEventListener("mouseenter", () => {
            if (window.shinobiAudio && !window.shinobiAudio.isMuted) {
                window.shinobiAudio.playClick();
            }
        });
    });
}

/* ============================================================
   2. HERO VISUALS & PARTICLES
   ============================================================ */
function initHeroEffects() {
    const canvas = document.getElementById("hero-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = canvas.width = canvas.parentElement.offsetWidth;
    let height = canvas.height = canvas.parentElement.offsetHeight;

    window.addEventListener("resize", () => {
        if (!canvas.parentElement) return;
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
    });

    const particles = [];
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 0.8,
            speedY: -(Math.random() * 0.6 + 0.2),
            speedX: (Math.random() - 0.5) * 0.4,
            alpha: Math.random() * 0.6 + 0.2,
            color: Math.random() > 0.4 ? "217, 4, 41" : "229, 169, 60" // crimson or gold
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.y += p.speedY;
            p.x += p.speedX;

            if (p.y < -10) {
                p.y = height + 10;
                p.x = Math.random() * width;
            }
            if (p.x < -10) p.x = width + 10;
            if (p.x > width + 10) p.x = -10;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = `rgba(${p.color}, 0.8)`;
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }
    animate();
}

/* ============================================================
   3. 18 DISCIPLINES (JŪHAKKEI) & FILTERING
   ============================================================ */
function initDisciplines() {
    const container = document.getElementById("disciplines-grid");
    const filterButtons = document.querySelectorAll(".discipline-filter-btn");
    if (!container) return;

    function renderDisciplines(category = "all") {
        container.innerHTML = "";
        const filtered = category === "all" ? 
            NCA_DATA.disciplines : 
            NCA_DATA.disciplines.filter(d => d.category === category);

        filtered.forEach(d => {
            const card = document.createElement("div");
            card.className = "discipline-card glass-panel";
            card.innerHTML = `
                <div class="discipline-image-wrap">
                    <img src="${d.image}" alt="${d.name}" loading="eager">
                    <div class="discipline-overlay"></div>
                    <span class="discipline-badge">${d.badge}</span>
                    <span class="discipline-kanji">${d.kanji}</span>
                </div>
                <div class="discipline-content">
                    <div class="discipline-header">
                        <h3 class="discipline-title">${d.name}</h3>
                        <span class="discipline-trans">${d.translation}</span>
                    </div>
                    <p class="discipline-summary">${d.summary}</p>
                    <div class="discipline-syllabus">
                        <h4>Core Curriculum Focus:</h4>
                        <ul>
                            ${d.syllabus.map(item => `<li><span class="bullet">✦</span> ${item}</li>`).join("")}
                        </ul>
                    </div>
                    <button class="btn-syllabus-detail" data-id="${d.id}">
                        <span>Inquire About Technique</span>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                </div>
            `;
            container.appendChild(card);
        });

        // Attach modal trigger
        container.querySelectorAll(".btn-syllabus-detail").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-id");
                const item = NCA_DATA.disciplines.find(x => x.id === id);
                if (item) {
                    openBookingModal(`Inquiry: ${item.name}`);
                }
            });
        });
    }

    renderDisciplines("all");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const cat = btn.getAttribute("data-filter");
            renderDisciplines(cat);
            if (window.shinobiAudio) window.shinobiAudio.playSwordSlash();
        });
    });
}

/* ============================================================
   4. INTERACTIVE WEAPONS ARMORY
   ============================================================ */
function initWeaponsArmory() {
    const listContainer = document.getElementById("weapons-selector");
    const detailContainer = document.getElementById("weapon-detail-view");
    if (!listContainer || !detailContainer) return;

    let activeIndex = 0;

    function renderWeaponList() {
        listContainer.innerHTML = "";
        NCA_DATA.weapons.forEach((w, index) => {
            const item = document.createElement("button");
            item.className = `weapon-tab-btn ${index === activeIndex ? "active" : ""}`;
            item.innerHTML = `
                <div class="weapon-tab-kanji">${w.kanji.charAt(0)}</div>
                <div class="weapon-tab-text">
                    <div class="weapon-tab-name">${w.name}</div>
                    <div class="weapon-tab-role">${w.type}</div>
                </div>
            `;
            item.addEventListener("click", () => {
                activeIndex = index;
                renderWeaponList();
                renderWeaponDetail(w);
                if (window.shinobiAudio) window.shinobiAudio.playSwordSlash();
            });
            listContainer.appendChild(item);
        });
    }

    function renderWeaponDetail(w) {
        detailContainer.innerHTML = `
            <div class="weapon-detail-card glass-panel">
                <div class="weapon-detail-header">
                    <div class="weapon-title-block">
                        <span class="weapon-kanji-big">${w.kanji}</span>
                        <div>
                            <h3 class="weapon-main-name">${w.name}</h3>
                            <span class="weapon-badge-type">${w.type}</span>
                        </div>
                    </div>
                    <button class="btn-weapon-action" id="btn-request-weapon-drill">Book Weapon Masterclass</button>
                </div>

                <div class="weapon-specs-grid">
                    <div class="spec-box">
                        <span class="spec-label">Dimensions / Length</span>
                        <span class="spec-val">${w.length}</span>
                    </div>
                    <div class="spec-box">
                        <span class="spec-label">Physical Weight</span>
                        <span class="spec-val">${w.weight}</span>
                    </div>
                    <div class="spec-box">
                        <span class="spec-label">Forging Material</span>
                        <span class="spec-val">${w.material}</span>
                    </div>
                    <div class="spec-box">
                        <span class="spec-label">Tactical Function</span>
                        <span class="spec-val">${w.role}</span>
                    </div>
                </div>

                <div class="weapon-narrative">
                    <h4>Historical Origin & Shinobi Lore</h4>
                    <p>${w.description}</p>
                </div>

                <div class="weapon-safety-box">
                    <div class="safety-icon">⚠️</div>
                    <div>
                        <strong>Dojo Safety & Progression Protocol:</strong>
                        <p>${w.tacticalNote}</p>
                    </div>
                </div>
            </div>
        `;

        const actionBtn = detailContainer.querySelector("#btn-request-weapon-drill");
        if (actionBtn) {
            actionBtn.addEventListener("click", () => {
                openBookingModal(`Weapon Training: ${w.name}`);
            });
        }
    }

    renderWeaponList();
    renderWeaponDetail(NCA_DATA.weapons[0]);
}

/* ============================================================
   5. BELT PROGRESSION & RANK ROADMAP
   ============================================================ */
function initBeltPath() {
    const listEl = document.getElementById("belt-timeline-list");
    const detailEl = document.getElementById("belt-detail-content");
    if (!listEl || !detailEl) return;

    let activeBeltIndex = 0;

    function renderBeltTimeline() {
        listEl.innerHTML = "";
        NCA_DATA.beltPath.forEach((b, idx) => {
            const btn = document.createElement("button");
            btn.className = `belt-node-btn ${idx === activeBeltIndex ? "active" : ""}`;
            btn.innerHTML = `
                <div class="belt-swatch" style="background-color: ${b.colorHex}; ${b.border ? `border: 2px solid ${b.border};` : ''}"></div>
                <div class="belt-node-info">
                    <span class="belt-node-title">${b.belt}</span>
                    <span class="belt-node-rank">${b.rank}</span>
                </div>
            `;
            btn.addEventListener("click", () => {
                activeBeltIndex = idx;
                renderBeltTimeline();
                renderBeltDetail(b);
                if (window.shinobiAudio) window.shinobiAudio.playShurikenThrow();
            });
            listEl.appendChild(btn);
        });
    }

    function renderBeltDetail(b) {
        detailEl.innerHTML = `
            <div class="belt-detail-card glass-panel">
                <div class="belt-card-header">
                    <div class="belt-color-bar" style="background: ${b.colorHex}; ${b.border ? `box-shadow: 0 0 15px ${b.border};` : ''}"></div>
                    <div>
                        <span class="belt-detail-kyu">${b.rank}</span>
                        <h3 class="belt-detail-title">${b.belt} — ${b.title}</h3>
                        <span class="belt-detail-time">⏱ Typical Training Timeline: <strong>${b.duration}</strong></span>
                    </div>
                </div>
                <div class="belt-req-box">
                    <h4>Grading & Belt Examination Syllabus:</h4>
                    <p>${b.requirements}</p>
                </div>
                <div class="belt-cert-badge">
                    <span>🏆 Official Bujinkan & Federation Rank Authentication Included</span>
                </div>
            </div>
        `;
    }

    renderBeltTimeline();
    renderBeltDetail(NCA_DATA.beltPath[0]);
}

/* ============================================================
   6. INTERACTIVE PLACEMENT QUIZ ("FIND YOUR COMBAT PATH")
   ============================================================ */
function initQuiz() {
    const quizCard = document.getElementById("quiz-card");
    if (!quizCard) return;

    const questions = [
        {
            q: "What is your primary personal objective in joining Ninja Combat Academy?",
            answers: [
                { text: "Street-Smart Self Defense & Anti-Ambush Reflexes", track: "tactical" },
                { text: "Authentic Katana, Kenjutsu & Traditional Weapons", track: "weapons" },
                { text: "Combat Agility, Tumbling, Stamina & Conditioning", track: "agility" },
                { text: "Mental Fortitude, Breathwork & Fudōshin Mindset", track: "mind" }
            ]
        },
        {
            q: "How would you prefer to receive your training?",
            answers: [
                { text: "In-Person at Mathura Honbu Dojo (Om Nagar Colony)", pref: "offline" },
                { text: "Live Interactive Video via Zoom from anywhere in the world", pref: "online" },
                { text: "Hybrid (Online weekly + Weekend Mathura intensive camps)", pref: "hybrid" }
            ]
        },
        {
            q: "What is your current martial arts or fitness background?",
            answers: [
                { text: "Total Beginner — Starting from zero with an open mind", level: "beginner" },
                { text: "Intermediate — Some boxing, karate, gym, or martial experience", level: "intermediate" },
                { text: "Advanced / Black Belt — Seeking deep Japanese shinobi specialization", level: "advanced" }
            ]
        },
        {
            q: "Who is this enrollment for?",
            answers: [
                { text: "Adult (Ages 16+)", audience: "adult" },
                { text: "Youth / Child (Ages 6 to 15)", audience: "youth" },
                { text: "Family / Duo Training", audience: "family" }
            ]
        }
    ];

    let currentStep = 0;
    const selections = {};

    function renderQuestion() {
        if (currentStep >= questions.length) {
            renderResult();
            return;
        }

        const current = questions[currentStep];
        quizCard.innerHTML = `
            <div class="quiz-step-header">
                <span class="quiz-step-counter">Step ${currentStep + 1} of ${questions.length}</span>
                <div class="quiz-progress-bar">
                    <div class="quiz-progress-fill" style="width: ${((currentStep + 1) / questions.length) * 100}%;"></div>
                </div>
                <h3 class="quiz-question-title">${current.q}</h3>
            </div>
            <div class="quiz-options-grid">
                ${current.answers.map((ans, idx) => `
                    <button class="quiz-opt-btn" data-index="${idx}">
                        <span class="opt-indicator">${String.fromCharCode(65 + idx)}</span>
                        <span class="opt-text">${ans.text}</span>
                    </button>
                `).join("")}
            </div>
        `;

        quizCard.querySelectorAll(".quiz-opt-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const idx = parseInt(btn.getAttribute("data-index"));
                Object.assign(selections, current.answers[idx]);
                currentStep++;
                if (window.shinobiAudio) window.shinobiAudio.playShurikenThrow();
                renderQuestion();
            });
        });
    }

    function renderResult() {
        let recommendedPlan = "Honbu Dojo Intensive (Mathura)";
        let voucherCode = "SHINOBI-HONBU-2026";
        let pitch = "Your profile aligns perfectly with direct hands-on training under Sensei Ninja Dhruv.";

        if (selections.pref === "online") {
            recommendedPlan = "Global Online Shinobi Academy (Live Zoom)";
            voucherCode = "SHINOBI-GLOBAL-LIVE";
            pitch = "You will excel in our live bidirectional video sessions with direct posture feedback.";
        } else if (selections.audience === "youth") {
            recommendedPlan = "Youth Shinobi Program (Ages 6-15)";
            voucherCode = "YOUTH-WARRIOR-VIP";
            pitch = "Tailored for young minds to build unshakeable anti-bullying confidence, balance, and focus.";
        } else if (selections.pref === "hybrid" || selections.level === "advanced") {
            recommendedPlan = "Black Belt Mastery Pathway (Hybrid)";
            voucherCode = "BLACKBELT-PATH-100";
            pitch = "An elite, accelerated track designed to guide you directly to 1st Dan Shodan certification.";
        }

        quizCard.innerHTML = `
            <div class="quiz-result-view">
                <div class="quiz-result-badge">🥋 Personalized Warrior Assessment Complete</div>
                <h3 class="quiz-result-title">Recommended Track: <span>${recommendedPlan}</span></h3>
                <p class="quiz-result-pitch">${pitch}</p>
                
                <div class="quiz-voucher-box">
                    <span class="voucher-label">Your Exclusive 1-Day Free Trial Voucher Code:</span>
                    <span class="voucher-code">${voucherCode}</span>
                    <span class="voucher-sub">Entitles you to 1 Free Live Class + Dojo Induction Consultation with Sensei Ninja Dhruv</span>
                </div>

                <div class="quiz-result-actions">
                    <button class="btn-primary" id="btn-claim-voucher">Claim Free Session with This Voucher</button>
                    <button class="btn-outline" id="btn-restart-quiz">Retake Assessment</button>
                </div>
            </div>
        `;

        quizCard.querySelector("#btn-claim-voucher").addEventListener("click", () => {
            openBookingModal(`Voucher ${voucherCode}: ${recommendedPlan}`);
        });

        quizCard.querySelector("#btn-restart-quiz").addEventListener("click", () => {
            currentStep = 0;
            renderQuestion();
        });

        if (window.shinobiAudio) window.shinobiAudio.playGong();
    }

    renderQuestion();
}

/* ============================================================
   7. SCHEDULES & TIME SLOTS
   ============================================================ */
function initSchedules() {
    const listEl = document.getElementById("schedule-list");
    const tabs = document.querySelectorAll(".schedule-tab-btn");
    if (!listEl) return;

    let activeType = "offline";

    function renderSchedule(type) {
        listEl.innerHTML = "";
        const data = NCA_DATA.schedules[type] || [];

        data.forEach(item => {
            const card = document.createElement("div");
            card.className = "schedule-item-card glass-panel";
            card.innerHTML = `
                <div class="schedule-day-badge">
                    <span class="sched-day">${item.day}</span>
                    <span class="sched-time">${item.time}</span>
                </div>
                <div class="schedule-info">
                    <span class="sched-batch-tag">${item.batch}</span>
                    <h4 class="sched-focus">${item.focus}</h4>
                    <span class="sched-loc">${item.location || item.platform}</span>
                </div>
                <button class="btn-book-slot" data-slot="${item.day} ${item.time} (${item.batch})">
                    <span>Reserve Spot</span>
                </button>
            `;
            listEl.appendChild(card);
        });

        listEl.querySelectorAll(".btn-book-slot").forEach(b => {
            b.addEventListener("click", () => {
                const slot = b.getAttribute("data-slot");
                openBookingModal(`Reserved Slot: ${slot}`);
            });
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            activeType = tab.getAttribute("data-schedule-type");
            renderSchedule(activeType);
            if (window.shinobiAudio) window.shinobiAudio.playClick();
        });
    });

    renderSchedule("offline");
}

/* ============================================================
   8. GAMIFIED TRAINING PAVILION: REFLEX TRAINER
   ============================================================ */
function initReflexTrainer() {
    const box = document.getElementById("reflex-box");
    const label = document.getElementById("reflex-label");
    const icon = document.getElementById("reflex-icon");
    const bestEl = document.getElementById("reflex-best-time");
    if (!box || !label) return;

    let state = "idle"; // idle, waiting, ready
    let startTime = 0;
    let timerId = null;
    let bestScore = localStorage.getItem("nca_best_reflex") || null;

    if (bestScore && bestEl) {
        bestEl.innerText = `${bestScore} ms`;
    }

    box.addEventListener("click", () => {
        if (state === "ready") {
            // Clicked in time!
            const reactionTime = Date.now() - startTime;
            state = "idle";
            box.className = "reflex-box success";
            label.innerHTML = `<strong>DEVASTATING SPEED!</strong> Reaction: <strong>${reactionTime} ms</strong>. Tap to challenge again.`;
            icon.innerText = "斬";

            if (!bestScore || reactionTime < parseInt(bestScore)) {
                bestScore = reactionTime;
                localStorage.setItem("nca_best_reflex", bestScore);
                if (bestEl) bestEl.innerText = `${bestScore} ms (NEW RECORD!)`;
            }

            if (window.shinobiAudio) window.shinobiAudio.playShurikenThrow();
            return;
        }

        if (state === "waiting") {
            // False start
            clearTimeout(timerId);
            state = "idle";
            box.className = "reflex-box false-start";
            label.innerText = "TOO EARLY! Calm the mind (Fudōshin). Wait for the crimson flash.";
            icon.innerText = "心";
            if (window.shinobiAudio) window.shinobiAudio.playHyoshigi();
            return;
        }

        // State was idle, start waiting
        state = "waiting";
        box.className = "reflex-box waiting";
        label.innerText = "Stand ready... focus on the darkness...";
        icon.innerText = "闇";
        if (window.shinobiAudio) window.shinobiAudio.playHyoshigi();

        const delay = 1400 + Math.random() * 2600;
        timerId = setTimeout(() => {
            if (state !== "waiting") return;
            state = "ready";
            startTime = Date.now();
            box.className = "reflex-box strike-now";
            label.innerText = "⚡ STRIKE NOW! CLICK!";
            icon.innerText = "刃";
            if (window.shinobiAudio) window.shinobiAudio.playSwordSlash();
        }, delay);
    });
}

/* ============================================================
   9. CADENCE COMBAT STANCE DRILL
   ============================================================ */
function initCadenceDrill() {
    const drillBtn = document.getElementById("drill-action-btn");
    const timerEl = document.getElementById("drill-timer");
    const stanceTitle = document.getElementById("drill-stance-title");
    const stanceSteps = document.getElementById("drill-stance-steps");
    if (!drillBtn || !timerEl) return;

    let isRunning = false;
    let secondsLeft = 45;
    let drillInterval = null;

    const combos = [
        { stance: "Ichimonji no Kamae (一文字)", actions: "Sink weight 70% rear leg ➔ Extend lead hand ➔ Deflect inward ➔ Shuto strike" },
        { stance: "Shizen no Kamae (自然の構え)", actions: "Neutral shoulder stance ➔ Read opponent's breath ➔ Lateral 45° step ➔ Counter kick" },
        { stance: "Doko no Kamae (怒虎の構え)", actions: "Angry Tiger stance ➔ High chambered right fist ➔ Rotational downhill sledgehammer strike" },
        { stance: "Hira no Kamae (平の構え)", actions: "Wide wind wings posture ➔ Absorb incoming surge ➔ Enter hip pivot ➔ Ganseki throw" },
        { stance: "Jūmonji no Kamae (十文字)", actions: "Forearms crossed at wrist ➔ Wedge weapon disarm ➔ Forward low thrust ➔ Roll recover" }
    ];

    function nextCombo() {
        const c = combos[Math.floor(Math.random() * combos.length)];
        if (stanceTitle) stanceTitle.innerText = c.stance;
        if (stanceSteps) stanceSteps.innerText = c.actions;
        if (window.shinobiAudio) window.shinobiAudio.playSwordSlash();
    }

    drillBtn.addEventListener("click", () => {
        if (isRunning) {
            // Stop
            clearInterval(drillInterval);
            isRunning = false;
            drillBtn.innerText = "Begin 45s Cadence Drill";
            timerEl.innerText = "00:45";
            if (stanceTitle) stanceTitle.innerText = "Ready to Begin";
            if (stanceSteps) stanceSteps.innerText = "Hit the button to start cadence callouts.";
            return;
        }

        // Start
        isRunning = true;
        secondsLeft = 45;
        drillBtn.innerText = "Halt Drill";
        if (window.shinobiAudio) window.shinobiAudio.playGong();
        nextCombo();

        drillInterval = setInterval(() => {
            secondsLeft--;
            const mins = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
            const secs = String(secondsLeft % 60).padStart(2, '0');
            timerEl.innerText = `${mins}:${secs}`;

            if (secondsLeft % 9 === 0 && secondsLeft > 0) {
                nextCombo();
            }

            if (secondsLeft <= 0) {
                clearInterval(drillInterval);
                isRunning = false;
                drillBtn.innerText = "Begin 45s Cadence Drill";
                timerEl.innerText = "00:45";
                if (stanceTitle) stanceTitle.innerText = "★ DRILL COMPLETE! ★";
                if (stanceSteps) stanceSteps.innerText = "Outstanding discipline. Recover breath in Seiza.";
                if (window.shinobiAudio) window.shinobiAudio.playGong();
            }
        }, 1000);
    });
}

/* ============================================================
   10. TESTIMONIALS & VIRTUES
   ============================================================ */
function initTestimonialsAndVirtues() {
    const testContainer = document.getElementById("testimonials-grid");
    if (testContainer) {
        testContainer.innerHTML = NCA_DATA.testimonials.map(t => `
            <div class="testimonial-card glass-panel">
                <div class="test-rating">${"★".repeat(t.rating)}</div>
                <p class="test-quote">"${t.quote}"</p>
                <div class="test-author">
                    <div class="test-avatar">${t.name.charAt(0)}</div>
                    <div>
                        <strong class="test-name">${t.name}</strong>
                        <span class="test-meta">${t.rank} • ${t.location}</span>
                    </div>
                </div>
            </div>
        `).join("");
    }

    const virtuesContainer = document.getElementById("virtues-grid");
    if (virtuesContainer) {
        virtuesContainer.innerHTML = NCA_DATA.virtues.map(v => `
            <div class="virtue-card glass-panel">
                <span class="virtue-kanji">${v.kanji}</span>
                <h4 class="virtue-title">${v.virtue}</h4>
                <p class="virtue-desc">${v.desc}</p>
            </div>
        `).join("");
    }
}

/* ============================================================
   11. FAQ ACCORDION
   ============================================================ */
function initFAQ() {
    const container = document.getElementById("faq-accordion");
    if (!container) return;

    container.innerHTML = NCA_DATA.faqs.map((faq, i) => `
        <div class="faq-item glass-panel ${i === 0 ? "active" : ""}">
            <button class="faq-question-btn" aria-expanded="${i === 0}">
                <span>${faq.q}</span>
                <span class="faq-icon">${i === 0 ? "−" : "+"}</span>
            </button>
            <div class="faq-answer-pane" style="${i === 0 ? "display: block;" : "display: none;"}">
                <p>${faq.a}</p>
            </div>
        </div>
    `).join("");

    container.querySelectorAll(".faq-question-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const item = btn.parentElement;
            const answer = item.querySelector(".faq-answer-pane");
            const icon = btn.querySelector(".faq-icon");
            const isOpen = item.classList.contains("active");

            // Close all
            container.querySelectorAll(".faq-item").forEach(other => {
                other.classList.remove("active");
                other.querySelector(".faq-answer-pane").style.display = "none";
                other.querySelector(".faq-icon").innerText = "+";
                other.querySelector(".faq-question-btn").setAttribute("aria-expanded", "false");
            });

            if (!isOpen) {
                item.classList.add("active");
                answer.style.display = "block";
                icon.innerText = "−";
                btn.setAttribute("aria-expanded", "true");
                if (window.shinobiAudio) window.shinobiAudio.playClick();
            }
        });
    });
}

/* ============================================================
   12. PRICING TOGGLE (MONTHLY VS QUARTERLY)
   ============================================================ */
function initPricing() {
    const toggle = document.getElementById("pricing-period-toggle");
    if (!toggle) return;

    const priceOnline = document.getElementById("price-online");
    const priceOffline = document.getElementById("price-offline");
    const priceMastery = document.getElementById("price-mastery");
    const priceYouth = document.getElementById("price-youth");

    const pData = NCA_DATA.pricing;

    function updatePrices(isQuarterly) {
        if (priceOnline) priceOnline.innerText = isQuarterly ? `₹${pData.online.quarterly}` : `₹${pData.online.monthly}`;
        if (priceOffline) priceOffline.innerText = isQuarterly ? `₹${pData.offline.quarterly}` : `₹${pData.offline.monthly}`;
        if (priceMastery) priceMastery.innerText = isQuarterly ? `₹${pData.mastery.quarterly}` : `₹${pData.mastery.monthly}`;
        if (priceYouth) priceYouth.innerText = isQuarterly ? `₹${pData.youth.quarterly}` : `₹${pData.youth.monthly}`;

        document.querySelectorAll(".price-period-label").forEach(el => {
            el.innerText = isQuarterly ? "/ 3 Months (15% OFF)" : "/ Month";
        });
    }

    toggle.addEventListener("change", (e) => {
        updatePrices(e.target.checked);
        if (window.shinobiAudio) window.shinobiAudio.playClick();
    });

    document.querySelectorAll(".btn-enroll-plan").forEach(btn => {
        btn.addEventListener("click", () => {
            const plan = btn.getAttribute("data-plan");
            openBookingModal(`Enrollment: ${plan}`);
        });
    });
}

/* ============================================================
   13. SENSEI AI ASSISTANT CHAT
   ============================================================ */
function initSenseiAI() {
    const widget = document.getElementById("sensei-chat-widget");
    const toggleBtn = document.getElementById("sensei-chat-toggle");
    const closeBtn = document.getElementById("sensei-chat-close");
    const msgList = document.getElementById("sensei-messages");
    const input = document.getElementById("sensei-input");
    const sendBtn = document.getElementById("sensei-send-btn");
    const chipBtns = document.querySelectorAll(".prompt-chip");

    if (!widget || !toggleBtn) return;

    function openChat() {
        widget.classList.add("open");
        toggleBtn.classList.add("hidden");
        if (window.shinobiAudio) window.shinobiAudio.playShurikenThrow();
        input.focus();
    }

    function closeChat() {
        widget.classList.remove("open");
        toggleBtn.classList.remove("hidden");
        if (window.shinobiAudio) window.shinobiAudio.playClick();
    }

    toggleBtn.addEventListener("click", openChat);
    if (closeBtn) closeBtn.addEventListener("click", closeChat);

    function appendMessage(sender, text, isAction = false) {
        const msg = document.createElement("div");
        msg.className = `chat-msg ${sender}`;
        msg.innerHTML = `
            <div class="msg-bubble">${text}</div>
            ${isAction ? `
                <div class="msg-actions">
                    <a href="https://wa.me/918865839038?text=${encodeURIComponent(text)}" target="_blank" class="chat-wa-link">
                        <span>💬 Message Sensei Dhruv on WhatsApp</span>
                    </a>
                </div>
            ` : ''}
        `;
        msgList.appendChild(msg);
        msgList.scrollTop = msgList.scrollHeight;
    }

    function answerQuery(query) {
        const lower = query.toLowerCase();
        let matched = null;

        for (const item of NCA_DATA.aiKnowledgeBase) {
            if (item.keywords.some(k => lower.includes(k))) {
                matched = item.response;
                break;
            }
        }

        if (!matched) {
            matched = "Thank you for asking! Sensei Ninja Dhruv teaches traditional Japanese Ninjutsu, Kenjutsu sword, Taijutsu body mechanics, and street survival at the Mathura Honbu Dojo and global online live stream. You can also message him directly on WhatsApp at +91 8865839038.";
        }

        setTimeout(() => {
            appendMessage("sensei", matched, true);
            if (window.shinobiAudio) window.shinobiAudio.playHyoshigi();
        }, 450);
    }

    function handleSend() {
        const text = input.value.trim();
        if (!text) return;
        appendMessage("user", text);
        input.value = "";
        answerQuery(text);
    }

    if (sendBtn) sendBtn.addEventListener("click", handleSend);
    if (input) {
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") handleSend();
        });
    }

    chipBtns.forEach(chip => {
        chip.addEventListener("click", () => {
            const prompt = chip.getAttribute("data-prompt");
            appendMessage("user", prompt);
            answerQuery(prompt);
        });
    });
}

/* ============================================================
   14. BOOKING & FREE TRIAL MODAL
   ============================================================ */
function initBookingModal() {
    const modal = document.getElementById("booking-modal");
    const closeBtn = document.getElementById("modal-close-btn");
    const form = document.getElementById("booking-form");
    const successView = document.getElementById("booking-success");
    const programInput = document.getElementById("modal-program-input");

    if (!modal) return;

    window.openBookingModal = function(preferredProgram = "1-Day Free Trial Class") {
        modal.classList.add("active");
        if (programInput) programInput.value = preferredProgram;
        if (successView) successView.style.display = "none";
        if (form) form.style.display = "block";
        if (window.shinobiAudio) window.shinobiAudio.playSwordSlash();
    };

    function closeModal() {
        modal.classList.remove("active");
        if (window.shinobiAudio) window.shinobiAudio.playClick();
    }

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    // All elements with .trigger-booking
    document.querySelectorAll(".trigger-booking").forEach(el => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            const program = el.getAttribute("data-program") || "1-Day Free Trial Session";
            openBookingModal(program);
        });
    });

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("book-name").value;
            const phone = document.getElementById("book-phone").value;
            const mode = document.getElementById("book-mode").value;
            const date = document.getElementById("book-date").value;
            const notes = document.getElementById("book-notes").value;
            const program = programInput ? programInput.value : "Ninja Combat Academy Program";

            // Format message for WhatsApp
            const waMsg = `🥋 *New Ninja Combat Academy Registration*\n` +
                          `• Student Name: ${name}\n` +
                          `• Phone: ${phone}\n` +
                          `• Training Mode: ${mode}\n` +
                          `• Program / Slot: ${program}\n` +
                          `• Preferred Date: ${date || 'Flexible'}\n` +
                          `• Goal / Notes: ${notes || 'None'}`;

            const waLink = `https://wa.me/918865839038?text=${encodeURIComponent(waMsg)}`;

            form.style.display = "none";
            successView.style.display = "block";
            successView.innerHTML = `
                <div class="booking-success-card">
                    <div class="success-icon">🥷</div>
                    <h3>Registration Initiated, ${name}!</h3>
                    <p>Your session details for <strong>${program}</strong> (${mode}) have been prepared.</p>
                    <p>To confirm your slot with Sensei Ninja Dhruv instantly, tap the button below to dispatch via WhatsApp:</p>
                    <a href="${waLink}" target="_blank" class="btn-primary btn-wa-dispatch" id="btn-wa-confirm">
                        <span>💬 Confirm on WhatsApp (+91 8865839038)</span>
                    </a>
                    <button class="btn-outline" id="btn-modal-done" style="margin-top: 12px;">Close</button>
                </div>
            `;

            document.getElementById("btn-modal-done").addEventListener("click", closeModal);
            if (window.shinobiAudio) window.shinobiAudio.playGong();
        });
    }
}


/* ============================================================
   15. 3D WEBGL BLADE FORGE CONTROLLER
   ============================================================ */
function init3DForge() {
    const viewport = document.getElementById("three-katana-viewport");
    if (!viewport || typeof Shinobi3DArmory === "undefined") return;

    window.threeForge = new Shinobi3DArmory("three-katana-viewport");

    // Weapon Pills
    document.querySelectorAll(".weapon-pill-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".weapon-pill-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const wType = btn.getAttribute("data-weapon");
            window.threeForge.setWeapon(wType);
        });
    });

    // Steel Selector
    document.querySelectorAll(".steel-select-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".steel-select-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const steel = btn.getAttribute("data-steel");
            window.threeForge.setSteel(steel);
        });
    });

    // Flourish button
    const flourishBtn = document.getElementById("btn-3d-flourish");
    if (flourishBtn) {
        flourishBtn.addEventListener("click", () => {
            window.threeForge.flourish();
        });
    }

    // Auto rotate toggle
    const autoRotateBtn = document.getElementById("btn-3d-autorotate");
    if (autoRotateBtn) {
        autoRotateBtn.addEventListener("click", () => {
            if (window.threeForge.controls) {
                window.threeForge.controls.autoRotate = !window.threeForge.controls.autoRotate;
                autoRotateBtn.classList.toggle("active", window.threeForge.controls.autoRotate);
                if (window.shinobiAudio) window.shinobiAudio.playClick();
            }
        });
    }
}

/* ============================================================
   16. SHINOBI BLADE SLICER COMBAT ARENA CONTROLLER
   ============================================================ */
function initBladeGame() {
    const canvas = document.getElementById("blade-combat-canvas");
    if (!canvas || typeof ShinobiBladeGame === "undefined") return;

    window.bladeGame = new ShinobiBladeGame("blade-combat-canvas");

    const startBtn = document.getElementById("btn-start-blade-game");
    const pauseBtn = document.getElementById("btn-pause-blade-game");

    if (startBtn) {
        startBtn.addEventListener("click", () => {
            window.bladeGame.start();
            startBtn.innerText = "Restart Blade Drill";
            if (pauseBtn) pauseBtn.style.display = "inline-flex";
        });
    }

    if (pauseBtn) {
        pauseBtn.addEventListener("click", () => {
            if (window.bladeGame.isRunning) {
                window.bladeGame.stop();
                pauseBtn.innerText = "Resume Slicing";
            } else {
                window.bladeGame.isRunning = true;
                window.bladeGame.loop();
                pauseBtn.innerText = "Pause";
            }
        });
    }
}

/* ============================================================
   17. 9 KUJI-IN MANDALA NEXUS CONTROLLER
   ============================================================ */
function initKujiNexus() {
    const grid = document.getElementById("kuji-grid");
    if (!grid || !NCA_DATA.kujiIn) return;

    grid.innerHTML = NCA_DATA.kujiIn.map((k, idx) => `
        <div class="kuji-card glass-panel" data-kuji-index="${idx}">
            <div class="kuji-card-kanji">${k.kanji}</div>
            <h3 class="kuji-card-title">${k.syllable} — ${k.meaning}</h3>
            <span class="kuji-card-chakra">${k.chakra}</span>
            <p class="kuji-card-desc">${k.guidance}</p>
        </div>
    `).join("");

    grid.querySelectorAll(".kuji-card").forEach(card => {
        card.addEventListener("click", () => {
            const idx = parseInt(card.getAttribute("data-kuji-index"));
            const sealData = NCA_DATA.kujiIn[idx];
            if (window.shinobiKujiNexus) {
                window.shinobiKujiNexus.openSeal(sealData);
            }
        });
    });
}

/* ============================================================
   18. GLOBAL SHINOBI NETWORK LIVE MAP & RADAR
   ============================================================ */
function initGlobalNetwork() {
    const grid = document.getElementById("network-grid");
    if (!grid || !NCA_DATA.globalNetwork) return;

    grid.innerHTML = NCA_DATA.globalNetwork.map(node => {
        const isHonbu = node.role.includes("Headquarters");
        return `
            <div class="network-node-card glass-panel ${isHonbu ? 'honbu-node' : ''}">
                <div class="node-header">
                    <span class="node-city">${node.city}</span>
                    <span class="ping-pulse-dot" title="Active Connection"></span>
                </div>
                <span class="node-role">${node.role} • ${node.country}</span>
                <div class="node-status-text" style="font-size: 0.8rem; color: #06d6a0; margin-bottom: 8px;">
                    ● ${node.status}
                </div>
                <div class="node-stats-row">
                    <span>Active Shinobi: <strong>${node.activeShinobi} Trainees</strong></span>
                    <span>Coordinates: <strong>${node.lat.toFixed(2)}°N</strong></span>
                </div>
            </div>
        `;
    }).join("");
}

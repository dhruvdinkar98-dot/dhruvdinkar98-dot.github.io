// Ninja Combat Academy - Master Curricula & Academy Data Store
// Founder: Ninja Dhruv (Black Belt 3rd Dan) | Mathura Honbu Dojo & Global Online

const NCA_DATA = {
    academy: {
        name: "Ninja Combat Academy",
        kanji: "忍者戦闘道場",
        tagline: "The Ancient Art of the Shinobi. Forged for Modern Reality.",
        founder: "Ninja Dhruv",
        credentials: "Black Belt 3rd Dan | Master of Traditional Japanese Systems & Tactical Combat",
        phone: "+91 8865839038",
        whatsapp: "918865839038",
        email: "ninjadhruva@gmail.com",
        dojoLocation: "Om Nagar Colony, Near Lakhan Halwai, Mathura, Uttar Pradesh - 281001, India",
        rating: 4.9,
        reviewCount: 380,
        graduatesTrained: 5200,
        yearsActive: "10+ Years",
        accreditations: ["Bujinkan Inspired System", "All-India Martial Federation Partner", "International Shinobi Rank Registry"]
    },

    founderBio: {
        name: "Sensei Ninja Dhruv",
        rank: "Sandan (3rd Dan Black Belt)",
        summary: "A dedicated practitioner and pioneer of traditional Japanese warrior arts in India. With over a decade of continuous study across classical Ninjutsu, Kenjutsu, and modern tactical combat systems, Ninja Dhruv founded the Ninja Combat Academy to bridge timeless martial discipline, stealth science, and practical modern personal protection.",
        quote: "True Ninjutsu is not violence; it is the art of surviving, enduring, and remaining centered when chaos surrounds you. In the ancient texts, 'Nin' (忍) means perseverance under the edge of a blade. We don't build fighters—we forge disciplined, unstoppable human spirits.",
        pillars: [
            { title: "Authentic Lineage Synthesis", desc: "Rooted in the historical 18 disciplines of the Iga and Kōga traditions, adapted for modern reality." },
            { title: "Fudōshin (The Immovable Mind)", desc: "Mental training to eliminate panic, freeze response, and emotional instability under real threat." },
            { title: "Real-World Tactical Efficacy", desc: "No choreographed Hollywood theatrics. Every strike, lock, roll, and evade is pressure-tested." },
            { title: "Inclusive Warrior Culture", desc: "Accessible pathways for total beginners, women's self-defense, youth character building, and elite black belts." }
        ]
    },

    disciplines: [
        {
            id: "taijutsu",
            category: "unarmed",
            name: "Taijutsu (Body Mechanics)",
            kanji: "体術",
            translation: "Unarmed Combat Art",
            badge: "Core Foundation",
            summary: "The foundational empty-hand fighting system consisting of bone-striking (Dakentaijutsu), joint locks & throws (Jūtaijutsu), and silent rolls (Taihenjutsu).",
            syllabus: ["Ukemi (breakfalls on hard concrete)", "Boshiken thumb strikes to vitals", "Omote Gyaku wrist reversal locks", "Ganseki Nage rock throws"],
            image: "assets/images/ai_taijutsu_defense_light.jpg"
        },
        {
            id: "kenjutsu",
            category: "bladed",
            name: "Kenjutsu & Shinobigatana",
            kanji: "剣術",
            translation: "Shinobi Sword Combat",
            badge: "Weapons Mastery",
            summary: "Mastery of the straight-bladed ninja sword and quick-draw Iaijutsu. Focuses on confined space defense, silent draws, reverse grips, and blade deflection.",
            syllabus: ["Happō Giri (8-directional cut arcs)", "Battojutsu fast-draw defense", "Saya (scabbard) striking & thrusts", "Dual-blade kamae stances"],
            image: "assets/images/ai_hero_katana_light.jpg"
        },
        {
            id: "shinobijutsu",
            category: "stealth",
            name: "Shinobijutsu & Onmitsu Hohō",
            kanji: "忍び術",
            translation: "Stealth & Infiltration",
            badge: "Stealth Science",
            summary: "Silent movement mechanics (Shinobi Aruki, Fox Walk), environmental sound masking, low-light navigation, and urban camouflage.",
            syllabus: ["Yokobashiri (sideways shadow glide)", "Nightingale floor bypass footwork", "Blind corner entry & tactical slicing", "Acoustic camouflage techniques"],
            image: "assets/images/ai_dojo_tatami_light.jpg"
        },
        {
            id: "bojutsu",
            category: "weapons",
            name: "Bōjutsu & Hanbōjutsu",
            kanji: "棒術",
            translation: "Staff & Cane Fighting",
            badge: "Distance Control",
            summary: "The devastating art of the long staff (Rokushakubō - 6ft) and short walking staff (Hanbō - 3ft). The ultimate everyday item for real-world self-defense.",
            syllabus: ["Leverage disarms against blades", "Rapid sweeping leg sweeps (Ashi Barai)", "Wrist lock transitions with short stick", "Mid-range circular barrier spinning"],
            image: "assets/images/ai_bojutsu_staff_light.jpg"
        },
        {
            id: "shurikenjutsu",
            category: "weapons",
            name: "Shurikenjutsu & Throwing Spikes",
            kanji: "手裏剣術",
            translation: "Concealed Throwing Blades",
            badge: "Precision & Trajectory",
            summary: "Precision projectile throwing with 4-point diamond Senban plates and straight steel spikes (Bō-shuriken). Used to break enemy guard and control distance.",
            syllabus: ["Jikida straight-line spike throws", "Senban flick throws from concealment", "Moving projectile accuracy drills", "Multi-target psychological disruption"],
            image: "assets/images/ai_kenjutsu_duel_light.jpg"
        },
        {
            id: "seishinteki",
            category: "mind",
            name: "Seishinteki Kyōyō & Fudōshin",
            kanji: "精神的教養",
            translation: "Spiritual Fortitude & Mindset",
            badge: "Warrior Spirit",
            summary: "Cultivating an immovable spirit (Fudōshin) that does not falter in crisis. Incorporates Kuji-in meditation, breath control (Tanden Kokyū), and tactical composure.",
            syllabus: ["The 9 Kuji-in mudra hand seals", "Stress inoculation breathing drills", "De-escalation verbal psychology", "Bushido code & ethical warrior creed"],
            image: "assets/images/ai_scroll_wisdom_light.jpg"
        },
        {
            id: "gotonpo",
            category: "stealth",
            name: "Goton-pō (5 Elemental Escapes)",
            kanji: "五遁法",
            translation: "Elemental Evasion",
            badge: "Survival Science",
            summary: "The ancient tactical principles of using Water (Suiton), Fire/Smoke (Katon), Trees/Wood (Mokuton), Earth (Doton), and Metal (Kinaton) to break pursuit.",
            syllabus: ["Smoke screen tactical exits", "Urban obstacle vaulting (Parkour)", "Terrain contour shadow blending", "Acoustic distraction deployment"],
            image: "assets/images/ai_meditation_zen_light.jpg"
        },
        {
            id: "tantojutsu",
            category: "bladed",
            name: "Tantōjutsu & Kunai Combat",
            kanji: "短刀術",
            translation: "Tactical Dagger Defense",
            badge: "Close Quarters",
            summary: "Close-quarters short-blade manipulation, edged weapon defense, redirection of incoming thrusts, and disarming tactics against street violence.",
            syllabus: ["Deflection angles against knife thrusts", "Reverse-grip edge control", "Joint hyperextensions with blade spine", "Non-lethal restraint submissions"],
            image: "assets/images/ai_founder_sensei_light.jpg"
        },
        {
            id: "kusarigama",
            category: "weapons",
            name: "Kusarigamajutsu & Chain Weapons",
            kanji: "鎖鎌術",
            translation: "Chain & Flexible Weapons",
            badge: "Advanced Traditional",
            summary: "Classical weighted chain and sickle weapons (Kusarigama, Manriki-gusari). Entangles sword strikes and neutralizes reach advantages at medium range.",
            syllabus: ["Weighted chain spinning trajectories", "Sword blade entrapment & disarms", "Flexible cord body wraps & takedowns", "Kyoketsu-shōge chord manipulation"],
            image: "assets/images/ai_bojutsu_staff_light.jpg"
        },
        {
            id: "tactical_combat",
            category: "tactical",
            name: "Modern Tactical Self-Defense",
            kanji: "実戦護身術",
            translation: "Reality-Based Street Defense",
            badge: "Modern Application",
            summary: "Seamlessly combining Ninjutsu principles with modern MMA, Krav Maga, and tactical awareness. Designed for real-life attacks, multiple assailants, and grabs.",
            syllabus: ["360° situational threat scanning", "Anti-grapple defense against heavier attackers", "Improvised weapon defense (keys, pens, belt)", "Women's assertive defense protocols"],
            image: "assets/images/ai_taijutsu_defense_light.jpg"
        }
    ],

    weapons: [
        {
            id: "katana",
            name: "Shinobigatana / Katana",
            kanji: "忍刀・日本刀",
            type: "Primary Edged Weapon",
            length: "Blade: 48-60 cm | Hilt: 26 cm",
            weight: "850g - 1100g",
            material: "Hand-forged High Carbon Steel / Wooden Bokken for Training",
            role: "Precision cutting, rapid unsheathing (Battojutsu), deflecting polearms.",
            description: "Unlike the long curved katana of the samurai, the shinobi utilized a shorter, straighter blade optimized for tight corridors, dense brush, and rapid one-handed draws. Its large square guard (tsuba) served as an emergency stepping rung to scale castle parapets.",
            tacticalNote: "In academy training, students begin with authentic Japanese Red Oak Bokken and foam sparring blades before progressing to unsharpened Iaito."
        },
        {
            id: "shuriken",
            name: "Senban Shuriken & Bō-Shuriken",
            kanji: "手裏剣",
            type: "Concealed Projectile",
            length: "Senban: 8.5 cm wide | Bō: 16 cm pin",
            weight: "65g - 90g each",
            material: "Spring Steel Plates / Tempered Iron Spikes",
            role: "Distraction, breaking attacker momentum, targeting sensory points.",
            description: "Historical ninja carried senban (four-point flat throwing stars) hidden inside their gi chest folds. Thrown with a sharp wrist snap rather than wide arm swings, they served to disrupt an opponent's vision or movement.",
            tacticalNote: "Training utilizes safe rubberized throwing stars and safety-edge steel plates on custom wooden dojo targets."
        },
        {
            id: "kunai",
            name: "Kunai (Multi-Purpose Wedge)",
            kanji: "苦無",
            type: "Utility & Close-Quarters Edged",
            length: "28 cm - 35 cm",
            weight: "320g",
            material: "Heavy Gauge Forged Carbon Steel",
            role: "Prying barriers, climbing handhold, devastating close-range thrusts.",
            description: "Derived from an ancient Japanese stonemason and farming trowel, allowing ninja to carry it openly without drawing suspicion. Its ring pommel was lashed with climbing ropes for scaling masonry walls.",
            tacticalNote: "Practiced for close-quarters grappling transitions and reverse-grip hook parries."
        },
        {
            id: "hanbo",
            name: "Hanbō (Three-Foot Short Staff)",
            kanji: "半棒",
            type: "Impact & Leverage Weapon",
            length: "90 cm (3 feet) | Diameter: 2.8 cm",
            weight: "450g",
            material: "Solid Japanese White Oak (Shirogashi)",
            role: "Bone-locking, joint manipulation, anti-knife disarms.",
            description: "Legend holds that the Hanbō was born when a samurai's spear was cleaved in two during battle. The shinobi adapted the broken piece into a lethal close-range leverage tool resembling a common gentleman's walking cane.",
            tacticalNote: "Highly recommended for practical modern self-defense, as umbrella or cane mechanics transfer directly."
        },
        {
            id: "kusarigama",
            name: "Kusarigama (Chain & Sickle)",
            kanji: "鎖鎌",
            type: "Flexible Entanglement Weapon",
            length: "Sickle: 30 cm | Chain: 2.5 meters | Weight: 250g iron ball",
            weight: "750g total",
            material: "Tempered Steel & Hand-Linked Iron Chain",
            role: "Disarming long weapons, sweeping legs, unpredictable mid-range arcs.",
            description: "One of the most complex weapons in feudal Japanese warfare. The whirling weight keeps armed samurai at bay, snaring their weapon, while the sickle closes in for a decisive finish.",
            tacticalNote: "Students train with padded foam sickles and soft weighted cord to master rotational physics and spatial distancing (Ma-ai)."
        },
        {
            id: "makibishi",
            name: "Makibishi (Caltrop Spikes)",
            kanji: "撒菱",
            type: "Tactical Denial & Retreat",
            length: "3.5 cm 4-pointed pyramid",
            weight: "15g each",
            material: "Forged Iron / Dried Water Chestnuts (Tennenbishi)",
            role: "Halting pursuers, perimeter defense, psychological control.",
            description: "Engineered with four geometric points so that no matter how it falls, one sharp spike remains pointed straight upward. Thrown behind during a tactical retreat.",
            tacticalNote: "Studied conceptually in the academy's tactical movement and perimeter security curriculum."
        }
    ],

    beltPath: [
        {
            belt: "White Belt",
            rank: "10th - 9th Kyū",
            title: "Minarai (見習 - The Initiate)",
            colorHex: "#e2e8f0",
            duration: "Months 1 - 3",
            requirements: "Dojo etiquette, Seiza kneeling meditation, basic Shizen & Ichimonji stances, forward and backward ukemi (rolls), fundamental breathing."
        },
        {
            belt: "Yellow Belt",
            rank: "8th - 7th Kyū",
            title: "Deshi (弟子 - The Student)",
            colorHex: "#ffd166",
            duration: "Months 4 - 6",
            requirements: "Dakentaijutsu striking basics (fist, open palm, elbow), Hanbo short staff grip and striking angles, 4 basic joint releases."
        },
        {
            belt: "Green Belt",
            rank: "6th - 5th Kyū",
            title: "Genin (下忍 - Field Practitioner)",
            colorHex: "#06d6a0",
            duration: "Months 7 - 12",
            requirements: "Shinobi Aruki silent walking, Senban shuriken trajectory control, Kenjutsu Happo Giri (8 sword cuts with bokken), basic knife defense."
        },
        {
            belt: "Blue Belt",
            rank: "4th - 3rd Kyū",
            title: "Senshi (戦士 - Tactical Warrior)",
            colorHex: "#118ab2",
            duration: "Year 2",
            requirements: "Full Jūtaijutsu joint locking series (Omote Gyaku, Ura Gyaku, Musha Dori), continuous sparring (Randori), Bōjutsu 6-foot staff katas."
        },
        {
            belt: "Brown Belt",
            rank: "2nd - 1st Kyū",
            title: "Chūnin (中忍 - Senior Operative)",
            colorHex: "#8d5b4c",
            duration: "Year 3",
            requirements: "Battojutsu quick-draw cut-and-re-sheath, multiple assailant combat, Goton-po evasion drills, advanced Kuji-in mental conditioning."
        },
        {
            belt: "Black Belt (1st Dan - Shodan)",
            rank: "1st Dan",
            title: "Jōnin (上忍 - Shinobi Master)",
            colorHex: "#111111",
            border: "#d90429",
            duration: "Years 3 - 4+",
            requirements: "Comprehensive mastery of all 18 disciplines, unannounced blindfold reflex test (Sakki Test), formal combat demonstration, dojo assistant certification."
        },
        {
            belt: "Black Belt (3rd Dan - Sandan)",
            rank: "3rd Dan",
            title: "Shihan / Sensei (師範 - Head Instructor)",
            colorHex: "#000000",
            border: "#e5a93c",
            duration: "Current Rank of Sensei Ninja Dhruv",
            requirements: "Senior instruction mastery, high-level tactical weapon integration, lineage scroll preservation, mentorship of regional dojos."
        }
    ],

    schedules: {
        offline: [
            { day: "Monday", time: "06:30 AM - 08:00 AM", batch: "Morning Warrior", focus: "Taijutsu Striking & Ukemi Breakfalls", location: "Mathura Honbu Dojo" },
            { day: "Monday", time: "05:30 PM - 07:00 PM", batch: "Evening Combat", focus: "Dakentaijutsu & Tactical Defense", location: "Mathura Honbu Dojo" },
            { day: "Tuesday", time: "06:30 AM - 08:00 AM", batch: "Morning Warrior", focus: "Kenjutsu (Katana & Bokken Mastery)", location: "Mathura Honbu Dojo" },
            { day: "Wednesday", time: "05:30 PM - 07:00 PM", batch: "Evening Weapons", focus: "Bōjutsu (Staff) & Hanbō Stick Fighting", location: "Mathura Honbu Dojo" },
            { day: "Thursday", time: "06:30 AM - 08:00 AM", batch: "Conditioning", focus: "Shinobi Agility, Mobility & Obstacles", location: "Mathura Honbu Dojo" },
            { day: "Friday", time: "05:30 PM - 07:30 PM", batch: "Stealth & Tactics", focus: "Shinobijutsu, Knife Defense & Locks", location: "Mathura Honbu Dojo" },
            { day: "Saturday", time: "08:00 AM - 10:30 AM", batch: "Master Intensive", focus: "Open Sparring (Randori) & Belt Tests", location: "Mathura Honbu Dojo" },
            { day: "Sunday", time: "04:00 PM - 05:30 PM", batch: "Youth Shinobi", focus: "Kids Agility, Anti-Bullying & Respect", location: "Mathura Honbu Dojo" }
        ],
        online: [
            { day: "Tuesday", time: "07:30 PM - 08:45 PM IST", batch: "Global Batch A", focus: "Foundations of Ninjutsu & Stance Dynamics", platform: "Live Zoom Dojo" },
            { day: "Thursday", time: "07:30 PM - 08:45 PM IST", batch: "Global Batch A", focus: "Kenjutsu Sword Fundamentals & Angle Cuts", platform: "Live Zoom Dojo" },
            { day: "Saturday", time: "06:30 PM - 08:00 PM IST", batch: "Global Weekend", focus: "Joint Locks, Disarms & Tactical Home Defense", platform: "Live Zoom Dojo" },
            { day: "Sunday", time: "08:00 PM - 09:15 PM IST", batch: "Global Masterclass", focus: "Kuji-in Meditation, Philosophy & Live Q&A", platform: "Live Zoom Dojo" }
        ]
    },

    virtues: [
        { kanji: "義", virtue: "Gi (Rectitude & Integrity)", desc: "Stand unwavering in what is right. The shinobi uses lethal skill only to defend life and restore peace." },
        { kanji: "勇", virtue: "Yū (Courage & Valour)", desc: "True courage is not the absence of fear, but acting with clarity despite fear." },
        { kanji: "仁", virtue: "Jin (Benevolence & Compassion)", desc: "The greatest master avoids conflict whenever possible. Gentleness is born of immense power." },
        { kanji: "礼", virtue: "Rei (Respect & Dojo Etiquette)", desc: "Bow deeply to training partners and adversaries alike. Arrogance precedes defeat." },
        { kanji: "誠", virtue: "Makoto (Honesty & Truth)", desc: "Deception may misdirect enemies, but the warrior's soul must remain brutally honest with itself." },
        { kanji: "名誉", virtue: "Meiyo (Honor & Dignity)", desc: "Act such that your actions bring honor to your teachers, your family, and your art." },
        { kanji: "忠義", virtue: "Chūgi (Loyalty & Commitment)", desc: "Steadfast devotion to the path of self-mastery and brotherhood within the dojo." },
        { kanji: "自制", virtue: "Jisei (Self-Control)", desc: "Subdue anger and impulsiveness. The calm warrior controls the tempo of every battle." },
        { kanji: "忍", virtue: "Nin (Perseverance & Endurance)", desc: "To endure the unendurable. The heart under the blade that never breaks under pressure." }
    ],

    pricing: {
        online: {
            monthly: 1499,
            quarterly: 3825, // 15% discount
            currency: "₹",
            usdEquiv: "$20",
            features: [
                "3 Live Interactive Zoom Sessions per week",
                "Direct Video Correction from Sensei Ninja Dhruv",
                "Access to Online Shinobi Video Vault (120+ tutorials)",
                "Digital Belt Rank Syllabus & Exam Eligibility",
                "Weekly Training Schedule & Drill Checklists",
                "Private Student Community Group Access"
            ]
        },
        offline: {
            monthly: 2499,
            quarterly: 6375, // 15% discount
            currency: "₹",
            usdEquiv: "$35",
            features: [
                "Unlimited Access to Mathura Honbu Dojo sessions",
                "Full use of Mats, Training Weapons & Equipment",
                "Personal 1-on-1 Guidance with Sensei Ninja Dhruv",
                "In-Person Belt Gradings & Official Federation Badges",
                "Full-Contact Sparring & Weapons Drills (Randori)",
                "Outdoor Wilderness & Mountain Survival Camps"
            ]
        },
        mastery: {
            monthly: 3999,
            quarterly: 10199, // 15% discount
            currency: "₹",
            usdEquiv: "$55",
            features: [
                "Complete Hybrid Access (Unlimited Dojo + Live Online)",
                "Accelerated Black Belt Certification Pathway",
                "Personal Monthly Strategy Call with Sensei Dhruv",
                "Official Academy Gi (Uniform) & Wooden Bokken Included",
                "Assistant Instructor Mentorship Program",
                "Priority Registration for National Martial Seminars"
            ]
        },
        youth: {
            monthly: 1799,
            quarterly: 4590, // 15% discount
            currency: "₹",
            usdEquiv: "$25",
            features: [
                "Dedicated Kids & Teens Shinobi Class (Ages 6-15)",
                "Bully-Proofing & Assertive Boundary Setting",
                "Agility, Reflex, Tumbling & Balance Development",
                "Academic Focus, Seiza Concentration & Respect Training",
                "Safe Foam Weapon Practice & Fun Obstacle Courses",
                "Quarterly Progress Report Cards for Parents"
            ]
        }
    },

    testimonials: [
        {
            name: "Rajeshwar Sharma",
            location: "Mathura, UP",
            rank: "Green Belt (Honbu Dojo)",
            quote: "Training directly under Sensei Ninja Dhruv at the Mathura dojo completely changed my physical agility and mental focus. The weapon mechanics with Katana and Hanbo are authentic and practical. This is unlike any commercial karate gym—it is genuine warrior development.",
            rating: 5
        },
        {
            name: "Ananya Deshmukh",
            location: "Mumbai, Maharashtra",
            rank: "Online Shinobi Student",
            quote: "I was skeptical about learning martial arts online, but Sensei Dhruv's zoom breakdowns are crystal clear. His attention to body alignment, joint lock angles, and street defense gave me incredible confidence as a woman living alone in a metro city.",
            rating: 5
        },
        {
            name: "Vikramjit Singh",
            location: "New Delhi",
            rank: "Brown Belt Candidate",
            quote: "Traveled from Delhi to Mathura for the weekend intensive camps. The sparring and sword katas pushed my limits. The dojo atmosphere is disciplined, respectful, and steeped in real Japanese martial culture. 10/10 recommendation.",
            rating: 5
        },
        {
            name: "David M.",
            location: "London, UK",
            rank: "International Online Member",
            quote: "Finding an authentic instructor who teaches traditional Ninjutsu principles alongside modern combat application is rare. Sensei Dhruv breaks down the Bansenshukai concepts and Taijutsu biomechanics with outstanding clarity. Brilliant community!",
            rating: 5
        }
    ],

    faqs: [
        {
            q: "Can complete beginners join with zero martial arts experience?",
            a: "Absolutely! Over 80% of our new students have never practiced a martial art before. We start with fundamental stances, safe breakfalls (Ukemi), and natural body mobility. You progress at your own pace in a supportive, zero-ego environment."
        },
        {
            q: "How effective is the Global Online Shinobi Academy compared to in-person training?",
            a: "Our online system is designed with live bidirectional video cameras where Sensei Ninja Dhruv personally inspects your angles, footwork, and postures in real-time. Students receive homework drills, video feedback, and access to the on-demand library. Many online students visit our Mathura Honbu Dojo for weekend intensive camps and belt gradings."
        },
        {
            q: "What equipment or uniform do I need to start?",
            a: "For your first classes, comfortable athletic clothing (t-shirt and track pants) is all you need. Once enrolled, you will receive recommendations for a traditional black shinobi dōgi (uniform). For weapons training, we begin with safe wooden bokken and padded trainers provided by the academy."
        },
        {
            q: "Where is the physical dojo located, and can I visit before enrolling?",
            a: "Our Honbu Dojo is located at Om Nagar Colony (Near Lakhan Halwai), Mathura, Uttar Pradesh, India. Visitors are welcome! You can book a free 1-day observation or trial class directly through this website or by messaging us on WhatsApp (+91 8865839038)."
        },
        {
            q: "Are the belt ranks and certificates officially recognized?",
            a: "Yes. Ninja Combat Academy awards official rank credentials authenticated by Sensei Ninja Dhruv (3rd Dan Black Belt), aligned with international Bujinkan-inspired standards and partner martial federations in India."
        },
        {
            q: "Is Ninjutsu suitable for women's self-defense?",
            a: "Ninjutsu was historically one of the few martial systems with a dedicated female operative branch (Kunoichi). Because Taijutsu relies on leverage, redirection of momentum, and attacking vulnerable nervous and skeletal weak points rather than raw muscular strength, it is exceptionally effective for women."
        }
    ],

    aiKnowledgeBase: [
        {
            keywords: ["location", "address", "where", "mathura", "dojo", "offline"],
            response: "The Ninja Combat Academy Honbu Dojo is located at Om Nagar Colony (Near Lakhan Halwai), Mathura, Uttar Pradesh - 281001, India. We are easily accessible from Mathura Junction railway station. You can come for in-person training or join our global online live batches!"
        },
        {
            keywords: ["fee", "price", "cost", "pricing", "charge", "tuition", "payment"],
            response: "Our tuition plans start at ₹1,499/month ($20 USD) for Global Online Live training, and ₹2,499/month ($35 USD) for full in-person training at our Mathura Honbu Dojo. We also offer 15% OFF on quarterly plans! You can also book a FREE 1-Day Trial Class."
        },
        {
            keywords: ["founder", "teacher", "sensei", "master", "dhruv", "who"],
            response: "Ninja Combat Academy is founded and mentored by Sensei Ninja Dhruv, a certified 3rd Dan Black Belt specializing in traditional Japanese warrior systems, classical Ninjutsu, Kenjutsu, and modern tactical combat."
        },
        {
            keywords: ["contact", "phone", "number", "whatsapp", "email", "call"],
            response: "You can reach Sensei Ninja Dhruv directly on phone or WhatsApp at +91 8865839038, or email ninjadhruva@gmail.com. We typically respond within an hour!"
        },
        {
            keywords: ["weapon", "katana", "sword", "shuriken", "knife", "staff"],
            response: "We train with 6 primary traditional and tactical weapons: Katana / Shinobigatana, Senban Shuriken, Kunai, Hanbō Short Staff, Bō Long Staff, and Kusarigama. All beginner training starts with safe wooden or padded equipment."
        },
        {
            keywords: ["trial", "free", "demo", "join", "register", "enroll", "admission"],
            response: "You can claim a FREE 1-Day Trial Session right now! Simply click the 'Claim Free Trial' button at the top of the page or message our WhatsApp at +91 8865839038 with your name and preferred batch."
        },
        {
            keywords: ["online", "zoom", "remote", "distance"],
            response: "Yes! Our Global Online Shinobi Academy hosts live interactive sessions over Zoom with Sensei Dhruv every Tuesday, Thursday, Saturday, and Sunday. You get live posture corrections and complete syllabus access from anywhere in the world."
        },
        {
            keywords: ["kids", "child", "teen", "age"],
            response: "We offer the Youth Shinobi Program for kids and teenagers aged 6 to 15. The curriculum focuses on anti-bullying confidence, discipline, coordination, tumbling, respect, and academic concentration."
        }
    ],

    kujiIn: [
        {
            seal: "Rin",
            kanji: "臨",
            syllable: "RIN",
            chakra: "Root / Fudōshin",
            meaning: "Strength of Mind & Body",
            mudra: "Dokko-in (Intertwined hands, index fingers upright touching)",
            mantra: "On baishiraman taya sowaka",
            guidance: "Overcomes fear, panic, and hesitation. Envision an immovable steel root anchoring your spine deep into the earth."
        },
        {
            seal: "Pyō",
            kanji: "兵",
            syllable: "PYO",
            chakra: "Sacral / Energy",
            meaning: "Direction of Inner Life Force (Ki)",
            mudra: "Daikongō-in (Index fingers & thumbs touch upright)",
            mantra: "On ishanaya sowaka",
            guidance: "Channels vital chi into explosive physical agility, reaction speed, and tactical evasion."
        },
        {
            seal: "Tōh",
            kanji: "闘",
            syllable: "TOH",
            chakra: "Solar Plexus / Harmony",
            meaning: "Harmony with the Universe",
            mudra: "Gojishi-in (Fingers intertwined inward, thumbs touching)",
            mantra: "On jiterashi itara jiba ratanō sowaka",
            guidance: "Aligns your heartbeat with the environment so you project zero hostile emotional signature."
        },
        {
            seal: "Sha",
            kanji: "者",
            syllable: "SHA",
            chakra: "Heart / Regeneration",
            meaning: "Healing of Self & Others",
            mudra: "Naishishi-in (Intertwined fingers with index fingers outward)",
            mantra: "On hayabaishiramantaya sowaka",
            guidance: "Accelerates tissue recovery, relieves muscular spasms, and stabilizes autonomic breathing under extreme combat strain."
        },
        {
            seal: "Kai",
            kanji: "皆",
            syllable: "KAI",
            chakra: "Throat / Awareness",
            meaning: "Premonition of Danger (Sakki)",
            mudra: "Gebakuken-in (Interlace all fingers inward tightly)",
            mantra: "On nōmaku sanmanda basaranan kan",
            guidance: "Awakens 360-degree sensory awareness to detect ambushes and incoming weapon trajectories before sight or sound."
        },
        {
            seal: "Jin",
            kanji: "陣",
            syllable: "JIN",
            chakra: "Third Eye / Telepathy",
            meaning: "Reading the Intent of Others",
            mudra: "Naibakuken-in (Fingers crossed inside palms, thumbs touching)",
            mantra: "On aganaya sowaka",
            guidance: "Read the micro-expressions, weight shifts, and breathing rhythms of an adversary to predict their attack."
        },
        {
            seal: "Retsu",
            kanji: "列",
            syllable: "RETSU",
            chakra: "Crown / Dimension",
            meaning: "Mastery of Space, Time & Distance (Ma-ai)",
            mudra: "Chiken-in (Right hand clasped around upright left index)",
            mantra: "On hiroji sowaka",
            guidance: "Control the spatial distance between yourself and the enemy. Dissolves feelings of being trapped or cornered."
        },
        {
            seal: "Zai",
            kanji: "在",
            syllable: "ZAI",
            chakra: "Universal Field",
            meaning: "Control Over the Elements",
            mudra: "Nichirin-in (Hands open with thumbs & index touching)",
            mantra: "On chirichi itara jiba ratanō sowaka",
            guidance: "Commands the elemental principles of Goton-pō: blending seamlessly with fog, darkness, rain, and shadow."
        },
        {
            seal: "Zen",
            kanji: "前",
            syllable: "ZEN",
            chakra: "Void / Satori",
            meaning: "Enlightenment & Absolute Invisibility",
            mudra: "Onkō-in (Left hand clasped over right palm forming empty sphere)",
            mantra: "On arobatano sowaka",
            guidance: "The ultimate state of Mu (Void). To disappear completely not merely by hiding, but by transcending ego and becoming empty."
        }
    ],

    globalNetwork: [
        { city: "Mathura Honbu Dojo", country: "India", role: "Global Headquarters", lat: 27.4924, lng: 77.6737, activeShinobi: 48, status: "Dojo Open • Training Active" },
        { city: "New Delhi / NCR", country: "India", role: "Regional Seminar Hub", lat: 28.6139, lng: 77.2090, activeShinobi: 124, status: "Live Batch Connected" },
        { city: "Mumbai", country: "India", role: "Western Chapter", lat: 19.0760, lng: 72.8777, activeShinobi: 89, status: "Online Stream Active" },
        { city: "Bengaluru", country: "India", role: "Southern Chapter", lat: 12.9716, lng: 77.5946, activeShinobi: 67, status: "Online Stream Active" },
        { city: "Tokyo", country: "Japan", role: "Lineage Research Hub", lat: 35.6762, lng: 139.6503, activeShinobi: 32, status: "Academic Scroll Exchange" },
        { city: "London", country: "United Kingdom", role: "European Division", lat: 51.5074, lng: -0.1278, activeShinobi: 41, status: "Global Stream Connected" },
        { city: "New York", country: "United States", role: "North American Division", lat: 40.7128, lng: -74.0060, activeShinobi: 54, status: "Global Stream Connected" },
        { city: "Sydney", country: "Australia", role: "Oceania Division", lat: -33.8688, lng: 151.2093, activeShinobi: 28, status: "Global Stream Connected" }
    ]
};

window.NCA_DATA = NCA_DATA;

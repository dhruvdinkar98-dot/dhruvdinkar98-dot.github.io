// Ninja Combat Academy - Supercharged Procedural Web Audio Synthesizer
// 100% Procedural Web Audio API - Zero external MP3 files needed!
// Features: Temple Gong, Katana Clash, Blade Whoosh, Shuriken Clink,
// Taiko War Drums, Tibetan Singing Bowl, Smoke Bomb Blast, and Pitch-Bending Bullet-Time.

class ShinobiAudioEngine {
    constructor() {
        this.ctx = null;
        this.isMuted = localStorage.getItem("nca_sound_muted") === "true";
        this.isAmbientPlaying = false;
        this.ambientNodes = null;
        this.taikoInterval = null;
        this.isTaikoPlaying = false;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        localStorage.setItem("nca_sound_muted", this.isMuted);
        if (this.isMuted) {
            if (this.isAmbientPlaying) this.stopAmbient();
            if (this.isTaikoPlaying) this.stopTaikoDrums();
        }
        return this.isMuted;
    }

    // 1. Temple Gong (Bonnō / Kane)
    playGong() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const freqs = [108, 144, 216, 288, 360, 480];
        const gains = [0.55, 0.4, 0.28, 0.16, 0.1, 0.05];

        freqs.forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = i % 2 === 0 ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(freq, now);
            osc.frequency.exponentialRampToValueAtTime(freq * 0.99, now + 3.2);

            gain.gain.setValueAtTime(gains[i], now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.4);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 3.5);
        });
    }

    // 2. Razor Katana Quick-Draw Blade Whoosh
    playSwordSlash(pitchMod = 1.0) {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const bufferSize = Math.floor(this.ctx.sampleRate * 0.22);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.Q.setValueAtTime(3.8, now);
        filter.frequency.setValueAtTime(3400 * pitchMod, now);
        filter.frequency.exponentialRampToValueAtTime(320 * pitchMod, now + 0.2);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.65, now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start(now);
        noise.stop(now + 0.23);

        // Steel Resonance Shimmer
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1450 * pitchMod, now + 0.03);
        osc.frequency.exponentialRampToValueAtTime(450 * pitchMod, now + 0.19);
        oscGain.gain.setValueAtTime(0.18, now + 0.03);
        oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.21);
        osc.connect(oscGain);
        oscGain.connect(this.ctx.destination);
        osc.start(now + 0.03);
        osc.stop(now + 0.21);
    }

    // 3. Steel Blade Metal-on-Metal Clash
    playSwordClash() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const freqs = [1820, 2430, 3120, 4800];
        freqs.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = idx % 2 === 0 ? 'sine' : 'square';
            osc.frequency.setValueAtTime(freq, now);
            osc.frequency.exponentialRampToValueAtTime(freq * 0.7, now + 0.25);

            gain.gain.setValueAtTime(0.25 / (idx + 1), now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.3);
        });

        // Impact spark crack
        const bufferSize = Math.floor(this.ctx.sampleRate * 0.08);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const nGain = this.ctx.createGain();
        nGain.gain.setValueAtTime(0.4, now);
        nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
        noise.connect(nGain);
        nGain.connect(this.ctx.destination);
        noise.start(now);
        noise.stop(now + 0.08);
    }

    // 4. Shuriken Throw & Target Clink
    playShurikenThrow() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1950, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.12);

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.13);

        // Steel Clink
        setTimeout(() => {
            if (this.isMuted || !this.ctx) return;
            const t = this.ctx.currentTime;
            const hit = this.ctx.createOscillator();
            const hGain = this.ctx.createGain();
            hit.type = 'sine';
            hit.frequency.setValueAtTime(2800, t);
            hit.frequency.exponentialRampToValueAtTime(420, t + 0.09);
            hGain.gain.setValueAtTime(0.28, t);
            hGain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
            hit.connect(hGain);
            hGain.connect(this.ctx.destination);
            hit.start(t);
            hit.stop(t + 0.1);
        }, 110);
    }

    // 5. Deep Japanese Taiko War Drum
    playTaikoHit(isHeavy = true) {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const baseFreq = isHeavy ? 62 : 88;
        
        // Membrane sub-bass
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq * 2.2, now);
        osc.frequency.exponentialRampToValueAtTime(baseFreq, now + 0.08);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.8, now + 0.6);

        gain.gain.setValueAtTime(0.7, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

        // Body wood resonance
        const woodOsc = this.ctx.createOscillator();
        const woodGain = this.ctx.createGain();
        woodOsc.type = 'triangle';
        woodOsc.frequency.setValueAtTime(baseFreq * 3.5, now);
        woodOsc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.2);
        woodGain.gain.setValueAtTime(0.3, now);
        woodGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        // Skin slap attack
        const bufferSize = Math.floor(this.ctx.sampleRate * 0.04);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, now);
        const nGain = this.ctx.createGain();
        nGain.gain.setValueAtTime(0.4, now);
        nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        noise.connect(filter);
        filter.connect(nGain);
        nGain.connect(this.ctx.destination);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        woodOsc.connect(woodGain);
        woodGain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.7);
        woodOsc.start(now);
        woodOsc.stop(now + 0.26);
        noise.start(now);
        noise.stop(now + 0.05);
    }

    // 6. Smoke Bomb (Katon) Volumetric Explosion
    playSmokeBomb() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        
        // Low rumble boom
        const boomOsc = this.ctx.createOscillator();
        const boomGain = this.ctx.createGain();
        boomOsc.type = 'sine';
        boomOsc.frequency.setValueAtTime(140, now);
        boomOsc.frequency.exponentialRampToValueAtTime(35, now + 0.8);
        boomGain.gain.setValueAtTime(0.8, now);
        boomGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
        boomOsc.connect(boomGain);
        boomGain.connect(this.ctx.destination);
        boomOsc.start(now);
        boomOsc.stop(now + 0.95);

        // Hissing rushing smoke whoosh
        const bufferSize = Math.floor(this.ctx.sampleRate * 1.4);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.Q.setValueAtTime(1.5, now);
        filter.frequency.setValueAtTime(2200, now);
        filter.frequency.exponentialRampToValueAtTime(180, now + 1.2);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.7, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.35);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start(now);
        noise.stop(now + 1.4);
    }

    // 7. Kuji-In Mystic Singing Bowl Chord
    playSingingBowl(freq = 432) {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const harmonics = [1, 2.02, 3.01, 4.05];
        harmonics.forEach((h, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq * h, now);
            gain.gain.setValueAtTime(0.3 / (idx + 1), now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 3.0);
        });
    }

    // 8. Bullet-Time Slow Motion Pitch Drop
    playSlowMoSound() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.6);

        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.7);
    }

    // 9. Wooden Clapper (Hyōshigi)
    playHyoshigi() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(1150, now);
        osc.frequency.exponentialRampToValueAtTime(750, now + 0.06);

        gain.gain.setValueAtTime(0.38, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.07);
    }

    // 10. Subtle UI Click
    playClick() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(950, now);
        osc.frequency.exponentialRampToValueAtTime(250, now + 0.03);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.035);
    }

    // 11. Meditative Zen Ambient Drone
    startAmbient() {
        if (this.isMuted || this.isAmbientPlaying) return;
        this.init();
        if (!this.ctx) return;

        try {
            const now = this.ctx.currentTime;
            const masterGain = this.ctx.createGain();
            masterGain.gain.setValueAtTime(0.001, now);
            masterGain.gain.linearRampToValueAtTime(0.035, now + 2.0);

            const osc1 = this.ctx.createOscillator();
            osc1.type = 'sine';
            osc1.frequency.setValueAtTime(65.41, now); // C2

            const osc2 = this.ctx.createOscillator();
            osc2.type = 'triangle';
            osc2.frequency.setValueAtTime(98.00, now); // G2

            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(320, now);

            osc1.connect(filter);
            osc2.connect(filter);
            filter.connect(masterGain);
            masterGain.connect(this.ctx.destination);

            osc1.start(now);
            osc2.start(now);

            this.ambientNodes = { osc1, osc2, masterGain };
            this.isAmbientPlaying = true;
        } catch (e) {
            console.warn("Ambient audio waiting for user gesture:", e);
        }
    }

    stopAmbient() {
        if (!this.isAmbientPlaying || !this.ambientNodes) return;
        try {
            const now = this.ctx.currentTime;
            this.ambientNodes.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.8);
            setTimeout(() => {
                if (this.ambientNodes) {
                    this.ambientNodes.osc1.stop();
                    this.ambientNodes.osc2.stop();
                    this.ambientNodes = null;
                }
                this.isAmbientPlaying = false;
            }, 850);
        } catch (e) {
            this.isAmbientPlaying = false;
        }
    }

    toggleAmbient() {
        if (this.isAmbientPlaying) {
            this.stopAmbient();
            return false;
        } else {
            this.startAmbient();
            return true;
        }
    }

    // 12. Rhythmic Taiko War Drum Loop (Toggleable battle cadence!)
    startTaikoDrums() {
        if (this.isMuted || this.isTaikoPlaying) return;
        this.isTaikoPlaying = true;
        let beat = 0;
        this.taikoInterval = setInterval(() => {
            if (!this.isTaikoPlaying) return;
            if (beat % 4 === 0) {
                this.playTaikoHit(true); // Heavy Don
            } else if (beat % 4 === 2) {
                this.playTaikoHit(false); // Medium Ka
            } else if (beat % 4 === 3) {
                this.playHyoshigi();
            }
            beat++;
        }, 380); // ~158 BPM martial cadence
        return true;
    }

    stopTaikoDrums() {
        clearInterval(this.taikoInterval);
        this.isTaikoPlaying = false;
        return false;
    }

    toggleTaikoDrums() {
        if (this.isTaikoPlaying) {
            this.stopTaikoDrums();
            return false;
        } else {
            this.startTaikoDrums();
            return true;
        }
    }
}

window.shinobiAudio = new ShinobiAudioEngine();

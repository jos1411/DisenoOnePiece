// Web Audio API Synthesizer for One Piece Shichibukai sound effects & atmosphere

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.ambientGain && this.ctx) {
      this.ambientGain.gain.setValueAtTime(0, this.ctx.currentTime);
    } else if (!this.isMuted && this.ambientGain && this.ctx && this.isAmbientPlaying) {
      this.ambientGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

public playSound(type: string, options?: { isClick?: boolean }) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const isClick = !!options?.isClick;

      switch (type) {
        case 'sword':
        case 'slash': {
          // Sharp metallic sword slash (Dracule Mihawk / Weevil)
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(isClick ? 1800 : 1300, now);
          osc.frequency.exponentialRampToValueAtTime(isClick ? 120 : 200, now + (isClick ? 0.38 : 0.26));

          const filter = this.ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(2800, now);
          filter.Q.setValueAtTime(4, now);

          gain.gain.setValueAtTime(isClick ? 0.28 : 0.18, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + (isClick ? 0.42 : 0.28));

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + (isClick ? 0.45 : 0.3));

          // Cross-slash secondary resonant blade shimmer
          if (isClick) {
            const osc2 = this.ctx.createOscillator();
            const gain2 = this.ctx.createGain();
            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(2400, now + 0.08);
            osc2.frequency.exponentialRampToValueAtTime(800, now + 0.35);
            gain2.gain.setValueAtTime(0.12, now + 0.08);
            gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
            osc2.connect(gain2);
            gain2.connect(this.ctx.destination);
            osc2.start(now + 0.08);
            osc2.stop(now + 0.4);
          }
          break;
        }

        case 'darkness': {
          // Black Hole gravity vacuum + Barbanegra Zehahaha cadence
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(75, now);
          osc.frequency.linearRampToValueAtTime(35, now + 0.6);

          gain.gain.setValueAtTime(isClick ? 0.32 : 0.22, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

          const filter = this.ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(320, now);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.65);

          // Synthesized Zehahaha laughing formant bursts
          const laughterTimes = [0.15, 0.28, 0.41, 0.54];
          laughterTimes.forEach((t, i) => {
            if (!this.ctx) return;
            const laughOsc = this.ctx.createOscillator();
            const laughGain = this.ctx.createGain();
            laughOsc.type = 'triangle';
            laughOsc.frequency.setValueAtTime(110 + i * 8, now + t);
            laughOsc.frequency.linearRampToValueAtTime(95, now + t + 0.09);

            laughGain.gain.setValueAtTime(0.11, now + t);
            laughGain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.1);

            laughOsc.connect(laughGain);
            laughGain.connect(this.ctx.destination);
            laughOsc.start(now + t);
            laughOsc.stop(now + t + 0.1);
          });
          break;
        }

        case 'circus': {
          // Comedic horn slide + knife swish + Buggy giggle
          const horn = this.ctx.createOscillator();
          const hornGain = this.ctx.createGain();
          horn.type = 'square';
          horn.frequency.setValueAtTime(330, now);
          horn.frequency.linearRampToValueAtTime(495, now + 0.12);
          horn.frequency.linearRampToValueAtTime(280, now + 0.25);

          hornGain.gain.setValueAtTime(0.12, now);
          hornGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
          horn.connect(hornGain);
          hornGain.connect(this.ctx.destination);
          horn.start(now);
          horn.stop(now + 0.32);

          // Fast knife swish flutter
          [0.1, 0.18, 0.26].forEach((t) => {
            if (!this.ctx) return;
            const swish = this.ctx.createOscillator();
            const swishGain = this.ctx.createGain();
            swish.type = 'sawtooth';
            swish.frequency.setValueAtTime(1200, now + t);
            swish.frequency.exponentialRampToValueAtTime(300, now + t + 0.07);
            swishGain.gain.setValueAtTime(0.09, now + t);
            swishGain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.08);
            swish.connect(swishGain);
            swishGain.connect(this.ctx.destination);
            swish.start(now + t);
            swish.stop(now + t + 0.08);
          });
          break;
        }

        case 'room': {
          // High-frequency electronic ROOM expansion + Heartbeat (lub-dub)
          const roomOsc = this.ctx.createOscillator();
          const roomGain = this.ctx.createGain();
          roomOsc.type = 'sine';
          roomOsc.frequency.setValueAtTime(520, now);
          roomOsc.frequency.exponentialRampToValueAtTime(1040, now + 0.22);
          roomOsc.frequency.exponentialRampToValueAtTime(320, now + 0.42);

          roomGain.gain.setValueAtTime(0.18, now);
          roomGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
          roomOsc.connect(roomGain);
          roomGain.connect(this.ctx.destination);
          roomOsc.start(now);
          roomOsc.stop(now + 0.45);

          // Heartbeat lub-dub
          const heartbeats = [0.22, 0.36];
          heartbeats.forEach((t) => {
            if (!this.ctx) return;
            const heartOsc = this.ctx.createOscillator();
            const heartGain = this.ctx.createGain();
            heartOsc.type = 'triangle';
            heartOsc.frequency.setValueAtTime(80, now + t);
            heartOsc.frequency.exponentialRampToValueAtTime(45, now + t + 0.1);
            heartGain.gain.setValueAtTime(0.25, now + t);
            heartGain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.12);
            heartOsc.connect(heartGain);
            heartGain.connect(this.ctx.destination);
            heartOsc.start(now + t);
            heartOsc.stop(now + t + 0.13);
          });
          break;
        }

        case 'heart': {
          // Celestial chime harp + heavy cracking stone
          const harpFreqs = [523.25, 659.25, 783.99, 1046.5];
          harpFreqs.forEach((f, idx) => {
            if (!this.ctx) return;
            const t = idx * 0.05;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(f, now + t);
            gain.gain.setValueAtTime(0.12, now + t);
            gain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.3);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + t);
            osc.stop(now + t + 0.32);
          });

          // Stone cracking crunch
          const crackTime = now + 0.22;
          const bufferSize = this.ctx.sampleRate * 0.18;
          const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
          }
          const noise = this.ctx.createBufferSource();
          noise.buffer = buffer;
          const filter = this.ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(950, crackTime);
          const gain = this.ctx.createGain();
          gain.gain.setValueAtTime(0.2, crackTime);
          gain.gain.exponentialRampToValueAtTime(0.001, crackTime + 0.18);
          noise.connect(filter);
          filter.connect(gain);
          gain.connect(this.ctx.destination);
          noise.start(crackTime);
          break;
        }

        case 'sand': {
          // Violent howling desert wind + sandpaper rasp
          const bufferSize = this.ctx.sampleRate * (isClick ? 0.6 : 0.45);
          const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
          }
          const noise = this.ctx.createBufferSource();
          noise.buffer = buffer;
          const filter = this.ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(450, now);
          filter.frequency.linearRampToValueAtTime(1400, now + 0.25);
          filter.frequency.linearRampToValueAtTime(500, now + 0.45);
          filter.Q.setValueAtTime(2.5, now);

          const gain = this.ctx.createGain();
          gain.gain.setValueAtTime(0.18, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + (isClick ? 0.6 : 0.45));
          noise.connect(filter);
          filter.connect(gain);
          gain.connect(this.ctx.destination);
          noise.start(now);
          break;
        }

        case 'strings': {
          // Puppet wire scrape + Doflamingo Fuffuffu laugh
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(2400, now);
          osc.frequency.exponentialRampToValueAtTime(400, now + 0.22);
          gain.gain.setValueAtTime(0.18, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.25);

          // Fuffuffu staccato saw chuckles
          [0.12, 0.2, 0.28, 0.36].forEach((t) => {
            if (!this.ctx) return;
            const fuf = this.ctx.createOscillator();
            const fufGain = this.ctx.createGain();
            fuf.type = 'sawtooth';
            fuf.frequency.setValueAtTime(320, now + t);
            fuf.frequency.linearRampToValueAtTime(260, now + t + 0.06);
            fufGain.gain.setValueAtTime(0.08, now + t);
            fufGain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.07);
            fuf.connect(fufGain);
            fufGain.connect(this.ctx.destination);
            fuf.start(now + t);
            fuf.stop(now + t + 0.07);
          });
          break;
        }

        case 'paw': {
          // Compressed air PAD! sub-bounce + pacifista laser hum
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(220, now);
          osc.frequency.exponentialRampToValueAtTime(32, now + 0.45);
          gain.gain.setValueAtTime(isClick ? 0.35 : 0.25, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.52);

          // Pacifista tech charging chirp
          const tech = this.ctx.createOscillator();
          const techGain = this.ctx.createGain();
          tech.type = 'sawtooth';
          tech.frequency.setValueAtTime(800, now + 0.1);
          tech.frequency.exponentialRampToValueAtTime(1600, now + 0.28);
          techGain.gain.setValueAtTime(0.07, now + 0.1);
          techGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
          tech.connect(techGain);
          techGain.connect(this.ctx.destination);
          tech.start(now + 0.1);
          tech.stop(now + 0.3);
          break;
        }

        case 'shadow': {
          // Bat fluttering + Moria Kishishishi giggle
          const batOsc = this.ctx.createOscillator();
          const batGain = this.ctx.createGain();
          batOsc.type = 'sawtooth';
          batOsc.frequency.setValueAtTime(160, now);
          batOsc.frequency.linearRampToValueAtTime(80, now + 0.35);
          batGain.gain.setValueAtTime(0.14, now);
          batGain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
          batOsc.connect(batGain);
          batGain.connect(this.ctx.destination);
          batOsc.start(now);
          batOsc.stop(now + 0.4);

          // High pitched Kishishi
          [0.15, 0.24, 0.33].forEach((t, i) => {
            if (!this.ctx) return;
            const kishi = this.ctx.createOscillator();
            const kishiGain = this.ctx.createGain();
            kishi.type = 'triangle';
            kishi.frequency.setValueAtTime(650 + i * 40, now + t);
            kishiGain.gain.setValueAtTime(0.09, now + t);
            kishiGain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.08);
            kishi.connect(kishiGain);
            kishiGain.connect(this.ctx.destination);
            kishi.start(now + t);
            kishi.stop(now + t + 0.08);
          });
          break;
        }

        case 'water': {
          // Gyojin karate surge + water splash
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(85, now);
          osc.frequency.exponentialRampToValueAtTime(360, now + 0.18);
          osc.frequency.exponentialRampToValueAtTime(70, now + 0.45);
          gain.gain.setValueAtTime(0.24, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.52);

          // Splash froth
          const bufferSize = this.ctx.sampleRate * 0.25;
          const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.6;
          }
          const noise = this.ctx.createBufferSource();
          noise.buffer = buffer;
          const filter = this.ctx.createBiquadFilter();
          filter.type = 'highpass';
          filter.frequency.setValueAtTime(1200, now + 0.1);
          const noiseGain = this.ctx.createGain();
          noiseGain.gain.setValueAtTime(0.12, now + 0.1);
          noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
          noise.connect(filter);
          filter.connect(noiseGain);
          noiseGain.connect(this.ctx.destination);
          noise.start(now + 0.1);
          break;
        }

        default: {
          // Default interface click
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(800, now);
          osc.frequency.exponentialRampToValueAtTime(200, now + 0.08);
          gain.gain.setValueAtTime(0.1, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.09);
          break;
        }
      }
    } catch {
      // Audio context catch
    }
  }

  public toggleAmbient(): boolean {
    try {
      this.initContext();
      if (!this.ctx) return false;

      if (this.isAmbientPlaying) {
        if (this.ambientGain) {
          this.ambientGain.gain.setValueAtTime(0, this.ctx.currentTime);
        }
        this.isAmbientPlaying = false;
        return false;
      } else {
        // Grand line deep sea ambient generator
        const bufferSize = this.ctx.sampleRate * 2;
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = this.ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(220, this.ctx.currentTime);

        this.ambientGain = this.ctx.createGain();
        this.ambientGain.gain.setValueAtTime(this.isMuted ? 0 : 0.035, this.ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(this.ambientGain);
        this.ambientGain.connect(this.ctx.destination);

        whiteNoise.start();
        this.isAmbientPlaying = true;
        return true;
      }
    } catch {
      return false;
    }
  }

  public getIsAmbientPlaying(): boolean {
    return this.isAmbientPlaying;
  }
}

export const soundEngine = new SoundEngine();

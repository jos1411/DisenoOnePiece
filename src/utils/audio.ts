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

  public playSound(type: string) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      switch (type) {
        case 'sword':
        case 'slash': {
          // Sharp metallic sword slash (Mihawk / Weevil)
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(1400, now);
          osc.frequency.exponentialRampToValueAtTime(160, now + 0.28);

          const filter = this.ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(2500, now);
          filter.Q.setValueAtTime(3, now);

          gain.gain.setValueAtTime(0.18, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now);
          osc.stop(now + 0.35);
          break;
        }

        case 'sand': {
          // Desert sand friction (Crocodile)
          const bufferSize = this.ctx.sampleRate * 0.4;
          const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
          }
          const noise = this.ctx.createBufferSource();
          noise.buffer = buffer;

          const filter = this.ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(600, now);
          filter.frequency.linearRampToValueAtTime(1200, now + 0.3);

          const gain = this.ctx.createGain();
          gain.gain.setValueAtTime(0.14, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

          noise.connect(filter);
          filter.connect(gain);
          gain.connect(this.ctx.destination);

          noise.start(now);
          break;
        }

        case 'heart': {
          // Charming magical chime (Boa Hancock)
          const osc1 = this.ctx.createOscillator();
          const osc2 = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc1.type = 'sine';
          osc2.type = 'triangle';
          osc1.frequency.setValueAtTime(523.25, now); // C5
          osc1.frequency.exponentialRampToValueAtTime(1046.5, now + 0.25); // C6
          osc2.frequency.setValueAtTime(659.25, now); // E5
          osc2.frequency.exponentialRampToValueAtTime(1318.5, now + 0.25);

          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(this.ctx.destination);

          osc1.start(now);
          osc2.start(now);
          osc1.stop(now + 0.45);
          osc2.stop(now + 0.45);
          break;
        }

        case 'strings': {
          // Sharp puppet string slice (Doflamingo)
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(2200, now);
          osc.frequency.exponentialRampToValueAtTime(350, now + 0.2);

          gain.gain.setValueAtTime(0.16, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.25);
          break;
        }

        case 'paw': {
          // Deep atmospheric Ursus Shock sub-bass (Kuma)
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(180, now);
          osc.frequency.exponentialRampToValueAtTime(35, now + 0.5);

          gain.gain.setValueAtTime(0.28, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.6);
          break;
        }

        case 'shadow': {
          // Eerie shadow distortion (Moria)
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(120, now);
          osc.frequency.linearRampToValueAtTime(240, now + 0.2);
          osc.frequency.linearRampToValueAtTime(90, now + 0.45);

          gain.gain.setValueAtTime(0.14, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.5);
          break;
        }

        case 'water': {
          // Ocean current surge (Jinbe)
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(90, now);
          osc.frequency.exponentialRampToValueAtTime(320, now + 0.2);
          osc.frequency.exponentialRampToValueAtTime(80, now + 0.45);

          gain.gain.setValueAtTime(0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.5);
          break;
        }

        case 'room': {
          // High-tech sphere expansion ROOM (Law)
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(440, now);
          osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);
          osc.frequency.exponentialRampToValueAtTime(220, now + 0.4);

          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.45);
          break;
        }

        case 'darkness': {
          // Tremor & Black Hole gravitational pull (Teach)
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(65, now);
          osc.frequency.linearRampToValueAtTime(40, now + 0.6);

          gain.gain.setValueAtTime(0.24, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.65);
          break;
        }

        case 'circus': {
          // Playful brass fanfare (Buggy)
          const osc1 = this.ctx.createOscillator();
          const osc2 = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc1.type = 'square';
          osc2.type = 'sawtooth';
          osc1.frequency.setValueAtTime(440, now);
          osc1.frequency.setValueAtTime(554.37, now + 0.1);
          osc1.frequency.setValueAtTime(659.25, now + 0.2);

          osc2.frequency.setValueAtTime(220, now);
          osc2.frequency.setValueAtTime(277, now + 0.1);
          osc2.frequency.setValueAtTime(330, now + 0.2);

          gain.gain.setValueAtTime(0.1, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(this.ctx.destination);

          osc1.start(now);
          osc2.start(now);
          osc1.stop(now + 0.4);
          osc2.stop(now + 0.4);
          break;
        }

        default: {
          // Default pirate click/tap
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
      // Audio autoplay or browser context catch
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

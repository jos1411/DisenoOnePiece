import React, { useEffect, useState } from 'react';
import { Shichibukai } from '../data/shichibukai';

interface ModalTransitionOverlayProps {
  warlord: Shichibukai;
  onTransitionComplete?: () => void;
}

export const ModalTransitionOverlay: React.FC<ModalTransitionOverlayProps> = ({ warlord, onTransitionComplete }) => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    // 650ms signature transition before settling on dossier
    const timer = setTimeout(() => {
      setIsActive(false);
      onTransitionComplete?.();
    }, 650);

    return () => clearTimeout(timer);
  }, [warlord, onTransitionComplete]);

  if (!isActive) return null;

  switch (warlord.id) {
    case 'teach': {
      // 🖤 Marshall D. Teach - Seismic Void & Screen Tremor
      return (
        <div className="fixed inset-0 z-60 pointer-events-none flex items-center justify-center overflow-hidden animate-gura-shake">
          {/* Pitch black void explosion */}
          <div className="absolute inset-0 bg-black animate-in fade-in duration-100" />
          <div className="w-[120vmax] h-[120vmax] rounded-full bg-gradient-to-r from-purple-900 via-black to-slate-950 animate-ping opacity-90" />
          <div className="relative text-center z-10 text-white font-mono text-xl sm:text-2xl font-black uppercase tracking-widest text-purple-400 drop-shadow-[0_0_20px_#9333ea]">
            ⚡ GURA GURA & YAMI YAMI ⚡
          </div>
        </div>
      );
    }

    case 'mihawk': {
      // 🦅 Dracule Mihawk - Dual X-Slash Screen Split
      return (
        <div className="fixed inset-0 z-60 pointer-events-none overflow-hidden flex items-center justify-center">
          {/* Crossed Slash 1 (Diagonal Left) */}
          <div
            className="absolute w-[200vmax] h-1.5 bg-gradient-to-r from-transparent via-emerald-300 to-transparent shadow-[0_0_30px_#10b981] animate-in fade-in duration-75"
            style={{ transform: 'rotate(45deg)' }}
          />
          {/* Crossed Slash 2 (Diagonal Right) */}
          <div
            className="absolute w-[200vmax] h-1.5 bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_30px_#06b6d4] animate-in fade-in duration-75"
            style={{ transform: 'rotate(-45deg)' }}
          />
          {/* Flash of green slice light */}
          <div className="absolute inset-0 bg-emerald-500/30 animate-out fade-out duration-500" />
        </div>
      );
    }

    case 'buggy': {
      // 🤡 Buggy - Bara Bara Explosion & Reassembly
      return (
        <div className="fixed inset-0 z-60 pointer-events-none overflow-hidden flex items-center justify-center bg-black/40">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-28 h-36 rounded-lg border-2 border-red-500 bg-amber-100/90 shadow-2xl flex items-center justify-center font-wanted text-xl text-red-700 animate-in zoom-in duration-300"
              style={{
                transform: `rotate(${(i - 4) * 25}deg) translate(${(i - 3.5) * 60}px, ${(i % 2 === 0 ? 1 : -1) * 80}px)`,
              }}
            >
              BARA!
            </div>
          ))}
          <div className="absolute text-5xl animate-bounce">🤡</div>
        </div>
      );
    }

    case 'law': {
      // 💙 Trafalgar Law - Expanding ROOM Scanner Sweep
      return (
        <div className="fixed inset-0 z-60 pointer-events-none flex items-center justify-center overflow-hidden">
          {/* Expanding cyan sphere boundary */}
          <div className="w-[110vmax] h-[110vmax] rounded-full border-4 border-cyan-400 bg-cyan-500/20 shadow-[0_0_80px_#06b6d4,inset_0_0_80px_#06b6d4] animate-in zoom-in duration-500" />
          <div className="absolute font-mono text-cyan-300 text-3xl font-black tracking-widest drop-shadow-[0_0_15px_#06b6d4] uppercase">
            « ROOM »
          </div>
        </div>
      );
    }

    case 'hancock': {
      // 🐍 Boa Hancock - Heart Beam & Petrification Shatter
      return (
        <div className="fixed inset-0 z-60 pointer-events-none flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-stone-700/60 backdrop-grayscale animate-in fade-in duration-200" />
          <div className="text-8xl text-pink-400 animate-ping drop-shadow-[0_0_40px_#f472b6]">
            💖
          </div>
          <div className="absolute inset-0 border-8 border-pink-400/80 shadow-[inset_0_0_60px_#ec4899] animate-pulse" />
        </div>
      );
    }

    case 'crocodile': {
      // 🐊 Sir Crocodile - Full Screen Desert Sandstorm Wall
      return (
        <div className="fixed inset-0 z-60 pointer-events-none overflow-hidden">
          <div
            className="w-[200vw] h-full bg-gradient-to-r from-transparent via-amber-700/75 to-yellow-600/85 backdrop-blur-xs flex items-center justify-center animate-in slide-in-from-left duration-500"
            style={{ transform: 'translateX(-20%)' }}
          >
            <span className="font-display text-4xl text-amber-200 font-extrabold uppercase tracking-widest drop-shadow-[0_0_20px_#f59e0b]">
              🌪️ SUNA SUNA NO MI
            </span>
          </div>
        </div>
      );
    }

    case 'doflamingo': {
      // 🧵 Donquixote Doflamingo - Puppeteer Ceiling Strings Snap
      return (
        <div className="fixed inset-0 z-60 pointer-events-none overflow-hidden flex justify-around">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="w-0.5 h-full bg-gradient-to-b from-white via-fuchsia-300 to-transparent shadow-[0_0_10px_#d946ef] animate-in slide-in-from-top duration-300"
              style={{ animationDelay: `${i * 0.025}s` }}
            />
          ))}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-3xl font-black text-fuchsia-400 tracking-wider bg-black/80 px-6 py-2 rounded-xl border border-fuchsia-500">
            ITO ITO : MARIONETTE
          </div>
        </div>
      );
    }

    case 'kuma': {
      // 🐻 Bartholomew Kuma - Massive Paw Shockwave Punch
      return (
        <div className="fixed inset-0 z-60 pointer-events-none flex items-center justify-center overflow-hidden">
          <div className="w-[130vmax] h-[130vmax] rounded-full border-8 border-rose-400/90 bg-rose-500/25 shadow-[0_0_100px_#f43f5e] animate-in zoom-in duration-300" />
          <div className="absolute text-9xl text-rose-300 animate-ping">
            🐾
          </div>
        </div>
      );
    }

    case 'moria': {
      // 🦎 Gecko Moria - Swarm of Shadow Bats
      return (
        <div className="fixed inset-0 z-60 pointer-events-none overflow-hidden flex items-center justify-center bg-purple-950/40">
          {[...Array(16)].map((_, i) => (
            <span
              key={i}
              className="absolute text-4xl text-black select-none animate-in fade-in duration-300"
              style={{
                top: `${20 + (i * 4)}%`,
                left: `${10 + (i * 5)}%`,
                transform: `scale(${1 + (i % 3) * 0.5}) rotate(${(i - 8) * 15}deg)`,
              }}
            >
              🦇
            </span>
          ))}
          <div className="absolute font-mono text-purple-400 text-2xl font-black tracking-widest bg-black/80 px-4 py-1 rounded border border-purple-600">
            KAGE KAGE NO MI
          </div>
        </div>
      );
    }

    case 'jinbe': {
      // 🐟 Jinbe - Giant Tidal Ocean Whirlpool
      return (
        <div className="fixed inset-0 z-60 pointer-events-none flex items-center justify-center overflow-hidden">
          <div className="w-[120vmax] h-[120vmax] rounded-full border-8 border-cyan-400/80 bg-blue-900/40 shadow-[0_0_80px_#06b6d4] animate-spin origin-center" />
          <div className="absolute font-display text-4xl text-cyan-200 font-extrabold uppercase tracking-widest drop-shadow-[0_0_20px_#06b6d4]">
            🌊 GYOJIN KARATE 🌊
          </div>
        </div>
      );
    }

    default:
      return null;
  }
};

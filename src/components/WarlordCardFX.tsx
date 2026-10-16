import React from 'react';

interface WarlordCardFXProps {
  warlordId: string;
  isHovered: boolean;
  mousePos: { x: number; y: number }; // normalized -1 to 1
}

export const WarlordCardFX: React.FC<WarlordCardFXProps> = ({ warlordId, isHovered, mousePos }) => {
  if (!isHovered) return null;

  switch (warlordId) {
    case 'teach': {
      // 🖤 Marshall D. Teach - Yami Yami no Mi Darkness Vortex & Devouring Smoke
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {/* Swirling black & purple darkness smoke overlay devouring the card */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-purple-950/40 to-black/85 animate-pulse mix-blend-multiply" />
          
          {/* Gravitational dark matter tentacles */}
          <svg className="absolute inset-0 w-full h-full opacity-70" viewBox="0 0 200 300">
            <defs>
              <filter id="teach-smoke" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" />
              </filter>
              <radialGradient id="vortex-grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#000000" stopOpacity="0.9" />
                <stop offset="40%" stopColor="#2e1065" stopOpacity="0.7" />
                <stop offset="80%" stopColor="#581c87" stopOpacity="0.4" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="150" r="90" fill="url(#vortex-grad)" filter="url(#teach-smoke)" className="animate-spin-slow origin-center" />
          </svg>

          {/* Sucked gravitational particles orbiting into center */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(12)].map((_, i) => (
              <span
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_#a855f7] animate-vortex-particle"
                style={{
                  top: `${40 + Math.sin(i * 0.5) * 35}%`,
                  left: `${50 + Math.cos(i * 0.5) * 40}%`,
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: '1.4s',
                }}
              />
            ))}
          </div>

          {/* Dark tendril borders */}
          <div className="absolute inset-0 border-2 border-purple-600/60 shadow-[inset_0_0_25px_rgba(46,16,101,0.9)] animate-pulse" />
        </div>
      );
    }

    case 'mihawk': {
      // 🦅 Dracule Mihawk - 3D Emerald Slash & Hawk Eyes Lens Flare
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {/* Diagonal Laser Slash Line */}
          <div
            className="absolute -inset-full bg-gradient-to-r from-transparent via-emerald-400 to-cyan-300 opacity-90 shadow-[0_0_20px_#10b981] animate-mihawk-slash"
            style={{
              height: '3px',
              top: '50%',
              transform: 'rotate(-38deg) translateY(-50%)',
            }}
          />

          {/* Razor Wind Blade sparks flying outward */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-6 h-0.5 bg-gradient-to-r from-emerald-300 to-transparent shadow-[0_0_6px_#34d399] animate-blade-wind"
              style={{
                top: `${30 + i * 7}%`,
                left: `${20 + (i % 3) * 25}%`,
                transform: `rotate(${-35 + i * 10}deg)`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}

          {/* Hawk Eyes Yellow / Gold Flash at head height */}
          <div className="absolute top-[32%] left-[48%] -translate-x-1/2 -translate-y-1/2 flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-300 shadow-[0_0_12px_#fbbf24,0_0_25px_#f59e0b] animate-ping" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-300 shadow-[0_0_12px_#fbbf24,0_0_25px_#f59e0b] animate-ping" style={{ animationDelay: '0.1s' }} />
          </div>

          {/* Emerald glowing blade perimeter aura */}
          <div className="absolute inset-0 border border-emerald-400/70 shadow-[inset_0_0_18px_rgba(16,185,129,0.3),0_0_15px_rgba(16,185,129,0.4)]" />
        </div>
      );
    }

    case 'buggy': {
      // 🤡 Buggy el Payaso - Bara Bara Fragmentation & Circus Chaos
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {/* Confetti & Buggy mini bombs falling */}
          {[...Array(14)].map((_, i) => {
            const colors = ['#ef4444', '#3b82f6', '#eab308', '#ec4899', '#22c55e'];
            return (
              <span
                key={i}
                className="absolute w-2 h-2 rounded-xs shadow-sm animate-buggy-confetti"
                style={{
                  backgroundColor: colors[i % colors.length],
                  left: `${5 + (i * 7)}%`,
                  top: '-10px',
                  animationDelay: `${(i % 5) * 0.2}s`,
                  animationDuration: `${1.2 + (i % 3) * 0.3}s`,
                }}
              />
            );
          })}

          {/* Floating Bara Bara flying daggers */}
          <div
            className="absolute top-1/4 right-3 text-red-500 font-black text-xl animate-bounce"
            style={{ transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)` }}
          >
            🗡️
          </div>
          <div
            className="absolute bottom-1/3 left-3 text-blue-400 font-black text-xl animate-bounce"
            style={{ animationDelay: '0.2s', transform: `translate(${-mousePos.x * 15}px, ${-mousePos.y * 15}px)` }}
          >
            🗡️
          </div>

          {/* Circus party carnival border strobes */}
          <div className="absolute inset-0 border-2 border-red-500/80 shadow-[0_0_15px_#ef4444,inset_0_0_15px_#3b82f6] animate-pulse" />
        </div>
      );
    }

    case 'law': {
      // 💙 Trafalgar Law - ROOM Pulsing Dome & Floating Hologram
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 flex items-center justify-center">
          {/* Glowing cyan ROOM bubble */}
          <div className="w-56 h-56 rounded-full border-2 border-cyan-400/70 bg-cyan-400/10 shadow-[0_0_30px_rgba(6,182,212,0.4),inset_0_0_20px_rgba(6,182,212,0.3)] animate-pulse" />

          {/* Digital Coordinate Grid Scan Lines */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'linear-gradient(rgba(6,182,212,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.6) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          {/* Holographic "ROOM" word tag floating */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/80 text-cyan-300 font-mono text-[11px] font-black tracking-widest shadow-[0_0_12px_#06b6d4]">
            [ ROOM: ACTIVE ]
          </div>

          {/* Surgical heart icon pulse */}
          <div className="absolute bottom-10 right-4 text-cyan-300 font-mono text-xs flex items-center gap-1 animate-ping">
            💙
          </div>

          {/* Cyan boundary aura */}
          <div className="absolute inset-0 border border-cyan-400/60 shadow-[inset_0_0_20px_rgba(6,182,212,0.25)]" />
        </div>
      );
    }

    case 'hancock': {
      // 🐍 Boa Hancock - Love Hearts & Stone Petrification Wave
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {/* Rising stone petrification filter from the bottom */}
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-stone-800/85 via-stone-500/35 to-transparent backdrop-grayscale-[80%] animate-petrify-rise" />

          {/* 3D drifting love hearts */}
          {[...Array(9)].map((_, i) => (
            <span
              key={i}
              className="absolute text-pink-400 select-none animate-float-heart drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]"
              style={{
                left: `${15 + (i * 9)}%`,
                bottom: '10px',
                fontSize: `${12 + (i % 3) * 6}px`,
                animationDelay: `${i * 0.18}s`,
                animationDuration: `${1.6 + (i % 3) * 0.4}s`,
              }}
            >
              💖
            </span>
          ))}

          {/* Pink/Magenta passionate border glow */}
          <div className="absolute inset-0 border-2 border-pink-500/80 shadow-[0_0_20px_#ec4899,inset_0_0_15px_rgba(236,72,153,0.3)] animate-pulse" />
        </div>
      );
    }

    case 'crocodile': {
      // 🐊 Sir Crocodile - Desert Sandstorm Disintegration & Golden Dust
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {/* Desert haze & yellow dust storm overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/15 via-yellow-700/20 to-amber-900/30 mix-blend-color-burn" />

          {/* Blowing sand particles right-to-left */}
          {[...Array(16)].map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-amber-300 shadow-[0_0_4px_#f59e0b] animate-sand-drift"
              style={{
                top: `${10 + (i * 5)}%`,
                right: '-10px',
                width: `${2 + (i % 3)}px`,
                height: `${1 + (i % 2)}px`,
                animationDelay: `${(i % 6) * 0.15}s`,
                animationDuration: `${1.1 + (i % 3) * 0.3}s`,
              }}
            />
          ))}

          {/* Crumbling sand dunes at bottom edge */}
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-amber-900/60 to-transparent" />

          {/* Golden Hook Gleam */}
          <div className="absolute bottom-16 right-6 w-3 h-3 rounded-full bg-yellow-300 shadow-[0_0_15px_#facc15] animate-ping" />

          {/* Desert border */}
          <div className="absolute inset-0 border border-amber-500/70 shadow-[inset_0_0_18px_rgba(217,119,6,0.35),0_0_12px_rgba(245,158,11,0.3)]" />
        </div>
      );
    }

    case 'doflamingo': {
      // 🧵 Donquixote Doflamingo - Puppeteer Marionette Strings & Fuchsia Glint
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {/* Taut puppet silver wires crossing across corners */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 300">
            <line x1="0" y1="0" x2="100" y2="150" stroke="#f8fafc" strokeWidth="1" strokeDasharray="3 2" className="opacity-70 animate-pulse" />
            <line x1="200" y1="0" x2="100" y2="150" stroke="#f8fafc" strokeWidth="1" strokeDasharray="3 2" className="opacity-70 animate-pulse" />
            <line x1="0" y1="300" x2="100" y2="150" stroke="#f8fafc" strokeWidth="0.8" className="opacity-50" />
            <line x1="200" y1="300" x2="100" y2="150" stroke="#f8fafc" strokeWidth="0.8" className="opacity-50" />
          </svg>

          {/* Fuchsia glasses reflection flare */}
          <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-16 h-3 bg-fuchsia-500/60 blur-[3px] rounded-full shadow-[0_0_15px_#d946ef] animate-pulse" />

          {/* Puppet string tension indicator */}
          <div className="absolute top-2 right-2 text-[10px] font-mono text-fuchsia-400 uppercase tracking-widest bg-black/70 px-1.5 py-0.5 rounded border border-fuchsia-500/40">
            ITO ITO : TIED
          </div>

          {/* Fuchsia psycho border */}
          <div className="absolute inset-0 border-2 border-fuchsia-500/80 shadow-[0_0_15px_#ec4899,inset_0_0_12px_rgba(217,70,239,0.3)]" />
        </div>
      );
    }

    case 'kuma': {
      // 🐻 Bartholomew Kuma - Nikyu Nikyu Paw Shockwave & Teleport Distortion
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 flex items-center justify-center">
          {/* Expanding translucent paw print shockwave rings */}
          {[1, 2, 3].map((ring) => (
            <div
              key={ring}
              className="absolute w-36 h-36 rounded-full border-2 border-rose-400/60 shadow-[0_0_20px_rgba(251,113,133,0.5)] animate-ping"
              style={{ animationDelay: `${ring * 0.35}s`, animationDuration: '1.2s' }}
            />
          ))}

          {/* Paw Print Glyph Icon in center */}
          <div className="text-3xl select-none text-rose-300 drop-shadow-[0_0_12px_rgba(244,63,94,0.8)] animate-pulse">
            🐾
          </div>

          {/* Teleport flicker scanlines */}
          <div className="absolute inset-0 bg-rose-500/5 mix-blend-screen animate-kuma-teleport" />

          {/* Pressure border */}
          <div className="absolute inset-0 border border-rose-400/80 shadow-[inset_0_0_20px_rgba(244,63,94,0.3)]" />
        </div>
      );
    }

    case 'moria': {
      // 🦎 Gecko Moria - Shadow Swarm & Living Murcielagos
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {/* Flying dark bat silhouettes fluttering up */}
          {[...Array(7)].map((_, i) => (
            <span
              key={i}
              className="absolute text-purple-900 select-none animate-moria-bat font-black text-sm"
              style={{
                left: `${15 + (i * 12)}%`,
                bottom: '-10px',
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${1.4 + (i % 2) * 0.4}s`,
              }}
            >
              🦇
            </span>
          ))}

          {/* Living writhing bottom shadow */}
          <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-purple-950 via-purple-900/50 to-transparent shadow-[0_0_30px_#581c87]" />

          {/* Eerie border aura */}
          <div className="absolute inset-0 border-2 border-purple-500/70 shadow-[inset_0_0_20px_rgba(88,28,135,0.6)]" />
        </div>
      );
    }

    case 'jinbe': {
      // 🐟 Jinbe - Fishman Karate Ocean Wave & Swirling Bubbles
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {/* Swirling deep ocean currents */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-cyan-500/15 to-blue-900/30 mix-blend-screen" />

          {/* Rising bubbles */}
          {[...Array(12)].map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full border border-cyan-300/80 bg-cyan-200/30 animate-jinbe-bubble"
              style={{
                left: `${10 + (i * 8)}%`,
                bottom: '-10px',
                width: `${4 + (i % 4) * 2}px`,
                height: `${4 + (i % 4) * 2}px`,
                animationDelay: `${(i % 5) * 0.2}s`,
                animationDuration: `${1.3 + (i % 3) * 0.3}s`,
              }}
            />
          ))}

          {/* Water splash droplets */}
          <div className="absolute bottom-3 left-4 text-cyan-300 text-lg animate-pulse">
            🌊
          </div>
          <div className="absolute bottom-3 right-4 text-cyan-300 text-lg animate-pulse" style={{ animationDelay: '0.2s' }}>
            🌊
          </div>

          {/* Ocean current border */}
          <div className="absolute inset-0 border-2 border-cyan-500/80 shadow-[0_0_15px_#06b6d4,inset_0_0_18px_rgba(6,182,212,0.3)] animate-pulse" />
        </div>
      );
    }

    case 'weevil': {
      // 💥 Edward Weevil - Earth Cracking Shockwave
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {/* Brutal earth fracture sparks */}
          <div className="absolute inset-0 bg-amber-600/15 animate-ping" />
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-red-950/80 to-transparent" />
          <div className="absolute inset-0 border-2 border-amber-600/80 shadow-[0_0_15px_#d97706]" />
        </div>
      );
    }

    default:
      return null;
  }
};

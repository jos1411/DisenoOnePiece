import { Shield, Skull, Award, ArrowDown, ChevronRight, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface HeroProps {
  onExplore: () => void;
  onViewPowers: () => void;
}

export default function Hero({ onExplore, onViewPowers }: HeroProps) {
  const handleExploreClick = () => {
    soundEngine.playSound('sword');
    onExplore();
  };

  const handlePowersClick = () => {
    soundEngine.playSound('paw');
    onViewPowers();
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Ambience Layers */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(124,58,237,0.18),rgba(255,255,255,0))]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #e5a93b 1px, transparent 0)`,
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* World Government Official Notice Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-grandline-900/90 border border-pirate-gold/40 shadow-pirate-gold mb-8 animate-float-slow">
          <Shield className="w-4 h-4 text-pirate-gold" />
          <span className="text-xs uppercase font-mono tracking-widest text-pirate-gold font-semibold">
            GOBIERNO MUNDIAL • ARCHIVO SUPREMO DE MARINA
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
        </div>

        {/* Kanji & Epic Header */}
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-pirate tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pirate-gold via-yellow-200 to-amber-500 text-glow-gold">
            王 下 七 武 海
          </h2>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display uppercase tracking-tight text-white leading-none">
            LOS SIETE SEÑORES <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pirate-gold to-orange-400">
              DE LA GUERRA
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-300 font-body leading-relaxed pt-2">
            Corsarios temidos legalmente por el mar. Piratas legendarios con sus recompensas congeladas,
            autorizados por el Gobierno Mundial para saquear y someter a otros criminales con la fuerza del terror.
          </p>
        </div>

        {/* Status Alert Banner */}
        <div className="max-w-2xl mx-auto mt-8 p-3 rounded-xl bg-red-950/40 border border-red-800/60 backdrop-blur-sm flex items-center justify-center gap-3 text-xs sm:text-sm text-red-300 font-mono">
          <span className="px-2 py-0.5 rounded bg-red-900/90 text-red-200 font-bold uppercase tracking-wider text-[11px]">
            ALERTA REVERIE
          </span>
          <span>Sistema revocado por votación de los 50 reyes. Se reanudan todas las cacerías de recompensas.</span>
        </div>

        {/* Interactive Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={handleExploreClick}
            className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-pirate-gold to-yellow-500 text-grandline-950 font-display text-sm uppercase tracking-wider font-extrabold shadow-[0_0_30px_rgba(229,169,59,0.5)] hover:shadow-[0_0_45px_rgba(229,169,59,0.8)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-3"
          >
            <Skull className="w-5 h-5 text-grandline-950 transition-transform group-hover:rotate-12" />
            <span>Ver Carteles Wanted</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={handlePowersClick}
            className="px-8 py-4 rounded-xl bg-grandline-900/90 hover:bg-grandline-850 border border-slate-700 hover:border-pirate-gold text-slate-200 hover:text-white font-display text-sm uppercase tracking-wider font-bold transition-all duration-300 hover:scale-105 cursor-pointer flex items-center gap-2.5 shadow-lg"
          >
            <Award className="w-5 h-5 text-pirate-gold" />
            <span>Los Tres Grandes Poderes</span>
          </button>
        </div>

        {/* Global Stats Counter Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-xl bg-grandline-900/70 border border-slate-800/80 backdrop-blur-sm hover:border-pirate-gold/40 transition-colors">
            <div className="text-2xl sm:text-3xl font-display text-pirate-gold font-bold">20.6B+ ฿</div>
            <div className="text-xs text-slate-400 font-mono uppercase tracking-wider mt-1">Recompensa Total Activa</div>
          </div>
          <div className="p-4 rounded-xl bg-grandline-900/70 border border-slate-800/80 backdrop-blur-sm hover:border-pirate-gold/40 transition-colors">
            <div className="text-2xl sm:text-3xl font-display text-red-400 font-bold">11</div>
            <div className="text-xs text-slate-400 font-mono uppercase tracking-wider mt-1">Guerreros Registrados</div>
          </div>
          <div className="p-4 rounded-xl bg-grandline-900/70 border border-slate-800/80 backdrop-blur-sm hover:border-pirate-gold/40 transition-colors">
            <div className="text-2xl sm:text-3xl font-display text-cyan-400 font-bold">3 Pilares</div>
            <div className="text-xs text-slate-400 font-mono uppercase tracking-wider mt-1">Equilibrio del Mar</div>
          </div>
          <div className="p-4 rounded-xl bg-grandline-900/70 border border-slate-800/80 backdrop-blur-sm hover:border-pirate-gold/40 transition-colors">
            <div className="text-2xl sm:text-3xl font-display text-purple-400 font-bold">SSG</div>
            <div className="text-xs text-slate-400 font-mono uppercase tracking-wider mt-1">Serafines de Reemplazo</div>
          </div>
        </div>

        {/* Down Indicator */}
        <div className="mt-14 flex justify-center">
          <button
            onClick={handleExploreClick}
            className="flex flex-col items-center gap-2 text-xs text-slate-400 hover:text-pirate-gold transition-colors cursor-pointer group"
          >
            <span className="font-mono tracking-widest text-[11px] uppercase flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-pirate-gold" />
              Haz click en un cartel para abrir su dossier secreto
            </span>
            <ArrowDown className="w-4 h-4 animate-bounce text-pirate-gold" />
          </button>
        </div>
      </div>
    </section>
  );
}

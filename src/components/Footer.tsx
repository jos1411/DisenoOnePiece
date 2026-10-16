import { Shield, ArrowUp } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export default function Footer() {
  const scrollToTop = () => {
    soundEngine.playSound('slash');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-grandline-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          {/* Brand & Manifesto */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border-2 border-pirate-gold flex items-center justify-center bg-grandline-900 shadow-pirate-gold">
                <Shield className="w-5 h-5 text-pirate-gold" />
              </div>
              <div>
                <span className="font-pirate text-xl text-pirate-gold font-bold">
                  王下七武海
                </span>
                <span className="block text-xs font-mono text-slate-500 uppercase tracking-wider">
                  Oka Shichibukai Archive
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md font-body">
              Archivo exhaustivo e interactivo dedicado a los Siete Señores de la Guerra del Mar,
              su geopolítica en el Grand Line, Frutas del Diablo y las recompensas que moldearon la Gran Era de la Piratería.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-200 font-bold">
              Secciones del Archivo
            </h4>
            <ul className="space-y-2 text-sm font-body">
              <li>
                <a href="#hero" className="hover:text-pirate-gold transition-colors">
                  Inicio & Expediente Supremo
                </a>
              </li>
              <li>
                <a href="#warlords" className="hover:text-pirate-gold transition-colors">
                  Carteles Wanted de Recompensa
                </a>
              </li>
              <li>
                <a href="#powers" className="hover:text-pirate-gold transition-colors">
                  Los Tres Grandes Poderes del Mar
                </a>
              </li>
              <li>
                <a href="#timeline" className="hover:text-pirate-gold transition-colors">
                  Cronología & Caída del Sistema
                </a>
              </li>
              <li>
                <a href="#simulator" className="hover:text-pirate-gold transition-colors">
                  Simulador de Amenaza Marina
                </a>
              </li>
            </ul>
          </div>

          {/* Tribute & Technical Stack */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-200 font-bold">
              Diseño & Estándar
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed font-mono">
              Construido con React, TypeScript, Tailwind CSS, Web Audio API y el sistema de diseño inteligente <span className="text-pirate-gold font-bold">UI/UX Pro Max</span>.
            </p>
            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-grandline-900 border border-slate-700 hover:border-pirate-gold text-slate-300 hover:text-white text-xs font-mono transition-all cursor-pointer"
              >
                <ArrowUp className="w-4 h-4 text-pirate-gold" />
                <span>Volver a la superficie</span>
              </button>
            </div>
          </div>
        </div>

        {/* Legal & Oda Tribute */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>
            One Piece © Eiichiro Oda / Shueisha, Toei Animation. Proyecto tributo sin fines de lucro.
          </p>
          <p className="flex items-center gap-1.5 text-slate-400">
            <span>Diseñado con pasión pirata</span>
            <span className="text-pirate-gold font-bold">⚔️</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

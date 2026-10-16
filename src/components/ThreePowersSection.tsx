import { useState } from 'react';
import { Shield, Skull, Award, Cpu, AlertTriangle, ChevronRight } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export default function ThreePowersSection() {
  const [activePillar, setActivePillar] = useState<'marines' | 'yonko' | 'shichibukai' | 'seraphim'>('shichibukai');

  const pillars = [
    {
      id: 'marines' as const,
      name: 'Cuartel General de la Marina',
      japanese: '海軍本部 (Kaigun Honbu)',
      role: 'Brazo Militar del Gobierno Mundial',
      leader: 'Almirante de Flota Sakazuki (Akainu)',
      description: 'La fuerza militar global encargada de hacer cumplir la "Justicia Absoluta". Con bases en el Grand Line y los cuatro mares, cuenta con tres Almirantes con Frutas del Diablo letales.',
      icon: Shield,
      color: 'from-blue-600 to-cyan-500',
      badgeBg: 'bg-blue-950 text-blue-300 border-blue-800',
      status: 'Fuerza Activa Permanente',
    },
    {
      id: 'shichibukai' as const,
      name: 'Los Siete Guerreros del Mar',
      japanese: '王下七武海 (Oka Shichibukai)',
      role: 'Corsarios Aliados del Gobierno',
      leader: 'Bajo mandato directo de los Cinco Ancianos (Gorosei)',
      description: 'Piratas notorios indultados legalmente por el Gobierno Mundial. Entregaban una parte de sus botines y respondían al llamado militar de la Marina a cambio de inmunidad y recompensas congeladas.',
      icon: Award,
      color: 'from-amber-500 to-yellow-400',
      badgeBg: 'bg-amber-950 text-amber-300 border-amber-800',
      status: 'Disuelto en el Reverie',
    },
    {
      id: 'yonko' as const,
      name: 'Los Cuatro Emperadores',
      japanese: '四皇 (Yonkō)',
      role: 'Monarcas Piratas del Nuevo Mundo',
      leader: 'Shanks, Barbanegra, Luffy, Buggy (Actuales)',
      description: 'Los cuatro piratas más poderosos y colosales del planeta. Comandan territorios inmensos y flotas masivas en el Nuevo Mundo, rivalizando directamente contra el Gobierno Mundial.',
      icon: Skull,
      color: 'from-purple-600 to-rose-500',
      badgeBg: 'bg-purple-950 text-purple-300 border-purple-800',
      status: 'Amenaza Existencial Continua',
    },
    {
      id: 'seraphim' as const,
      name: 'Proyecto SSG: Serafines',
      japanese: 'セラフィム (Seraphim)',
      role: 'Armas Humanas Definitivas de Vegapunk',
      leader: 'Bajo control jerárquico del Gorosei',
      description: 'Clones cibernéticos de los Shichibukai en su juventud, enriquecidos con ADN Lunario (piel morena, alas negras y llamas en la espalda) y Frutas del Diablo sintéticas Green Blood.',
      icon: Cpu,
      color: 'from-emerald-500 to-teal-400',
      badgeBg: 'bg-emerald-950 text-emerald-300 border-emerald-800',
      status: 'Nueva Arma Activa',
    },
  ];

  const handleSelectPillar = (id: typeof activePillar) => {
    soundEngine.playSound('click');
    setActivePillar(id);
  };

  const current = pillars.find((p) => p.id === activePillar) || pillars[1];

  return (
    <section id="powers" className="py-20 relative bg-grandline-950 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-grandline-900 border border-pirate-gold/30 text-pirate-gold text-xs font-mono uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5" />
            GEOPOLÍTICA DEL GRAND LINE
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white uppercase tracking-tight">
            Los Tres Grandes Poderes del Mar
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base font-body leading-relaxed">
            Durante décadas, la paz precaria del mundo se sostuvo sobre un trípode de hierro.
            Cualquier ruptura en este balance desataría la Guerra Suprema.
          </p>
        </div>

        {/* Interactive Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            const isSelected = activePillar === pillar.id;

            return (
              <button
                key={pillar.id}
                onClick={() => handleSelectPillar(pillar.id)}
                className={`relative text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-grandline-900 border-pirate-gold shadow-[0_0_25px_rgba(229,169,59,0.25)] scale-[1.02]'
                    : 'bg-grandline-900/60 border-slate-800 hover:border-slate-700 hover:bg-grandline-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${pillar.color} text-grandline-950 shadow-md`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${pillar.badgeBg}`}>
                      {pillar.status}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-white mb-1">
                    {pillar.name}
                  </h3>
                  <p className="text-xs font-mono text-slate-400">
                    {pillar.japanese}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs font-mono text-pirate-gold">
                  <span>Ver Doctrina</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1' : ''}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Pillar Detailed Showcase */}
        <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-grandline-900/90 border border-slate-800 backdrop-blur-sm shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-pirate text-xl text-pirate-gold">
                  {current.japanese}
                </span>
                <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {current.role}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                {current.name}
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-body">
                {current.description}
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono">
                <div className="px-3 py-2 rounded-lg bg-grandline-950 border border-slate-800">
                  <span className="text-slate-400 block">Liderazgo Supremo:</span>
                  <span className="text-pirate-gold font-bold">{current.leader}</span>
                </div>
                <div className="px-3 py-2 rounded-lg bg-grandline-950 border border-slate-800">
                  <span className="text-slate-400 block">Condición Geopolítica:</span>
                  <span className="text-white font-bold">{current.status}</span>
                </div>
              </div>
            </div>

            {/* Strategic Warning Notice */}
            <div className="lg:col-span-4 p-5 rounded-xl bg-grandline-950 border border-slate-800/80 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase">
                <AlertTriangle className="w-4 h-4" />
                Informe de Inteligencia CP0
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-body">
                La abolición del Shichibukai en el Reverie impulsó a Buggy, Crocodile y Mihawk a fundar <span className="text-pirate-gold font-bold">Cross Guild</span>,
                invirtiendo las reglas al poner recompensas millonarias sobre las cabezas de los propios soldados y almirantes de la Marina.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

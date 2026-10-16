import { useState } from 'react';
import { Scroll, Flag, Flame, Skull, ShieldAlert, Award } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface TimelineEvent {
  year: string;
  arc: string;
  title: string;
  subtitle: string;
  description: string;
  impact: string;
  icon: typeof Scroll;
  category: 'origen' | 'caida' | 'guerra' | 'disolucion';
}

export default function TimelineSection() {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const timelineEvents: TimelineEvent[] = [
    {
      year: 'Hace ~20 años',
      arc: 'Gran Era de la Piratería',
      title: 'Creación del Pacto Corsario',
      subtitle: 'El Nacimiento de los Shichibukai',
      description: 'Tras la ejecución del Rey de los Piratas Gol D. Roger y la oleada incontrolable de piratas hacia el Grand Line, los Cinco Ancianos instituyen la ordenanza de los Siete Señores de la Guerra para frenar a otros forajidos.',
      impact: 'Establecimiento del Trípode de Poder global junto a la Marina y los futuros Yonko.',
      icon: Award,
      category: 'origen',
    },
    {
      year: 'Año 1522',
      arc: 'Arco de Alabasta',
      title: 'La Caída de Baroque Works',
      subtitle: 'Destitución de Sir Crocodile',
      description: 'Crocodile organiza una guerra civil en el Reino de Alabasta para hallar el Poneglyph del Arma Ancestral Plutón. Derrotado en las catacumbas por Monkey D. Luffy, el Gobierno Mundial se ve obligado a despojarlo de su rango y enviarlo a Impel Down.',
      impact: 'Primera prueba pública de la corrupción inherente al otorgar inmunidad legal a piratas despiadados.',
      icon: Skull,
      category: 'caida',
    },
    {
      year: 'Año 1522',
      arc: 'Thriller Bark & Sabaody',
      title: 'Sombras y Almohadillas',
      subtitle: 'Moria Derrotado y la Misión de Kuma',
      description: 'Luffy derrota a Gecko Moria en Thriller Bark. El Gobierno envía en secreto a Bartholomew Kuma para eliminar a todos los testigos y evitar otro escándalo tras Alabasta. En Sabaody, Kuma dispersa a los Sombrero de Paja para salvarlos del Almirante Kizaru.',
      impact: 'Moria queda profundamente debilitado y el Gobierno empieza a dudar de su utilidad.',
      icon: Flame,
      category: 'caida',
    },
    {
      year: 'Año 1522',
      arc: 'Guerra en la Cumbre (Marineford)',
      title: 'El Vórtice de Marineford',
      subtitle: 'La Fractura Definitiva del Shichibukai',
      description: 'Jinbe renuncia al pacto y defiende a Barbablanca; Barbanegra usa su estatus para irrumpir en Impel Down y liberar a los peores prisioneros del Nivel 6; Mihawk y Doflamingo siembran el caos; Hancock sabotea a los Marines para proteger a Luffy; Moria es atacado por orden secreta del Gobierno.',
      impact: 'Demostración de que los Shichibukai no son leales al Gobierno y solo persiguen sus propias ambiciones.',
      icon: ShieldAlert,
      category: 'guerra',
    },
    {
      year: 'Año 1524',
      arc: 'Dressrosa & Post-Timeskip',
      title: 'La Alianza Pirata & Dressrosa',
      subtitle: 'Trafalgar Law y el Jaque a Doflamingo',
      description: 'Law se convierte en Shichibukai enviando 100 corazones de piratas a la Marina, pero se alía con Luffy en Punk Hazard para desmantelar la fábrica de SMILE. En Dressrosa, exponen la tiranía de 10 años de Donquixote Doflamingo ante el Almirante Fujitora.',
      impact: 'Fujitora se arrodilla públicamente pidiendo perdón al mundo, sellando el destino político del Shichibukai.',
      icon: Flag,
      category: 'caida',
    },
    {
      year: 'Año 1524 (Actual)',
      arc: 'Reverie & Arco Final',
      title: 'Abolición Absoluta & Cross Guild',
      subtitle: 'La Caída del Sistema y la Venganza Pirata',
      description: 'El Rey Riku Dold III de Dressrosa y el Rey Nefertari Cobra de Alabasta lideran el voto unánime en el Reverie para abolir el sistema de los Shichibukai. La Marina despliega flotas para cazar a Mihawk, Hancock y Buggy. En respuesta, nace Cross Guild para cazar a la Marina.',
      impact: 'Fin definitivo del sistema. Despliegue de los Serafines (SSG) por el Gobierno Mundial.',
      icon: Scroll,
      category: 'disolucion',
    },
  ];

  const handleSelect = (idx: number) => {
    soundEngine.playSound('click');
    setSelectedIdx(idx);
  };

  const currentEvent = timelineEvents[selectedIdx];

  return (
    <section id="timeline" className="py-20 relative bg-grandline-900/60 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-grandline-900 border border-pirate-gold/30 text-pirate-gold text-xs font-mono uppercase tracking-widest mb-3">
            <Scroll className="w-3.5 h-3.5" />
            CRÓNICAS DEL GOBIERNO MUNDIAL
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white uppercase tracking-tight">
            Cronología Histórica del Shichibukai
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base font-body leading-relaxed">
            De herramienta de disuasión a escándalo planetario: repasa los eventos cruciales que culminaron en la abolición del pacto.
          </p>
        </div>

        {/* Timeline Horizontal / Stepper Navigation */}
        <div className="relative mb-10 overflow-x-auto pb-4">
          <div className="flex items-center justify-between min-w-[700px] border-b border-slate-800 pb-4">
            {timelineEvents.map((evt, idx) => {
              const Icon = evt.icon;
              const isActive = selectedIdx === idx;

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`flex flex-col items-center gap-2 p-2 rounded-xl transition-all cursor-pointer group ${
                    isActive ? 'scale-105' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                      isActive
                        ? 'border-pirate-gold bg-pirate-gold text-grandline-950 shadow-pirate-gold'
                        : 'border-slate-700 bg-grandline-950 text-slate-400 group-hover:border-slate-500'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 font-bold whitespace-nowrap">
                    {evt.arc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Event Detail Card */}
        <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-grandline-950 border border-pirate-gold/30 shadow-2xl relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-amber-950 text-pirate-gold border border-amber-800 text-xs font-mono uppercase font-bold">
                {currentEvent.year}
              </span>
              <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-mono">
                {currentEvent.arc}
              </span>
            </div>
            <span className="text-xs font-mono text-slate-500">
              REGISTRO {selectedIdx + 1} DE {timelineEvents.length}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-1">
            {currentEvent.title}
          </h3>
          <p className="text-sm font-mono text-pirate-gold mb-4 font-semibold">
            {currentEvent.subtitle}
          </p>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-body mb-6">
            {currentEvent.description}
          </p>

          <div className="p-4 rounded-xl bg-grandline-900 border border-slate-800 text-xs font-mono">
            <span className="text-amber-400 font-bold uppercase block mb-1">
              Impacto en la Geopolítica Mundial:
            </span>
            <span className="text-slate-300">{currentEvent.impact}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

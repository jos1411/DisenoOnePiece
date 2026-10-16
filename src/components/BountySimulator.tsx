import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Skull, AlertTriangle, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export default function BountySimulator() {
  const [bounty, setBounty] = useState<number>(350000000);

  const formatBounty = (val: number) => {
    return new Intl.NumberFormat('en-US').format(val) + ' ฿';
  };

  const getThreatAnalysis = (amount: number) => {
    if (amount < 80000000) {
      return {
        assignedWarlord: 'Buggy el Payaso Estrella',
        warlordTitle: 'El Emperador Bufón',
        survivalRate: '75%',
        survivalColor: 'text-emerald-400',
        dangerTier: 'Amenaza Inicial (East Blue / Paradise)',
        marineAssessment: 'Un novato con suerte. La Marina enviaría a Buggy o a oficiales de rango Capitán.',
        soundCue: 'circus',
      };
    } else if (amount < 200000000) {
      return {
        assignedWarlord: 'Gecko Moria',
        warlordTitle: 'Amo de Thriller Bark',
        survivalRate: '35%',
        survivalColor: 'text-amber-400',
        dangerTier: 'Peligro Notable en Paradise',
        marineAssessment: 'Tu sombra tiene un valor aceptable para la legión de zombis de Moria.',
        soundCue: 'shadow',
      };
    } else if (amount < 500000000) {
      return {
        assignedWarlord: 'Bartholomew Kuma / Sir Crocodile',
        warlordTitle: 'El Tirano o el Rey del Desierto',
        survivalRate: '12%',
        survivalColor: 'text-orange-400',
        dangerTier: 'Prioridad de Pacificación de la Marina',
        marineAssessment: 'Un Ursus Shock o una tormenta de arena Sables pondrá fin inmediato a tu viaje.',
        soundCue: 'paw',
      };
    } else if (amount < 1500000000) {
      return {
        assignedWarlord: 'Donquixote Doflamingo / Boa Hancock',
        warlordTitle: 'El Yaksha Celestial o la Emperatriz Pirata',
        survivalRate: '4%',
        survivalColor: 'text-red-400',
        dangerTier: 'Amenaza de Primer Nivel en el Nuevo Mundo',
        marineAssessment: 'Quedarás petrificado o manipulado como una marioneta sin siquiera poder pestañear.',
        soundCue: 'heart',
      };
    } else {
      return {
        assignedWarlord: 'Dracule Mihawk / Marshall D. Teach',
        warlordTitle: 'Ojo de Halcón o Barbanegra',
        survivalRate: '0.1%',
        survivalColor: 'text-rose-500',
        dangerTier: 'Calamidad Mundial de Calibre Yonko',
        marineAssessment: 'Mihawk cortará tu barco por la mitad con un solo blandir de Kokuto Yoru por puro aburrimiento.',
        soundCue: 'sword',
      };
    }
  };

  const analysis = getThreatAnalysis(bounty);

  const handleSliderChange = (newVal: number) => {
    setBounty(newVal);
    soundEngine.playSound('click');
  };

  const handleYonkoConfetti = () => {
    soundEngine.playSound('sword');
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#e5a93b', '#e63946', '#7c3aed', '#ffffff'],
    });
  };

  return (
    <section id="simulator" className="py-20 relative bg-grandline-950 border-t border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-grandline-900 border border-pirate-gold/30 text-pirate-gold text-xs font-mono uppercase tracking-widest mb-3">
            <Zap className="w-3.5 h-3.5" />
            SIMULADOR TÁCTICO DE LA MARINA
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white uppercase tracking-tight">
            ¿A qué Shichibukai te enfrentarías?
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base font-body leading-relaxed">
            Ajusta tu recompensa pirata y el algoritmo del Cuartel General de la Marina determinará qué Corsario del Mar sería enviado a neutralizarte.
          </p>
        </div>

        {/* Interactive Calculator Card */}
        <div className="p-6 sm:p-10 rounded-2xl bg-grandline-900/90 border-2 border-pirate-gold/40 shadow-2xl space-y-8">
          {/* Current Bounty Readout */}
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
              TU RECOMPENSA ACTUAL DE FORAJIDO:
            </span>
            <div className="text-3xl sm:text-5xl md:text-6xl font-wanted font-black text-pirate-gold tracking-wider text-glow-gold">
              {formatBounty(bounty)}
            </div>
            <div className="flex justify-center gap-2 pt-2 flex-wrap">
              {[30000000, 150000000, 450000000, 1200000000, 3500000000].map((preset) => (
                <button
                  key={preset}
                  onClick={() => handleSliderChange(preset)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                    bounty === preset
                      ? 'border-pirate-gold bg-amber-950 text-pirate-gold font-bold shadow-sm'
                      : 'border-slate-800 bg-grandline-950 text-slate-400 hover:text-white'
                  }`}
                >
                  {formatBounty(preset).replace(' ฿', '')}
                </button>
              ))}
            </div>
          </div>

          {/* Slider Control */}
          <div className="space-y-3 max-w-2xl mx-auto">
            <input
              type="range"
              min={10000000}
              max={4000000000}
              step={10000000}
              value={bounty}
              onChange={(e) => handleSliderChange(Number(e.target.value))}
              className="w-full h-3 bg-grandline-950 rounded-lg appearance-none cursor-pointer accent-pirate-gold focus:outline-none"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-500">
              <span>10,000,000 ฿ (Pirata Novato)</span>
              <span>2,000,000,000 ฿</span>
              <span>4,000,000,000 ฿ (Nivel Yonko)</span>
            </div>
          </div>

          {/* Threat Assessment Result */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 rounded-xl bg-grandline-950 border border-slate-800 items-center">
            <div className="md:col-span-8 space-y-3">
              <div className="flex items-center gap-2">
                <Skull className="w-5 h-5 text-red-400" />
                <span className="text-xs font-mono text-red-400 uppercase tracking-wider font-bold">
                  {analysis.dangerTier}
                </span>
              </div>

              <div>
                <h4 className="text-xl sm:text-2xl font-display font-bold text-white">
                  Oponente Asignado: <span className="text-pirate-gold">{analysis.assignedWarlord}</span>
                </h4>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  {analysis.warlordTitle}
                </p>
              </div>

              <p className="text-sm text-slate-300 font-body leading-relaxed">
                {analysis.marineAssessment}
              </p>
            </div>

            <div className="md:col-span-4 p-5 rounded-xl bg-grandline-900 border border-slate-800 text-center space-y-2">
              <span className="text-xs font-mono uppercase text-slate-400 block">
                Probabilidad de Supervivencia:
              </span>
              <div className={`text-4xl font-display font-black ${analysis.survivalColor}`}>
                {analysis.survivalRate}
              </div>
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-400 pt-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Intervención Inmediata</span>
              </div>
            </div>
          </div>

          {/* Yonko Level Fireworks Action */}
          {bounty >= 3000000000 && (
            <div className="text-center pt-2">
              <button
                onClick={handleYonkoConfetti}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 text-white font-display text-xs uppercase tracking-wider font-bold shadow-lg hover:scale-105 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                ¡Has alcanzado estatus de Calamidad Mundial! Festejar con Oro
              </button>
            </div>
          )}

          <div className="text-center text-xs font-mono text-slate-500 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Datos procesados de acuerdo a las directrices de los Almirantes de la Marina</span>
          </div>
        </div>
      </div>
    </section>
  );
}

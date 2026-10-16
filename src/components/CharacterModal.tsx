import { useEffect, useState } from 'react';
import { Shichibukai } from '../data/shichibukai';
import { X, Volume2, Shield, Flame, Activity, Zap, Award, Skull, AlertCircle } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import { ModalTransitionOverlay } from './ModalTransitionOverlay';

interface CharacterModalProps {
  warlord: Shichibukai | null;
  onClose: () => void;
}

export default function CharacterModal({ warlord, onClose }: CharacterModalProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'combat' | 'lore'>('profile');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (warlord) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [warlord, onClose]);

  if (!warlord) return null;

  const playAbilitySound = () => {
    soundEngine.playSound(warlord.soundType);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-warlord-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Signature full-screen transition takeover on click */}
      <ModalTransitionOverlay warlord={warlord} />

      {/* Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-grandline-900 border-2 border-red-900/60 shadow-[0_0_50px_rgba(0,0,0,0.95),0_0_30px_rgba(220,38,38,0.2)] text-slate-100 flex flex-col"
      >
        {/* Top Confidential Classified Header */}
        <div className="sticky top-0 z-20 px-6 py-4 bg-grandline-950/95 border-b border-red-950/80 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-950 border border-red-700 flex items-center justify-center text-red-400 shadow-[0_0_10px_rgba(220,38,38,0.3)]">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-bold">
                  EXPEDIENTE CLASIFICADO • CP0 / MARINA
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-950 text-red-300 border border-red-800 font-mono">
                  ID: #{warlord.id.toUpperCase()}
                </span>
              </div>
              <h3 id="modal-warlord-title" className="font-display text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                {warlord.name}
                <span className="text-xs text-slate-400 font-normal">({warlord.japaneseName})</span>
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar expediente"
            className="p-2 rounded-lg bg-grandline-900 border border-slate-800 text-slate-400 hover:text-white hover:border-red-600 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="px-6 py-2 bg-grandline-950/80 border-b border-slate-800 flex gap-2 sm:gap-4 text-xs sm:text-sm font-mono">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-red-700 text-white font-bold shadow-[0_0_12px_rgba(220,38,38,0.4)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Perfil & Recompensa
          </button>
          <button
            onClick={() => setActiveTab('combat')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeTab === 'combat'
                ? 'bg-red-700 text-white font-bold shadow-[0_0_12px_rgba(220,38,38,0.4)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Poder & Habilidades
          </button>
          <button
            onClick={() => setActiveTab('lore')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeTab === 'lore'
                ? 'bg-red-700 text-white font-bold shadow-[0_0_12px_rgba(220,38,38,0.4)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Guerra de Marineford & Destino
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Image & Quick Poster Specs */}
              <div className="md:col-span-5 flex flex-col items-center">
                <div className="relative w-full max-w-[280px] rounded-xl overflow-hidden border-2 border-pirate-gold/60 shadow-2xl bg-black">
                  <img
                    src={warlord.imageUrl}
                    alt={warlord.name}
                    className="w-full h-80 object-cover object-top"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 text-center">
                    <p className="text-xs font-mono text-pirate-gold uppercase tracking-wider font-bold">
                      {warlord.epithetJp}
                    </p>
                    <p className="font-wanted text-xl text-white font-extrabold tracking-wide">
                      {warlord.bountyFormatted}
                    </p>
                  </div>
                </div>

                {/* Sound effect trigger button */}
                <button
                  onClick={playAbilitySound}
                  className="mt-3 w-full max-w-[280px] py-2 px-3 rounded-lg bg-amber-950/60 border border-pirate-gold/40 text-pirate-gold hover:bg-amber-900/60 text-xs font-mono flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Resonancia de Batalla</span>
                </button>
              </div>

              {/* Data Specifications Grid */}
              <div className="md:col-span-7 space-y-4">
                {/* Quote Box */}
                <div className="p-4 rounded-xl bg-grandline-950/80 border-l-4 border-pirate-gold space-y-1">
                  <p className="text-sm italic text-amber-100 font-serif">
                    "{warlord.quote.text}"
                  </p>
                  <p className="text-xs text-slate-400 font-mono">
                    {warlord.quote.translation} — <span className="text-pirate-gold">{warlord.quote.context}</span>
                  </p>
                </div>

                {/* Core Attributes */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-grandline-950/60 border border-slate-800">
                    <span className="text-slate-400 font-mono block">Apodo Oficial:</span>
                    <span className="text-white font-semibold text-sm">{warlord.epithet}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-grandline-950/60 border border-slate-800">
                    <span className="text-slate-400 font-mono block">Estado del Corsario:</span>
                    <span className="text-pirate-gold font-semibold text-sm uppercase">{warlord.status}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-grandline-950/60 border border-slate-800">
                    <span className="text-slate-400 font-mono block">Recompensa Previa Congelada:</span>
                    <span className="text-slate-200 font-mono text-sm">{warlord.frozenBounty}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-grandline-950/60 border border-slate-800">
                    <span className="text-slate-400 font-mono block">Afiliación Principal:</span>
                    <span className="text-slate-200 font-semibold text-sm">{warlord.affiliation}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-grandline-950/60 border border-slate-800">
                    <span className="text-slate-400 font-mono block">Estatura / Edad:</span>
                    <span className="text-slate-200 font-mono text-sm">{warlord.height} • {warlord.age}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-grandline-950/60 border border-slate-800">
                    <span className="text-slate-400 font-mono block">Origen Territorial:</span>
                    <span className="text-slate-200 text-sm">{warlord.origin}</span>
                  </div>
                </div>

                {/* Threat Index Bar */}
                <div className="p-4 rounded-xl bg-grandline-950/60 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-300 flex items-center gap-1.5 font-bold">
                      <Skull className="w-4 h-4 text-red-400" />
                      Índice de Peligrosidad Marina:
                    </span>
                    <span className="text-red-400 font-bold text-sm">{warlord.stats.threat} / 100</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-red-500 rounded-full transition-all duration-700"
                      style={{ width: `${warlord.stats.threat}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'combat' && (
            <div className="space-y-6">
              {/* Devil Fruit / Power Source */}
              <div className="p-4 rounded-xl bg-grandline-950/80 border border-slate-800">
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-5 h-5 text-amber-400" />
                  <h4 className="font-display text-lg text-white">
                    {warlord.devilFruit.hasFruit ? (
                      <>
                        Fruta del Diablo: <span className="text-amber-400">{warlord.devilFruit.name}</span>
                        {warlord.devilFruit.japaneseName && (
                          <span className="text-xs text-slate-400 ml-2 font-mono">({warlord.devilFruit.japaneseName})</span>
                        )}
                      </>
                    ) : (
                      <span className="text-cyan-400">Sin Fruta del Diablo (Haki y Artes Puras)</span>
                    )}
                  </h4>
                  <span className="ml-auto text-xs font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {warlord.devilFruit.type}
                  </span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-body">
                  {warlord.devilFruit.description}
                </p>
              </div>

              {/* Combat Style & Haki */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-grandline-950/60 border border-slate-800 space-y-2">
                  <h5 className="text-xs font-mono uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-pirate-gold" />
                    Estilo de Combate Principal
                  </h5>
                  <p className="text-sm font-semibold text-white">{warlord.combatStyle}</p>
                </div>
                <div className="p-4 rounded-xl bg-grandline-950/60 border border-slate-800 space-y-2">
                  <h5 className="text-xs font-mono uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-purple-400" />
                    Dominio de Haki Confirmado
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {warlord.haki.map((h, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono px-2 py-0.5 rounded bg-purple-950/60 text-purple-200 border border-purple-800/50"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Radar Stats Grid */}
              <div className="p-4 rounded-xl bg-grandline-950/60 border border-slate-800 space-y-3">
                <h5 className="text-xs font-mono uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  Métricas de Combate Registradas por el Cuartel General
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-slate-300">Poder de Ataque / Destrucción</span>
                      <span className="text-pirate-gold font-bold">{warlord.stats.attack}</span>
                    </div>
                    <div className="w-full h-2 rounded bg-slate-800">
                      <div className="h-full bg-amber-500 rounded" style={{ width: `${warlord.stats.attack}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-slate-300">Defensa & Resistencia Física</span>
                      <span className="text-blue-400 font-bold">{warlord.stats.defense}</span>
                    </div>
                    <div className="w-full h-2 rounded bg-slate-800">
                      <div className="h-full bg-blue-500 rounded" style={{ width: `${warlord.stats.defense}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-slate-300">Dominio de Haki</span>
                      <span className="text-purple-400 font-bold">{warlord.stats.haki}</span>
                    </div>
                    <div className="w-full h-2 rounded bg-slate-800">
                      <div className="h-full bg-purple-500 rounded" style={{ width: `${warlord.stats.haki}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-slate-300">Influencia Política & Territorio</span>
                      <span className="text-emerald-400 font-bold">{warlord.stats.influence}</span>
                    </div>
                    <div className="w-full h-2 rounded bg-slate-800">
                      <div className="h-full bg-emerald-500 rounded" style={{ width: `${warlord.stats.influence}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Notable Abilities */}
              <div className="space-y-2">
                <h5 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                  Técnicas Letales Registradas:
                </h5>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {warlord.abilities.map((ability, idx) => (
                    <li
                      key={idx}
                      className="p-2.5 rounded-lg bg-grandline-950/70 border border-slate-800 text-slate-200 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-pirate-gold" />
                      <span>{ability}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'lore' && (
            <div className="space-y-4">
              {/* General Lore */}
              <div className="p-4 rounded-xl bg-grandline-950/80 border border-slate-800 space-y-2">
                <h5 className="text-xs font-mono uppercase text-pirate-gold tracking-wider">
                  Reseña Histórica & Antecedentes
                </h5>
                <p className="text-sm text-slate-300 leading-relaxed font-body">
                  {warlord.description}
                </p>
              </div>

              {/* Marineford Role */}
              <div className="p-4 rounded-xl bg-grandline-950/80 border border-red-900/40 space-y-2">
                <h5 className="text-xs font-mono uppercase text-red-400 tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  Actuación en la Guerra en la Cumbre de Marineford
                </h5>
                <p className="text-sm text-slate-300 leading-relaxed font-body">
                  {warlord.marinefordRole}
                </p>
              </div>

              {/* Post-Reverie Fate */}
              <div className="p-4 rounded-xl bg-grandline-950/80 border border-cyan-900/40 space-y-2">
                <h5 className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
                  Situación Actual Tras la Disolución del Shichibukai
                </h5>
                <p className="text-sm text-slate-300 leading-relaxed font-body">
                  {warlord.currentStatus}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 px-6 py-3 bg-grandline-950/95 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>PRESIONE ESC PARA SALIR</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors cursor-pointer"
          >
            Cerrar Expediente
          </button>
        </div>
      </div>
    </div>
  );
}

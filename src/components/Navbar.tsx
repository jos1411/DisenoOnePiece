import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Waves, Menu, X, Shield, Anchor } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const [isMuted, setIsMuted] = useState(soundEngine.getMuted());
  const [isAmbient, setIsAmbient] = useState(soundEngine.getIsAmbientPlaying());
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMuteToggle = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundEngine.playSound('slash');
    }
  };

  const handleAmbientToggle = () => {
    const playing = soundEngine.toggleAmbient();
    setIsAmbient(playing);
    if (playing) {
      soundEngine.playSound('water');
    }
  };

  const handleLinkClick = (id: string) => {
    soundEngine.playSound('click');
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-grandline-950/90 backdrop-blur-md border-b border-pirate-gold/20 shadow-2xl py-3'
          : 'bg-gradient-to-b from-grandline-950 via-grandline-950/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="flex items-center gap-3 group text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pirate-gold rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-full border-2 border-pirate-gold flex items-center justify-center bg-grandline-900 shadow-pirate-gold transition-transform group-hover:scale-105">
              <Shield className="w-5 h-5 text-pirate-gold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-pirate text-lg sm:text-xl font-black tracking-wider text-pirate-gold group-hover:text-pirate-gold-light transition-colors">
                  王下七武海
                </span>
                <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-red-950/80 border border-red-700/60 text-red-400 font-mono">
                  CIPHER POL
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono tracking-wider">
                OKA SHICHIBUKAI ARCHIVE
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => handleLinkClick('hero')}
              className="text-sm font-medium text-slate-300 hover:text-pirate-gold transition-colors cursor-pointer py-1"
            >
              Inicio
            </button>
            <button
              onClick={() => handleLinkClick('warlords')}
              className="text-sm font-medium text-slate-300 hover:text-pirate-gold transition-colors cursor-pointer py-1"
            >
              Carteles Wanted
            </button>
            <button
              onClick={() => handleLinkClick('powers')}
              className="text-sm font-medium text-slate-300 hover:text-pirate-gold transition-colors cursor-pointer py-1"
            >
              Tres Grandes Poderes
            </button>
            <button
              onClick={() => handleLinkClick('timeline')}
              className="text-sm font-medium text-slate-300 hover:text-pirate-gold transition-colors cursor-pointer py-1"
            >
              Cronología
            </button>
            <button
              onClick={() => handleLinkClick('simulator')}
              className="text-sm font-medium text-slate-300 hover:text-pirate-gold transition-colors cursor-pointer py-1"
            >
              Simulador Marina
            </button>
          </nav>

          {/* Audio Controls & CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Ambient Ocean Waves */}
            <button
              onClick={handleAmbientToggle}
              title={isAmbient ? 'Desactivar oleaje oceánico' : 'Activar oleaje del Grand Line'}
              className={`p-2 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono ${
                isAmbient
                  ? 'border-cyan-500/60 bg-cyan-950/60 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                  : 'border-slate-800 bg-grandline-900/60 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <Waves className={`w-4 h-4 ${isAmbient ? 'animate-pulse text-cyan-400' : ''}`} />
              <span className="hidden lg:inline">{isAmbient ? 'Mar: On' : 'Mar: Off'}</span>
            </button>

            {/* Sound FX Mute/Unmute */}
            <button
              onClick={handleMuteToggle}
              title={isMuted ? 'Activar efectos de sonido' : 'Silenciar efectos'}
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                !isMuted
                  ? 'border-pirate-gold/60 bg-amber-950/40 text-pirate-gold shadow-[0_0_10px_rgba(229,169,59,0.3)]'
                  : 'border-slate-800 bg-grandline-900/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Quick action button */}
            <button
              onClick={() => handleLinkClick('warlords')}
              className="relative group px-4 py-2 rounded-lg font-display text-xs uppercase tracking-wider text-grandline-950 bg-pirate-gold hover:bg-pirate-gold-light font-bold shadow-pirate-gold transition-all duration-200 hover:scale-[1.02] cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Anchor className="w-3.5 h-3.5" />
                Explorar Warlords
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={handleMuteToggle}
              className="p-2 rounded-lg border border-slate-800 bg-grandline-900/80 text-pirate-gold"
              aria-label="Silenciar sonido"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-slate-800 bg-grandline-900/80 text-slate-300 hover:text-white"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-pirate-gold/20 bg-grandline-950/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 mt-3">
          <button
            onClick={() => handleLinkClick('hero')}
            className="w-full text-left py-2 px-3 rounded-lg text-slate-300 hover:text-pirate-gold hover:bg-grandline-900 text-sm font-medium"
          >
            Inicio
          </button>
          <button
            onClick={() => handleLinkClick('warlords')}
            className="w-full text-left py-2 px-3 rounded-lg text-slate-300 hover:text-pirate-gold hover:bg-grandline-900 text-sm font-medium"
          >
            Carteles Wanted
          </button>
          <button
            onClick={() => handleLinkClick('powers')}
            className="w-full text-left py-2 px-3 rounded-lg text-slate-300 hover:text-pirate-gold hover:bg-grandline-900 text-sm font-medium"
          >
            Tres Grandes Poderes
          </button>
          <button
            onClick={() => handleLinkClick('timeline')}
            className="w-full text-left py-2 px-3 rounded-lg text-slate-300 hover:text-pirate-gold hover:bg-grandline-900 text-sm font-medium"
          >
            Cronología Histórica
          </button>
          <button
            onClick={() => handleLinkClick('simulator')}
            className="w-full text-left py-2 px-3 rounded-lg text-slate-300 hover:text-pirate-gold hover:bg-grandline-900 text-sm font-medium"
          >
            Simulador de Recompensa
          </button>
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">Oleaje Grand Line:</span>
            <button
              onClick={handleAmbientToggle}
              className={`px-3 py-1 rounded text-xs font-mono border ${
                isAmbient
                  ? 'border-cyan-500 bg-cyan-950/80 text-cyan-300'
                  : 'border-slate-800 text-slate-400'
              }`}
            >
              {isAmbient ? 'Sonido Activo' : 'Desactivado'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

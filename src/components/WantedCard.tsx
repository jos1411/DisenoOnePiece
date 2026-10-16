import { useState, useRef, MouseEvent } from 'react';
import { Shichibukai } from '../data/shichibukai';
import { Eye, Shield, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import { WarlordCardFX } from './WarlordCardFX';

interface WantedCardProps {
  warlord: Shichibukai;
  onSelect: (warlord: Shichibukai) => void;
  isDimmed?: boolean;
  onHoverChange?: (id: string | null) => void;
}

export default function WantedCard({ warlord, onSelect, isDimmed = false, onHoverChange }: WantedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const normX = (x - centerX) / centerX;
    const normY = (y - centerY) / centerY;

    setMousePos({ x: normX, y: normY });

    // Doflamingo marionette delay vs standard responsive 3D tilt
    const maxRot = warlord.id === 'doflamingo' ? 14 : 10;
    setRotateX(normY * -maxRot);
    setRotateY(normX * maxRot);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverChange?.(warlord.id);
    soundEngine.playSound(warlord.soundType);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHoverChange?.(null);
    setRotateX(0);
    setRotateY(0);
    setMousePos({ x: 0, y: 0 });
  };

  const handleClick = () => {
    // Play character-specific click audio signature
    soundEngine.playSound(warlord.soundType, { isClick: true });
    onSelect(warlord);
  };

  // Marionette lag transition for Doflamingo vs ultra-snappy for others
  const transitionStyle = isHovered
    ? warlord.id === 'doflamingo'
      ? 'transform 260ms cubic-bezier(0.18, 0.89, 0.32, 1.28), filter 300ms, opacity 300ms'
      : 'transform 100ms ease-out, filter 300ms, opacity 300ms'
    : 'transform 450ms ease-out, filter 300ms, opacity 300ms';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${
          isHovered ? 1.04 : 1
        }, ${isHovered ? 1.04 : 1}, 1)`,
        transition: transitionStyle,
        boxShadow: isHovered
          ? `0 25px 50px rgba(0,0,0,0.95), 0 0 35px ${warlord.themeColor.glow}`
          : '0 10px 25px rgba(0,0,0,0.7)',
        borderColor: isHovered ? warlord.themeColor.primary : '#8B5A2B',
      }}
      className={`relative group cursor-pointer select-none rounded-xl overflow-hidden p-3 sm:p-4 bg-[#ebd7ba] text-[#3d2410] border-4 transition-all duration-300 flex flex-col justify-between min-h-[490px] ${
        isDimmed ? 'opacity-55 filter blur-[1.5px] grayscale-[40%] brightness-75 scale-[0.97]' : 'opacity-100 z-10'
      } ${isHovered ? 'z-30' : ''}`}
    >
      {/* Background Vintage Paper Grain Texture */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #3d2410 1px, transparent 0)`,
          backgroundSize: '12px 12px',
        }}
      />

      {/* Dynamic Character FX Overlay (Darkness vortex, 3D slash, Room dome, Hearts, etc.) */}
      <WarlordCardFX warlordId={warlord.id} isHovered={isHovered} mousePos={mousePos} />

      {/* Top Header Section */}
      <div className="relative text-center z-10">
        <div className="flex items-center justify-between text-[10px] font-mono font-bold tracking-widest text-[#5c3718] border-b border-[#8B5A2B]/40 pb-1 mb-1">
          <span>MARINE HQ</span>
          <span className="uppercase">{warlord.status}</span>
          <span>No. {warlord.id.toUpperCase()}</span>
        </div>

        <h3
          className={`font-wanted text-4xl sm:text-5xl tracking-widest font-black uppercase transition-all duration-300 ${
            isHovered ? 'wanted-ignite text-[#1c0f05] scale-105' : 'text-[#291708]'
          }`}
        >
          WANTED
        </h3>
        <p className="text-[11px] font-mono tracking-widest font-extrabold uppercase text-[#4a2e16] -mt-1">
          DEAD OR ALIVE
        </p>
      </div>

      {/* Portrait Image Container */}
      <div className="relative my-2 w-full h-64 sm:h-72 rounded-sm overflow-hidden border-2 border-[#5c3718] bg-[#1a120b] shadow-inner flex items-center justify-center">
        {/* Shimmer light effect across the frame on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />

        {/* Character Image */}
        {!imageError ? (
          <img
            src={warlord.imageUrl}
            alt={warlord.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110 filter contrast-105 group-hover:contrast-115"
            loading="lazy"
          />
        ) : (
          <div className={`w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b ${warlord.fallbackGradient} text-white text-center`}>
            <Shield className="w-12 h-12 text-pirate-gold mb-2" />
            <span className="font-pirate text-xl text-pirate-gold">{warlord.japaneseName}</span>
            <span className="font-display text-sm mt-1">{warlord.name}</span>
          </div>
        )}

        {/* Kanji Epithet Floating Tag */}
        <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-pirate-gold/50 text-pirate-gold text-[10px] font-mono z-10 shadow-md">
          {warlord.epithetJp.split(' ')[0]}
        </div>

        {/* Fruit / Power Badge */}
        <div className="absolute bottom-2 left-2 z-10">
          <span className="px-2 py-0.5 rounded bg-black/85 backdrop-blur-sm border border-slate-700 text-slate-200 text-[10px] font-mono uppercase font-semibold shadow-md">
            {warlord.devilFruit.type === 'Ninguna' ? 'Poder Físico/Haki' : warlord.devilFruit.type}
          </span>
        </div>

        {/* Hover Inspect CTA Overlay */}
        <div className="absolute inset-0 bg-grandline-950/70 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 text-white z-20">
          <div className="w-12 h-12 rounded-full bg-pirate-gold text-grandline-950 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
            <Eye className="w-6 h-6" />
          </div>
          <span className="font-display text-xs tracking-wider uppercase font-bold text-pirate-gold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Abrir Dossier Clasificado
          </span>
        </div>
      </div>

      {/* Name & Bounty Details */}
      <div className="relative text-center z-10 pt-1">
        <h4 className="font-wanted text-xl sm:text-2xl font-black uppercase text-[#291708] tracking-wider truncate">
          {warlord.name}
        </h4>
        <p className="text-xs font-mono text-[#5c3718] font-bold truncate">
          "{warlord.epithet}"
        </p>

        {/* Bounty String */}
        <div className="mt-2 py-1 px-2 border-y-2 border-[#5c3718] bg-[#dfc6a2]/60 flex items-center justify-center gap-2">
          <span className="font-serif font-black text-lg sm:text-xl text-[#331c0a]">
            ฿
          </span>
          <span className="font-wanted text-xl sm:text-2xl tracking-wider font-extrabold text-[#291708]">
            {warlord.bountyFormatted.replace(' ฿', '')}
          </span>
          <span className="font-mono text-xs font-extrabold text-[#5c3718]">-</span>
        </div>

        {/* Marine Footer Stamp */}
        <div className="mt-2 flex items-center justify-between text-[10px] font-mono font-bold text-[#5c3718] uppercase">
          <span>SEKAI SEIFU</span>
          <span className="tracking-widest font-black text-[#291708]">MARINE</span>
          <span>REVERIE 09</span>
        </div>
      </div>
    </div>
  );
}

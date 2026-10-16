import { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WantedCard from './components/WantedCard';
import CharacterModal from './components/CharacterModal';
import ThreePowersSection from './components/ThreePowersSection';
import TimelineSection from './components/TimelineSection';
import BountySimulator from './components/BountySimulator';
import Footer from './components/Footer';
import { SHICHIBUKAI_DATA, Shichibukai } from './data/shichibukai';
import { Search, Filter, ArrowUpDown, Skull } from 'lucide-react';
import { soundEngine } from './utils/audio';

export default function App() {
  const [selectedWarlord, setSelectedWarlord] = useState<Shichibukai | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'original' | 'sucesor' | 'fruit' | 'no-fruit'>('all');
  const [sortBy, setSortBy] = useState<'bounty-desc' | 'bounty-asc' | 'threat' | 'name'>('bounty-desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredWarlordId, setHoveredWarlordId] = useState<string | null>(null);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFilterChange = (filter: typeof activeFilter) => {
    soundEngine.playSound('click');
    setActiveFilter(filter);
  };

  const handleSortChange = (sort: typeof sortBy) => {
    soundEngine.playSound('click');
    setSortBy(sort);
  };

  const filteredWarlords = useMemo(() => {
    return SHICHIBUKAI_DATA.filter((w) => {
      // Search matching
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        w.name.toLowerCase().includes(query) ||
        w.epithet.toLowerCase().includes(query) ||
        w.japaneseName.includes(query) ||
        (w.devilFruit.name && w.devilFruit.name.toLowerCase().includes(query)) ||
        w.affiliation.toLowerCase().includes(query);

      if (!matchesSearch) return false;

      // Filter matching
      if (activeFilter === 'original') return w.status === 'Original';
      if (activeFilter === 'sucesor') return w.status === 'Sucesor';
      if (activeFilter === 'fruit') return w.devilFruit.hasFruit;
      if (activeFilter === 'no-fruit') return !w.devilFruit.hasFruit;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'bounty-desc') return b.bountyNumber - a.bountyNumber;
      if (sortBy === 'bounty-asc') return a.bountyNumber - b.bountyNumber;
      if (sortBy === 'threat') return b.stats.threat - a.stats.threat;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [searchQuery, activeFilter, sortBy]);

  return (
    <div className="min-h-screen bg-grandline-950 text-slate-100 flex flex-col selection:bg-pirate-gold selection:text-grandline-950">
      {/* Navigation Bar */}
      <Navbar onNavigate={handleNavigate} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExplore={() => handleNavigate('warlords')}
          onViewPowers={() => handleNavigate('powers')}
        />

        {/* Warlords Showcase Section */}
        <section id="warlords" className="py-20 relative bg-grandline-900/40 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header & Description */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-grandline-950 border border-red-700/60 text-red-300 text-xs font-mono uppercase tracking-widest mb-3 shadow-[0_0_15px_rgba(220,38,38,0.2)]">
                <Skull className="w-3.5 h-3.5 text-red-500" />
                REGISTRO OFICIAL DE RECOMPENSAS • MARINA HQ
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white uppercase tracking-tight">
                Carteles Wanted de los Shichibukai
              </h2>
              <p className="mt-3 text-slate-400 text-sm sm:text-base font-body leading-relaxed">
                Selecciona cualquier cartel de recompensa para abrir el expediente secreto clasificado por la Marina y el CP0.
              </p>
            </div>

            {/* Filter, Search & Sort Controls Bar */}
            <div className="mb-10 p-4 sm:p-6 rounded-2xl bg-grandline-900/90 border border-red-950/60 backdrop-blur-md shadow-2xl flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, apodo, fruta o tripulación..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-grandline-950 border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 font-body transition-all"
                />
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-mono text-slate-400 mr-1 hidden sm:inline flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5 text-red-500" /> Filtro:
                </span>
                {[
                  { id: 'all', label: 'Todos (11)' },
                  { id: 'original', label: 'Originales (7)' },
                  { id: 'sucesor', label: 'Sucesores (4)' },
                  { id: 'fruit', label: 'Con Fruta' },
                  { id: 'no-fruit', label: 'Sin Fruta' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleFilterChange(tab.id as typeof activeFilter)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      activeFilter === tab.id
                        ? 'bg-red-700 text-white font-bold border border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                        : 'bg-grandline-950 text-slate-300 hover:text-white border border-slate-800 hover:border-red-900/60'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                  <ArrowUpDown className="w-3.5 h-3.5" /> Orden:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value as typeof sortBy)}
                  aria-label="Criterio de ordenación de los Shichibukai"
                  className="px-3 py-2 rounded-xl bg-grandline-950 border border-slate-700/80 text-xs font-mono text-slate-200 focus:outline-none focus:border-pirate-gold cursor-pointer"
                >
                  <option value="bounty-desc">Mayor Recompensa</option>
                  <option value="bounty-asc">Menor Recompensa</option>
                  <option value="threat">Nivel de Peligro</option>
                  <option value="name">Nombre Alfabético</option>
                </select>
              </div>
            </div>

            {/* Results Count Banner */}
            <div className="mb-6 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>
                Mostrando <strong className="text-pirate-gold">{filteredWarlords.length}</strong> de {SHICHIBUKAI_DATA.length} Warlords del Mar
              </span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-amber-400 hover:underline cursor-pointer"
                >
                  Limpiar búsqueda
                </button>
              )}
            </div>

            {/* Posters Grid */}
            {filteredWarlords.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                {filteredWarlords.map((warlord) => (
                  <WantedCard
                    key={warlord.id}
                    warlord={warlord}
                    onSelect={(w) => setSelectedWarlord(w)}
                    isDimmed={hoveredWarlordId !== null && hoveredWarlordId !== warlord.id}
                    onHoverChange={(id) => setHoveredWarlordId(id)}
                  />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center rounded-2xl bg-grandline-900/50 border border-slate-800">
                <Skull className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h4 className="font-display text-lg text-slate-300">No se encontraron carteles de recompensa</h4>
                <p className="text-sm text-slate-500 mt-1">Prueba con otro término de búsqueda o cambia los filtros.</p>
              </div>
            )}
          </div>
        </section>

        {/* Three Great Powers Geopolitics Section */}
        <ThreePowersSection />

        {/* Historical Timeline Section */}
        <TimelineSection />

        {/* Marine Bounty Simulator Interactive */}
        <BountySimulator />
      </main>

      {/* Footer */}
      <Footer />

      {/* Secret Dossier Modal */}
      <CharacterModal
        warlord={selectedWarlord}
        onClose={() => setSelectedWarlord(null)}
      />
    </div>
  );
}


import React from 'react';
import { Play, Info, Star, ChevronRight, Sparkles, Gamepad2, Monitor, Watch, Headphones, Smartphone, ShoppingCart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import CountdownTimer from '../components/CountdownTimer';
import { INITIAL_PRODUCTS } from '../constants';

const CATEGORY_DATA = [
  { label: 'Smartphones', id: 'Mobiles', img: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=800&auto=format&fit=crop' },
  { label: 'Laptops', id: 'Laptops', img: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=800&auto=format&fit=crop' },
  { label: 'Audio', id: 'Audio', img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800&auto=format&fit=crop' },
  { label: 'Wearables', id: 'Wearables', img: 'https://images.unsplash.com/photo-1544117518-30df578096a4?q=80&w=800&auto=format&fit=crop' },
  { label: 'Accessories', id: 'Accessories', img: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop' }
];

const Home: React.FC<{ onNavigate: (page: string, id?: string) => void }> = ({ onNavigate }) => {
  const { products, loading } = useAppContext();

  // Loading state
  if (loading || products.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-[#A10E14] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Loading TechHub...</p>
        </div>
      </div>
    );
  }

  // Spotlight on first product
  const spotlight = products[0];
  const mobiles = products.filter(p => p.category === 'Mobiles');
  const accessories = products.filter(p => p.category === 'Accessories');

  return (
    <div className="pb-40 bg-black text-white overflow-x-hidden">
      {/* Cinematic Hero Billboard */}
      <section className="relative h-[85vh] w-full overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={spotlight.image} 
            className="w-full h-full object-cover animate-cinematic opacity-50"
            alt="Spotlight Billboard"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl space-y-6 animate-in fade-in slide-in-from-left duration-1000">
            <div className="flex items-center gap-2 text-[#A10E14] font-black uppercase tracking-[0.4em] text-[10px] md:text-xs">
              <Sparkles className="w-4 h-4 fill-[#A10E14]" /> TechHub Original
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">
              {spotlight.name}
            </h1>
            <p className="text-base md:text-lg text-zinc-300 font-medium leading-relaxed drop-shadow-lg line-clamp-3">
              {spotlight.description}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => onNavigate('product', spotlight.id)}
                className="px-8 py-3 bg-white text-black rounded-sm font-black text-sm md:text-base flex items-center gap-2 hover:bg-zinc-200 transition-all active:scale-95 shadow-xl shadow-white/5"
              >
                <Play className="w-5 h-5 fill-black" /> Buy Now
              </button>
              <button 
                onClick={() => onNavigate('product', spotlight.id)}
                className="px-8 py-3 bg-zinc-600/30 backdrop-blur-md text-white rounded-sm font-black text-sm md:text-base flex items-center gap-2 hover:bg-zinc-600/50 transition-all border border-white/10"
              >
                <Info className="w-5 h-5" /> More Info
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections - Removed negative margin to ensure Genre row isn't "stuck" */}
      <div className="relative z-20 mt-8 md:mt-12 space-y-24">
        
        {/* Row 1: Shop by Genre */}
        <section className="pl-4 md:pl-12 lg:pl-16">
          <h2 className="text-lg md:text-2xl font-black uppercase tracking-tight mb-2 flex items-center gap-3">
            Shop by <span className="text-[#A10E14]">Genre</span>
          </h2>
          <div className="netflix-row pr-4 md:pr-12 lg:pr-16">
            {CATEGORY_DATA.map((cat, i) => (
              <div 
                key={i}
                onClick={() => onNavigate('store')}
                className="netflix-card w-44 md:w-64 group"
              >
                <div className="relative h-32 md:h-44 rounded-lg overflow-hidden border border-zinc-900 shadow-xl bg-zinc-950">
                  <img src={cat.img} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-1000" alt={cat.label} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xs md:text-sm font-black uppercase tracking-[0.2em]">{cat.label}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Big Offer Billboard */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="relative rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-900 p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 shadow-[0_0_100px_rgba(161,14,20,0.1)] group">
              <div className="flex-1 space-y-6">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/10 text-[#A10E14] border border-red-900/20 text-[10px] font-black uppercase tracking-[0.2em]">
                   Blockbuster Event
                 </div>
                 <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-tight italic">Epic Winter <br /> Showdown</h2>
                 <p className="text-zinc-500 font-medium text-base md:text-lg leading-relaxed max-w-md">Our most awarded tech collection is now on sale. Grab your favorites before they sell out.</p>
                 <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 pt-4">
                    <div className="space-y-2">
                       <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Ending in</p>
                       <CountdownTimer />
                    </div>
                    <button 
                      onClick={() => onNavigate('store')}
                      className="px-10 py-4 bg-white text-black rounded-sm font-black uppercase hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-xl"
                    >
                      Browse Sale <ChevronRight className="w-5 h-5" />
                    </button>
                 </div>
              </div>
              <div className="flex-1 w-full max-w-lg relative">
                 <div className="absolute -inset-4 bg-[#A10E14]/5 blur-[60px] rounded-full group-hover:bg-[#A10E14]/10 transition-colors"></div>
                 <img 
                   src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop" 
                   className="relative z-10 rounded-2xl shadow-2xl border border-white/5 group-hover:scale-[1.02] transition-transform duration-1000" 
                   alt="Featured Laptop" 
                 />
              </div>
           </div>
        </section>

        {/* Row 2: Original Mobiles */}
        <section className="pl-4 md:pl-12 lg:pl-16">
          <h2 className="text-lg md:text-2xl font-black uppercase tracking-tight mb-2 flex items-center gap-3">
            Original <span className="text-[#A10E14]">Mobiles</span>
          </h2>
          <div className="netflix-row pr-4 md:pr-12 lg:pr-16">
            {mobiles.map((p) => (
              <div 
                key={p.id}
                onClick={() => onNavigate('product', p.id)}
                className="netflix-card w-64 md:w-80 group"
              >
                <div className="relative aspect-video rounded-md overflow-hidden bg-zinc-900 border border-zinc-800 shadow-xl">
                  <img src={p.image} className="w-full h-full object-cover opacity-80" alt={p.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all">
                    <h3 className="font-bold text-sm truncate mb-1 uppercase tracking-tight">{p.name}</h3>
                    <div className="flex justify-between items-center">
                       <span className="text-[#A10E14] font-black text-xs">₹{p.price.toLocaleString('en-IN')}</span>
                       <span className="text-zinc-500 text-[10px] uppercase font-bold bg-white/5 px-2 py-0.5 rounded-sm border border-white/10">In Stock</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Game CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div 
             onClick={() => onNavigate('game')}
             className="relative h-64 md:h-80 rounded-3xl overflow-hidden cursor-pointer border-4 border-zinc-900 group shadow-2xl"
           >
              <img src="https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=2000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-[3s] group-hover:scale-110" alt="Game Background" />
              <div className="absolute inset-0 bg-gradient-to-r from-red-950/80 to-transparent"></div>
              <div className="relative z-10 h-full flex items-center p-12">
                 <div className="space-y-4 max-w-lg">
                    <div className="flex items-center gap-2 text-yellow-400 font-black uppercase tracking-widest text-[10px]">
                      <Star className="w-4 h-4 fill-yellow-400" /> Winter Gaming Original
                    </div>
                    <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">Frosty Sleigh Run</h3>
                    <p className="text-base md:text-xl text-zinc-200 font-bold leading-relaxed">
                      Beat the holiday score and unlock a <span className="text-[#A10E14] font-black">₹2,000 Gift Voucher</span>!
                    </p>
                    <button className="px-10 py-3 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-transform shadow-2xl">
                      Enter Playzone <Gamepad2 className="w-5 h-5" />
                    </button>
                 </div>
              </div>
           </div>
        </section>

        {/* Row 3: Must-Have Gear */}
        <section className="pl-4 md:pl-12 lg:pl-16">
          <h2 className="text-lg md:text-2xl font-black uppercase tracking-tight mb-2 flex items-center gap-3">
            Must-Have <span className="text-[#A10E14]">Gear</span>
          </h2>
          <div className="netflix-row pr-4 md:pr-12 lg:pr-16">
            {accessories.map((p) => (
              <div 
                key={p.id}
                onClick={() => onNavigate('product', p.id)}
                className="netflix-card w-64 md:w-80 group"
              >
                <div className="relative aspect-video rounded-md overflow-hidden bg-zinc-900 border border-zinc-800 shadow-xl">
                  <img src={p.image} className="w-full h-full object-cover opacity-80" alt={p.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all">
                    <h3 className="font-bold text-sm truncate mb-1 uppercase tracking-tight">{p.name}</h3>
                    <span className="text-[#A10E14] font-black text-xs">₹{p.price.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-40">
          <div className="relative rounded-[50px] p-16 md:p-32 text-center bg-zinc-950 border border-zinc-900 shadow-2xl overflow-hidden group">
             <div className="absolute inset-0 opacity-10">
                <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover grayscale transition-transform duration-[20s] group-hover:scale-125" alt="Tech Hub Aesthetic" />
             </div>
             <div className="relative z-10 space-y-12">
                <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter italic leading-none">
                  The Vault is <br /><span className="text-[#A10E14] drop-shadow-[0_0_50px_rgba(161,14,20,0.5)]">Open</span>
                </h2>
                <p className="text-lg md:text-2xl text-zinc-500 font-bold max-w-3xl mx-auto uppercase tracking-widest leading-relaxed">
                  Unlock exclusive early access to TechHub Original drops and cinematic winter deals. No subscription required.
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                   <button 
                    onClick={() => onNavigate('auth')}
                    className="px-16 py-6 bg-[#A10E14] text-white rounded-md font-black text-xl md:text-2xl uppercase tracking-[0.2em] hover:bg-[#7F0B10] transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-red-900/40"
                   >
                     Join TechHub Free
                   </button>
                   <button 
                     onClick={() => onNavigate('story')}
                     className="px-12 py-6 bg-transparent text-white border-2 border-white/10 rounded-md font-black text-xl uppercase tracking-widest hover:bg-white/5 transition-all"
                   >
                     Our Story
                   </button>
                </div>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;

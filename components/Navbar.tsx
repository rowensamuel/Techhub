
import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Menu, X, Smartphone, LayoutDashboard, LogOut, Gift, Sparkles, Gamepad2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ChristmasLights: React.FC<{ count?: number, className?: string }> = ({ count = 4, className = "" }) => {
  const colors = ['bg-red-800', 'bg-white', 'bg-green-700', 'bg-yellow-600'];
  return (
    <div className={`absolute pointer-events-none flex gap-1 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${colors[i % colors.length]} animate-twinkle shadow-[0_0_8px_currentColor]`}
          style={{ animationDelay: `${i * 0.5}s` }}
        />
      ))}
    </div>
  );
};

const Navbar: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { cart, user, logout } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
        : 'bg-transparent border-b border-transparent'
    }`}>
      {/* Festive Banner - Darker Red */}
      {!isScrolled && (
        <div className="bg-[#A10E14] text-white text-[10px] md:text-xs font-bold py-1.5 text-center tracking-widest uppercase relative overflow-hidden">
          <div className="absolute inset-0 flex justify-between px-4 items-center opacity-30">
            <Gift className="w-3 h-3 animate-bounce" />
            <Sparkles className="w-3 h-3 animate-pulse" />
            <Gift className="w-3 h-3 animate-bounce" style={{ animationDelay: '0.5s' }} />
          </div>
          <span className="relative z-10">❄️ Winter Sale: Shop Exclusive Gadgets! 🎁</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 md:h-20 items-center relative">
          
          {/* Logo Section - Top Left Corner */}
          <div className="flex items-center gap-2 cursor-pointer group relative" onClick={() => onNavigate('home')}>
            <ChristmasLights className="-top-3 left-0" count={3} />
            <div className="p-2 bg-[#A10E14] rounded-lg group-hover:scale-110 transition-transform shadow-lg shadow-red-900/20">
              <Smartphone className="text-white w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="flex flex-col relative">
              <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-[#A10E14] to-white bg-clip-text text-transparent uppercase tracking-tighter">
                TechHub
              </span>
              <span className="text-[8px] uppercase tracking-tighter text-red-700/80 -mt-1 font-bold">Premium Reserve</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-10">
            {[
              { label: 'Home', id: 'home' },
              { label: 'Store', id: 'store' },
              { label: 'Sleigh Run', id: 'game' },
              { label: 'Our Story', id: 'story' },
              { label: 'Support', id: 'support' },
            ].map((link) => (
              <button 
                key={link.id}
                onClick={() => onNavigate(link.id)} 
                className="relative text-sm font-semibold transition-colors text-zinc-300 hover:text-white group"
              >
                {link.label}
                <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[#A10E14] transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            {user?.role === 'admin' && (
              <button onClick={() => onNavigate('admin')} className="text-[#A10E14] hover:text-red-500 font-bold text-sm bg-red-900/10 px-4 py-2 rounded-full border border-red-900/20">
                <LayoutDashboard className="w-4 h-4 inline mr-1" /> Admin
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <button onClick={() => onNavigate('cart')} className="relative p-2.5 hover:bg-white/5 rounded-full transition-all group">
              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-zinc-300 group-hover:text-white transition-colors" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#A10E14] text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-black">
                  {cartCount}
                </span>
              )}
            </button>
            
            {user ? (
              <div className="flex items-center gap-2 md:gap-4">
                <span className="hidden sm:inline text-xs font-bold text-zinc-400">Hi, {user.name}</span>
                <button onClick={() => { logout(); onNavigate('home'); }} className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-full hover:bg-[#A10E14] hover:text-white transition-all">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button onClick={() => onNavigate('auth')} className="px-5 py-2 bg-[#A10E14] text-white hover:bg-[#7F0B10] rounded-sm font-bold text-sm transition-all shadow-lg">
                Sign In
              </button>
            )}

            <button className="lg:hidden p-2.5 bg-zinc-900 border border-zinc-800 rounded-full" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-zinc-950 border-b border-zinc-800 p-6 space-y-6 animate-in slide-in-from-top-4">
          <div className="flex flex-col space-y-4">
            <button onClick={() => { onNavigate('home'); setIsOpen(false); }} className="text-lg font-bold hover:text-[#A10E14] transition-colors text-left">Home</button>
            <button onClick={() => { onNavigate('store'); setIsOpen(false); }} className="text-lg font-bold hover:text-[#A10E14] transition-colors text-left">Store</button>
            <button onClick={() => { onNavigate('game'); setIsOpen(false); }} className="text-lg font-bold text-red-800 text-left">Sleigh Run</button>
            <button onClick={() => { onNavigate('story'); setIsOpen(false); }} className="text-lg font-bold hover:text-[#A10E14] transition-colors text-left">Our Story</button>
            <button onClick={() => { onNavigate('support'); setIsOpen(false); }} className="text-lg font-bold hover:text-[#A10E14] transition-colors text-left">Support</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

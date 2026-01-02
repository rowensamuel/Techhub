import React, { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Store from './pages/Store';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Auth from './pages/Auth';
import AdminDashboard from './pages/AdminDashboard';
import OurStory from './pages/OurStory';
import Support from './pages/Support';
import FlappyBird from './pages/FlappyBird';
import Snowfall from './components/Snowfall';
import { Play } from 'lucide-react';

const NetflixSplash: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);

  const startIntro = () => {
    setHasInteracted(true);
    // Play original Netflix Ta-dum sound effect from audio file
    try {
      const audio = new Audio('/netflix-sound.mp3');
      audio.volume = 0.5;
      audio.play().catch(e => console.error("Audio blocked", e));
    } catch (e) { console.error("Audio blocked", e); }

    setTimeout(() => {
      setIsFinishing(true);
      setTimeout(onComplete, 800);
    }, 2000);
  };

  return (
    <div className={`fixed inset-0 z-[99999] bg-black flex items-center justify-center transition-opacity duration-700 ${isFinishing ? 'opacity-0' : 'opacity-100'}`}>
      {!hasInteracted ? (
        <button 
          onClick={startIntro}
          className="group flex flex-col items-center gap-6"
        >
          <div className="w-20 h-20 rounded-full bg-[#A10E14] flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl shadow-red-900/40">
            <Play className="text-white fill-white w-8 h-8 ml-1" />
          </div>
          <span className="text-white font-black uppercase tracking-[0.3em] text-xs">Unwrap TechHub</span>
        </button>
      ) : (
        <div className="animate-tadum">
           <h1 className="text-[#A10E14] text-7xl md:text-9xl font-black italic tracking-tighter shadow-2xl shadow-red-900/20">
             TECHHUB
           </h1>
        </div>
      )}
    </div>
  );
};

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  const navigate = (page: string, id?: string) => {
    setCurrentPage(page);
    if (page === 'product' && id) {
      setSelectedProductId(id);
    }
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={navigate} />;
      case 'store': return <Store onNavigate={navigate} />;
      case 'product': return selectedProductId ? <ProductDetails productId={selectedProductId} onNavigate={navigate} /> : <Store onNavigate={navigate} />;
      case 'cart': return <Cart onNavigate={navigate} />;
      case 'checkout': return <Checkout onNavigate={navigate} />;
      case 'auth': return <Auth onNavigate={navigate} />;
      case 'admin': return <AdminDashboard />;
      case 'story': return <OurStory />;
      case 'support': return <Support />;
      case 'game': return <FlappyBird onNavigate={navigate} />;
      default: return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-red-500/30">
      {!isIntroComplete && <NetflixSplash onComplete={() => setIsIntroComplete(true)} />}
      <Snowfall />
      <Navbar onNavigate={navigate} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
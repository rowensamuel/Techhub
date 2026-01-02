
import React, { useState } from 'react';
import { Search, Filter, Star, ShoppingCart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { CATEGORIES } from '../constants';

const Store: React.FC<{ onNavigate: (page: string, id?: string) => void }> = ({ onNavigate }) => {
  const { products, addToCart, user } = useAppContext();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-black min-h-screen">
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search gadgets..." 
            className="w-full pl-12 pr-4 py-4 bg-zinc-950 border border-zinc-900 rounded-lg text-white placeholder:text-zinc-700 focus:outline-none focus:border-[#A10E14] transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-4 rounded-lg whitespace-nowrap transition-all font-black text-[10px] uppercase tracking-widest ${
                activeCategory === cat 
                ? 'bg-[#A10E14] text-white shadow-xl shadow-red-900/20' 
                : 'bg-zinc-950 hover:bg-zinc-900 text-zinc-500 border border-zinc-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div 
            key={product.id}
            className="group bg-zinc-950 rounded-lg overflow-hidden border border-zinc-900 hover:border-[#A10E14] transition-all flex flex-col"
          >
            <div 
              className="relative aspect-video overflow-hidden bg-zinc-900 cursor-pointer"
              onClick={() => onNavigate('product', product.id)}
            >
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
              />
              {product.discount > 0 && (
                <span className="absolute top-4 left-4 bg-[#A10E14] text-white text-[10px] font-black px-2 py-1 rounded-sm uppercase">
                  -{product.discount}%
                </span>
              )}
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                 <span className="text-[10px] font-black text-[#A10E14] uppercase tracking-[0.2em]">{product.category}</span>
                 <div className="flex items-center gap-1 text-[10px] text-yellow-500">
                   <Star className="w-3 h-3 fill-yellow-500" /> {product.rating}
                 </div>
              </div>
              <h3 
                className="font-bold text-base mb-2 group-hover:text-[#A10E14] transition-colors cursor-pointer line-clamp-1 uppercase tracking-tight"
                onClick={() => onNavigate('product', product.id)}
              >
                {product.name}
              </h3>
              <p className="text-xs text-zinc-600 line-clamp-2 mb-4 leading-relaxed font-medium">{product.description}</p>
              
              <div className="mt-auto flex justify-between items-center pt-4 border-t border-zinc-900">
                <div className="flex flex-col">
                  <span className="text-xl font-black">₹{product.price.toLocaleString('en-IN')}</span>
                  {product.discount > 0 && (
                    <span className="text-xs text-zinc-700 font-bold line-through">₹{Math.round(product.price * (1 + product.discount/100)).toLocaleString('en-IN')}</span>
                  )}
                </div>
                <button
                  onClick={() => addToCart(product)}
                  disabled={product.stock <= 0}
                  className={`px-4 py-2 rounded-sm transition-all shadow-lg text-xs font-black uppercase tracking-widest ${
                    product.stock <= 0
                      ? 'bg-zinc-600 text-zinc-400 cursor-not-allowed'
                      : 'bg-white text-black hover:bg-zinc-200'
                  }`}
                  title="Add to Cart"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-24">
          <div className="text-6xl mb-4">📺</div>
          <h2 className="text-2xl font-black uppercase tracking-tighter">Empty Vault</h2>
          <p className="text-zinc-600 font-bold uppercase text-[10px] mt-2 tracking-widest">Adjust filters for more cinematic tech.</p>
        </div>
      )}
    </div>
  );
};

export default Store;

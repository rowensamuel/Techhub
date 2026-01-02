
import React from 'react';
import { Star, ShieldCheck, Truck, RotateCcw, ShoppingCart, ArrowLeft, Gamepad2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ProductDetails: React.FC<{ productId: string, onNavigate: (page: string, id?: string) => void }> = ({ productId, onNavigate }) => {
  const { products, addToCart } = useAppContext();
  const product = products.find(p => p.id === productId);

  if (!product) return <div className="p-12 text-center bg-black text-white">Product not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-black text-white">
      <button 
        onClick={() => onNavigate('store')}
        className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors font-bold uppercase text-xs tracking-widest"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Store
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="bg-zinc-950 rounded-lg overflow-hidden border border-zinc-800 aspect-square relative group shadow-2xl">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <div className="grid grid-cols-4 gap-4">
             {[1,2,3,4].map(i => (
               <div key={i} className="aspect-square bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                 <img src={product.image} alt="Thumbnail" className="w-full h-full object-cover" />
               </div>
             ))}
          </div>
          
          <button 
            onClick={() => onNavigate('game')}
            className="w-full py-4 bg-zinc-900 hover:bg-zinc-800 text-red-600 rounded-lg border border-red-900/20 font-black flex items-center justify-center gap-2 transition-all group shadow-xl uppercase tracking-widest text-sm"
          >
            <Gamepad2 className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            Play & Win a Discount
          </button>
        </div>

        {/* Info */}
        <div className="space-y-8">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-sm bg-[#A10E14] text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4 shadow-lg">
              {product.category}
            </span>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 text-white uppercase">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-yellow-500 bg-yellow-500/5 px-3 py-1.5 rounded-lg border border-yellow-500/10">
                <Star className="w-5 h-5 fill-yellow-500" />
                <span className="font-black text-lg">{product.rating}</span>
              </div>
              <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${product.stock > 0 ? 'bg-green-900/10 text-green-500 border border-green-900/20' : 'bg-red-900/10 text-red-700 border border-red-900/20'}`}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-6">
               <span className="text-5xl font-black">₹{product.price.toLocaleString('en-IN')}</span>
               {product.discount > 0 && (
                 <span className="text-2xl text-zinc-700 line-through font-bold">₹{Math.round(product.price * (1 + product.discount/100)).toLocaleString('en-IN')}</span>
               )}
            </div>
            <p className="text-zinc-400 font-medium leading-relaxed text-lg max-w-xl">{product.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {product.specs.map((spec, i) => (
              <div key={i} className="p-4 bg-zinc-950 border border-zinc-900 rounded-lg group hover:border-[#A10E14] transition-all">
                <span className="text-zinc-600 font-black text-[10px] uppercase tracking-widest block mb-1">Feature {i+1}</span>
                <span className="font-bold text-sm text-zinc-200">{spec}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="w-full py-6 bg-[#A10E14] hover:bg-[#7F0B10] text-white rounded-sm font-black text-xl flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-2xl shadow-red-900/20 uppercase tracking-widest"
          >
            <ShoppingCart className="w-6 h-6" /> Add to Cart
          </button>

          <div className="pt-8 grid grid-cols-3 gap-4">
             <div className="flex flex-col items-center gap-3 p-4 bg-zinc-950 rounded-lg text-center border border-zinc-900">
               <Truck className="w-5 h-5 text-[#A10E14]" />
               <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Fast Shipping</span>
             </div>
             <div className="flex flex-col items-center gap-3 p-4 bg-zinc-950 rounded-lg text-center border border-zinc-900">
               <ShieldCheck className="w-5 h-5 text-[#A10E14]" />
               <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">1YR Warranty</span>
             </div>
             <div className="flex flex-col items-center gap-3 p-4 bg-zinc-950 rounded-lg text-center border border-zinc-900">
               <RotateCcw className="w-5 h-5 text-[#A10E14]" />
               <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Easy Return</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;


import React from 'react';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Cart: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { cart, removeFromCart, updateCartQuantity } = useAppContext();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = subtotal * 0.1; // Festive discount
  const total = subtotal - discount;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center bg-black text-white">
        <div className="bg-zinc-900 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border border-zinc-800">
          <ShoppingBag className="w-10 h-10 text-zinc-600" />
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Your vault is empty</h2>
        <p className="text-zinc-500 mb-8 font-bold uppercase text-xs tracking-widest">Add some cinematic tech to get started.</p>
        <button 
          onClick={() => onNavigate('store')}
          className="px-8 py-4 bg-[#A10E14] rounded-sm font-black text-sm uppercase tracking-widest hover:bg-[#7F0B10] transition-colors"
        >
          Browse Store
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-black text-white">
      <h1 className="text-4xl font-black uppercase tracking-tighter mb-12">Shopping <span className="text-[#A10E14]">Vault</span></h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* List */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="bg-zinc-950 rounded-lg p-6 border border-zinc-900 flex gap-6">
              <div className="w-24 h-24 bg-zinc-900 rounded-lg overflow-hidden flex-shrink-0 border border-zinc-800">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between">
                  <h3 className="font-bold text-lg uppercase tracking-tight">{item.name}</h3>
                  <button onClick={() => removeFromCart(item.id)} className="text-zinc-600 hover:text-red-700 transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-[10px] font-black text-[#A10E14] uppercase tracking-widest">{item.category}</p>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-4 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
                    <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="hover:text-red-700 transition-colors"><Minus className="w-4 h-4" /></button>
                    <span className="font-black w-4 text-center text-sm">{item.quantity}</span>
                    <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="hover:text-red-700 transition-colors"><Plus className="w-4 h-4" /></button>
                  </div>
                  <span className="font-black text-xl">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="space-y-6">
          <div className="bg-zinc-950 rounded-lg p-8 border border-zinc-900 space-y-6 shadow-2xl">
            <h3 className="text-xl font-black uppercase tracking-tighter border-b border-zinc-900 pb-4">Order Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-zinc-500 font-bold text-xs uppercase tracking-widest">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-green-500 font-bold text-xs uppercase tracking-widest">
                <span>Winter Deal (10%)</span>
                <span>-₹{discount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-zinc-500 font-bold text-xs uppercase tracking-widest">
                <span>Shipping</span>
                <span className="text-white font-black">Free</span>
              </div>
              <div className="border-t border-zinc-900 pt-4 flex justify-between items-end">
                <span className="text-lg font-black uppercase">Total</span>
                <span className="text-3xl font-black text-[#A10E14]">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('checkout')}
              className="w-full py-5 bg-[#A10E14] hover:bg-[#7F0B10] text-white rounded-sm font-black text-lg uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl shadow-red-900/20"
            >
              Secure Checkout <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 bg-green-500/5 rounded-lg border border-green-500/10 text-center">
            <p className="text-[10px] text-green-500 font-black uppercase tracking-widest">✨ You saved ₹{discount.toLocaleString('en-IN')} today!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

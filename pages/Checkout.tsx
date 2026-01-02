
import React, { useState } from 'react';
import { CreditCard, Smartphone, Landmark, CheckCircle, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Checkout: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { cart, placeOrder, user } = useAppContext();
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [formData, setFormData] = useState({ name: user?.name || '', email: user?.email || '', address: '', phone: '' });
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'BANK'>('UPI');

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal * 0.9;

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePayment = () => {
    const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    placeOrder({
      id: orderId,
      userId: user?.id || 'guest',
      items: [...cart],
      total,
      status: 'pending',
      date: new Date().toISOString(),
      address: {
        name: formData.name,
        street: formData.address,
        city: 'India',
        phone: formData.phone
      }
    });
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-32 text-center animate-in fade-in zoom-in duration-500 bg-black text-white">
        <div className="bg-[#A10E14] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-red-900/40">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">Success!</h2>
        <p className="text-zinc-500 mb-8 text-sm font-bold uppercase tracking-widest">Your tech is reserved. Check your email for details.</p>
        <button 
          onClick={() => onNavigate('home')}
          className="px-10 py-4 bg-white text-black rounded-sm font-black uppercase tracking-widest hover:bg-zinc-200 transition-all"
        >
          Home Screen
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-black text-white">
      <div className="flex items-center gap-8 mb-12">
        <button onClick={() => setStep('details')} className={`flex items-center gap-2 font-black text-xs uppercase tracking-widest ${step === 'details' ? 'text-[#A10E14]' : 'text-zinc-600'}`}>
          <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center border-current">1</span>
          Details
        </button>
        <div className="h-px w-12 bg-zinc-900"></div>
        <button disabled={step === 'details'} className={`flex items-center gap-2 font-black text-xs uppercase tracking-widest ${step === 'payment' ? 'text-[#A10E14]' : 'text-zinc-600'}`}>
          <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center border-current">2</span>
          Payment
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          {step === 'details' ? (
            <form onSubmit={handleSubmitDetails} className="space-y-6">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">Shipping Info</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">Full Name</label>
                  <input required type="text" className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-lg focus:border-[#A10E14] outline-none transition-colors text-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">Phone</label>
                  <input required type="tel" className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-lg focus:border-[#A10E14] outline-none transition-colors text-sm" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">Shipping Address</label>
                <textarea required rows={4} className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-lg focus:border-[#A10E14] outline-none resize-none transition-colors text-sm" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
              </div>
              <button type="submit" className="w-full py-4 bg-[#A10E14] rounded-sm font-black uppercase tracking-widest hover:bg-[#7F0B10] transition-colors shadow-xl shadow-red-900/20">
                Next: Payment
              </button>
            </form>
          ) : (
            <div className="space-y-8">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">Secure Payment</h2>
              <div className="space-y-4">
                {[
                  { id: 'UPI', icon: <Smartphone />, label: 'UPI (GPay, Paytm)' },
                  { id: 'CARD', icon: <CreditCard />, label: 'Credit / Debit Card' },
                  { id: 'BANK', icon: <Landmark />, label: 'Net Banking' }
                ].map(method => (
                  <label key={method.id} className={`flex items-center gap-4 p-6 rounded-lg border-2 transition-all cursor-pointer ${paymentMethod === method.id ? 'bg-[#A10E14]/10 border-[#A10E14]' : 'bg-zinc-950 border-zinc-900 hover:border-zinc-800'}`}>
                    <input type="radio" name="payment" className="hidden" checked={paymentMethod === method.id} onChange={() => setPaymentMethod(method.id as any)} />
                    <div className={`p-3 rounded-lg ${paymentMethod === method.id ? 'bg-[#A10E14] text-white' : 'bg-zinc-900 text-zinc-600'}`}>
                      {method.icon}
                    </div>
                    <span className="font-bold flex-1 text-sm">{method.label}</span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id ? 'border-[#A10E14]' : 'border-zinc-800'}`}>
                      {paymentMethod === method.id && <div className="w-3 h-3 bg-[#A10E14] rounded-full"></div>}
                    </div>
                  </label>
                ))}
              </div>
              <button 
                onClick={handlePayment}
                className="w-full py-4 bg-[#A10E14] rounded-sm font-black uppercase tracking-widest hover:bg-[#7F0B10] transition-colors shadow-xl shadow-red-900/20"
              >
                Confirm ₹{total.toLocaleString('en-IN')}
              </button>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div>
          <div className="bg-zinc-950 rounded-lg p-8 border border-zinc-900 space-y-6 sticky top-24 shadow-2xl">
             <h3 className="text-xl font-black uppercase tracking-tighter mb-4 border-b border-zinc-900 pb-4">Vault Summary</h3>
             <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4">
                     <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover border border-zinc-900" />
                     <div className="flex-1">
                        <p className="font-bold text-xs uppercase">{item.name}</p>
                        <p className="text-[10px] text-zinc-600 font-black">{item.quantity} x ₹{item.price.toLocaleString('en-IN')}</p>
                     </div>
                  </div>
                ))}
             </div>
             <div className="pt-6 border-t border-zinc-900 space-y-2">
               <div className="flex justify-between text-[10px] font-black uppercase text-zinc-600 tracking-widest">
                 <span>Subtotal</span>
                 <span>₹{subtotal.toLocaleString('en-IN')}</span>
               </div>
               <div className="flex justify-between text-[10px] font-black uppercase text-green-500 tracking-widest">
                 <span>Deal</span>
                 <span>-₹{(subtotal * 0.1).toLocaleString('en-IN')}</span>
               </div>
               <div className="flex justify-between font-black text-xl pt-4">
                 <span className="uppercase">Total</span>
                 <span className="text-[#A10E14]">₹{total.toLocaleString('en-IN')}</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

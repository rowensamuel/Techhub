
import React, { useState } from 'react';
import { HelpCircle, MessageSquare, Phone, Mail, ChevronDown, ChevronUp, Send, Truck, RotateCcw, ShieldCheck, CreditCard, Search } from 'lucide-react';

const Support: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    { 
      q: "How long does Christmas shipping take?", 
      a: "During the festive season, we offer expedited 2-day shipping to major cities. Remote locations may take up to 5 business days. You can track your 'Santa Express' order in real-time from your dashboard.",
      category: "Shipping"
    },
    { 
      q: "What is your holiday return policy?", 
      a: "Any purchase made between Dec 1st and Dec 25th can be returned until Jan 15th. We understand some gifts might need swapping! Ensure the product is in its original festive packaging with all seals intact.",
      category: "Returns"
    },
    { 
      q: "Do the gadgets come with a warranty?", 
      a: "Yes! Every single product on TechHub comes with a minimum 1-year brand warranty. Our 'Holiday Gold' products feature an extra 6-month TechHub coverage for total peace of mind.",
      category: "Warranty"
    },
    { 
      q: "Can I pay with multiple UPI apps?", 
      a: "Absolutely. Our secure payment gateway supports all major UPI apps like GPay, PhonePe, and Paytm, as well as Credit/Debit cards. We also offer No-Cost EMI for purchases above ₹20,000.",
      category: "Payment"
    },
    {
      q: "Is Cash on Delivery available for holiday orders?",
      a: "Yes, COD is available for orders up to ₹15,000. For higher value items, we recommend secure online payments to ensure prioritized 'Santa-Express' dispatch.",
      category: "Payment"
    },
    {
      q: "How do I claim my 'Christmas Eve' free earbuds?",
      a: "If your order exceeds ₹49,999, the festive earbuds will be automatically added to your cart at checkout. No coupon code needed—it's our gift to you!",
      category: "Promotions"
    }
  ];

  const filteredFaqs = faqs.filter(f => 
    f.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center space-y-4 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 text-red-500 border border-red-500/20 text-xs font-bold uppercase tracking-widest mb-4">
          Support Center
        </div>
        <h1 className="text-5xl md:text-7xl font-bold font-luxury">How Can Our <span className="text-red-500">Elves</span> Help?</h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">We're here to ensure your holiday tech shopping is as smooth as freshly fallen snow.</p>
      </div>

      {/* Support Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
        {[
          { icon: <Truck />, label: 'Shipping', color: 'text-blue-500' },
          { icon: <RotateCcw />, label: 'Returns', color: 'text-orange-500' },
          { icon: <ShieldCheck />, label: 'Warranty', color: 'text-green-500' },
          { icon: <CreditCard />, label: 'Payment', color: 'text-purple-500' },
        ].map((cat, i) => (
          <button key={i} className="flex flex-col items-center gap-4 p-8 bg-slate-900/50 hover:bg-slate-900 border border-white/5 hover:border-red-500/30 rounded-[32px] transition-all group">
            <div className={`p-4 rounded-2xl bg-white/5 ${cat.color} group-hover:scale-110 transition-transform`}>
              {cat.icon}
            </div>
            <span className="font-bold text-sm tracking-widest uppercase">{cat.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Contact Info */}
        <div className="space-y-6">
          <div className="p-8 bg-slate-900 rounded-[40px] border border-white/5 space-y-8 sticky top-24">
            <h3 className="text-2xl font-bold">Direct Channels</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="p-3 bg-red-600/10 text-red-500 rounded-2xl group-hover:bg-red-600 group-hover:text-white transition-all shadow-lg group-hover:shadow-red-600/20">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Call Support</p>
                  <p className="text-lg font-bold">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="p-3 bg-green-600/10 text-green-500 rounded-2xl group-hover:bg-green-600 group-hover:text-white transition-all shadow-lg group-hover:shadow-green-600/20">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Email Us</p>
                  <p className="text-lg font-bold">support@techhub.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="p-3 bg-blue-600/10 text-blue-500 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg group-hover:shadow-blue-600/20">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Live Chat</p>
                  <p className="text-lg font-bold">24/7 Elf Assistance</p>
                </div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-white/5 text-center">
               <p className="text-sm text-slate-400 italic">"Delivering happiness, one gadget at a time."</p>
            </div>
          </div>
        </div>

        {/* Right: FAQs and Form */}
        <div className="lg:col-span-2 space-y-12">
          {/* FAQ Section */}
          <div className="space-y-6">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
               <h2 className="text-3xl font-bold flex items-center gap-2">
                 <HelpCircle className="text-red-500" /> Holiday FAQ
               </h2>
               <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                 <input 
                   type="text" 
                   placeholder="Search questions..." 
                   className="pl-10 pr-4 py-2 bg-slate-900 border border-white/10 rounded-full text-sm outline-none focus:border-red-500 transition-colors w-full md:w-64"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                 />
               </div>
             </div>

             <div className="space-y-3">
               {filteredFaqs.length > 0 ? filteredFaqs.map((faq, idx) => (
                 <div key={idx} className="bg-slate-900/50 border border-white/5 rounded-3xl overflow-hidden transition-all hover:bg-slate-900">
                   <button 
                     onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                     className="w-full flex items-center justify-between p-6 text-left"
                   >
                     <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{faq.category}</span>
                        <span className="font-bold text-lg">{faq.q}</span>
                     </div>
                     {openFaq === idx ? <ChevronUp className="text-red-500" /> : <ChevronDown className="text-slate-500" />}
                   </button>
                   {openFaq === idx && (
                     <div className="px-6 pb-6 text-slate-400 leading-relaxed animate-in slide-in-from-top-2 duration-300">
                       <div className="p-4 bg-slate-950 rounded-2xl border border-white/5">
                         {faq.a}
                       </div>
                     </div>
                   )}
                 </div>
               )) : (
                 <div className="text-center py-12 bg-slate-900/50 rounded-3xl border border-dashed border-white/10">
                   <p className="text-slate-500 italic">No matching questions found in the workshop.</p>
                 </div>
               )}
             </div>
          </div>

          {/* Form */}
          <div className="bg-slate-900 rounded-[40px] p-8 md:p-12 border border-white/5 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-5 -mr-10 -mt-10 group-hover:rotate-12 transition-transform">
                <Send className="w-32 h-32 text-red-500" />
             </div>
             <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
                <p className="text-slate-400 mb-8">Drop us a festive note and our team will get back to you faster than a sleigh ride!</p>
                <form className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-sm text-slate-500 font-bold uppercase ml-1">Your Name</label>
                         <input type="text" className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 outline-none focus:border-red-500 transition-colors" placeholder="Santa Claus" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-sm text-slate-500 font-bold uppercase ml-1">Your Email</label>
                         <input type="email" className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 outline-none focus:border-red-500 transition-colors" placeholder="santa@northpole.com" />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm text-slate-500 font-bold uppercase ml-1">What's on your mind?</label>
                      <select className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 outline-none focus:border-red-500 cursor-pointer">
                         <option>Where's my order? (Tracking)</option>
                         <option>Technical Issue with Gadget</option>
                         <option>Warranty & Repair Inquiry</option>
                         <option>Festive Feedback / Suggestion</option>
                      </select>
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm text-slate-500 font-bold uppercase ml-1">Message</label>
                      <textarea rows={5} className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 outline-none focus:border-red-500 resize-none" placeholder="Tell us how we can assist you..."></textarea>
                   </div>
                   <button type="submit" className="w-full py-5 bg-red-600 hover:bg-red-700 rounded-full font-bold text-lg shadow-xl shadow-red-600/20 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-[0.99]">
                      <Send className="w-5 h-5" /> Send Message
                   </button>
                </form>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;

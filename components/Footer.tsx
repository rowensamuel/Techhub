
import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-zinc-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <h3 className="text-2xl font-black text-[#A10E14] uppercase tracking-tighter">TechHub</h3>
          <p className="text-zinc-500 text-sm">Premium tech destination. Cinematic gadgets curated for the elite. ❄️</p>
          <div className="flex space-x-4">
            <Instagram className="w-5 h-5 cursor-pointer text-zinc-400 hover:text-[#A10E14] transition-colors" />
            <Facebook className="w-5 h-5 cursor-pointer text-zinc-400 hover:text-[#A10E14] transition-colors" />
            <Twitter className="w-5 h-5 cursor-pointer text-zinc-400 hover:text-[#A10E14] transition-colors" />
          </div>
        </div>
        <div>
          <h4 className="font-black text-xs uppercase tracking-widest mb-6 text-white">Company</h4>
          <ul className="space-y-3 text-zinc-500 text-sm font-bold">
            <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
            <li className="hover:text-white cursor-pointer transition-colors">Privacy</li>
            <li className="hover:text-white cursor-pointer transition-colors">Terms</li>
            <li className="hover:text-white cursor-pointer transition-colors">Support</li>
          </ul>
        </div>
        <div>
          <h4 className="font-black text-xs uppercase tracking-widest mb-6 text-white">Products</h4>
          <ul className="space-y-3 text-zinc-500 text-sm font-bold">
            <li className="hover:text-[#A10E14] cursor-pointer transition-colors">Smartphones</li>
            <li className="hover:text-[#A10E14] cursor-pointer transition-colors">Laptops</li>
            <li className="hover:text-[#A10E14] cursor-pointer transition-colors">Audio</li>
            <li className="hover:text-[#A10E14] cursor-pointer transition-colors">Wearables</li>
          </ul>
        </div>
        <div>
          <h4 className="font-black text-xs uppercase tracking-widest mb-6 text-white">Contact</h4>
          <ul className="space-y-4 text-zinc-500 text-sm font-bold">
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-red-800" /> Mumbai, IN</li>
            <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-red-800" /> +91 98765 43210</li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-red-800" /> sales@techhub.com</li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-12 pt-8 border-t border-zinc-900 text-zinc-700 text-[10px] font-black uppercase tracking-[0.3em]">
        &copy; {new Date().getFullYear()} TechHub - All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;

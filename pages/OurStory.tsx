
import React from 'react';
import { Heart, Target, Users, Zap, Snowflake } from 'lucide-react';

const OurStory: React.FC = () => {
  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1512909006721-3d6018887183?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-30"
            alt="Festive Workshop"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center space-y-6 px-4">
          <h1 className="text-5xl md:text-7xl font-bold font-luxury text-white">My Tech Journey</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto italic">"Created on December 26, 2025, by Rowen Samuel, a passionate computer science student."</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 text-red-500 border border-red-500/20 text-xs font-bold uppercase tracking-widest">
              My Personal Project
            </div>
            <h2 className="text-4xl font-bold leading-tight">Built with <span className="text-red-500">Passion</span>, Driven by <span className="text-green-500">Code</span>.</h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              This project began as a personal challenge for me, Rowen Samuel, a computer science student. I wanted to create something that showcases my skills in full-stack development while building something useful and engaging. Like a carefully crafted program, this e-commerce platform brings together modern web technologies to create a seamless shopping experience.
            </p>
            <p className="text-lg text-slate-400 leading-relaxed">
              As a student passionate about technology, I poured my knowledge of React, Node.js, and database design into this project, creating a platform that demonstrates the power of modern web development.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-white">10+</div>
                <div className="text-sm text-slate-500 uppercase tracking-widest">Technologies Mastered</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-white">2025</div>
                <div className="text-sm text-slate-500 uppercase tracking-widest">Year Created</div>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-red-600 to-green-600 rounded-[40px] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity"></div>
            <img 
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop" 
              className="relative rounded-[40px] border border-white/10 shadow-2xl"
              alt="Team working"
            />
          </div>
        </div>

        <section className="bg-slate-900/50 border border-white/5 rounded-[50px] p-12 md:p-24 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-12 opacity-5">
             <Snowflake className="w-64 h-64 text-white" />
          </div>
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl font-bold font-luxury">My Development Principles</h2>
            <p className="text-slate-400 text-lg">These principles guide my approach to coding and project development.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Heart className="text-red-500" />, title: 'Passion for Code', desc: 'Every line of code is written with dedication and love for programming.' },
              { icon: <Zap className="text-yellow-500" />, title: 'Continuous Learning', desc: 'Always exploring new technologies and improving my skills.' },
              { icon: <Users className="text-green-500" />, title: 'Open Source Spirit', desc: 'Sharing knowledge and contributing to the developer community.' },
              { icon: <Target className="text-blue-500" />, title: 'Clean Architecture', desc: 'Building robust, maintainable code with best practices.' },
            ].map((value, i) => (
              <div key={i} className="bg-slate-950 p-8 rounded-3xl border border-white/5 hover:border-red-500/30 transition-all hover:-translate-y-2 text-center group">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default OurStory;

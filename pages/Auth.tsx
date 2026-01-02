
import React, { useState } from 'react';
import { Mail, Lock, User, LogIn, ShieldAlert } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Auth: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { login, register } = useAppContext();
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const loggedInUser = await login(email, password);
        onNavigate(loggedInUser.role === 'admin' ? 'admin' : 'home');
      } else {
        await register(email, password, name);
        onNavigate('home');
      }
    } catch (err: any) {
      setError(err.message || (isLogin ? 'Login failed. Please try again.' : 'Registration failed. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-950 p-8 md:p-12 rounded-lg border border-zinc-900 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black uppercase tracking-tighter">
            {isAdmin ? 'Vault Control' : isLogin ? 'Secure Entry' : 'Join the Reserve'}
          </h2>
          <p className="text-zinc-500 text-sm font-bold">
            {isAdmin ? 'Access TechHub administrative hub' : 'Get exclusive cinematic deals on high-end tech.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && !isAdmin && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input required type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-zinc-900 border border-zinc-800 rounded-lg outline-none focus:border-red-800 transition-colors" />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input required type="email" placeholder="Email Address" className="w-full pl-12 pr-4 py-4 bg-zinc-900 border border-zinc-800 rounded-lg outline-none focus:border-red-800 transition-colors" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input required type="password" placeholder="Password" className="w-full pl-12 pr-4 py-4 bg-zinc-900 border border-zinc-800 rounded-lg outline-none focus:border-red-800 transition-colors" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          
          {isLogin && !isAdmin && (
            <div className="text-right">
              <button type="button" className="text-xs text-red-700 hover:underline font-bold uppercase tracking-widest">Forgot Pass?</button>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${isAdmin ? 'bg-green-800 hover:bg-green-700 shadow-green-900/20 shadow-lg' : 'bg-[#A10E14] hover:bg-[#7F0B10] shadow-red-900/20 shadow-lg'}`}
          >
            {isAdmin ? <ShieldAlert className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
            {loading ? 'Authenticating...' : (isAdmin ? 'Login as Admin' : isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-900"></div></div>
          <div className="relative flex justify-center text-xs uppercase font-black"><span className="bg-zinc-950 px-2 text-zinc-700">Or</span></div>
        </div>

        <div className="text-center space-y-4">
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
            {isLogin ? "No Access?" : "Already Authorized?"}
            <button onClick={() => setIsLogin(!isLogin)} className="ml-2 text-red-700 font-black hover:underline">
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
          <button 
            onClick={() => { setIsAdmin(!isAdmin); setIsLogin(true); }}
            className="text-[10px] text-zinc-700 hover:text-white transition-colors flex items-center gap-1 mx-auto font-black uppercase tracking-widest"
          >
            {isAdmin ? 'Switch to Client Access' : 'Administrator Override'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;

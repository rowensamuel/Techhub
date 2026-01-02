
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Gift, Trophy, RefreshCw, Gamepad2, Sparkles, Star, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 600;
const GRAVITY = 0.4;
const JUMP = -8;
const PIPE_WIDTH = 60;
const PIPE_GAP = 180;
const PIPE_SPEED = 3;

interface LeaderboardEntry {
  name: string;
  score: number;
}

const FlappyBird: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { user } = useAppContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'GAMEOVER'>('IDLE');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [prizeClaimed, setPrizeClaimed] = useState(false);

  // Load High Score and Leaderboard
  useEffect(() => {
    const saved = localStorage.getItem('sleigh_run_highscore');
    if (saved) setHighScore(parseInt(saved));

    const savedLeaderboard = localStorage.getItem('sleigh_run_leaderboard');
    if (savedLeaderboard) setLeaderboard(JSON.parse(savedLeaderboard));
  }, []);

  // Save High Score and Leaderboard
  const updateLeaderboard = useCallback((newScore: number) => {
    if (newScore > highScore) {
      setHighScore(newScore);
      localStorage.setItem('sleigh_run_highscore', newScore.toString());
    }

    if (user && newScore > 0) {
      const newLeaderboard = [...leaderboard, { name: user.name, score: newScore }]
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
      setLeaderboard(newLeaderboard);
      localStorage.setItem('sleigh_run_leaderboard', JSON.stringify(newLeaderboard));
    }
  }, [highScore, leaderboard, user]);

  const birdY = useRef(300);
  const birdVelocity = useRef(0);
  const pipes = useRef<{ x: number; top: number; passed: boolean }[]>([]);
  const requestRef = useRef<number>(0);

  const resetGame = () => {
    birdY.current = 300;
    birdVelocity.current = 0;
    pipes.current = [];
    setScore(0);
    setGameState('PLAYING');
  };

  const jump = () => {
    if (gameState === 'IDLE') {
      resetGame();
    } else if (gameState === 'PLAYING') {
      birdVelocity.current = JUMP;
    } else if (gameState === 'GAMEOVER') {
      resetGame();
    }
  };

  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#0f172a'; // slate-900
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Subtle Snowflakes in background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    for(let i=0; i<10; i++) {
        ctx.beginPath();
        ctx.arc((Date.now() / 10 + i * 100) % CANVAS_WIDTH, (Date.now() / 20 + i * 50) % CANVAS_HEIGHT, 2, 0, Math.PI * 2);
        ctx.fill();
    }

    if (gameState === 'PLAYING') {
      // Physics
      birdVelocity.current += GRAVITY;
      birdY.current += birdVelocity.current;

      // Pipe Management
      if (pipes.current.length === 0 || pipes.current[pipes.current.length - 1].x < CANVAS_WIDTH - 250) {
        const topHeight = Math.random() * (CANVAS_HEIGHT - PIPE_GAP - 100) + 50;
        pipes.current.push({ x: CANVAS_WIDTH, top: topHeight, passed: false });
      }

      pipes.current.forEach((pipe, index) => {
        pipe.x -= PIPE_SPEED;

        // Collision Detection
        const birdX = 50;
        const birdRadius = 15;

        // Top Pipe
        if (birdX + birdRadius > pipe.x && birdX - birdRadius < pipe.x + PIPE_WIDTH) {
          if (birdY.current - birdRadius < pipe.top || birdY.current + birdRadius > pipe.top + PIPE_GAP) {
            setGameState('GAMEOVER');
            updateLeaderboard(score);
          }
        }

        // Score
        if (!pipe.passed && pipe.x < birdX) {
          pipe.passed = true;
          setScore(s => s + 1);
        }
      });

      // Off-screen pipe removal
      pipes.current = pipes.current.filter(p => p.x > -PIPE_WIDTH);

      // Floor/Ceiling Collision
      if (birdY.current < 0 || birdY.current > CANVAS_HEIGHT) {
        setGameState('GAMEOVER');
        updateLeaderboard(score);
      }
    }

    // Drawing
    // Pipes
    pipes.current.forEach(pipe => {
      // Top Pipe (Green Candy Cane Style)
      ctx.fillStyle = '#22c55e'; // green-500
      ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.top);
      ctx.fillStyle = '#ffffff';
      for(let i=0; i<pipe.top; i+=20) {
          ctx.fillRect(pipe.x, i, PIPE_WIDTH, 5);
      }

      // Bottom Pipe
      ctx.fillStyle = '#ef4444'; // red-500
      ctx.fillRect(pipe.x, pipe.top + PIPE_GAP, PIPE_WIDTH, CANVAS_HEIGHT - (pipe.top + PIPE_GAP));
      ctx.fillStyle = '#ffffff';
       for(let i=pipe.top+PIPE_GAP; i<CANVAS_HEIGHT; i+=20) {
          ctx.fillRect(pipe.x, i, PIPE_WIDTH, 5);
      }
    });

    // Sleigh (Bird)
    ctx.save();
    ctx.translate(50, birdY.current);
    ctx.rotate(birdVelocity.current * 0.05);
    
    // Sleigh Body
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(-20, -10, 40, 20);
    // Runners
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-25, 12);
    ctx.lineTo(25, 12);
    ctx.stroke();
    // Santa Hat
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(0, -15, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.moveTo(-10, -10);
    ctx.lineTo(10, -10);
    ctx.lineTo(0, -25);
    ctx.closePath();
    ctx.fill();

    ctx.restore();

    requestRef.current = requestAnimationFrame(gameLoop);
  }, [gameState, score, updateLeaderboard]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameLoop]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12 items-start">
      <div className="flex-1 space-y-8">
        <div className="animate-in slide-in-from-left duration-700">
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-4 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back Home
          </button>
          <h1 className="text-4xl md:text-5xl font-black italic flex items-center gap-3">
            Santa's <span className="text-red-500">Sleigh</span> Run <Gamepad2 className="text-yellow-400 animate-pulse" />
          </h1>
          <p className="text-slate-400 mt-2 font-bold">Dodge the holiday pillars! Top the leaderboard for a <span className="text-yellow-400">FREE GIFT CARD</span>! 🎁</p>
        </div>

        <div className="relative rounded-[40px] border-8 border-slate-900 overflow-hidden bg-slate-950 shadow-2xl mx-auto" style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}>
          <canvas 
            ref={canvasRef} 
            width={CANVAS_WIDTH} 
            height={CANVAS_HEIGHT} 
            onClick={jump}
            className="cursor-pointer"
          />

          {gameState === 'IDLE' && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8">
              <div className="w-24 h-24 bg-red-600 rounded-[30px] flex items-center justify-center mb-6 animate-bounce shadow-2xl">
                <Gift className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-black mb-4">READY TO FLY?</h2>
              <p className="text-slate-400 font-bold mb-8 uppercase tracking-widest">Press Space or Tap to Jump</p>
              <button 
                onClick={resetGame}
                className="px-12 py-5 bg-white text-slate-950 rounded-full font-black text-xl hover:scale-110 transition-all"
              >
                START MISSION
              </button>
            </div>
          )}

          {gameState === 'GAMEOVER' && (
            <div className="absolute inset-0 bg-red-600/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-8 animate-in zoom-in duration-300">
              <h2 className="text-6xl font-black text-white mb-2 italic">CRASHED!</h2>
              <p className="text-white font-black text-2xl mb-8">Score: {score}</p>
              <div className="flex gap-4">
                <button 
                  onClick={resetGame}
                  className="px-10 py-5 bg-white text-red-600 rounded-full font-black text-lg hover:scale-110 transition-all flex items-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" /> RE-RUN
                </button>
              </div>
            </div>
          )}

          <div className="absolute top-6 left-1/2 -translate-x-1/2">
            <span className="text-5xl font-black text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">{score}</span>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-96 space-y-8 animate-in slide-in-from-right duration-700">
        {/* Leaderboard */}
        <div className="bg-slate-900 rounded-[40px] border-4 border-slate-800 p-8 shadow-2xl space-y-6">
          <h3 className="text-2xl font-black flex items-center gap-3">
            <Trophy className="text-yellow-400 w-8 h-8" /> Leaderboard
          </h3>
          <div className="space-y-4">
            {leaderboard.length > 0 ? leaderboard.map((entry, idx) => (
              <div key={idx} className={`flex items-center justify-between p-4 rounded-2xl ${idx === 0 ? 'bg-yellow-400/10 border-2 border-yellow-400/20' : 'bg-slate-950'}`}>
                <div className="flex items-center gap-4">
                  <span className={`text-xl font-black ${idx === 0 ? 'text-yellow-400' : 'text-slate-500'}`}>{idx + 1}</span>
                  <span className="font-bold">{entry.name}</span>
                </div>
                <span className="font-black text-xl">{entry.score}</span>
              </div>
            )) : (
              <p className="text-slate-500 text-center italic font-bold">No scores yet! Be the first!</p>
            )}
          </div>
        </div>

        {/* Prize Hub */}
        <div className="bg-gradient-to-br from-green-600 to-green-900 rounded-[40px] p-8 text-white shadow-2xl space-y-6 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles className="w-24 h-24" />
           </div>
           <h3 className="text-2xl font-black flex items-center gap-3">
            <Gift className="text-white w-8 h-8" /> Prize Hub
          </h3>
          <p className="font-bold">Reach a score of <span className="text-yellow-400">50</span> to unlock your free Christmas voucher!</p>
          
          <div className="p-6 bg-white/10 rounded-3xl border border-white/20 text-center space-y-4">
             <div className="text-4xl font-black tracking-widest">{highScore >= 50 && !prizeClaimed ? 'SANTA-50' : '????-??'}</div>
             <p className="text-xs font-bold uppercase tracking-widest opacity-60">Coupon Code</p>
          </div>

          <button 
            disabled={highScore < 50 || prizeClaimed}
            onClick={() => setPrizeClaimed(true)}
            className={`w-full py-5 rounded-full font-black text-lg transition-all transform active:scale-95 ${
                highScore >= 50 && !prizeClaimed
                ? 'bg-yellow-400 text-slate-900 shadow-xl'
                : 'bg-white/10 text-white/50 cursor-not-allowed'
            }`}
          >
            {prizeClaimed ? 'PRIZE CLAIMED! 🎉' : highScore >= 50 ? 'CLAIM MY PRIZE' : 'SCORE 50 TO UNLOCK'}
          </button>

          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
             <Star className="w-3 h-3 fill-white" /> Genuine Reward Verified
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlappyBird;

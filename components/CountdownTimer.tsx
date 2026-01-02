
import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ h: 12, m: 45, s: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { ...prev, h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-4">
      {[
        { val: timeLeft.h, label: 'Hours' },
        { val: timeLeft.m, label: 'Mins' },
        { val: timeLeft.s, label: 'Secs' }
      ].map((t, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 min-w-[60px] text-center border border-white/10">
            <span className="text-3xl font-bold font-mono">{String(t.val).padStart(2, '0')}</span>
          </div>
          <span className="text-[10px] uppercase tracking-wider mt-1 text-slate-400">{t.label}</span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;

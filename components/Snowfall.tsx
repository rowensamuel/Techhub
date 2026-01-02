
import React from 'react';

const Snowfall: React.FC = () => {
  const snowflakes = Array.from({ length: 20 });

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {snowflakes.map((_, i) => (
        <div
          key={i}
          className="snowflake"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 10 + 5}s`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: Math.random() * 0.7, // Slightly more transparent
            fontSize: `${Math.random() * 8 + 8}px` // Slightly smaller flakes
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
};

export default Snowfall;

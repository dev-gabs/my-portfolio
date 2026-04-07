import React from 'react';

const HeroWaves: React.FC = () => {
  return (
    <div className="hero-waves-wrapper">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="hero-waves-svg"
      >
        <defs>
          <filter id="wave-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Single elegant curving wave, resembling the user reference */}
        <path
          fill="none"
          stroke="var(--color-ocean-400)"
          strokeWidth="3.5"
          filter="url(#wave-glow)"
          d="M0,80 C200,160 300,10 500,60 C700,110 800,-10 1000,40 C1200,90 1300,110 1440,60"
        />
      </svg>
    </div>
  );
};

export default HeroWaves;

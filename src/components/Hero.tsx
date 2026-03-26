import React from 'react';
import { useLanguage } from '../context/LanguageContext';


const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="hero" id="home">
      {/* Background Image Setup */}
      <div
        className="hero-bg"
        style={{ backgroundImage: "url('/assets/hero-bg.png')" }}
      >
      </div>

      <div className="hero-content-wrapper">
        <div className="hero-content">
          <p className="hero-greeting">
            {t.hero.greeting} <span>👋</span>
          </p>

          <h1 className="hero-title">
            <span className="text-alabaster">{t.hero.im} </span>
            <span className="text-ocean-400">Gabriel </span>
            <span className="text-alabaster">Salvador</span>
          </h1>

          <p className="hero-subtitle">
            {t.hero.subtitle}
          </p>

          <div className="hero-actions">
            <a href="#resume" className="hero-btn-resume">
              {t.hero.resume}
            </a>
            <a href="#portfolio" className="hero-btn-portfolio">
              {t.hero.portfolio}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import ConstellationSphere from './ConstellationSphere';
import BackgroundStars from './BackgroundStars';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  // Animation states & vars
  const greetingText = t.hero.greeting;
  const prefixText = t.hero.im + ' ';
  const nameText = 'Gabriel Salvador';
  const titleText = prefixText + nameText;

  const [typedGreeting, setTypedGreeting] = useState('');
  const [typedTitle, setTypedTitle] = useState('');
  const [showHand, setShowHand] = useState(false);

  useEffect(() => {
    let mounted = true;
    let gIndex = 0;
    let tIndex = 0;

    // Reset animation state when language changes
    setTypedGreeting('');
    setTypedTitle('');
    setShowHand(false);

    const typeGreeting = () => {
      if (!mounted) return;
      if (gIndex < greetingText.length) {
        setTypedGreeting(greetingText.slice(0, gIndex + 1));
        gIndex++;
        setTimeout(typeGreeting, 100);
      } else {
        setShowHand(true);
        // Wait a bit before typing the next line
        setTimeout(typeTitle, 400);
      }
    };

    const typeTitle = () => {
      if (!mounted) return;
      if (tIndex < titleText.length) {
        setTypedTitle(titleText.slice(0, tIndex + 1));
        tIndex++;
        // Type slightly faster for the long name
        setTimeout(typeTitle, 75);
      }
    };

    // Initial delay before typing starts
    setTimeout(typeGreeting, 300);

    return () => { mounted = false; };
  }, [greetingText, titleText]);

  return (
    <section className="hero" id="home">
      {/* Dynamic Background */}
      <BackgroundStars />

      <div className="hero-content-wrapper">
        <div className="hero-content">
          <div className="hero-text-block">
            <p className="hero-greeting">
              {typedGreeting}
              {showHand && <span className="wave-hand">👋🏻</span>}
              {typedTitle.length === 0 && <span className="typewriter-cursor"></span>}
            </p>

            <h1 className="hero-title">
              <div className="title-line">
                <span className="text-before-name">{typedTitle.slice(0, prefixText.length)}</span>
                {typedTitle.length > 0 && typedTitle.length < prefixText.length && (
                  <span className="typewriter-cursor"></span>
                )}
              </div>
              <div className="title-line">
                <span className="text-name">{typedTitle.slice(prefixText.length)}</span>
                {typedTitle.length >= prefixText.length && (
                  <span className="typewriter-cursor"></span>
                )}
              </div>
            </h1>

            <p className="hero-subtitle">
              {t.hero.subtitle}
            </p>
          </div>

          <div className="hero-3d-wrapper">
            <ConstellationSphere />
          </div>

          <div className="hero-actions">
            <a href="#resume" className="hero-btn-resume">
              {t.hero.resume}
            </a>
            <a href="#projects" className="hero-btn-portfolio">
              {t.hero.portfolio}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

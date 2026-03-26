import React, { useState, useEffect, useRef } from 'react';
import { IconPlanet } from '@tabler/icons-react';
import { useLanguage } from '../context/LanguageContext';

const Navbar: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [activeHref, setActiveHref] = useState('#home');
  // Track the intersection ratio of each section
  const ratiosRef = useRef<Record<string, number>>({});

  const links = [
    { href: '#home', label: t.nav.home },
    { href: '#about', label: t.nav.about },
    { href: '#tools', label: t.nav.tools },
    { href: '#story', label: t.nav.story },
    { href: '#eden', label: t.nav.eden },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = '#' + entry.target.id;
          ratiosRef.current[id] = entry.intersectionRatio;
        });

        const best = Object.entries(ratiosRef.current).reduce(
          (acc, [id, ratio]) => (ratio > acc.ratio ? { id, ratio } : acc),
          { id: '', ratio: -1 }
        );

        if (best.id) setActiveHref(best.id);
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0] }
    );

    links.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [t]); 

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Area */}
        <div className="navbar-logo">
          <IconPlanet size={32} className="text-ocean-500" />
        </div>

        {/* Desktop Links */}
        <div className="navbar-links">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={`navbar-link${activeHref === href ? ' active' : ''}`}
              onClick={() => setActiveHref(href)}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Language & Contact */}
        <div className="navbar-actions">
          <div className="navbar-contact">
            <button className="navbar-btn">
              {t.nav.contact}
            </button>
          </div>

          <div 
            className="navbar-lang-switch" 
            onClick={toggleLanguage}
            title={language === 'en' ? 'Mudar para Português' : 'Switch to English'}
          >
            <div className={`switch-indicator ${language === 'pt' ? 'right' : 'left'}`} />
            <span className={`switch-label ${language === 'en' ? 'active' : ''}`}>EN</span>
            <span className={`switch-label ${language === 'pt' ? 'active' : ''}`}>PT</span>
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <div className="navbar-mobile-icon">
          <button className="text-alabaster">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

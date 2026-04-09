import React, { useState, useEffect, useRef } from 'react';
import {
  IconMenu2,
  IconX,
  IconHome,
  IconUser,
  IconTools,
  IconBriefcase,
  IconHistory,
  IconPlant
} from '@tabler/icons-react';
import { useLanguage } from '../context/LanguageContext';

const Navbar: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [activeHref, setActiveHref] = useState('#home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Track the intersection ratio of each section
  const ratiosRef = useRef<Record<string, number>>({});
  // Track programmatic navigation to prevent scroll artifacts
  const isNavigatingRef = useRef(false);

  const links = [
    { href: '#home', label: t.nav.home, icon: <IconHome size={20} stroke={1.5} /> },
    { href: '#about', label: t.nav.about, icon: <IconUser size={20} stroke={1.5} /> },
    { href: '#tools', label: t.nav.tools, icon: <IconTools size={20} stroke={1.5} /> },
    { href: '#projects', label: t.nav.projects, icon: <IconBriefcase size={20} stroke={1.5} /> },
    { href: '#story', label: t.nav.story, icon: <IconHistory size={20} stroke={1.5} /> },
    { href: '#eden', label: t.nav.eden, icon: <IconPlant size={20} stroke={1.5} /> },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleNavClick = (href: string) => {
    setActiveHref(href);
    isNavigatingRef.current = true;
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 1500); // Wait for smooth scroll to finish (approx 1s)
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = '#' + entry.target.id;
          ratiosRef.current[id] = entry.intersectionRatio;
        });

        const best = Object.entries(ratiosRef.current).reduce<{ id: string; ratio: number }>(
          (acc, [id, ratio]) => (ratio > acc.ratio ? { id, ratio } : acc),
          { id: '', ratio: -1 }
        );

        if (best.id && !isNavigatingRef.current) {
          setActiveHref(best.id);
        }
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
          <img
            src={`${import.meta.env.BASE_URL}assets/logo.svg`}
            alt="Logo"
            className="navbar-logo-img"
            style={{ height: '40px', width: 'auto' }}
          />
        </div>

        {/* Desktop Links */}
        <div className="navbar-links">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={`navbar-link${activeHref === href ? ' active' : ''}`}
              onClick={() => handleNavClick(href)}
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

        {/* Mobile/Tablet Menu Icon */}
        <div className="navbar-mobile-icon">
          <button className="text-alabaster" onClick={toggleMenu}>
            <IconMenu2 size={28} />
          </button>
        </div>
      </div>

      {/* Drawer Overlay */}
      <div
        className={`navbar-overlay ${isMenuOpen ? 'open' : ''}`}
        onClick={closeMenu}
      />

      {/* Drawer Sidebar */}
      <div className={`navbar-drawer ${isMenuOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <img
            src={`${import.meta.env.BASE_URL}assets/logo.svg`}
            alt="Logo"
            style={{ height: '48px', width: 'auto' }}
          />
          <button className="text-alabaster" onClick={closeMenu}>
            <IconX size={28} />
          </button>
        </div>

        <div className="drawer-links">
          {links.map(({ href, label, icon }) => (
            <a
              key={href}
              href={href}
              className={`drawer-link${activeHref === href ? ' active' : ''}`}
              onClick={() => {
                handleNavClick(href);
                closeMenu();
              }}
            >
              <span className="drawer-link-icon">{icon}</span>
              <span className="drawer-link-label">{label}</span>
            </a>
          ))}
        </div>

        <div className="drawer-footer">
          <button className="drawer-btn" onClick={() => { closeMenu(); /* add contact logic if needed */ }}>
            {t.nav.contact}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

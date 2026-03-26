import React from 'react';
import { IconUser, IconBrandInstagram, IconBrandLinkedin, IconMail } from '@tabler/icons-react';
import { useLanguage } from '../context/LanguageContext';

const AboutMe: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        
        {/* Left Text Content */}
        <div className="about-text-content">
          <div className="about-header">
            <IconUser size={28} className="text-alabaster" />
            <h2 className="about-title">{t.about.title}</h2>
          </div>

          <p className="about-paragraph">
            {t.about.p1}
          </p>
          
          <p className="about-paragraph">
            {t.about.p2}
          </p>
          
          <p className="about-paragraph">
            {t.about.p3}
          </p>
          
          <p className="about-quote">
            {t.about.quote}
          </p>

          <div className="about-socials">
            <a href="#" className="about-social-link">
              <IconBrandInstagram stroke={1.5} size={28} />
            </a>
            <a href="#" className="about-social-link">
              <IconBrandLinkedin stroke={1.5} size={28} />
            </a>
            <a href="#" className="about-social-link">
              <IconMail stroke={1.5} size={28} />
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="about-image-wrapper">
          <div className="about-image-container">
            {/* Dark overlay from bottom to blend the image into the background */}
            <div className="about-image-overlay" />
            <img 
              src="/assets/my-photo.png" 
              alt="Gabriel Salvador" 
              className="about-image"
            />
          </div>
        </div>

      </div>

      {/* Decorative Wavy Line Base from SVG Asset */}
      <div className="about-waves-wrapper">
        <img 
          src="/assets/waves-aboutme.svg" 
          alt="Wavy decoration" 
          className="about-waves-img"
        />
      </div>
    </section>
  );
};

export default AboutMe;

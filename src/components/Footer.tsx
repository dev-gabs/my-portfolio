import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer-section">
      <p className="footer-text">
        © {new Date().getFullYear()} GABRIEL SALVADOR. {t.footer.rights}
      </p>
    </footer>
  );
};

export default Footer;

import React from 'react';
import './SectionHeader.css';

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ icon, title }) => {
  return (
    <div className="section-header">
      <div className="section-header-icon">
        {icon}
      </div>
      <h2 className="section-header-title">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeader;

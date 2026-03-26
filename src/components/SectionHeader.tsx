import React from 'react';
import './SectionHeader.css';

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ icon, title }) => {
  // Clone element to apply standard icon properties if icon is a valid React element
  const iconWithStyles = React.isValidElement(icon)
    ? React.cloneElement(icon as React.ReactElement<any>, {
        size: 36,
        stroke: 1.25,
      })
    : icon;

  return (
    <div className="section-header">
      <div className="section-header-icon">
        {iconWithStyles}
      </div>
      <h2 className="section-header-title">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeader;

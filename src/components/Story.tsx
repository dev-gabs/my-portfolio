import React from 'react';
import {
  IconHistory,
  IconCircleFilled,
  IconRocket,
  IconBrush,
  IconScale,
  IconAppWindow
} from '@tabler/icons-react';
import { useLanguage } from '../context/LanguageContext';
import SectionHeader from './SectionHeader';
import { STORY_MILESTONES } from '../data/story';
import './Story.css';

const getCategoryIcon = (category: string) => {
  const cat = category.toLowerCase();
  if (cat.includes('legal design')) return <IconScale size={18} />;
  if (cat.includes('design')) return <IconBrush size={18} />;
  if (cat.includes('ux') || cat.includes('ui')) return <IconAppWindow size={18} />;
  if (cat.includes('innovation')) return <IconRocket size={18} />;
  return <IconCircleFilled size={14} />;
};

const Story: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section className="story-section" id="story">
      <div className="story-container">
        <SectionHeader
          icon={<IconHistory />}
          title={(t as any).nav.story ?? "MY STORY"}
        />

        <div className="story-timeline">
          {/* The Central Line */}
          <div className="story-timeline-line" />

          <div className="story-milestones">
            {STORY_MILESTONES.map((milestone, idx) => {
              const { title, description } = milestone.translations[language];
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={milestone.id}
                  className={`story-milestone-item ${isEven ? 'item-left' : 'item-right'}`}
                >
                  {/* The Node on the line */}
                  <div className="story-node">
                    <div className="story-node-inner">
                      {getCategoryIcon(milestone.category)}
                    </div>
                  </div>

                  {/* The Card */}
                  <div className="story-content-card">
                    <div className="story-header">
                      <span className="story-year">{milestone.year}</span>
                      <span className="story-category">{milestone.category}</span>
                    </div>
                    <h3 className="story-title">{title}</h3>
                    <p className="story-description">{description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;

import React, { useRef, useEffect } from 'react';
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

// Individual milestone with staggered scroll reveal
const MilestoneItem: React.FC<{
  milestone: (typeof STORY_MILESTONES)[number];
  idx: number;
  language: string;
}> = ({ milestone, idx, language }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isEven = idx % 2 === 0;
  const { title, description } = milestone.translations[language as 'en' | 'pt'];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('story-milestone-item--visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`story-milestone-item ${isEven ? 'item-left' : 'item-right'}`}
      style={{ '--milestone-delay': `${idx * 0.08}s` } as React.CSSProperties}
    >
      {/* Node on the line */}
      <div className="story-node">
        <div className="story-node-inner">
          {getCategoryIcon(milestone.category)}
        </div>
      </div>

      {/* Card */}
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
            {STORY_MILESTONES.map((milestone, idx) => (
              <MilestoneItem
                key={milestone.id}
                milestone={milestone}
                idx={idx}
                language={language}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;

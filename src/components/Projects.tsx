import React, { useState, useRef, useCallback, useEffect } from 'react';
import { IconBriefcase, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useLanguage } from '../context/LanguageContext';
import SectionHeader from './SectionHeader';
import './Projects.css';

/* =============================================
   CATEGORY COLORS
   Add a color for each category slug here.
   ============================================= */
const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  'Legal Design':  { bg: 'rgba(167,139,250,0.15)', border: 'rgba(167,139,250,0.4)',  text: '#c4b5fd' },
  'UI/UX':         { bg: 'rgba(56,189,248,0.12)',  border: 'rgba(56,189,248,0.35)',  text: '#7dd3fc' },
  'Modelagem 3D':  { bg: 'rgba(52,211,153,0.12)',  border: 'rgba(52,211,153,0.35)',  text: '#6ee7b7' },
  'Eletrônica':    { bg: 'rgba(251,146,60,0.13)',  border: 'rgba(251,146,60,0.4)',   text: '#fdba74' },
};

/* =============================================
   PROJECTS DATA
   Add new projects here. The carousel adapts
   automatically to any number of items.
   ============================================= */
export interface Project {
  id: string;
  titleKey: string;
  descriptionKey: string;
  category: string;
  image: string;
  link?: string;
}

export const PROJECTS: Project[] = [
  // ── Legal Design ──────────────────────────
  {
    id: 'legal-design-01',
    titleKey: 'projects.items.legalDesign01.title',
    descriptionKey: 'projects.items.legalDesign01.description',
    category: 'Legal Design',
    image: `${import.meta.env.BASE_URL}assets/hero-bg.jpg`,
    link: 'https://www.google.com',
  },
  {
    id: 'legal-design-02',
    titleKey: 'projects.items.legalDesign02.title',
    descriptionKey: 'projects.items.legalDesign02.description',
    category: 'Legal Design',
    image: `${import.meta.env.BASE_URL}assets/tools-bg.png`,
  },
  {
    id: 'legal-design-03',
    titleKey: 'projects.items.legalDesign03.title',
    descriptionKey: 'projects.items.legalDesign03.description',
    category: 'Legal Design',
    image: `${import.meta.env.BASE_URL}assets/aboutme-bg.png`,
  },
  // ── UI/UX ─────────────────────────────────
  {
    id: 'uxui-01',
    titleKey: 'projects.items.uxui01.title',
    descriptionKey: 'projects.items.uxui01.description',
    category: 'UI/UX',
    image: `${import.meta.env.BASE_URL}assets/aboutme-bg.png`,
  },
  {
    id: 'uxui-02',
    titleKey: 'projects.items.uxui02.title',
    descriptionKey: 'projects.items.uxui02.description',
    category: 'UI/UX',
    image: `${import.meta.env.BASE_URL}assets/hero-bg.jpg`,
  },
  {
    id: 'uxui-03',
    titleKey: 'projects.items.uxui03.title',
    descriptionKey: 'projects.items.uxui03.description',
    category: 'UI/UX',
    image: `${import.meta.env.BASE_URL}assets/tools-bg.png`,
  },
  // ── Modelagem 3D ──────────────────────────
  {
    id: 'modeling-01',
    titleKey: 'projects.items.modeling01.title',
    descriptionKey: 'projects.items.modeling01.description',
    category: 'Modelagem 3D',
    image: `${import.meta.env.BASE_URL}assets/tools-bg.png`,
  },
  {
    id: 'modeling-02',
    titleKey: 'projects.items.modeling02.title',
    descriptionKey: 'projects.items.modeling02.description',
    category: 'Modelagem 3D',
    image: `${import.meta.env.BASE_URL}assets/hero-bg.jpg`,
  },
  {
    id: 'modeling-03',
    titleKey: 'projects.items.modeling03.title',
    descriptionKey: 'projects.items.modeling03.description',
    category: 'Modelagem 3D',
    image: `${import.meta.env.BASE_URL}assets/aboutme-bg.png`,
  },
  // ── Eletrônica ────────────────────────────
  {
    id: 'electronics-01',
    titleKey: 'projects.items.electronics01.title',
    descriptionKey: 'projects.items.electronics01.description',
    category: 'Eletrônica',
    image: `${import.meta.env.BASE_URL}assets/hero-bg.jpg`,
  },
  {
    id: 'electronics-02',
    titleKey: 'projects.items.electronics02.title',
    descriptionKey: 'projects.items.electronics02.description',
    category: 'Eletrônica',
    image: `${import.meta.env.BASE_URL}assets/tools-bg.png`,
  },
  {
    id: 'electronics-03',
    titleKey: 'projects.items.electronics03.title',
    descriptionKey: 'projects.items.electronics03.description',
    category: 'Eletrônica',
    image: `${import.meta.env.BASE_URL}assets/aboutme-bg.png`,
  },
];

/* ============================================= */

const CATEGORY_ALL = 'all';
const DRAG_THRESHOLD = 40; // px needed to trigger navigation

const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState(CATEGORY_ALL);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Drag state
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const hasDragged = useRef(false);

  // Derive unique categories from data
  const categories = [
    CATEGORY_ALL,
    ...Array.from(new Set(PROJECTS.map((p) => p.category))),
  ];

  const filtered = activeFilter === CATEGORY_ALL
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  const len = filtered.length;

  // Reset to 0 when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeFilter]);

  // ── Infinite navigation ──────────────────
  const goTo = useCallback(
    (index: number) => {
      // Wrap around using modulo
      setCurrentIndex(((index % len) + len) % len);
    },
    [len]
  );

  const prev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);
  const next = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);

  // ── Keyboard navigation ──────────────────
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [prev, next]);

  // ── Mouse drag (desktop) ─────────────────
  const handleMouseDown = (e: React.MouseEvent) => {
    // Don't interfere with arrow button clicks
    if ((e.target as HTMLElement).closest('button')) return;
    isDragging.current = true;
    hasDragged.current = false;
    dragStartX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    if (Math.abs(e.clientX - dragStartX.current) > 5) hasDragged.current = true;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const delta = e.clientX - dragStartX.current;
    if (delta < -DRAG_THRESHOLD) next();
    else if (delta > DRAG_THRESHOLD) prev();
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const delta = e.clientX - dragStartX.current;
    if (delta < -DRAG_THRESHOLD) next();
    else if (delta > DRAG_THRESHOLD) prev();
  };

  // ── Touch swipe (mobile/tablet) ───────────
  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
    hasDragged.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const delta = e.touches[0].clientX - dragStartX.current;
    if (Math.abs(delta) > 10) hasDragged.current = true;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientX - dragStartX.current;
    if (delta < -DRAG_THRESHOLD) next();  // swiped LEFT  → go forward
    else if (delta > DRAG_THRESHOLD) prev(); // swiped RIGHT → go back
  };

  // ── Helpers ──────────────────────────────
  const resolveText = (key: string): string => {
    const parts = key.split('.');
    let obj: any = t;
    for (const part of parts) {
      if (obj === undefined) return key;
      obj = obj[part];
    }
    return typeof obj === 'string' ? obj : key;
  };

  const categoryLabel = (cat: string) =>
    cat === CATEGORY_ALL ? (t as any).projects?.all ?? 'All' : cat;

  const getCategoryColor = (cat: string) =>
    CATEGORY_COLORS[cat] ?? { bg: 'rgba(255,255,255,0.08)', border: 'rgba(255,255,255,0.2)', text: '#e0e1dd' };

  if (filtered.length === 0) return null;

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">

        <SectionHeader
          icon={<IconBriefcase />}
          title={(t as any).projects?.title ?? 'PROJECTS'}
        />

        {/* Filter Tabs */}
        <div className="projects-filters" role="tablist" aria-label="Project categories">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeFilter === cat}
              className={`projects-filter-tab${activeFilter === cat ? ' active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {categoryLabel(cat)}
            </button>
          ))}
        </div>

        {/* Carousel */}
        <div
          className="projects-carousel-wrapper"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Prev Arrow — positioned near center card */}
          <button
            className="projects-arrow projects-arrow--prev"
            onClick={prev}
            aria-label="Previous project"
          >
            <IconChevronLeft size={20} stroke={1.5} />
          </button>

          {/* Cards Track */}
          <div className="projects-track" aria-live="polite">
            {filtered.map((project, idx) => {
              // Shortest circular offset
              let offset = idx - currentIndex;
              if (offset > len / 2)  offset -= len;
              if (offset < -len / 2) offset += len;

              const isCenter = offset === 0;
              const isVisible = Math.abs(offset) <= 1;
              const color = getCategoryColor(project.category);

              return (
                <div
                  key={project.id}
                  className={`project-card${isCenter ? ' project-card--active' : ''}${!isVisible ? ' project-card--hidden' : ''}`}
                  style={{ '--offset': offset } as React.CSSProperties}
                  onClick={() => {
                    if (!hasDragged.current && !isCenter) goTo(idx);
                  }}
                  aria-hidden={!isCenter}
                >
                  <div className="project-card-image-wrapper">
                    <img
                      src={project.image}
                      alt={resolveText(project.titleKey)}
                      className="project-card-image"
                      draggable={false}
                    />
                    <div className="project-card-overlay" />
                    {/* Colored category badge */}
                    <span
                      className="project-card-badge"
                      style={{
                        background: color.bg,
                        border: `1px solid ${color.border}`,
                        color: color.text,
                      }}
                    >
                      {project.category}
                    </span>
                  </div>

                  <div className="project-card-body">
                    <h3 className="project-card-title">
                      {resolveText(project.titleKey)}
                    </h3>
                    <p className="project-card-description">
                      {resolveText(project.descriptionKey)}
                    </p>
                    {project.link && isCenter && (
                      <a
                        href={project.link}
                        className="project-card-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {(t as any).projects?.viewProject ?? 'View Project'}
                        <IconChevronRight size={14} stroke={2} />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Next Arrow — positioned near center card */}
          <button
            className="projects-arrow projects-arrow--next"
            onClick={next}
            aria-label="Next project"
          >
            <IconChevronRight size={20} stroke={1.5} />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="projects-dots" role="tablist" aria-label="Project navigation">
          {filtered.map((_, idx) => (
            <button
              key={idx}
              role="tab"
              aria-selected={idx === currentIndex}
              className={`projects-dot${idx === currentIndex ? ' active' : ''}`}
              onClick={() => goTo(idx)}
              aria-label={`Go to project ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;

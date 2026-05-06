import React, { useState, useRef, useEffect } from 'react';
import { IconDeviceDesktop } from '@tabler/icons-react';
import { useLanguage } from '../context/LanguageContext';
import SectionHeader from './SectionHeader';

type Tool = {
  name: string;
  icon: string;
  description: { en: string; pt: string };
};

type ToolCategory = {
  title: string;
  tools: Tool[];
};

// Hook for staggered reveal on scroll
function useIntersectionStagger(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('tools-category--visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}

// Individual category with staggered reveal
const ToolCategoryBlock: React.FC<{
  category: ToolCategory;
  categoryIndex: number;
  language: string;
}> = ({ category, categoryIndex, language }) => {
  const ref = useRef<HTMLDivElement>(null);
  useIntersectionStagger(ref as React.RefObject<HTMLElement | null>);

  return (
    <div
      ref={ref}
      className="tools-category"
      style={{ '--cat-delay': `${categoryIndex * 0.12}s` } as React.CSSProperties}
    >
      <h3 className="tools-category-title">{category.title}</h3>

      <div className="tools-items">
        {category.tools.map((tool, i) => (
          <ToolCard
            key={i}
            tool={tool}
            cardIndex={i}
            language={language}
          />
        ))}
      </div>
    </div>
  );
};

// Individual tool card with tooltip
const ToolCard: React.FC<{
  tool: Tool;
  cardIndex: number;
  language: string;
}> = ({ tool, cardIndex, language }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isMobile = useRef(false);

  // Detect touch device
  useEffect(() => {
    isMobile.current = window.matchMedia('(hover: none)').matches;
  }, []);

  // Close tooltip when clicking outside (mobile)
  useEffect(() => {
    if (!tooltipOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setTooltipOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [tooltipOpen]);

  const description = tool.description[language as 'en' | 'pt'];

  const handleClick = () => {
    if (isMobile.current) setTooltipOpen((v) => !v);
  };

  return (
    <div
      ref={cardRef}
      className={`tool-card${tooltipOpen ? ' tool-card--active' : ''}`}
      style={{ '--card-delay': `${cardIndex * 0.06}s` } as React.CSSProperties}
      onMouseEnter={() => { if (!isMobile.current) setTooltipOpen(true); }}
      onMouseLeave={() => { if (!isMobile.current) setTooltipOpen(false); }}
      onClick={handleClick}
      aria-label={tool.name}
    >
      {/* Tooltip */}
      <div
        className={`tool-tooltip${tooltipOpen ? ' tool-tooltip--visible' : ''}`}
        role="tooltip"
        aria-hidden={!tooltipOpen}
      >
        <span className="tool-tooltip-name">{tool.name}</span>
        <span className="tool-tooltip-desc">{description}</span>
      </div>

      <div className="tool-icon-wrapper">
        <img
          src={tool.icon}
          alt={tool.name}
          className="tool-svg-icon"
          width={32}
          height={32}
          draggable={false}
        />
      </div>
      <span className="tool-name">{tool.name}</span>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────

const Tools: React.FC = () => {
  const { t, language } = useLanguage();

  const toolCategories: ToolCategory[] = [
    {
      title: t.tools.categories.design,
      tools: [
        {
          name: "Illustrator",
          icon: `${import.meta.env.BASE_URL}assets/tools-icons/illustrator.svg`,
          description: {
            en: "Vector illustration & brand identity",
            pt: "Ilustração vetorial e identidade visual"
          }
        },
        {
          name: "Photoshop",
          icon: `${import.meta.env.BASE_URL}assets/tools-icons/photoshop.svg`,
          description: {
            en: "Photo editing & compositing",
            pt: "Edição de fotos e composição"
          }
        },
        {
          name: "Figma",
          icon: `${import.meta.env.BASE_URL}assets/tools-icons/figma.svg`,
          description: {
            en: "UI design & interactive prototypes",
            pt: "Design de UI e protótipos interativos"
          }
        },
        {
          name: "Word",
          icon: `${import.meta.env.BASE_URL}assets/tools-icons/word.svg`,
          description: {
            en: "Documents & Legal Design layouts",
            pt: "Documentos e layouts de Legal Design"
          }
        },
        {
          name: "PowerPoint",
          icon: `${import.meta.env.BASE_URL}assets/tools-icons/powerpoint.svg`,
          description: {
            en: "Presentations & pitch decks",
            pt: "Apresentações e pitch decks"
          }
        },
        {
          name: "CorelDraw",
          icon: `${import.meta.env.BASE_URL}assets/tools-icons/coreldraw.svg`,
          description: {
            en: "Vector design & large format print",
            pt: "Design vetorial e impressão em grande formato"
          }
        },
      ]
    },
    {
      title: t.tools.categories.protoptyping,
      tools: [
        {
          name: "Blender",
          icon: `${import.meta.env.BASE_URL}assets/tools-icons/blender.svg`,
          description: {
            en: "3D modeling, rendering & animation",
            pt: "Modelagem 3D, renderização e animação"
          }
        },
        {
          name: "Fusion 360",
          icon: `${import.meta.env.BASE_URL}assets/tools-icons/fusion360.svg`,
          description: {
            en: "CAD modeling for 3D printing",
            pt: "Modelagem CAD para impressão 3D"
          }
        },
        {
          name: "VS Code",
          icon: `${import.meta.env.BASE_URL}assets/tools-icons/vs_code.svg`,
          description: {
            en: "Primary code editor for all projects",
            pt: "Editor de código principal para todos os projetos"
          }
        },
        {
          name: "Cura",
          icon: `${import.meta.env.BASE_URL}assets/tools-icons/cura.svg`,
          description: {
            en: "FDM slicer for 3D print preparation",
            pt: "Fatiador FDM para preparação de impressão 3D"
          }
        },
      ]
    },
    {
      title: t.tools.categories.ai,
      tools: [
        {
          name: "Monday",
          icon: `${import.meta.env.BASE_URL}assets/tools-icons/monday.svg`,
          description: {
            en: "Project management & team workflows",
            pt: "Gestão de projetos e fluxos de equipe"
          }
        },
        {
          name: "Teams",
          icon: `${import.meta.env.BASE_URL}assets/tools-icons/teams.svg`,
          description: {
            en: "Team communication & collaboration",
            pt: "Comunicação e colaboração em equipe"
          }
        },
        {
          name: "ChatGPT",
          icon: `${import.meta.env.BASE_URL}assets/tools-icons/gpt.svg`,
          description: {
            en: "AI-assisted writing & brainstorming",
            pt: "Escrita e brainstorming assistidos por IA"
          }
        },
        {
          name: "Copilot",
          icon: `${import.meta.env.BASE_URL}assets/tools-icons/copilot.svg`,
          description: {
            en: "AI pair programming & code suggestions",
            pt: "Programação em par com IA e sugestões de código"
          }
        },
        {
          name: "Gemini",
          icon: `${import.meta.env.BASE_URL}assets/tools-icons/gemini.svg`,
          description: {
            en: "Multimodal AI for research & creation",
            pt: "IA multimodal para pesquisa e criação"
          }
        },
        {
          name: "Antigravity",
          icon: `${import.meta.env.BASE_URL}assets/tools-icons/antigravity.svg`,
          description: {
            en: "Agentic AI for advanced coding tasks",
            pt: "IA agêntica para tarefas avançadas de código"
          }
        },
      ]
    },
    {
      title: t.tools.categories.video,
      tools: [
        {
          name: "DaVinci",
          icon: `${import.meta.env.BASE_URL}assets/tools-icons/davinci.svg`,
          description: {
            en: "Professional video editing & color grading",
            pt: "Edição de vídeo profissional e colorização"
          }
        },
        {
          name: "Ableton",
          icon: `${import.meta.env.BASE_URL}assets/tools-icons/ableton.svg`,
          description: {
            en: "Music production & live performance",
            pt: "Produção musical e performance ao vivo"
          }
        },
      ]
    }
  ];

  return (
    <section
      className="tools-section"
      id="tools"
      style={{ backgroundImage: `url('${import.meta.env.BASE_URL}assets/tools-bg.png')` }}
    >
      <div className="tools-container">

        <SectionHeader
          icon={<IconDeviceDesktop />}
          title={t.tools.title}
        />

        <div className="tools-grid">
          {toolCategories.map((category, idx) => (
            <ToolCategoryBlock
              key={idx}
              category={category}
              categoryIndex={idx}
              language={language}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Tools;

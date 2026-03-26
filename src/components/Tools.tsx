import React from 'react';
import { IconDeviceDesktop } from '@tabler/icons-react';
import { useLanguage } from '../context/LanguageContext';

type Tool = {
  name: string;
  icon: string;
};

type ToolCategory = {
  title: string;
  tools: Tool[];
};

const Tools: React.FC = () => {
  const { t } = useLanguage();

  const toolCategories: ToolCategory[] = [
    {
      title: t.tools.categories.design,
      tools: [
        { name: "Illustrator", icon: `${import.meta.env.BASE_URL}assets/tools-icons/illustrator.svg` },
        { name: "Photoshop",   icon: `${import.meta.env.BASE_URL}assets/tools-icons/photoshop.svg` },
        { name: "Figma",       icon: `${import.meta.env.BASE_URL}assets/tools-icons/figma.svg` },
        { name: "Word",        icon: `${import.meta.env.BASE_URL}assets/tools-icons/word.svg` },
        { name: "PowerPoint",  icon: `${import.meta.env.BASE_URL}assets/tools-icons/powerpoint.svg` },
        { name: "CorelDraw",   icon: `${import.meta.env.BASE_URL}assets/tools-icons/coreldraw.svg` },
      ]
    },
    {
      title: t.tools.categories.protoptyping,
      tools: [
        { name: "Blender",    icon: `${import.meta.env.BASE_URL}assets/tools-icons/blender.svg` },
        { name: "Fusion 360", icon: `${import.meta.env.BASE_URL}assets/tools-icons/fusion360.svg` },
        { name: "VS Code",    icon: `${import.meta.env.BASE_URL}assets/tools-icons/vs_code.svg` },
        { name: "Cura",       icon: `${import.meta.env.BASE_URL}assets/tools-icons/cura.svg` },
      ]
    },
    {
      title: t.tools.categories.ai,
      tools: [
        { name: "Monday",  icon: `${import.meta.env.BASE_URL}assets/tools-icons/monday.svg` },
        { name: "Teams",   icon: `${import.meta.env.BASE_URL}assets/tools-icons/teams.svg` },
        { name: "ChatGPT", icon: `${import.meta.env.BASE_URL}assets/tools-icons/gpt.svg` },
        { name: "Copilot", icon: `${import.meta.env.BASE_URL}assets/tools-icons/copilot.svg` },
        { name: "Gemini",  icon: `${import.meta.env.BASE_URL}assets/tools-icons/gemini.svg` },
        { name: "Lovart",  icon: `${import.meta.env.BASE_URL}assets/tools-icons/lovart.svg` },
      ]
    },
    {
      title: t.tools.categories.video,
      tools: [
        { name: "DaVinci", icon: `${import.meta.env.BASE_URL}assets/tools-icons/davinci.svg` },
        { name: "Ableton", icon: `${import.meta.env.BASE_URL}assets/tools-icons/ableton.svg` },
      ]
    }
  ];

  return (
    <section className="tools-section" id='tools'>
      <div className="tools-container">

        <div className="tools-header">
          <IconDeviceDesktop size={28} className="text-alabaster" />
          <h2 className="tools-title">{t.tools.title}</h2>
        </div>

        <div className="tools-grid">
          {toolCategories.map((category, idx) => (
            <div key={idx} className="tools-category">
              <h3 className="tools-category-title">
                {category.title}
              </h3>

              <div className="tools-items">
                {category.tools.map((tool, i) => (
                  <div key={i} className="tool-card group">
                    <div className="tool-icon-wrapper">
                      <img
                        src={tool.icon}
                        alt={tool.name}
                        className="tool-svg-icon"
                        width={32}
                        height={32}
                      />
                    </div>
                    <span className="tool-name">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Tools;

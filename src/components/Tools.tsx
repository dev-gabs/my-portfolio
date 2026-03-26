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
        { name: "Illustrator", icon: "/assets/tools-icons/illustrator.svg" },
        { name: "Photoshop",   icon: "/assets/tools-icons/photoshop.svg" },
        { name: "Figma",       icon: "/assets/tools-icons/figma.svg" },
        { name: "Word",        icon: "/assets/tools-icons/word.svg" },
        { name: "PowerPoint",  icon: "/assets/tools-icons/powerpoint.svg" },
        { name: "CorelDraw",   icon: "/assets/tools-icons/coreldraw.svg" },
      ]
    },
    {
      title: t.tools.categories.protoptyping,
      tools: [
        { name: "Blender",    icon: "/assets/tools-icons/blender.svg" },
        { name: "Fusion 360", icon: "/assets/tools-icons/fusion360.svg" },
        { name: "VS Code",    icon: "/assets/tools-icons/vs_code.svg" },
        { name: "Cura",       icon: "/assets/tools-icons/cura.svg" },
      ]
    },
    {
      title: t.tools.categories.ai,
      tools: [
        { name: "Monday",  icon: "/assets/tools-icons/monday.svg" },
        { name: "Teams",   icon: "/assets/tools-icons/teams.svg" },
        { name: "ChatGPT", icon: "/assets/tools-icons/gpt.svg" },
        { name: "Copilot", icon: "/assets/tools-icons/copilot.svg" },
        { name: "Gemini",  icon: "/assets/tools-icons/gemini.svg" },
        { name: "Lovart",  icon: "/assets/tools-icons/lovart.svg" },
      ]
    },
    {
      title: t.tools.categories.video,
      tools: [
        { name: "DaVinci", icon: "/assets/tools-icons/davinci.svg" },
        { name: "Ableton", icon: "/assets/tools-icons/ableton.svg" },
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

export interface Project {
  id: string;
  category: string;
  image: string;
  link?: string;
  translations: {
    en: {
      title: string;
      description: string;
    };
    pt: {
      title: string;
      description: string;
    };
  };
}

export const PROJECTS: Project[] = [
  // ── Legal Design ──────────────────────────
  {
    id: 'legal-design-01',
    category: 'Legal Design',
    image: `${import.meta.env.BASE_URL}assets/hero-bg.jpg`,
    link: 'https://www.google.com',
    translations: {
      en: {
        title: "Legal Contract Redesign",
        description: "Simplifying complex legal language with visual hierarchy and clear typography."
      },
      pt: {
        title: "Redesign de Contrato Jurídico",
        description: "Simplificando linguagem jurídica complexa com hierarquia visual e tipografia clara."
      }
    }
  },
  {
    id: 'legal-design-02',
    category: 'Legal Design',
    image: `${import.meta.env.BASE_URL}assets/tools-bg.png`,
    translations: {
      en: {
        title: "Privacy Policy Visualization",
        description: "Transforming dense privacy policies into scannable, illustrated infographics."
      },
      pt: {
        title: "Visualização de Política de Privacidade",
        description: "Transformando políticas de privacidade densas em infográficos ilustrados e legíveis."
      }
    }
  },
  {
    id: 'legal-design-03',
    category: 'Legal Design',
    image: `${import.meta.env.BASE_URL}assets/aboutme-bg.png`,
    translations: {
      en: {
        title: "Terms of Service Simplification",
        description: "Rewriting legal terms in plain language supported by structured visual layout."
      },
      pt: {
        title: "Simplificação de Termos de Uso",
        description: "Reescrevendo termos legais em linguagem simples com layout visual estruturado."
      }
    }
  },
  // ── UI/UX ─────────────────────────────────
  {
    id: 'uxui-01',
    category: 'UI/UX',
    image: `${import.meta.env.BASE_URL}assets/aboutme-bg.png`,
    translations: {
      en: {
        title: "Dashboard UX",
        description: "Designing an intuitive analytics dashboard with accessible data visualizations."
      },
      pt: {
        title: "UX de Dashboard",
        description: "Projetando um painel de análise intuitivo com visualizações de dados acessíveis."
      }
    }
  },
  {
    id: 'uxui-02',
    category: 'UI/UX',
    image: `${import.meta.env.BASE_URL}assets/hero-bg.jpg`,
    translations: {
      en: {
        title: "Mobile Onboarding Flow",
        description: "Crafting a frictionless onboarding experience for a fintech mobile application."
      },
      pt: {
        title: "Fluxo de Onboarding Mobile",
        description: "Criando uma experiência de onboarding sem atritos para um aplicativo fintech."
      }
    }
  },
  {
    id: 'uxui-03',
    category: 'UI/UX',
    image: `${import.meta.env.BASE_URL}assets/tools-bg.png`,
    translations: {
      en: {
        title: "Design System Components",
        description: "Building a scalable component library with accessibility and consistency at its core."
      },
      pt: {
        title: "Componentes de Design System",
        description: "Construindo uma biblioteca de componentes escalável com foco em acessibilidade e consistência."
      }
    }
  },
  // ── Modelagem 3D ──────────────────────────
  {
    id: 'modeling-01',
    category: 'Modelagem 3D',
    image: `${import.meta.env.BASE_URL}assets/tools-bg.png`,
    translations: {
      en: {
        title: "3D Product Visualization",
        description: "High-fidelity 3D renders for physical product presentation and client review."
      },
      pt: {
        title: "Visualização 3D de Produto",
        description: "Renders 3D de alta fidelidade para apresentação de produtos físicos e revisão com clientes."
      }
    }
  },
  {
    id: 'modeling-02',
    category: 'Modelagem 3D',
    image: `${import.meta.env.BASE_URL}assets/hero-bg.jpg`,
    translations: {
      en: {
        title: "Architectural Model",
        description: "Detailed 3D model of a residential project for virtual walkthrough and reviews."
      },
      pt: {
        title: "Modelo Arquitetônico",
        description: "Modelo 3D detalhado de projeto residencial para visita virtual e aprovações."
      }
    }
  },
  {
    id: 'modeling-03',
    category: 'Modelagem 3D',
    image: `${import.meta.env.BASE_URL}assets/aboutme-bg.png`,
    translations: {
      en: {
        title: "Wearable Device Prototype",
        description: "Concept model for a wearable health monitor, optimized for manufacturing."
      },
      pt: {
        title: "Protótipo de Dispositivo Wearable",
        description: "Modelo conceitual de monitor de saúde wearable, otimizado para fabricação."
      }
    }
  },
  // ── Eletrônica ────────────────────────────
  {
    id: 'electronics-01',
    category: 'Eletrônica',
    image: `${import.meta.env.BASE_URL}assets/hero-bg.jpg`,
    translations: {
      en: {
        title: "IoT Sensor Module",
        description: "Designing a compact electronics module for environmental data collection."
      },
      pt: {
        title: "Módulo de Sensor IoT",
        description: "Desenvolvimento de um módulo eletrônico compacto para coleta de dados ambientais."
      }
    }
  },
  {
    id: 'electronics-02',
    category: 'Eletrônica',
    image: `${import.meta.env.BASE_URL}assets/tools-bg.png`,
    translations: {
      en: {
        title: "Custom PCB Design",
        description: "Schematic and PCB layout for a low-power Bluetooth sensor node."
      },
      pt: {
        title: "Design de PCB Personalizado",
        description: "Esquemático e layout de PCB para um nó sensor Bluetooth de baixo consumo."
      }
    }
  },
  {
    id: 'electronics-03',
    category: 'Eletrônica',
    image: `${import.meta.env.BASE_URL}assets/aboutme-bg.png`,
    translations: {
      en: {
        title: "Home Automation Controller",
        description: "Arduino-based controller integrating smart lights, sensors and a local web UI."
      },
      pt: {
        title: "Controlador de Automação Residencial",
        description: "Controlador baseado em Arduino integrando luzes inteligentes, sensores e interface web local."
      }
    }
  },
];

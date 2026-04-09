export interface Milestone {
  id: string;
  year: string;
  category: string;
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

export const STORY_MILESTONES: Milestone[] = [
  {
    id: 'creative-foundations',
    year: '2018 - 2020',
    category: 'Design & 3D',
    translations: {
      en: {
        title: "Creative Foundations",
        description: "Started my journey exploring Graphic Design and 3D Modeling. Developed a deep fascination for visual language and spatial thinking."
      },
      pt: {
        title: "Bases Criativas",
        description: "Iniciei minha jornada explorando Design Gráfico e Modelagem 3D. Desenvolvi uma profunda fascinação pela linguagem visual e pelo pensamento espacial."
      }
    }
  },
  {
    id: 'legal-design-pivot',
    year: '2021',
    category: 'Legal Design',
    translations: {
      en: {
        title: "The Pivot to Legal Design",
        description: "Combined law and design to transform complex legal documents into clear, human-centric visual experiences. Innovation through clarity."
      },
      pt: {
        title: "Pivô para Legal Design",
        description: "Combinei direito e design para transformar documentos jurídicos complexos em experiências visuais claras e focadas no ser humano."
      }
    }
  },
  {
    id: 'ux-ui-systems',
    year: '2022 - 2023',
    category: 'UX / UI',
    translations: {
      en: {
        title: "Systems & Digital Design",
        description: "Transitioned into digital product design, building scalable design systems and intuitive user interfaces for complex analytics platforms."
      },
      pt: {
        title: "Sistemas & Design Digital",
        description: "Transição para o design de produtos digitais, construindo sistemas de design escaláveis e interfaces intuitivas para plataformas complexas."
      }
    }
  },
  {
    id: 'ai-innovation',
    year: '2024 - Present',
    category: 'Innovation',
    translations: {
      en: {
        title: "AI & Innovation Labs",
        description: "Currently exploring the intersection of AI-driven workflows and multidisciplinary design. Pushing the boundaries of what's possible."
      },
      pt: {
        title: "IA & Laboratórios de Inovação",
        description: "Atualmente explorando a interseção de fluxos de trabalho impulsionados por IA e design multidisciplinar."
      }
    }
  }
];

/**
 * Configuration pour enrichir les données du CV LaTeX
 * avec des contenus interactifs (vidéos, démos, etc.)
 * 
 * Ce fichier permet d'ajouter du contenu interactif aux éléments
 * extraits de votre CV LaTeX sans modifier le fichier .tex
 */

export const cvEnrichment = {
  // Ajouter des vidéos aux hobbies
  hobbies: {
    'Climbing': {
      videos: [
        '/videos/Climbing.mp4'
      ]
    },
    'Escalade': {
      videos: [
        '/videos/Climbing.mp4'
      ]
    },
    'Skydiving': {
      videos: ['/videos/Skydiving.mp4']
    },
    'Parachutisme': {
      videos: ['/videos/Skydiving.mp4']
    },
    'Traveling': {
      videos: ['/videos/Traveling.mp4']
    },
    'Voyage': {
      videos: ['/videos/Traveling.mp4']
    }
  },

  // Ajouter des niveaux aux compétences (0-100)
  skills: {
    // ⭐ Compétences principales à afficher
    'Java': { level: 95, demo: 'Spring Boot 17/21, Maven, Clean Architecture', priority: 1 },
    'Spring Boot': { level: 92, demo: 'Backend services & API development', priority: 1 },
    'Spring': { level: 92, demo: 'REST APIs, microservices, Spring Boot', priority: 1 },
    'Kafka': { level: 78, demo: 'Event streaming & messaging', priority: 1 },
    'Kubernetes': { level: 85, demo: 'Container orchestration on OpenShift', priority: 1 },
    'Docker': { level: 87, demo: 'Containerization & deployment', priority: 1 },
    'React': { level: 85, demo: 'Modern UI with hooks and MERN stack', priority: 1 },
    'Kotlin': { level: 85, demo: 'Android development & backend', priority: 1 },
    'Python': { level: 86, demo: 'AI/ML (YOLOv7), Selenium, automation', priority: 1 },
    'Node.js': { level: 83, demo: 'Backend services & MERN development', priority: 1 },
    
    // DevOps & Cloud
    'Azure DevOps': { level: 83, demo: 'CI/CD pipelines & deployment', priority: 2 },
    'OpenShift': { level: 82, demo: 'Red Hat Kubernetes platform', priority: 2 },
    'ElasticSearch': { level: 80, demo: 'Search & analytics with Kibana', priority: 2 },
    'Maven': { level: 88, demo: 'Build automation & dependency management', priority: 2 },
    'Git': { level: 90, demo: 'Version control & collaboration', priority: 2 },
    
    // APIs & Protocols
    'REST': { level: 90, demo: 'RESTful APIs with OpenAPI/Swagger', priority: 2 },
    'SOAP': { level: 82, demo: 'WSDL services & integration', priority: 2 },
    
    // Testing & Quality
    'TDD': { level: 88, demo: 'Test-driven development practices', priority: 2 },
    
    // Autres (non affichés par défaut)
    'JavaScript': { level: 88, demo: 'ES6+, TypeScript, modern web dev', priority: 3 },
    'TypeScript': { level: 85, demo: 'Type-safe development', priority: 3 },
    'C': { level: 78, demo: 'Embedded systems & real-time', priority: 3 },
    'C++': { level: 80, demo: 'Systems programming', priority: 3 },
    'C#': { level: 75, demo: 'Application development', priority: 3 },
    'PHP': { level: 72, demo: 'Web backend development', priority: 3 },
    'SQL': { level: 84, demo: 'Database queries & optimization', priority: 3 },
    'VBA': { level: 76, demo: 'Test automation & macros', priority: 3 },
    'MERN': { level: 83, demo: 'MongoDB, Express, React, Node.js', priority: 3 },
    'OpenAPI': { level: 85, demo: 'API documentation & design', priority: 3 },
    'Swagger': { level: 85, demo: 'API documentation', priority: 3 },
    'Selenium': { level: 80, demo: 'Web automation testing', priority: 3 },
    'Sonar': { level: 82, demo: 'Code quality & security analysis', priority: 3 },
    'Clean Architecture': { level: 87, demo: 'Software craftsmanship principles', priority: 3 },
    'YOLOv7': { level: 78, demo: 'Object detection & video processing', priority: 3 },
    'Machine Learning': { level: 75, demo: 'Model training & evaluation', priority: 3 },
    'Blockchain': { level: 76, demo: 'NFT platforms & decentralized systems', priority: 3 }
  },

  // Ajouter des achievements détaillés aux expériences
  experiences: {
    'Backend Java Developer': {
      achievements: [
        'Backend services avec Java Spring Boot 17/21',
        'Orchestration d\'APIs REST (OpenAPI) et SOAP (WSDL)',
        'Déploiement Kubernetes sur OpenShift via Azure DevOps',
        'Projet KYC avec Kafka pour streaming de données',
        'Pipelines CI/CD avec Sonar et ElasticSearch/Kibana'
      ],
      technologies: ['Java 21', 'Spring Boot', 'Kubernetes', 'OpenShift', 'Kafka', 'Azure DevOps', 'ElasticSearch', 'Maven', 'Git']
    },
    'Test Automation Intern': {
      achievements: [
        'Automatisation des tests fonctionnels en VBA',
        'Tests API avec Selenium (Python), Ready API et SOAP UI',
        'Intégration avec Adobe Campaign'
      ],
      technologies: ['VBA', 'Python', 'Selenium', 'Ready API', 'SOAP UI']
    },
    'Polytech Angers / Université du Mans': {
      achievements: [
        'Création dataset personnalisé pour YOLOv7',
        'Entraînement modèle de détection de parties du corps',
        'Analyse de précision et performance en Python',
        'Traitement vidéo médical'
      ],
      technologies: ['Python', 'YOLOv7', 'Machine Learning', 'Computer Vision']
    },
    'University of Bradford / xHumanity': {
      achievements: [
        'Développement plateforme xHumanity (MERN Stack)',
        'Développement et recherche blockchain',
        'Plateforme NFT décentralisée',
        'React & Node.js full-stack'
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Blockchain', 'NFT']
    },
    'French Ministry of Ecology (DREAL Pays de la Loire)': {
      achievements: [
        'Sécurisation environnements réseau',
        'Préparation d\'images système',
        'Sanitization de données sensibles',
        'Support technique utilisateurs'
      ],
      technologies: ['IT Support', 'Network Security', 'System Administration']
    }
  },

  // Mapper des catégories de compétences à des couleurs/styles
  skillCategories: {
    'Langages': { color: '#667eea' },
    'Languages': { color: '#667eea' },
    'Frameworks': { color: '#764ba2' },
    'Bases de données': { color: '#f093fb' },
    'Databases': { color: '#f093fb' },
    'DevOps': { color: '#4facfe' },
    'Cloud': { color: '#00f2fe' },
    'Outils': { color: '#43e97b' },
    'Tools': { color: '#43e97b' },
    'Technical Skills': { color: '#667eea' }
  }
};

/**
 * Enrichit les données du CV avec les informations interactives
 */
export function enrichCVData(parsedData) {
  const enriched = { ...parsedData };

  // Enrichir les hobbies
  if (enriched.hobbies) {
    enriched.hobbies = enriched.hobbies.map(hobby => {
      const enrichment = cvEnrichment.hobbies[hobby.name];
      if (enrichment) {
        return { ...hobby, ...enrichment };
      }
      return hobby;
    });
  }

  // Enrichir les compétences - filtrer seulement les prioritaires
  if (enriched.skills) {
    enriched.skills = enriched.skills
      .map(skill => {
        const enrichment = cvEnrichment.skills[skill.name];
        if (enrichment) {
          return { ...skill, ...enrichment };
        }
        return { ...skill, level: skill.level || 70, priority: 3 };
      })
      .filter(skill => skill.priority <= 2) // Garder seulement priorité 1 et 2
      .sort((a, b) => a.priority - b.priority); // Trier par priorité
  }

  // Enrichir les expériences
  if (enriched.experiences) {
    enriched.experiences = enriched.experiences.map(exp => {
      // Essayer d'abord par rôle exact, puis par correspondance partielle, puis par compagnie
      let enrichment = cvEnrichment.experiences[exp.role];
      
      // Si pas de match exact, chercher une correspondance partielle dans le rôle
      if (!enrichment) {
        const roleKey = Object.keys(cvEnrichment.experiences).find(key => 
          exp.role.toLowerCase().includes(key.toLowerCase())
        );
        enrichment = roleKey ? cvEnrichment.experiences[roleKey] : null;
      }
      
      // Fallback sur la compagnie
      if (!enrichment) {
        enrichment = cvEnrichment.experiences[exp.company];
      }
      
      if (enrichment) {
        return {
          ...exp,
          achievements: enrichment.achievements || exp.achievements || [],
          technologies: enrichment.technologies || []
        };
      }
      return exp;
    });
  }

  return enriched;
}

/**
 * Exemple de structure de données enrichies
 * Utile pour comprendre le format attendu
 */
export const exampleEnrichedData = {
  name: "Jean Dupont",
  title: "Développeur Full Stack",
  contact: {
    email: "jean.dupont@example.com",
    phone: "+33 6 12 34 56 78",
    location: "Paris, France",
    linkedin: "jeandupont",
    github: "jdupont"
  },
  hobbies: [
    {
      name: "Escalade",
      icon: "🧗",
      videos: ["/videos/climbing1.mp4", "/videos/climbing2.mp4"]
    },
    {
      name: "Photographie",
      icon: "📷",
      videos: ["/videos/photo.mp4"]
    }
  ],
  skills: [
    {
      name: "React",
      category: "Frameworks",
      level: 90,
      demo: "Interactive UI with hooks and modern patterns"
    },
    {
      name: "Kotlin",
      category: "Langages",
      level: 85,
      demo: "Android development & backend services"
    }
  ],
  experiences: [
    {
      period: "2022 - Present",
      role: "Développeur Senior",
      company: "Entreprise Tech",
      location: "Paris",
      description: "Développement d'applications web modernes",
      achievements: [
        "Migration vers React",
        "Performance +50%",
        "Architecture microservices"
      ],
      technologies: ["React", "Node.js", "Docker"]
    }
  ],
  education: [
    {
      period: "2018 - 2020",
      degree: "Master Informatique",
      school: "Université Paris",
      location: "Paris"
    }
  ]
};

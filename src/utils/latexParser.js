/**
 * Parser LaTeX pour CV
 * 
 * Ce module parse un fichier CV LaTeX et extrait les informations structurées
 * Compatible avec les classes courantes : moderncv, article, europecv, etc.
 */

export class LaTeXCVParser {
  constructor(latexContent) {
    this.content = latexContent;
    this.data = {
      name: '',
      title: '',
      contact: {},
      hobbies: [],
      skills: [],
      experiences: [],
      education: [],
      languages: [],
      projects: []
    };
  }

  /**
   * Parse le contenu LaTeX et extrait toutes les informations
   */
  parse() {
    this.extractPersonalInfo();
    this.extractSummary();
    this.extractSections();
    return this.data;
  }

  /**
   * Extrait le résumé/summary
   */
  extractSummary() {
    const summarySection = this.extractSection('summary|résumé|about');
    if (summarySection) {
      this.data.summary = this.cleanLatex(summarySection).trim();
    }
  }

  /**
   * Extrait les informations personnelles (nom, email, téléphone, etc.)
   */
  extractPersonalInfo() {
    // Nom
    const namePatterns = [
      /\\name\{([^}]+)\}\{([^}]+)\}/,  // moderncv: \name{First}{Last}
      /\\firstname\{([^}]+)\}/,         // moderncv
      /\\familyname\{([^}]+)\}/,        // moderncv
      /\\author\{([^}]+)\}/,            // article
    ];

    let firstName = '';
    let lastName = '';

    for (const pattern of namePatterns) {
      const match = this.content.match(pattern);
      if (match) {
        if (pattern.source.includes('\\\\name')) {
          // Pattern \name{First}{Last}
          firstName = match[1].trim();
          lastName = match[2].trim();
          this.data.name = `${firstName} ${lastName}`;
          break;
        } else if (pattern.source.includes('firstname')) {
          firstName = match[1].trim();
        } else if (pattern.source.includes('familyname')) {
          lastName = match[1].trim();
        } else {
          this.data.name = match[1].trim();
          break;
        }
      }
    }

    // Si on a trouvé firstname et familyname séparément
    if (firstName && lastName) {
      this.data.name = `${firstName} ${lastName}`;
    }

    // Titre/Poste
    const titlePatterns = [
      /\\title\{([^}]+)\}/,
      /\\subtitle\{([^}]+)\}/,
    ];

    for (const pattern of titlePatterns) {
      const match = this.content.match(pattern);
      if (match) {
        this.data.title = match[1].trim();
        break;
      }
    }

    // Email
    const emailMatch = this.content.match(/\\email\{([^}]+)\}/);
    if (emailMatch) {
      this.data.contact.email = emailMatch[1].trim();
    }

    // Téléphone
    const phoneMatch = this.content.match(/\\phone(?:\[mobile\])?\{([^}]+)\}/);
    if (phoneMatch) {
      this.data.contact.phone = phoneMatch[1].trim();
    }

    // Adresse/Localisation
    const addressMatch = this.content.match(/\\address\{([^}]+)\}/);
    if (addressMatch) {
      this.data.contact.location = addressMatch[1].trim();
    }

    // Homepage/LinkedIn/GitHub
    const homepageMatch = this.content.match(/\\homepage\{([^}]+)\}/);
    if (homepageMatch) {
      this.data.contact.website = homepageMatch[1].trim();
    }

    const linkedinMatch = this.content.match(/\\social\[linkedin\]\{([^}]+)\}/);
    if (linkedinMatch) {
      this.data.contact.linkedin = linkedinMatch[1].trim();
    }

    const githubMatch = this.content.match(/\\social\[github\]\{([^}]+)\}/);
    if (githubMatch) {
      this.data.contact.github = githubMatch[1].trim();
    }
  }

  /**
   * Extrait les différentes sections du CV
   */
  extractSections() {
    this.extractExperience();
    this.extractEducation();
    this.extractSkills();
    this.extractLanguages();
    this.extractHobbies();
    this.extractProjects();
  }

  /**
   * Extrait les expériences professionnelles
   */
  extractExperience() {
    const expSection = this.extractSection('experience|expérience professionnelle|professional experience');
    
    if (expSection) {
      const entries = this.parseCvEntries(expSection);
      
      entries.forEach(entry => {
        if (entry.length >= 5) {
          // Format: {period}{role}{company}{location}{description} OU {period}{role}{company}{location}{}{description}
          const hasEmptyField = entry[4] === '';
          const descriptionIndex = hasEmptyField ? 5 : 4;
          
          const experience = {
            period: entry[0].trim(),
            role: entry[1].trim(),
            company: entry[2].trim(),
            location: entry[3].trim(),
            description: this.cleanLatex(entry[descriptionIndex]),
            achievements: this.extractItemize(entry[descriptionIndex])
          };

          if (experience.role || experience.company) {
            this.data.experiences.push(experience);
          }
        }
      });
    }
  }

  /**
   * Extrait la formation
   */
  extractEducation() {
    // On cherche dans la section éducation
    const eduSection = this.extractSection('education|formation|études');
    if (eduSection) {
      // Parser manuel pour gérer les accolades imbriquées
      const entries = this.parseCvEntries(eduSection);
      
      entries.forEach(entry => {
        if (entry.length >= 5) {
          // Format: {period}{degree}{school}{location}{description} OU {period}{degree}{school}{location}{}{description}
          const hasEmptyField = entry[4] === '';
          const descriptionIndex = hasEmptyField ? 5 : 4;
          const details = this.extractItemize(entry[descriptionIndex]);
          
          const education = {
            period: entry[0].trim(),
            degree: entry[1].trim(),
            school: entry[2].trim(),
            location: entry[3].trim(),
            description: this.cleanLatex(entry[descriptionIndex]),
            details: details.length > 0 ? details : []
          };

          if (education.degree || education.school) {
            this.data.education.push(education);
          }
        }
      });
    }
  }

  /**
   * Extrait les compétences
   */
  extractSkills() {
    const skillSection = this.extractSection('compétences|skills|technical skills|competences');
    if (skillSection) {
      // Pattern pour \cvitem{catégorie}{compétences}
      const cvItemPattern = /\\cvitem\{([^}]*)\}\{([^}]*)\}/g;
      let match;
      
      while ((match = cvItemPattern.exec(skillSection)) !== null) {
        const category = match[1].trim();
        const skillText = this.cleanLatex(match[2].trim());
        
        // Ignorer la catégorie "Languages" (langues parlées, pas compétences techniques)
        if (category.toLowerCase().includes('language')) {
          continue;
        }
        
        // Séparer par virgules pour obtenir la liste des compétences
        const skills = skillText.split(',').map(s => s.trim()).filter(s => s.length > 0);
        
        skills.forEach(skill => {
          this.data.skills.push({
            name: skill,
            category: category,
            level: 70
          });
        });
      }
    }
  }

  /**
   * Extrait les langues
   */
  extractLanguages() {
    const langSection = this.extractSection('langues|languages|idiomas');
    if (langSection) {
      // Pattern \cvitem{Langue}{Niveau}
      const cvItemPattern = /\\cvitem\{([^}]*)\}\{([^}]*)\}/g;
      let match;
      
      while ((match = cvItemPattern.exec(langSection)) !== null) {
        this.data.languages.push({
          name: match[1].trim(),
          level: match[2].trim()
        });
      }
    }
  }

  /**
   * Extrait les centres d'intérêt / hobbies
   */
  extractHobbies() {
    const hobbySection = this.extractSection('centres d\'intérêt|hobbies|loisirs|interests|extracurricular activities|extracurricular');
    
    if (hobbySection) {
      const entries = this.parseCvEntries(hobbySection);
      let foundEntries = false;
      
      entries.forEach(entry => {
        if (entry.length >= 5) {
          // Format: {period}{name}{}{}{description}
          const period = entry[0].trim();
          const hobbyName = entry[1].trim();
          const descriptionIndex = entry[4] === '' ? 5 : 4;
          const details = this.extractItemize(entry[descriptionIndex]);
          
          if (hobbyName) {
            foundEntries = true;
            this.data.hobbies.push({
              name: hobbyName,
              period: period || null,
              icon: this.getHobbyIcon(hobbyName),
              details: details,
              videos: []
            });
          }
        }
      });
      
      // Si pas de cventry, essayer le format texte simple
      if (!foundEntries) {
        const cleaned = this.cleanLatex(hobbySection);
        const hobbies = cleaned.split(/[,;]|\\item/).filter(h => h.trim());
        
        hobbies.forEach(hobby => {
          const trimmed = hobby.trim();
          if (trimmed && trimmed.length > 2) {
            this.data.hobbies.push({
              name: trimmed,
              icon: this.getHobbyIcon(trimmed),
              videos: []
            });
          }
        });
      }
    }
  }

  /**
   * Extrait les projets
   */
  extractProjects() {
    const projSection = this.extractSection('projets|projects');
    if (projSection) {
      const cvEntryPattern = /\\cventry\{([^}]*)\}\{([^}]*)\}\{([^}]*)\}\{([^}]*)\}\{([^}]*)\}\{([^}]*)\}/g;
      let match;
      
      while ((match = cvEntryPattern.exec(projSection)) !== null) {
        this.data.projects.push({
          period: match[1].trim(),
          name: match[2].trim(),
          tech: match[3].trim(),
          description: this.cleanLatex(match[6])
        });
      }
    }
  }

  /**
   * Extrait une section spécifique par son titre
   */
  extractSection(sectionNames) {
    const patterns = sectionNames.split('|').map(name => 
      new RegExp(`\\\\section\\{\\s*${name}\\s*\\}([\\s\\S]*?)(?=\\\\section|\\\\end\\{document\\}|$)`, 'i')
    );

    for (const pattern of patterns) {
      const match = this.content.match(pattern);
      if (match) {
        return match[1];
      }
    }
    return null;
  }

  /**
   * Parse les \cventry{}{}{}{}{}{} en gérant les accolades imbriquées
   * Retourne un tableau d'entrées, chaque entrée étant un tableau de 5 ou 6 champs
   */
  parseCvEntries(text) {
    const entries = [];
    let i = 0;
    
    while (i < text.length) {
      // Chercher \cventry
      const cvIndex = text.indexOf('\\cventry', i);
      if (cvIndex === -1) break;
      
      i = cvIndex + 8; // Sauter '\cventry'
      
      // Parser les champs entre accolades (5 ou 6 selon le format)
      const fields = [];
      for (let fieldNum = 0; fieldNum < 6; fieldNum++) {
        // Trouver l'ouverture de l'accolade
        while (i < text.length && text[i] !== '{') {
          // Si on trouve un \ ou une lettre, on a fini (début de la prochaine commande)
          if (text[i] === '\\' || (text[i] >= 'a' && text[i] <= 'z') || (text[i] >= 'A' && text[i] <= 'Z')) {
            break;
          }
          i++;
        }
        if (i >= text.length || text[i] !== '{') break;
        
        i++; // Sauter '{'
        const field = this.extractBalancedBraces(text, i);
        fields.push(field.content);
        i = field.endIndex;
      }
      
      if (fields.length >= 5) {
        // Normaliser à 6 champs (ajouter un champ vide si nécessaire)
        while (fields.length < 6) {
          fields.push('');
        }
        entries.push(fields);
      }
    }
    
    return entries;
  }

  /**
   * Extrait le contenu entre accolades en gérant les accolades imbriquées
   */
  extractBalancedBraces(text, startIndex) {
    let depth = 1;
    let i = startIndex;
    let content = '';
    
    while (i < text.length && depth > 0) {
      if (text[i] === '\\' && i + 1 < text.length) {
        // Échapper le prochain caractère
        content += text[i] + text[i + 1];
        i += 2;
        continue;
      }
      
      if (text[i] === '{') {
        depth++;
        content += text[i];
      } else if (text[i] === '}') {
        depth--;
        if (depth > 0) {
          content += text[i];
        }
      } else {
        content += text[i];
      }
      i++;
    }
    
    return { content, endIndex: i };
  }

  /**
   * Extrait les éléments d'une liste \begin{itemize}...\end{itemize}
   */
  extractItemize(text) {
    const itemPattern = /\\item\s+([^\n\\]+)/g;
    const items = [];
    let match;

    while ((match = itemPattern.exec(text)) !== null) {
      items.push(this.cleanLatex(match[1].trim()));
    }

    return items;
  }

  /**
   * Sépare une liste de compétences
   */
  splitSkills(skillText) {
    // Nettoyer d'abord
    const cleaned = this.cleanLatex(skillText);
    
    // Séparer par virgules, points-virgules, ou \item
    const skills = cleaned.split(/[,;]|\\item/).map(s => s.trim()).filter(s => s.length > 0);
    
    return skills;
  }

  /**
   * Parse une section expérience avec un format personnalisé
   */
  parseExperienceSection(section) {
    // Format libre - à adapter selon votre LaTeX
    const experiences = [];
    
    // Essayer de détecter des patterns communs
    const lines = section.split('\n').filter(l => l.trim());
    
    // Pattern simple: rechercher des années
    const yearPattern = /(\d{4})\s*[-–]\s*(\d{4}|present|aujourd'hui)/gi;
    
    // Découper par années trouvées
    let currentExp = null;
    
    lines.forEach(line => {
      const yearMatch = line.match(yearPattern);
      if (yearMatch) {
        if (currentExp) {
          experiences.push(currentExp);
        }
        currentExp = {
          period: yearMatch[0],
          role: '',
          company: '',
          description: '',
          achievements: []
        };
      } else if (currentExp) {
        // Ajouter à la description
        const cleaned = this.cleanLatex(line);
        if (cleaned) {
          if (!currentExp.role) {
            currentExp.role = cleaned;
          } else if (!currentExp.company) {
            currentExp.company = cleaned;
          } else {
            currentExp.description += ' ' + cleaned;
          }
        }
      }
    });
    
    if (currentExp) {
      experiences.push(currentExp);
    }
    
    return experiences;
  }

  /**
   * Nettoie les commandes LaTeX basiques
   */
  cleanLatex(text) {
    if (!text) return '';
    
    return text
      // Enlever les commentaires
      .replace(/%.*$/gm, '')
      // Commandes de mise en forme
      .replace(/\\textbf\{([^}]+)\}/g, '$1')
      .replace(/\\textit\{([^}]+)\}/g, '$1')
      .replace(/\\emph\{([^}]+)\}/g, '$1')
      .replace(/\\underline\{([^}]+)\}/g, '$1')
      // URLs
      .replace(/\\href\{[^}]+\}\{([^}]+)\}/g, '$1')
      .replace(/\\url\{([^}]+)\}/g, '$1')
      // Espaces
      .replace(/\\,/g, ' ')
      .replace(/~/g, ' ')
      .replace(/\\quad/g, ' ')
      // Autres commandes courantes
      .replace(/\\[a-zA-Z]+\{([^}]+)\}/g, '$1')
      .replace(/\\[a-zA-Z]+/g, '')
      // Nettoyer espaces multiples
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Associe une icône à un hobby
   */
  getHobbyIcon(hobby) {
    const lower = hobby.toLowerCase();
    
    const iconMap = {
      'escalade': '🧗',
      'climbing': '🧗',
      'skydiving': '🪂',
      'parachutisme': '🪂',
      'parachute': '🪂',
      'traveling': '✈️',
      'voyage': '✈️',
      'travel': '✈️',
      'photo': '📷',
      'photographie': '📷',
      'photography': '📷',
      'musique': '🎵',
      'music': '🎵',
      'sport': '⚽',
      'lecture': '📚',
      'reading': '📚',
      'cinéma': '🎬',
      'cinema': '🎬',
      'cuisine': '👨‍🍳',
      'cooking': '👨‍🍳',
      'gaming': '🎮',
      'jeux': '🎮',
      'vélo': '🚴',
      'cycling': '🚴',
      'course': '🏃',
      'running': '🏃',
      'natation': '🏊',
      'swimming': '🏊',
      'ski': '⛷️',
      'dessin': '🎨',
      'drawing': '🎨',
      'art': '🎨',
    };

    for (const [key, icon] of Object.entries(iconMap)) {
      if (lower.includes(key)) {
        return icon;
      }
    }

    return '⭐'; // Icône par défaut
  }
}

/**
 * Fonction utilitaire pour charger et parser un fichier CV LaTeX
 */
export async function parseLatexCV(filePath) {
  try {
    const response = await fetch(filePath);
    const content = await response.text();
    const parser = new LaTeXCVParser(content);
    return parser.parse();
  } catch (error) {
    console.error('Erreur lors du parsing du CV LaTeX:', error);
    return null;
  }
}

/**
 * Parse du contenu LaTeX directement (sans fichier)
 */
export function parseLatexCVContent(content) {
  const parser = new LaTeXCVParser(content);
  return parser.parse();
}

# Guide d'utilisation - CV Web depuis LaTeX

## 🎯 Comment utiliser votre CV LaTeX

Votre projet est maintenant configuré pour **construire automatiquement** le site web à partir de votre fichier LaTeX !

### Étape 1 : Ajouter votre CV LaTeX

1. Copiez votre fichier `CV.tex` dans le dossier `public/`
2. Le fichier sera accessible à l'URL `/CV.tex`

```
Web_CV/
├── public/
│   ├── CV.tex         ← Votre fichier LaTeX ici
│   ├── CNAME
│   └── videos/
```

### Étape 2 : Activer le parser LaTeX

Dans `src/App.jsx`, changez cette ligne :

```javascript
const latexFile = null; // Mode données par défaut
```

Par :

```javascript
const latexFile = '/CV.tex'; // Mode parser LaTeX
```

### Étape 3 : Enrichir avec du contenu interactif

Éditez `src/utils/cvEnrichment.js` pour ajouter :

#### Vidéos aux hobbies :
```javascript
hobbies: {
  'Escalade': {
    videos: ['/videos/climbing1.mp4', '/videos/climbing2.mp4']
  }
}
```

#### Niveaux aux compétences :
```javascript
skills: {
  'React': { level: 90, demo: 'Interactive UI with hooks' },
  'Python': { level: 85, demo: 'Data science & web dev' }
}
```

#### Achievements aux expériences :
```javascript
experiences: {
  'Nom de votre entreprise': {
    achievements: [
      'Migration vers React',
      'Performance +50%',
      'Architecture microservices'
    ],
    technologies: ['React', 'Node.js', 'Docker']
  }
}
```

## 📝 Formats LaTeX supportés

Le parser supporte les classes LaTeX courantes :

### moderncv
```latex
\name{Prénom}{Nom}
\title{Titre du poste}
\email{email@example.com}
\phone[mobile]{+33 6 XX XX XX XX}
\address{Ville, Pays}

\cventry{2020--2023}{Poste}{Entreprise}{Lieu}{}{
  Description du poste
  \begin{itemize}
    \item Réalisation 1
    \item Réalisation 2
  \end{itemize}
}

\section{Compétences}
\cvitem{Langages}{Python, JavaScript, Kotlin}
\cvcomputer{Frontend}{React, Vue.js}{Backend}{Django, Node.js}
```

### article / europecv
```latex
\author{Prénom Nom}
\title{Développeur Full Stack}

\section{Expérience}
\textbf{2020--2023} Développeur Senior, Entreprise Tech, Paris
\begin{itemize}
  \item Développement applications web
  \item Migration vers React
\end{itemize}

\section{Compétences}
Langages: Python, JavaScript, Kotlin \\
Frameworks: React, Django, Spring Boot
```

## 🔍 Que fait le parser ?

Le parser extrait automatiquement :

✅ **Informations personnelles** : nom, titre, email, téléphone, localisation  
✅ **Expériences professionnelles** : dates, poste, entreprise, description, réalisations  
✅ **Formation** : diplômes, écoles, dates  
✅ **Compétences** : langages, frameworks, outils (avec catégories)  
✅ **Langues** : langue + niveau  
✅ **Hobbies** : centres d'intérêt (avec icônes automatiques)  
✅ **Projets** : projets personnels/académiques  

## 🎨 Exemple complet

### Votre CV LaTeX (`public/CV.tex`)
```latex
\documentclass[11pt,a4paper,sans]{moderncv}
\moderncvstyle{classic}
\moderncvcolor{blue}

\name{Jean}{Dupont}
\title{Développeur Full Stack}
\email{jean.dupont@example.com}
\phone[mobile]{+33 6 12 34 56 78}
\address{Paris, France}
\social[linkedin]{jeandupont}
\social[github]{jdupont}

\begin{document}
\makecvtitle

\section{Expérience}
\cventry{2022--Present}{Développeur Senior}{TechCorp}{Paris}{}{
  Développement d'applications web modernes en React
  \begin{itemize}
    \item Migration complète de l'application vers React
    \item Amélioration des performances de 50\%
    \item Mise en place d'une architecture microservices
  \end{itemize}
}

\cventry{2020--2022}{Développeur}{StartupXYZ}{Paris}{}{
  Développement full-stack et mobile
  \begin{itemize}
    \item Création d'une API REST en Django
    \item Application mobile en Kotlin
    \item Pipeline CI/CD avec Jenkins
  \end{itemize}
}

\section{Formation}
\cventry{2018--2020}{Master Informatique}{Université Paris}{Paris}{}{}
\cventry{2015--2018}{Licence Informatique}{Université Paris}{Paris}{}{}

\section{Compétences}
\cvitem{Langages}{Python, JavaScript, TypeScript, Kotlin, Java}
\cvitem{Frameworks}{React, Django, Spring Boot, Node.js}
\cvitem{DevOps}{Docker, Kubernetes, AWS, CI/CD}
\cvitem{Bases de données}{PostgreSQL, MongoDB, Redis}

\section{Langues}
\cvitem{Français}{Langue maternelle}
\cvitem{Anglais}{Courant (C1)}
\cvitem{Espagnol}{Intermédiaire (B1)}

\section{Centres d'intérêt}
Escalade, Photographie, Voyages, Développement open-source

\end{document}
```

### Configuration enrichissement (`src/utils/cvEnrichment.js`)
```javascript
export const cvEnrichment = {
  hobbies: {
    'Escalade': {
      videos: ['/videos/climbing1.mp4', '/videos/climbing2.mp4']
    },
    'Photographie': {
      videos: ['/videos/photo-timelapse.mp4']
    }
  },

  skills: {
    'React': { level: 95, demo: 'Modern UI with hooks' },
    'Python': { level: 90, demo: 'Backend & data science' },
    'Django': { level: 88, demo: 'REST APIs' },
    'Kotlin': { level: 85, demo: 'Android development' },
    'Docker': { level: 82, demo: 'Containerization' },
    'PostgreSQL': { level: 85, demo: 'Relational databases' }
  },

  experiences: {
    'TechCorp': {
      achievements: [
        'Migration complète vers React',
        'Amélioration des performances de 50%',
        'Architecture microservices',
        'Réduction du temps de déploiement de 80%'
      ],
      technologies: ['React', 'Node.js', 'Docker', 'AWS']
    },
    'StartupXYZ': {
      achievements: [
        'Création API REST',
        'Application mobile Kotlin',
        'Pipeline CI/CD',
        'Tests automatisés (95% coverage)'
      ],
      technologies: ['Django', 'Kotlin', 'PostgreSQL', 'Jenkins']
    }
  }
};
```

### Résultat
Votre CV LaTeX sera automatiquement transformé en site web interactif avec :
- ✨ Carte brillante avec effets holographiques
- 🎥 Vidéos au survol des hobbies
- 📊 Barres de progression pour les compétences
- 🎯 Démos visuelles au survol
- 📈 Visualisations des réalisations

## 🚀 Démarrage

```bash
# Lancer en mode développement
npm run dev

# Le site se mettra à jour automatiquement si vous modifiez CV.tex
```

## 🔧 Débogage

Si le parsing ne fonctionne pas :

1. Vérifiez la console du navigateur (F12) pour les erreurs
2. Assurez-vous que votre CV.tex utilise des commandes LaTeX standard
3. Le parser affichera un message si certaines sections ne sont pas détectées

## 💡 Astuces

### Commandes LaTeX supportées
- `\name{Prénom}{Nom}` ou `\author{Nom complet}`
- `\title{Titre}` pour le poste
- `\cventry{dates}{poste}{entreprise}{lieu}{}{description}`
- `\cvitem{catégorie}{contenu}`
- `\section{Titre de section}`
- `\begin{itemize}...\end{itemize}` pour les listes

### Icônes automatiques pour les hobbies
Le parser détecte automatiquement :
- Escalade → 🧗
- Photographie → 📷
- Musique → 🎵
- Sport → ⚽
- Voyage → ✈️
- Lecture → 📚
- Cinéma → 🎬
- Cuisine → 👨‍🍳
- Gaming → 🎮
- Etc.

### Niveaux par défaut
- Compétences non enrichies : 70%
- Vous pouvez ajuster dans `cvEnrichment.js`

## 📦 Mode sans LaTeX

Si vous préférez ne pas utiliser LaTeX, le site fonctionne aussi avec les données par défaut.
Éditez simplement la fonction `getDefaultCVData()` dans `src/components/CVCard.jsx`.

---

**Avantage principal** : Vous maintenez **UN SEUL** CV (le .tex) et le site web se génère automatiquement ! 🎉

# Interactive CV - LaTeX to Web

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF.svg)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, interactive web CV automatically generated from your LaTeX resume. Transform your traditional CV into an engaging web experience with 3D flip cards, video overlays, and smooth animations.

## ✨ Features

- **🔄 Automatic LaTeX Parsing**: Transforms your `.tex` CV into an interactive website
- **🎴 3D Flip Cards**: Interactive experience and skill cards with smooth animations
- **🎥 Dynamic Video Overlays**: Showcase hobbies with automatically detected video content
- **📊 Skill Visualization**: Visual demonstrations and categorized skill display
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **⚡ Performance Optimized**: Built with Vite for lightning-fast load times
- **🎨 Awesome-CV Design**: Professional styling inspired by the popular LaTeX template

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## 📝 Usage

### Setting Up Your CV

1. **Place your LaTeX CV** in `public/CV.tex`
2. **Configure the parser** in `src/App.jsx`:
   ```javascript
   const latexFile = '/CV.tex';
   ```
3. **Enrich content** in `src/utils/cvEnrichment.js`:
   - Add technology stacks to experiences
   - Configure skill priorities and demos
   - Map hobby names to categories

### Adding Videos

Place your video files in `public/videos/` with descriptive names:

```
public/
  videos/
    climbing1.mp4
    climbing2.mp4
    skydiving.mp4
```

Videos are automatically detected based on filename matching (case-insensitive). For example:
- Hobby named "Climbing" → matches `climbing*.mp4`, `Climbing*.mp4`, etc.
- Hobby named "Travel" → matches `travel*.mp4`, `traveling*.mp4`, etc.

## 📁 Supported LaTeX Formats

Compatible with popular LaTeX CV classes:
- `moderncv` (classic, casual, banking, oldstyle, fancy)
- `awesome-cv`
- `article` standard
- `europecv`
- Custom formats

**Recognized commands:**
- `\name{First}{Last}`, `\title{Title}`
- `\email`, `\phone`, `\address`, `\homepage`, `\linkedin`, `\github`
- `\cventry{date}{title}{company}{location}{}{description}`
- `\cvitem{category}{items}`, `\cvcomputer{cat1}{items1}{cat2}{items2}`
- `\section{Title}` for section headers
- `\begin{itemize}...\end{itemize}` for achievement lists

## 🌐 Deployment

### GitHub Pages with Custom Domain

## 🌐 Deployment

### GitHub Pages with Custom Domain

1. **Create a GitHub repository** and push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git branch -M main
   git push -u origin main
   ```

2. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```
   Your site will be available at: `https://YOUR-USERNAME.github.io/YOUR-REPO/`

4. **Configure custom domain** (optional):
   
   Create `public/CNAME` with your domain:
   ```
   yourdomain.com
   ```
   
   Configure DNS records with your provider:
   ```
   Type: A      Name: @    Value: 185.199.108.153
   Type: A      Name: @    Value: 185.199.109.153
   Type: A      Name: @    Value: 185.199.110.153
   Type: A      Name: @    Value: 185.199.111.153
   Type: CNAME  Name: www  Value: YOUR-USERNAME.github.io
   ```
   
   In GitHub repository: **Settings** > **Pages** > **Custom domain** > Enter your domain > **Enforce HTTPS**

### vite.config.js Configuration

- **With custom domain**: `base: '/'` (default)
- **Without custom domain**: `base: '/YOUR-REPO/'`

## 📦 Project Structure

```
Interactive_CV/
├── public/
│   ├── videos/              # Video files for hobbies
│   ├── CV.tex               # Your LaTeX CV source
│   └── CNAME                # Custom domain (optional)
├── src/
│   ├── components/
│   │   ├── CVCard.jsx       # Main CV component
│   │   ├── CVCard.css
│   │   ├── HobbyOverlay.jsx # Video overlay for hobbies
│   │   ├── SkillDemo.jsx    # Skill demonstration cards
│   │   └── ExperienceDemo.jsx # Experience detail cards
│   ├── utils/
│   │   ├── latexParser.js   # LaTeX parsing logic
│   │   ├── cvEnrichment.js  # Content enrichment
│   │   └── videoScanner.js  # Dynamic video detection
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Customization

### Color Scheme

Modify CSS variables in `src/components/CVCard.css`:

```css
:root {
  --awesome-skyblue: #0395DE;
  --headertext: #333333;
  --sectiontext: #555555;
}
```

### Skill Icons and Demos

Add custom skill demonstrations in `src/components/SkillDemo.jsx`:

```javascript
const skillIcons = {
  'YourSkill': {
    icon: '🚀',
    color: '#FF6B6B',
    description: 'Your custom description'
  }
};
```

### Experience Technology Stacks

Configure technology stacks in `src/utils/cvEnrichment.js`:

```javascript
experiences: {
  'Your Job Title': {
    achievements: ['Achievement 1', 'Achievement 2'],
    technologies: ['Tech1', 'Tech2', 'Tech3']
  }
}
```

## 🧪 Testing

Run tests to ensure code quality:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🔧 Technology Stack

- **React 18.3** - UI library with hooks
- **Vite 5.4** - Build tool and dev server
- **CSS3** - Native animations and transitions
- **Vitest** - Unit testing framework
- **GitHub Pages** - Static site hosting

## 🏗️ Architecture

### Parser System
- **latexParser.js**: Extracts structured data from LaTeX commands
- **Balanced brace extraction**: Handles nested LaTeX structures
- **Multiple format support**: Adapts to different CV templates

### Video System
- **Automatic detection**: Scans `public/videos/` using Vite's `import.meta.glob`
- **Smart filtering**: Case-insensitive keyword matching
- **Random selection**: New video on each hover

### Component Architecture
- **CVCard**: Container with section rendering
- **Flip cards**: CSS 3D transforms for interactive experiences/skills
- **Lazy video loading**: Videos load only on hover
- **Responsive design**: Mobile-first approach with breakpoints

## 💡 Best Practices

### Video Optimization
- Keep videos under 10 seconds
- Use compressed formats (H.264 MP4)
- Target file size: < 5MB per video
- Resolution: 720p is sufficient for web

### Performance
- LaTeX parsing happens once on mount
- Videos are loaded on-demand
- CSS animations use hardware acceleration
- Build output is optimized with Vite

### Accessibility
- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- Responsive font sizes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/AmazingFeature`
3. Make your changes
4. Run tests: `npm test`
5. Commit: `git commit -m 'Add AmazingFeature'`
6. Push: `git push origin feature/AmazingFeature`
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Design inspired by [Awesome-CV](https://github.com/posquit0/Awesome-CV) LaTeX template
- Built with modern web technologies

---

**Made with ❤️ and React**

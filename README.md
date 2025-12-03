# CV Web Interactif - maceparis.dev

Un CV web moderne et interactif avec des effets visuels attrayants, développé en React.

**✨ NOUVEAU : Construit automatiquement depuis votre CV LaTeX !**

## ✨ Fonctionnalités

- **🔄 Parser LaTeX automatique** : Transforme votre CV.tex en site web interactif
- **Carte brillante** avec effet holographique qui suit la souris
- **Hobbies interactifs** : survolez pour voir des vidéos (pré-chargées pour zéro latence)
- **Compétences animées** : barres de progression et démos visuelles au survol
- **Expériences détaillées** : visualisations des réalisations au survol
- **Design responsive** : s'adapte à tous les écrans
- **Optimisé pour la performance** : construit avec Vite

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Compiler pour la production
npm run build
```

## 📝 Utilisation avec votre CV LaTeX

### Option 1 : Parser automatique depuis LaTeX (RECOMMANDÉ)

1. **Copiez votre CV.tex** dans le dossier `public/`
2. **Activez le parser** dans `src/App.jsx` :
   ```javascript
   const latexFile = '/CV.tex';
   ```
3. **Enrichissez le contenu** dans `src/utils/cvEnrichment.js` :
   - Ajoutez des vidéos aux hobbies
   - Définissez les niveaux de compétences
   - Ajoutez des achievements aux expériences

👉 **[Voir le guide complet LaTeX](./GUIDE_LATEX.md)**

### Option 2 : Données manuelles

Éditez directement `src/components/CVCard.jsx` et modifiez la fonction `getDefaultCVData()`.

## 📁 Formats LaTeX supportés

Compatible avec les classes LaTeX courantes :
- `moderncv` (classic, casual, banking, etc.)
- `article` standard
- `europecv`
- Formats personnalisés

Commandes reconnues :
- `\name`, `\title`, `\email`, `\phone`, `\address`
- `\cventry` pour expériences et formation
- `\cvitem`, `\cvcomputer` pour compétences
- `\section` pour les sections
- `\begin{itemize}...\end{itemize}` pour les listes

## 🎨 Personnalisation

### Ajouter vos vidéos

Créez un dossier `public/videos/` et ajoutez vos vidéos :

```
public/
  videos/
    climbing1.mp4
    climbing2.mp4
    photo.mp4
```

Puis enrichissez dans `src/utils/cvEnrichment.js` :

```javascript
hobbies: {
  'Escalade': {
    videos: ['/videos/climbing1.mp4', '/videos/climbing2.mp4']
  }
}
```

### Personnaliser les couleurs

Modifiez les fichiers CSS pour adapter les couleurs à votre charte :
- `src/index.css` : fond de la page
- `src/components/CVCard.css` : couleurs principales

## 🌐 Déploiement sur GitHub Pages

### 1. Créer un dépôt GitHub

```bash
# Initialiser Git (si pas déjà fait)
git init
git add .
git commit -m "Initial commit"

# Créer un dépôt sur GitHub puis :
git remote add origin https://github.com/VOTRE-USERNAME/VOTRE-REPO.git
git branch -M main
git push -u origin main
```

### 2. Installer gh-pages

```bash
npm install --save-dev gh-pages
```

### 3. Déployer

```bash
npm run deploy
```

Votre site sera disponible sur : `https://VOTRE-USERNAME.github.io/VOTRE-REPO/`

### 4. Configurer votre domaine Infomaniak

Dans votre espace Infomaniak :

1. Allez dans **Gestion DNS** de votre domaine `maceparis.dev`
2. Ajoutez ces enregistrements DNS :

```
Type: A
Nom: @
Valeur: 185.199.108.153
```

```
Type: A
Nom: @
Valeur: 185.199.109.153
```

```
Type: A
Nom: @
Valeur: 185.199.110.153
```

```
Type: A
Nom: @
Valeur: 185.199.111.153
```

```
Type: CNAME
Nom: www
Valeur: VOTRE-USERNAME.github.io
```

3. Dans votre dépôt GitHub, allez dans **Settings** > **Pages**
4. Dans **Custom domain**, entrez `maceparis.dev`
5. Cochez **Enforce HTTPS**

6. Créez un fichier `public/CNAME` avec :

```
maceparis.dev
```

### 5. Mettre à jour vite.config.js

Si vous utilisez un domaine personnalisé, pas besoin de changer `base`.
Si vous utilisez l'URL GitHub Pages sans domaine, modifiez :

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/VOTRE-REPO/',
})
```

## 📦 Structure du projet

```
Web_CV/
├── public/
│   └── videos/          # Vos vidéos ici
├── src/
│   ├── components/
│   │   ├── CVCard.jsx           # Composant principal
│   │   ├── CVCard.css
│   │   ├── HobbyOverlay.jsx     # Overlay vidéos hobbies
│   │   ├── HobbyOverlay.css
│   │   ├── SkillDemo.jsx        # Démos compétences
│   │   ├── SkillDemo.css
│   │   ├── ExperienceDemo.jsx   # Visualisation expériences
│   │   └── ExperienceDemo.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## 🎨 Personnalisation avancée

### Ajouter des démos pour d'autres compétences

Éditez `src/components/SkillDemo.jsx` et ajoutez un nouveau case dans `getDemoContent()` :

```javascript
case 'votre-competence':
  return (
    <div className="demo-custom">
      <div className="custom-animation">🚀</div>
      <div className="code-snippet">
        <code>{`votre code exemple`}</code>
      </div>
    </div>
  );
```

### Modifier les animations

Les animations sont définies dans les fichiers CSS avec `@keyframes`.
Vous pouvez ajuster les durées, effets, etc.

## 💡 Conseils

- **Optimisez vos vidéos** : utilisez des formats compressés (WebM, MP4 optimisé)
- **Taille des vidéos** : gardez-les courtes (5-10 secondes) et légères
- **Images** : vous pouvez aussi remplacer les vidéos par des GIFs ou images
- **Performance** : testez sur mobile pour vérifier la fluidité

## 🔧 Technologies utilisées

- React 18
- Vite 5
- CSS3 (animations natives)
- GitHub Pages

## 📄 Licence

Libre d'utilisation et de modification pour votre usage personnel.

---

Créé avec ❤️ pour maceparis.dev

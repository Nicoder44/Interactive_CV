import React from 'react';
import './App.css';
import CVCard from './components/CVCard';

function App() {
  // OPTION 1: Utiliser un fichier LaTeX
  // Placez votre CV.tex dans le dossier public/
  const latexFile = '/CV.tex'; // ✅ Activé pour utiliser votre CV LaTeX
  
  // OPTION 2: Données manuelles (si latexFile = null)

  return (
    <div className="app">
      <CVCard latexFile={latexFile} />
    </div>
  );
}

export default App;

import React from 'react';
import './ExperienceDemo.css';

const ExperienceDemo = ({ experience }) => {
  // Calculer la durée de l'expérience
  const calculateDuration = (period) => {
    if (!period) return null;
    
    // Extraire les années/mois du format "Sep. 2023 -- Present" ou "May 2023 -- Aug. 2023"
    const match = period.match(/(\w+\.?\s*\d{4})\s*--\s*(\w+\.?\s*\d{4}|Present)/i);
    if (!match) return period;
    
    const start = match[1];
    const end = match[2];
    
    if (end.toLowerCase().includes('present')) {
      return 'En cours';
    }
    
    return period;
  };

  // Extraire les technos clés (max 3)
  const keyTechs = experience.technologies?.slice(0, 3) || [];
  
  // Type de contrat
  const getContractType = (role) => {
    if (role.toLowerCase().includes('full-time') || role.toLowerCase().includes('developer') && !role.toLowerCase().includes('intern')) {
      return 'CDI';
    }
    if (role.toLowerCase().includes('intern')) {
      return 'Stage';
    }
    return 'Mission';
  };

  return (
    <div className="experience-demo">
      <div className="experience-demo-content">
        <div className="demo-header">
          <h4 className="demo-title">{experience.role}</h4>
          <span className="demo-company">{experience.company}</span>
        </div>
        
        <div className="demo-highlights">
          <div className="highlight-item">
            <div className="highlight-icon">💼</div>
            <div className="highlight-text">
              <span className="highlight-label">Type</span>
              <span className="highlight-value">{getContractType(experience.role)}</span>
            </div>
          </div>
          
          <div className="highlight-item">
            <div className="highlight-icon">📅</div>
            <div className="highlight-text">
              <span className="highlight-label">Durée</span>
              <span className="highlight-value">{calculateDuration(experience.period)}</span>
            </div>
          </div>
          
          {keyTechs.length > 0 && (
            <div className="highlight-item">
              <div className="highlight-icon">⚡</div>
              <div className="highlight-text">
                <span className="highlight-label">Stack principale</span>
                <span className="highlight-value">{keyTechs.join(' · ')}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceDemo;

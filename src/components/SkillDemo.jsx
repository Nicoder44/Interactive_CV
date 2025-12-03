import React from 'react';
import './SkillDemo.css';

const SkillDemo = ({ skill }) => {
  // Icônes et démos spécifiques selon la compétence
  const getDemoContent = () => {
    const skillName = skill.name.toLowerCase();
    
    // Map des technologies vers leurs icônes et descriptions
    const skillInfo = {
      'java': { icon: '☕', color: '#f89820', desc: 'Enterprise Backend' },
      'spring': { icon: '🍃', color: '#6db33f', desc: 'Spring Framework' },
      'spring boot': { icon: '🚀', color: '#6db33f', desc: 'Microservices' },
      'kotlin': { icon: '🤖', color: '#7f52ff', desc: 'Modern JVM' },
      'react': { icon: '⚛️', color: '#61dafb', desc: 'UI Library' },
      'angular': { icon: '🅰️', color: '#dd0031', desc: 'Full Framework' },
      'node.js': { icon: '🟢', color: '#339933', desc: 'JavaScript Runtime' },
      'typescript': { icon: '📘', color: '#3178c6', desc: 'Typed JavaScript' },
      'python': { icon: '🐍', color: '#3776ab', desc: 'Data & AI' },
      'docker': { icon: '🐳', color: '#2496ed', desc: 'Containers' },
      'kubernetes': { icon: '☸️', color: '#326ce5', desc: 'Orchestration' },
      'kafka': { icon: '📨', color: '#231f20', desc: 'Event Streaming' },
      'postgresql': { icon: '🐘', color: '#336791', desc: 'SQL Database' },
      'mongodb': { icon: '🍃', color: '#47a248', desc: 'NoSQL Database' },
      'git': { icon: '📚', color: '#f05032', desc: 'Version Control' },
      'jenkins': { icon: '🔧', color: '#d24939', desc: 'CI/CD' },
      'elasticsearch': { icon: '🔍', color: '#005571', desc: 'Search Engine' },
      'redis': { icon: '⚡', color: '#dc382d', desc: 'In-Memory DB' }
    };

    const info = skillInfo[skillName] || { icon: '💻', color: '#0395DE', desc: skill.category || 'Technology' };

    return (
      <div className="demo-content">
        <div className="demo-icon" style={{ color: info.color }}>
          {info.icon}
        </div>
        <div className="demo-info">
          <h5 className="demo-skill-name">{skill.name}</h5>
          <p className="demo-description">{info.desc}</p>
          {skill.category && <span className="demo-category">{skill.category}</span>}
        </div>
        <div className="demo-level-indicator">
          <div className="level-dots">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className={`level-dot ${i < (skill.level / 20) ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="skill-demo">
      {getDemoContent()}
    </div>
  );
};

export default SkillDemo;

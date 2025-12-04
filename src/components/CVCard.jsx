import React, { useState, useRef, useEffect } from 'react';
import './CVCard.css';
import HobbyOverlay from './HobbyOverlay';
import SkillDemo from './SkillDemo';
import ExperienceDemo from './ExperienceDemo';
import SleddingChaos from './SleddingChaos';
import { parseLatexCV } from '../utils/latexParser';
import { enrichCVData } from '../utils/cvEnrichment';

const CVCard = ({ latexFile = null, manualData = null }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredSection, setHoveredSection] = useState(null);
  const [cvData, setCvData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chaosMode, setChaosMode] = useState(false);
  const cardRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  
  // Historique des vidéos jouées pour éviter les répétitions (persiste entre les survols)
  const videoHistoryRef = useRef([]);

  // Charger et parser le CV LaTeX au montage
  useEffect(() => {
    const loadCV = async () => {
      if (latexFile) {
        setLoading(true);
        try {
          const parsedData = await parseLatexCV(latexFile);
          const enrichedData = enrichCVData(parsedData);
          setCvData(enrichedData);
        } catch (error) {
          console.error('Erreur lors du chargement du CV:', error);
          setCvData(getDefaultCVData());
        } finally {
          setLoading(false);
        }
      } else if (manualData) {
        setCvData(manualData);
      } else {
        setCvData(getDefaultCVData());
      }
    };

    loadCV();
  }, [latexFile, manualData]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const getDefaultCVData = () => ({
    name: "Votre Nom",
    title: "Développeur Full Stack",
    contact: {
      email: "contact@maceparis.dev",
      phone: "+33 X XX XX XX XX",
      location: "Paris, France"
    },
    hobbies: [],
    skills: [],
    experiences: [],
    education: []
  });

  if (loading) {
    return (
      <div className="cv-card-container">
        <div className="cv-card loading">
          <div className="loading-spinner">Chargement du CV...</div>
        </div>
      </div>
    );
  }

  if (!cvData) {
    return null;
  }

  return (
    <div 
      className="cv-card-container"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
    >
      {chaosMode && <SleddingChaos onClose={() => setChaosMode(false)} />}
      
      <div className="cv-card">
        
        {/* Header */}
        <header className="cv-header">
          <h1 className="cv-name">
            {cvData.name.includes(' ') ? (
              <>
                <span className="cv-name-first">{cvData.name.split(' ')[0]}</span>
                {' '}
                <span className="cv-name-last">{cvData.name.split(' ').slice(1).join(' ')}</span>
                <button 
                  className="sledding-trigger"
                  onClick={() => setChaosMode(true)}
                  title="🛷 Launch the chaos!"
                >
                  🛷
                </button>
              </>
            ) : (
              cvData.name
            )}
          </h1>
          <h2 className="cv-title">{cvData.title}</h2>
          <a href="/CV_Nicolas_Mace.pdf" download className="cv-download-link">
            <span className="download-icon">⬇️</span>
            Download PDF Version
          </a>
          <div className="cv-contact">
            {cvData.contact.email && <span>✉ {cvData.contact.email}</span>}
            {cvData.contact.phone && <span>📱 {cvData.contact.phone}</span>}
            {cvData.contact.location && <span>📍 {cvData.contact.location}</span>}
            {cvData.contact.linkedin && <span>💼 LinkedIn: {cvData.contact.linkedin}</span>}
            {cvData.contact.github && <span>💻 GitHub: {cvData.contact.github}</span>}
          </div>
        </header>

        {/* Summary Section */}
        {cvData.summary && (
          <section className="cv-section summary-section">
            <h3 className="section-title">Summary</h3>
            <p className="summary-text">{cvData.summary}</p>
          </section>
        )}

        {/* Education Section */}
        {cvData.education && cvData.education.length > 0 && (
          <section className="cv-section education-section">
            <h3 className="section-title">Education</h3>
            <div className="education-list">
              {cvData.education.map((edu, index) => (
                <div key={index} className="education-item">
                  <div className="education-header">
                    <div>
                      <h4 className="education-degree">{edu.degree}</h4>
                      <p className="education-school">{edu.school}</p>
                      {edu.location && <p className="education-location">{edu.location}</p>}
                    </div>
                    <span className="education-period">{edu.period}</span>
                  </div>
                  {edu.details && edu.details.length > 0 && (
                    <ul className="education-details">
                      {edu.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {cvData.experiences && cvData.experiences.length > 0 && (
          <section className="cv-section experience-section">
            <h3 className="section-title">Experience</h3>
            <div className="experience-list">
              {cvData.experiences.map((exp, index) => (
                <div
                  key={index}
                  className="experience-item-wrapper"
                  onMouseEnter={() => setHoveredSection({ type: 'experience', index: index })}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  <div className={`experience-item flip-card ${hoveredSection?.type === 'experience' && hoveredSection.index === index ? 'flipped' : ''}`}>
                    {/* Face avant */}
                    <div className="flip-card-front">
                      <div className="experience-header">
                        <h4 className="experience-role">{exp.role}</h4>
                        <span className="experience-period">{exp.period}</span>
                      </div>
                      <p className="experience-company">{exp.company}</p>
                      {exp.location && <p className="experience-location">{exp.location}</p>}
                      {exp.description && <p className="experience-description">{exp.description}</p>}
                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className="experience-achievements">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx}>{achievement}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    {/* Face arrière */}
                    <div className="flip-card-back">
                      <ExperienceDemo experience={exp} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {cvData.skills && cvData.skills.length > 0 && (
          <section className="cv-section skills-section">
            <h3 className="section-title">Skills</h3>
            <div className="skills-grid">
              {cvData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="skill-item-wrapper"
                  onMouseEnter={() => setHoveredSection({ type: 'skill', data: skill })}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  <div className={`skill-item flip-card ${hoveredSection?.type === 'skill' && hoveredSection.data.name === skill.name ? 'flipped' : ''}`}>
                    {/* Face avant */}
                    <div className="flip-card-front">
                      <div className="skill-header">
                        <span className="skill-name">{skill.name}</span>
                      </div>
                    </div>
                    {/* Face arrière */}
                    <div className="flip-card-back">
                      <SkillDemo skill={skill} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Hobbies Section - En dernier et plus discret */}
        {cvData.hobbies && cvData.hobbies.length > 0 && (
          <section className="cv-section hobbies-section">
            <h3 className="section-title">Interests</h3>
            <div className="hobbies-grid">
              {cvData.hobbies.map((hobby, index) => (
                <div
                  key={index}
                  className="hobby-item"
                  onMouseEnter={() => {
                    if (hoverTimeoutRef.current) {
                      clearTimeout(hoverTimeoutRef.current);
                    }
                    setHoveredSection({ type: 'hobby', data: hobby });
                  }}
                  onMouseLeave={() => {
                    hoverTimeoutRef.current = setTimeout(() => {
                      setHoveredSection(null);
                    }, 300);
                  }}
                >
                  <span className="hobby-icon">{hobby.icon}</span>
                  <div style={{flex: 1}}>
                    <span className="hobby-name">{hobby.name}</span>
                    {hobby.period && <span className="hobby-period"> · {hobby.period}</span>}
                  </div>
                  {hoveredSection?.type === 'hobby' && hoveredSection.data.name === hobby.name && (
                    <HobbyOverlay 
                      videos={hobby.videos || []} 
                      hobbyName={hobby.name}
                      videoHistoryRef={videoHistoryRef}
                      onMouseEnter={() => {
                        if (hoverTimeoutRef.current) {
                          clearTimeout(hoverTimeoutRef.current);
                        }
                      }}
                      onMouseLeave={() => {
                        hoverTimeoutRef.current = setTimeout(() => {
                          setHoveredSection(null);
                        }, 300);
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default CVCard;

import React, { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, push, onValue, query, orderByChild, limitToLast } from 'firebase/database';
import './Leaderboard.css';

const Leaderboard = ({ currentScore, onClose, onRestart }) => {
  const [pseudo, setPseudo] = useState('');
  const [country, setCountry] = useState('');
  const [showCountryInput, setShowCountryInput] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [allScores, setAllScores] = useState([]);
  const [lastPlace, setLastPlace] = useState(null);
  const [userRank, setUserRank] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Détecter le pays via API
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.country_code) {
          setCountry(data.country_code);
        }
      })
      .catch(() => {
        // Si l'API échoue, pas grave
        setCountry('');
      });
  }, []);

  // Récupérer le leaderboard
  useEffect(() => {
    const scoresRef = ref(database, 'scores');
    const allScoresQuery = query(scoresRef, orderByChild('distance'));
    
    const unsubscribe = onValue(allScoresQuery, (snapshot) => {
      const scores = [];
      snapshot.forEach((childSnapshot) => {
        scores.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      
      // Trier par distance décroissante
      const sortedScores = scores.sort((a, b) => b.distance - a.distance);
      
      // Stocker tous les scores
      setAllScores(sortedScores);
      
      // Top 10 pour le leaderboard
      setLeaderboard(sortedScores.slice(0, 10));
      
      // Dernier du classement
      if (sortedScores.length > 0) {
        setLastPlace({
          ...sortedScores[sortedScores.length - 1],
          rank: sortedScores.length
        });
      }
      
      // Calculer le rang du score actuel
      const rank = sortedScores.filter(s => s.distance > currentScore).length + 1;
      setUserRank(rank);
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentScore]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pseudo.trim()) return;

    const scoresRef = ref(database, 'scores');
    const newScore = {
      pseudo: pseudo.trim().substring(0, 25), // Limiter à 25 caractères
      distance: Math.floor(currentScore), // Arrondir pour éviter les décimales suspectes
      country: showCountryInput ? '' : country,
      timestamp: Date.now()
    };

    try {
      await push(scoresRef, newScore);
      setSubmitted(true);
    } catch (error) {
      console.error('Error saving score:', error);
      if (error.code === 'PERMISSION_DENIED') {
        alert('Score validation failed. Please make sure your score is legitimate.');
      } else {
        alert('Failed to save score. Please try again.');
      }
    }
  };

  const getCountryFlag = (countryCode) => {
    if (!countryCode) return '';
    // Convertir code pays en emoji drapeau
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  };

  return (
    <div className="leaderboard-overlay">
      <div className="leaderboard-container">
        <button className="leaderboard-close" onClick={onClose}>✕</button>
        
        <h2>🏆 Leaderboard 🏆</h2>
        
        {!submitted ? (
          <div className="score-submit">
            <div className="your-score">
              <h3>Your Score: {currentScore}m 🛷</h3>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                  maxLength={25}
                  required
                  autoFocus
                />
              </div>
              
              <div className="country-option">
                <label>
                  <input
                    type="checkbox"
                    checked={!showCountryInput}
                    onChange={(e) => setShowCountryInput(!e.target.checked)}
                  />
                  {country && getCountryFlag(country)} Show my country flag
                </label>
              </div>
              
              <div className="form-buttons">
                <button type="submit" className="submit-btn">
                  Submit Score 🚀
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="submitted-message">
            <p>✅ Score submitted successfully!</p>
            {userRank && (
              <p className="user-rank">🎯 Your rank: <strong>#{userRank}</strong> / {allScores.length}</p>
            )}
          </div>
        )}
        
        <div className="leaderboard-list">
          <h3>Top 10 Players</h3>
          {loading ? (
            <p className="loading">Loading...</p>
          ) : leaderboard.length === 0 ? (
            <p className="empty">No scores yet. Be the first!</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Player</th>
                  <th>Distance</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((score, index) => (
                  <tr key={score.id} className={index < 3 ? `rank-${index + 1}` : ''}>
                    <td className="rank">
                      {index === 0 && '🥇'}
                      {index === 1 && '🥈'}
                      {index === 2 && '🥉'}
                      {index > 2 && `#${index + 1}`}
                    </td>
                    <td className="player">
                      {score.country && getCountryFlag(score.country)} {score.pseudo.length > 15 ? score.pseudo.substring(0, 15) + '...' : score.pseudo}
                    </td>
                    <td className="distance">{score.distance}m</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          
          {lastPlace && allScores.length > 10 && (
            <div className="last-place-info">
              <p className="separator">...</p>
              <div className="last-place">
                <span className="rank">#{lastPlace.rank}</span>
                <span className="player">
                  {lastPlace.country && getCountryFlag(lastPlace.country)} {lastPlace.pseudo.length > 15 ? lastPlace.pseudo.substring(0, 15) + '...' : lastPlace.pseudo}
                </span>
                <span className="distance">{lastPlace.distance}m</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="leaderboard-actions">
          <button className="action-btn restart-btn" onClick={onRestart}>
            Play Again 🛷
          </button>
          <button className="action-btn back-btn" onClick={onClose}>
            Back to CV 😴
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

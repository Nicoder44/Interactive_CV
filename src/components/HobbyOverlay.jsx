import React, { useEffect, useRef, useState, useMemo } from 'react';
import './HobbyOverlay.css';

const HobbyOverlay = ({ videos, hobbyName }) => {
  const videoRef = useRef(null);
  
  // Sélectionner une vidéo aléatoire basée sur le nom du hobby
  const selectedVideo = useMemo(() => {
    if (!videos || videos.length === 0) return null;
    
    // Si on a un nom de hobby, essayer de trouver des vidéos qui correspondent
    if (hobbyName) {
      const hobbyKeywords = hobbyName.toLowerCase().split(' ');
      const matchingVideos = videos.filter(video => 
        hobbyKeywords.some(keyword => 
          video.toLowerCase().includes(keyword)
        )
      );
      
      // Si on trouve des vidéos correspondantes, en choisir une au hasard
      if (matchingVideos.length > 0) {
        const randomIndex = Math.floor(Math.random() * matchingVideos.length);
        return matchingVideos[randomIndex];
      }
    }
    
    // Sinon, choisir une vidéo aléatoire parmi toutes
    const randomIndex = Math.floor(Math.random() * videos.length);
    return videos[randomIndex];
  }, [videos, hobbyName]);

  useEffect(() => {
    // Précharger et jouer la vidéo avec un délai pour éviter les conflits
    if (videoRef.current && selectedVideo) {
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          // Ignorer les erreurs silencieusement si la vidéo n'existe pas encore
          if (err.name !== 'NotSupportedError') {
            console.log('Video play deferred:', err.name);
          }
        });
      }
    }

    return () => {
      // Arrêter la vidéo quand le composant se démonte
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    };
  }, [selectedVideo]);

  if (!selectedVideo) {
    return (
      <div className="hobby-overlay">
        <div className="hobby-overlay-content">
          <div className="hobby-placeholder">
            <p>🎬 Ajoutez vos vidéos dans /public/videos/</p>
            <p style={{fontSize: '0.75rem', opacity: 0.7, marginTop: '0.5rem'}}>
              Ex: climbing1.mp4, skydiving.mp4, travel.mp4
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hobby-overlay">
      <div className="hobby-overlay-content">
        <video
          ref={videoRef}
          className="hobby-video"
          src={selectedVideo}
          loop
          muted
          playsInline
          preload="metadata"
        />
      </div>
    </div>
  );
};

export default HobbyOverlay;

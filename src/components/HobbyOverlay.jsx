import React, { useEffect, useRef, useState } from 'react';
import './HobbyOverlay.css';
import { selectRandomVideo } from '../utils/videoScanner';

const HobbyOverlay = ({ videos, hobbyName, onMouseEnter, onMouseLeave }) => {
  const videoRef = useRef(null);
  const recentlyPlayedRef = useRef([]);
  
  // État pour forcer le changement de vidéo
  const [currentVideo, setCurrentVideo] = useState(() => 
    selectRandomVideo(videos, recentlyPlayedRef.current)
  );

  // Fonction pour passer à la vidéo suivante
  const playNextVideo = () => {
    const nextVideo = selectRandomVideo(videos, recentlyPlayedRef.current);
    
    if (nextVideo) {
      // Ajouter la vidéo actuelle à l'historique
      if (currentVideo) {
        recentlyPlayedRef.current = [currentVideo, ...recentlyPlayedRef.current].slice(0, 10);
      }
      
      setCurrentVideo(nextVideo);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    
    if (video && currentVideo) {
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Ignorer silencieusement les erreurs de lecture
        });
      }

      // Quand la vidéo se termine, passer à la suivante
      const handleVideoEnd = () => {
        playNextVideo();
      };

      video.addEventListener('ended', handleVideoEnd);

      return () => {
        video.removeEventListener('ended', handleVideoEnd);
        video.pause();
        video.currentTime = 0;
      };
    }
  }, [currentVideo]);

  // Ne rien rendre si aucune vidéo disponible
  if (!currentVideo) {
    return null;
  }

  return (
    <div 
      className="hobby-overlay"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="hobby-overlay-content">
        <video
          ref={videoRef}
          className="hobby-video"
          src={currentVideo}
          muted
          playsInline
          preload="metadata"
        />
      </div>
    </div>
  );
};

export default HobbyOverlay;

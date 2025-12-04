import React, { useEffect, useRef } from 'react';
import './HobbyOverlay.css';
import { selectRandomVideo, filterVideosByHobby } from '../utils/videoScanner';

const HobbyOverlay = ({ videos, hobbyName, onMouseEnter, onMouseLeave }) => {
  const videoRef = useRef(null);
  
  // Sélectionner une vidéo aléatoire à chaque render (= nouveau survol)
  const selectedVideo = selectRandomVideo(videos);

  useEffect(() => {
    if (videoRef.current && selectedVideo) {
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Ignorer silencieusement les erreurs de lecture
        });
      }
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    };
  }, [selectedVideo]);

  // Ne rien rendre si aucune vidéo disponible
  if (!selectedVideo) {
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

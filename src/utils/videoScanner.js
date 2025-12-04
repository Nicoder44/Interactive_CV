/**
 * Utilitaire pour scanner et charger dynamiquement les vidéos
 * depuis le dossier public/videos/
 */

/**
 * Charge toutes les vidéos disponibles dans le dossier public/videos/
 * en utilisant import.meta.glob de Vite
 */
export function getAllVideos() {
  // Vite permet de scanner des fichiers avec import.meta.glob
  const videoModules = import.meta.glob('/public/videos/*.mp4', { eager: false, as: 'url' });
  
  // Extraire juste les chemins (sans le /public car servi à la racine)
  const videoPaths = Object.keys(videoModules).map(path => 
    path.replace('/public', '')
  );
  
  return videoPaths;
}

/**
 * Filtre les vidéos par nom de hobby (insensible à la casse)
 * @param {string[]} allVideos - Liste de tous les chemins vidéo
 * @param {string} hobbyName - Nom du hobby (ex: "Climbing")
 * @returns {string[]} - Liste des vidéos correspondantes
 */
export function filterVideosByHobby(allVideos, hobbyName) {
  if (!hobbyName || !allVideos || allVideos.length === 0) {
    return [];
  }
  
  const keywords = hobbyName.toLowerCase().split(' ');
  
  return allVideos.filter(videoPath => {
    const fileName = videoPath.split('/').pop().toLowerCase();
    return keywords.some(keyword => fileName.includes(keyword));
  });
}

/**
 * Sélectionne une vidéo aléatoire parmi une liste, en évitant les N dernières vues
 * @param {string[]} videos - Liste des chemins vidéo
 * @param {string[]} recentlyPlayed - Liste des vidéos récemment jouées à éviter
 * @param {number} maxRecent - Nombre maximum de vidéos récentes à éviter (défaut: 4)
 * @returns {string|null} - Chemin de la vidéo sélectionnée ou null
 */
export function selectRandomVideo(videos, recentlyPlayed = [], maxRecent = 4) {
  if (!videos || videos.length === 0) {
    return null;
  }
  
  // Si on a assez de vidéos, éviter les récentes
  if (videos.length > maxRecent && recentlyPlayed.length > 0) {
    const availableVideos = videos.filter(video => !recentlyPlayed.includes(video));
    
    // Si on a des vidéos disponibles après filtrage, utiliser celles-là
    if (availableVideos.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableVideos.length);
      return availableVideos[randomIndex];
    }
  }
  
  // Sinon, prendre une vidéo au hasard parmi toutes
  const randomIndex = Math.floor(Math.random() * videos.length);
  return videos[randomIndex];
}


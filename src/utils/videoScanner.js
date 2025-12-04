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
 * Sélectionne une vidéo aléatoire parmi une liste
 * @param {string[]} videos - Liste des chemins vidéo
 * @returns {string|null} - Chemin de la vidéo sélectionnée ou null
 */
export function selectRandomVideo(videos) {
  if (!videos || videos.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * videos.length);
  return videos[randomIndex];
}

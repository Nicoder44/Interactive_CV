import { describe, it, expect } from 'vitest';
import { 
  getAllVideos, 
  filterVideosByHobby, 
  selectRandomVideo 
} from '../utils/videoScanner';

describe('videoScanner', () => {
  describe('filterVideosByHobby', () => {
    it('should filter videos by hobby name (case-insensitive)', () => {
      const videos = [
        '/videos/climbing1.mp4',
        '/videos/Climbing2.mp4',
        '/videos/skydiving.mp4',
        '/videos/travel.mp4',
      ];
      
      const result = filterVideosByHobby(videos, 'Climbing');
      
      expect(result).toHaveLength(2);
      expect(result).toContain('/videos/climbing1.mp4');
      expect(result).toContain('/videos/Climbing2.mp4');
    });

    it('should return empty array when no matches found', () => {
      const videos = ['/videos/climbing1.mp4'];
      const result = filterVideosByHobby(videos, 'Swimming');
      
      expect(result).toHaveLength(0);
    });

    it('should handle empty video list', () => {
      const result = filterVideosByHobby([], 'Climbing');
      expect(result).toHaveLength(0);
    });

    it('should handle null/undefined inputs gracefully', () => {
      expect(filterVideosByHobby(null, 'Climbing')).toHaveLength(0);
      expect(filterVideosByHobby(['/videos/test.mp4'], null)).toHaveLength(0);
    });

    it('should match multiple keywords in hobby name', () => {
      const videos = [
        '/videos/rock-climbing.mp4',
        '/videos/climbing-indoor.mp4',
        '/videos/skydiving.mp4',
      ];
      
      const result = filterVideosByHobby(videos, 'Rock Climbing');
      
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('selectRandomVideo', () => {
    it('should return a video from the list', () => {
      const videos = [
        '/videos/video1.mp4',
        '/videos/video2.mp4',
        '/videos/video3.mp4',
      ];
      
      const result = selectRandomVideo(videos);
      
      expect(videos).toContain(result);
    });

    it('should avoid recently played videos', () => {
      const videos = [
        '/videos/video1.mp4',
        '/videos/video2.mp4',
        '/videos/video3.mp4',
        '/videos/video4.mp4',
        '/videos/video5.mp4',
        '/videos/video6.mp4',
        '/videos/video7.mp4',
        '/videos/video8.mp4',
        '/videos/video9.mp4',
        '/videos/video10.mp4',
        '/videos/video11.mp4',
        '/videos/video12.mp4',
      ];
      
      const recentlyPlayed = [
        '/videos/video1.mp4', 
        '/videos/video2.mp4',
        '/videos/video3.mp4'
      ];
      const result = selectRandomVideo(videos, recentlyPlayed, 10);
      
      expect(result).not.toBe('/videos/video1.mp4');
      expect(result).not.toBe('/videos/video2.mp4');
      expect(result).not.toBe('/videos/video3.mp4');
      expect(videos).toContain(result);
    });

    it('should respect maxRecent parameter', () => {
      const videos = [
        '/videos/video1.mp4',
        '/videos/video2.mp4',
        '/videos/video3.mp4',
      ];
      
      const recentlyPlayed = ['/videos/video1.mp4'];
      const result = selectRandomVideo(videos, recentlyPlayed, 1);
      
      expect(result).not.toBe('/videos/video1.mp4');
    });

    it('should fallback to any video if all are recently played', () => {
      const videos = ['/videos/video1.mp4', '/videos/video2.mp4'];
      const recentlyPlayed = ['/videos/video1.mp4', '/videos/video2.mp4'];
      
      const result = selectRandomVideo(videos, recentlyPlayed);
      
      expect(videos).toContain(result);
    });

    it('should return null for empty array', () => {
      expect(selectRandomVideo([])).toBeNull();
    });

    it('should return null for null/undefined input', () => {
      expect(selectRandomVideo(null)).toBeNull();
      expect(selectRandomVideo(undefined)).toBeNull();
    });

    it('should return the only video when array has one element', () => {
      const videos = ['/videos/single.mp4'];
      const result = selectRandomVideo(videos);
      
      expect(result).toBe('/videos/single.mp4');
    });
  });
});

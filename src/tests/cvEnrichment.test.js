import { describe, it, expect } from 'vitest';
import { enrichCVData } from '../utils/cvEnrichment';

describe('cvEnrichment', () => {
  describe('enrichCVData', () => {
    it('should enrich skills with priority filtering', () => {
      const parsedData = {
        skills: [
          { name: 'Java', category: 'Languages' },
          { name: 'React', category: 'Frameworks' },
          { name: 'Unknown Skill', category: 'Other' },
        ],
      };

      const result = enrichCVData(parsedData);

      expect(result.skills).toBeDefined();
      expect(result.skills.length).toBeGreaterThan(0);
      // All returned skills should have priority 1 or 2
      result.skills.forEach(skill => {
        expect(skill.priority).toBeLessThanOrEqual(2);
      });
    });

    it('should add demo content to known skills', () => {
      const parsedData = {
        skills: [{ name: 'Java', category: 'Languages' }],
      };

      const result = enrichCVData(parsedData);

      const javaSkill = result.skills.find(s => s.name === 'Java');
      expect(javaSkill).toBeDefined();
      expect(javaSkill.demo).toBeDefined();
      expect(javaSkill.level).toBeDefined();
    });

    it('should enrich experiences with technology stacks', () => {
      const parsedData = {
        experiences: [
          {
            role: 'Backend Java Developer',
            company: 'Tech Corp',
            period: '2023--Present',
          },
        ],
      };

      const result = enrichCVData(parsedData);

      expect(result.experiences[0].technologies).toBeDefined();
      expect(Array.isArray(result.experiences[0].technologies)).toBe(true);
    });

    it('should handle experiences without enrichment gracefully', () => {
      const parsedData = {
        experiences: [
          {
            role: 'Unknown Role',
            company: 'Unknown Company',
            period: '2020--2021',
          },
        ],
      };

      const result = enrichCVData(parsedData);

      expect(result.experiences).toHaveLength(1);
      expect(result.experiences[0].role).toBe('Unknown Role');
    });

    it('should preserve original data structure', () => {
      const parsedData = {
        name: 'John Doe',
        title: 'Software Engineer',
        contact: {
          email: 'john@example.com',
        },
        skills: [],
        experiences: [],
        hobbies: [],
      };

      const result = enrichCVData(parsedData);

      expect(result.name).toBe('John Doe');
      expect(result.title).toBe('Software Engineer');
      expect(result.contact.email).toBe('john@example.com');
    });

    it('should handle empty input gracefully', () => {
      const result = enrichCVData({});

      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    });

    it('should sort skills by priority', () => {
      const parsedData = {
        skills: [
          { name: 'Java', category: 'Languages' },
          { name: 'Spring Boot', category: 'Frameworks' },
          { name: 'Docker', category: 'DevOps' },
        ],
      };

      const result = enrichCVData(parsedData);

      // Check that skills are sorted by priority (ascending)
      for (let i = 1; i < result.skills.length; i++) {
        expect(result.skills[i].priority).toBeGreaterThanOrEqual(
          result.skills[i - 1].priority
        );
      }
    });
  });
});

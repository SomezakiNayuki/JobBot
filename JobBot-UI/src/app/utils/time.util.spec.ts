import { compareDate, convertDateStringToTimeObject } from 'src/app/utils/time.util';
import Time from 'src/models/time.model';

describe('time.util', () => {
  describe('compareDate', () => {
    it('should return 0 for the same date', () => {
      const t1 = new Time([2024, 6, 10, 0, 0]);
      const t2 = new Time([2024, 6, 10, 12, 30]);
      expect(compareDate(t1, t2)).toBe(0);
    });

    it('should return negative if time1 is earlier year', () => {
      const t1 = new Time([2023, 6, 10, 0, 0]);
      const t2 = new Time([2024, 6, 10, 0, 0]);
      expect(compareDate(t1, t2)).toBeLessThan(0);
    });

    it('should return positive if time1 is later year', () => {
      const t1 = new Time([2025, 6, 10, 0, 0]);
      const t2 = new Time([2024, 6, 10, 0, 0]);
      expect(compareDate(t1, t2)).toBeGreaterThan(0);
    });

    it('should return negative if time1 is earlier month in same year', () => {
      const t1 = new Time([2024, 5, 10, 0, 0]);
      const t2 = new Time([2024, 6, 10, 0, 0]);
      expect(compareDate(t1, t2)).toBeLessThan(0);
    });

    it('should return positive if time1 is later month in same year', () => {
      const t1 = new Time([2024, 7, 10, 0, 0]);
      const t2 = new Time([2024, 6, 10, 0, 0]);
      expect(compareDate(t1, t2)).toBeGreaterThan(0);
    });

    it('should return negative if time1 is earlier day in same month/year', () => {
      const t1 = new Time([2024, 6, 9, 0, 0]);
      const t2 = new Time([2024, 6, 10, 0, 0]);
      expect(compareDate(t1, t2)).toBeLessThan(0);
    });

    it('should return positive if time1 is later day in same month/year', () => {
      const t1 = new Time([2024, 6, 11, 0, 0]);
      const t2 = new Time([2024, 6, 10, 0, 0]);
      expect(compareDate(t1, t2)).toBeGreaterThan(0);
    });
  });

  describe('convertDateStringToTimeObject', () => {
    it('should convert a valid date string to a Time object', () => {
      const dateString = '2024-06-10';
      const timeObj = convertDateStringToTimeObject(dateString);
      expect(timeObj.year).toBe(2024);
      expect(timeObj.month).toBe(6);
      expect(timeObj.day).toBe(10);
      expect(timeObj.hour).toBe(0);
      expect(timeObj.minute).toBe(0);
    });

    it('should handle single digit months and days', () => {
      const dateString = '2024-1-5';
      const timeObj = convertDateStringToTimeObject(dateString);
      expect(timeObj.year).toBe(2024);
      expect(timeObj.month).toBe(1);
      expect(timeObj.day).toBe(5);
    });
  });
});
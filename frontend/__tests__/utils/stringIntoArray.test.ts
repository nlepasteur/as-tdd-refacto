// types
import stringIntoArray from 'utils/stringIntoArray';

describe('stringIntoArray', () => {
  describe('string to transform is empty', () => {
    it('returns an empty array', () => {
      const stubString = '';
      const result = stringIntoArray(stubString);
      expect(result).toEqual([]);
    });
  });
});

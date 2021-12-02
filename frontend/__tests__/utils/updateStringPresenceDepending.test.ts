// tested util
import updateStringPresenceDepending from 'utils/updateStringPresenceDepending';

describe('updateStringPresenceDepending', () => {
  describe('given "a,b,c,d" as initial string and "e" as given string to add or remove', () => {
    it('add "e"', () => {
      const stubInitialString = 'a,b,c,d';
      const stubString = 'e';
      const expected = 'a,b,c,d,e';
      const result = updateStringPresenceDepending({
        initialString: stubInitialString,
        string: stubString,
      });
      expect(result).toEqual(expected);
    });
  });

  describe('given "a,b,c,d,e" as initial string and "e" as given string to add or remove', () => {
    it('remove "e"', () => {
      const stubInitialString = 'a,b,c,d,e';
      const stubString = 'e';
      const expected = 'a,b,c,d';
      const result = updateStringPresenceDepending({
        initialString: stubInitialString,
        string: stubString,
      });
      expect(result).toEqual(expected);
    });
  });

  describe('given an empty string as initial string and "a" as given string to add or remove', () => {
    it('add "a"', () => {
      const stubInitialString = '';
      const stubString = 'a';
      const expected = 'a';
      const result = updateStringPresenceDepending({
        initialString: stubInitialString,
        string: stubString,
      });
      expect(result).toEqual(expected);
    });
  });

  describe('given "a" as initial string and "a" as given string to add or remove', () => {
    it('remove "a"', () => {
      const stubInitialString = 'a';
      const stubString = 'a';
      const expected = '';
      const result = updateStringPresenceDepending({
        initialString: stubInitialString,
        string: stubString,
      });
      expect(result).toEqual(expected);
    });
  });
});

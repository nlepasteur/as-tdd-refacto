import testSubstring from 'utils/testSubstring';

describe('testSubstring', () => {
  describe('substring is present in string in which to search', () => {
    it('given "0" as substring to search and "0,1,2,3", returns "true"', () => {
      const string = '0,1,2,3';
      const substring = '0';
      const result = testSubstring({ string, substring });
      expect(result).toBeTruthy();
    });
  });

  describe('substring is not present in string which to search', () => {
    it('given "0" as substring to search and "1,2,3", returns "false"', () => {
      const string = '1,2,3';
      const substring = '0';
      const result = testSubstring({ string, substring });
      expect(result).toBeFalsy();
    });

    it('given "0" as substring to search and "1,2,3,10", returns "false"', () => {
      const string = '1,2,3,10';
      const substring = '0';
      const result = testSubstring({ string, substring });
      expect(result).toBeFalsy();
    });
  });
});

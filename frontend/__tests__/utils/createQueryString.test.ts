import createQueryString from 'utils/createQueryString';

describe('createQueryString', () => {
  describe('assuming separator is ","', () => {
    it('given "v1,v2,v3" as values and "query" as query, returns "&query=v1&query=v2&query=v3"', () => {
      const values = 'v1,v2,v3';
      const query = 'query';
      const expected = '&query=v1&query=v2&query=v3';
      const result = createQueryString({ query, values });
      expect(result).toEqual(expected);
    });
  });
});

// tested util
import createExploreDimensionPathname from 'utils/createExploreDimensionPathname';

describe('createExploreDimensionPathname', () => {
  describe('given "community" as current explore and "2d" as picked dimension (or vice versa)', () => {
    const expected = '/?sort_by=community&dimension=2d';
    it(`returns "${expected}"`, () => {
      const args = { explore: 'community', dimension: '2d' } as const;
      const result = createExploreDimensionPathname(args);
      expect(result).toEqual(expected);
    });
  });

  describe('given "trending" as current explore and "all" as picked dimension (or vice versa)', () => {
    const expected = '/?sort_by=community';
    it(`returns "${expected}"`, () => {
      const args = { explore: 'community', dimension: 'all' } as const;
      const result = createExploreDimensionPathname(args);
      expect(result).toEqual(expected);
    });
  });
});

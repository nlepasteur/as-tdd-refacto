// types
import type { Explore, Dimension } from 'application/types';

const createExploreDimensionPathname: (args: {
  dimension: Dimension;
  explore: Explore;
}) => string = ({ explore, dimension }) => {
  return dimension === 'all'
    ? `/?sort_by=${explore}`
    : `/?sort_by=${explore}&dimension=${dimension}`;
};

export default createExploreDimensionPathname;

const createQueryString = ({
  values,
  query,
}: {
  values: string;
  query: string;
}) =>
  values
    .split(',')
    .map((value) => value.trim())
    .reduce((acc, cur) => {
      return `${acc}&${query}=${cur}`;
    }, '');

export default createQueryString;

const updateStringPresenceDepending = ({
  initialString,
  string,
}: {
  initialString: string;
  string: string;
}) => {
  return initialString
    .split(',')
    .concat(string)
    .filter(
      (string, i, array) =>
        array.indexOf(string) === array.lastIndexOf(string) && string.length
    )
    .join(',');
};

export default updateStringPresenceDepending;

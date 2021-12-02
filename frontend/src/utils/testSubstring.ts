const testSubstring = ({
  string,
  substring,
}: {
  string: string;
  substring: string;
}) => {
  const substringIntoRegExp = RegExp(`(,|^)${substring}(,|$)`);
  return substringIntoRegExp.test(string);
};

export default testSubstring;

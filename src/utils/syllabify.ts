const syllableRegex =
  /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi;

export const syllabify = (word: string) => {
  return word.match(syllableRegex);
};

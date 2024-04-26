import { syllabify } from "./syllabify";
import { words } from "./words";

const pronounMap: Record<string, string> = {
  I: "HUUUE",
  ME: "HUUUE",
  MY: "HUUUE",
  MINE: "HUUUE",
  WE: "HOOO",
  US: "HOOO",
  OUR: "HOOO",
  OURS: "HOOO",
  HE: "HEEE",
  HIM: "HEEE",
  HIS: "HEEE",
  SHE: "HAAA",
  HER: "HAAA",
  HERS: "HAAA",
  YOU: "HIII",
  YOUR: "HIII",
  YOURS: "HIII",
  THEY: "HYUH",
  THEM: "HYUH",
  THEIR: "HYUH",
  THEIRS: "HYUH",
  IT: "HYOH",
  ITS: "HYOH",
  THIS: "HYOH",
  THAT: "HYOH",
  THESE: "HYOH",
  THOSE: "HYOH",
};

const vowels = ["A", "E", "I", "O", "U"];

export const translateToThievesCant = (input: string) => {
  const words = input.split(" ");
  const translatedWords = [];

  for (const word of words) {
    // Handle pronouns
    if (pronounMap[word.toUpperCase()]) {
      translatedWords.push(pronounMap[word.toUpperCase()]);
      continue;
    }

    const syllables = syllabify(word);

    if (syllables.length === 1) {
      translatedWords.push(word);
      continue;
    }

    const vowel = vowels[(syllables.length - 1) % vowels.length];
    const lastSyllable = syllables[syllables.length - 1];

    for (let i = 0; i < syllables.length - 2; i++) {
      const wordStarter = words.find((word) => word.startsWith(syllables[i]));
      translatedWords.push(wordStarter);

      if (i === 0) {
        translatedWords.push(vowel);
      }
    }

    //reverse the last syllable
    const reversedLastSyllable = lastSyllable.split("").reverse().join("");
    translatedWords.push(reversedLastSyllable);
  }

  return translatedWords.join(" ");
};

export const translateToEnglish = (input: string) => {
  // TODO Implement the translation logic here
  return input;
};

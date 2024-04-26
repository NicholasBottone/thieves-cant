import { syllabify } from "./syllabify";
import { dictionary } from "./words";

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

const contractionsMap: Record<string, string> = {
  "I'M": "I AM",
  "YOU'RE": "YOU ARE",
  "HE'S": "HE IS",
  "SHE'S": "SHE IS",
  "IT'S": "IT IS",
  "WE'RE": "WE ARE",
  "THEY'RE": "THEY ARE",
  "I'LL": "I WILL",
  "YOU'LL": "YOU WILL",
  "HE'LL": "HE WILL",
  "SHE'LL": "SHE WILL",
  "IT'LL": "IT WILL",
  "WE'LL": "WE WILL",
  "THEY'LL": "THEY WILL",
  "I'D": "I WOULD",
  "YOU'D": "YOU WOULD",
  "HE'D": "HE WOULD",
  "SHE'D": "SHE WOULD",
  "IT'D": "IT WOULD",
  "WE'D": "WE WOULD",
  "THEY'D": "THEY WOULD",
  "I'VE": "I HAVE",
  "YOU'VE": "YOU HAVE",
  "WE'VE": "WE HAVE",
  "THEY'VE": "THEY HAVE",
  "DON'T": "DO NOT",
  "DOESN'T": "DOES NOT",
  "ISN'T": "IS NOT",
  "AREN'T": "ARE NOT",
  "WASN'T": "WAS NOT",
  "WEREN'T": "WERE NOT",
  "HASN'T": "HAS NOT",
  "HAVEN'T": "HAVE NOT",
  "WOULDN'T": "WOULD NOT",
  "SHOULDN'T": "SHOULD NOT",
  "MUSTN'T": "MUST NOT",
  "CAN'T": "CAN NOT",
  "COULDN'T": "COULD NOT",
  "WON'T": "WILL NOT",
  "SHAN'T": "SHALL NOT",
  "AIN'T": "AM NOT",
};

const vowels = ["A", "E", "I", "O", "U"];

const simpleSingleSyllableWords = [
  "A",
  "AN",
  "THE",
  "AND",
  "BUT",
  "NOT",
  "OR",
  "FOR",
  "NOR",
  "SO",
  "YET",
  "TO",
  "IN",
  "ON",
  "AT",
  "BY",
  "OF",
  "WITH",
  "AS",
  "IS",
  "WAS",
  "ALL",
  "HI",
  "BYE",
  "WHO",
  "WHAT",
  "WHEN",
  "WHERE",
  "WHY",
  "HOW",
  "WHICH",
  "WHOM",
  "MAY",
  "MUCH",
  "MORE",
  "MUST",
];

export const translateToThievesCant = (input: string) => {
  input = input.toUpperCase();

  for (const [contraction, expansion] of Object.entries(contractionsMap)) {
    input = input.replace(new RegExp(contraction, "gi"), expansion);
  }

  const words = input.split(/(\s+|[.,!?])/);
  const translatedWords = [];

  for (const word of words) {
    console.log(`Translating "${word}"...`);
    if (!word.trim() || /^[.,!?]$/.test(word)) {
      continue;
    }

    const translatedWord = [];

    // Handle pronouns
    if (pronounMap[word]) {
      translatedWord.push(pronounMap[word]);
      console.log(
        `Translated "${word}" to "${translatedWord.join(" ")}" (pronoun)`,
      );
      translatedWords.push(...translatedWord);
      continue;
    }

    const syllables = syllabify(word);

    if (syllables.length === 1) {
      if (simpleSingleSyllableWords.includes(word)) {
        translatedWord.push(word.toLowerCase());
      } else {
        translatedWord.push(
          `y${word.toLowerCase().substring(1)}${word.toLowerCase()[0]}`,
        );
      }

      console.log(
        `Translated "${word}" to "${translatedWord.join(" ")}" (single syllable word)`,
      );
      translatedWords.push(...translatedWord);
      continue;
    }

    const vowel = vowels[(syllables.length - 1) % vowels.length];
    const lastSyllable = syllables[syllables.length - 1];

    for (let i = 0; i < syllables.length - 1; i++) {
      const wordStarter =
        dictionary.find((word) =>
          word.startsWith(syllables[i].toLowerCase()),
        ) ?? "oh-no!";
      console.log(`Found word starter for "${syllables[i]}": ${wordStarter}`);
      translatedWord.push(wordStarter);

      if (i === 0) {
        translatedWord.push(vowel);
      }
    }

    // reverse the last syllable
    const reversedLastSyllable = lastSyllable
      .toLowerCase()
      .split("")
      .reverse()
      .join("");
    translatedWord.push(reversedLastSyllable);

    console.log(`Translated "${word}" to "${translatedWord.join(" ")}"`);
    translatedWords.push(...translatedWord);
  }

  console.log(
    `Translated "${input}" to "${translatedWords.join(" ")}" (multi-syllable word)`,
  );

  return translatedWords.join(" ");
};

export const translateToEnglish = (input: string) => {
  // TODO Implement the translation logic here
  return input;
};

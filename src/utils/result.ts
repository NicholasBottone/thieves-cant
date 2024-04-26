export type Result = {
  translation: string;
  translationPairs: { start: string; end: string }[];
  success: boolean;
};

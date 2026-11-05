export type PronunciationResult = { accuracy: number; passed: boolean; feedback: string };

export function scorePronunciation(target: string, transcript: string): PronunciationResult {
  const targetWords = target.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, "").split(/\s+/).filter(Boolean);
  const heardWords = transcript.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, "").split(/\s+/).filter(Boolean);
  const matched = targetWords.filter((word, index) => heardWords[index] === word).length;
  const accuracy = Math.round((matched / Math.max(targetWords.length, 1)) * 100);
  return { accuracy, passed: accuracy >= 70, feedback: accuracy >= 90 ? "Excellente prononciation. Essaie maintenant avec un rythme naturel." : accuracy >= 70 ? "Très bien. Reprends les mots signalés et parle un peu plus lentement." : "Écoute la phrase une fois, puis répète-la par petits groupes de mots." };
}

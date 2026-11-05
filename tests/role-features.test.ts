import { describe, expect, it } from "vitest";
import { scorePronunciation } from "../lib/speech-scoring";
import { languagePrograms } from "../lib/workspace-data";

describe("role-based platform upgrades", () => {
  it("scores an exact pronunciation as passed", () => {
    const result = scorePronunciation("Je voudrais pratiquer mon français aujourd’hui.", "Je voudrais pratiquer mon français aujourd’hui");
    expect(result.accuracy).toBe(100);
    expect(result.passed).toBe(true);
    expect(result.feedback).toContain("Excellente");
  });
  it("gives actionable feedback for an incomplete pronunciation", () => {
    const result = scorePronunciation("I would like to practice my English today.", "I practice");
    expect(result.accuracy).toBeLessThan(70);
    expect(result.passed).toBe(false);
    expect(result.feedback.length).toBeGreaterThan(30);
  });
  it("includes conversation modules for each professional language path", () => {
    expect(languagePrograms.every((program) => program.modules.length >= 4 && program.goal.length > 8)).toBe(true);
  });
});

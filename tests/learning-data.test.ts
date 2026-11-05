import { describe, expect, it } from "vitest";

import { allBooks, books, completeLessonModules, curriculum3ac, examForGrade, examQuestions, gradeCurriculum, grades, languageTracks, questions, studyModules, subjects } from "../lib/learning-data";

describe("Madrasti AI learning data", () => {
  it("contains all requested collège and lycée years", () => {
    expect(grades.map((grade) => grade.id)).toEqual(["1ac", "2ac", "3ac", "tc", "1bac", "2bac"]);
    expect(grades.filter((grade) => grade.track === "college")).toHaveLength(3);
    expect(grades.filter((grade) => grade.track === "lycee")).toHaveLength(3);
    expect(subjects.map((subject) => subject.id)).toEqual(expect.arrayContaining(["math", "french", "arabic", "science"]));
  });

  it("keeps each practice question answerable", () => {
    expect(questions.length).toBeGreaterThanOrEqual(3);
    for (const question of questions) {
      expect(question.options.length).toBeGreaterThan(1);
      expect(question.correctIndex).toBeGreaterThanOrEqual(0);
      expect(question.correctIndex).toBeLessThan(question.options.length);
      expect(question.explanation.length).toBeGreaterThan(20);
    }
  });

  it("contains the original 3AC topic metadata", () => {
    expect(curriculum3ac.length).toBeGreaterThanOrEqual(12);
    expect(curriculum3ac.some((lesson) => lesson.title === "Théorème de Thalès")).toBe(true);
  });

  it("has a curriculum catalog for every requested year", () => {
    for (const grade of grades) {
      expect(gradeCurriculum[grade.id].length).toBeGreaterThanOrEqual(4);
      expect(gradeCurriculum[grade.id].every((lesson) => lesson.gradeId === grade.id)).toBe(true);
    }
  });

  it("provides a complete module for every catalog lesson", () => {
    const moduleIds = new Set(completeLessonModules.map((module) => module.lessonId));
    expect(completeLessonModules.length).toBeGreaterThanOrEqual(30);
    expect(Object.values(gradeCurriculum).flat().every((lesson) => moduleIds.has(lesson.id))).toBe(true);
    expect(completeLessonModules.every((module) => module.keyPoints.length >= 3 && module.guidedPractice.length > 20)).toBe(true);
  });

  it("provides an interactive exam for every grade and question type", () => {
    for (const grade of grades) expect(examForGrade(grade.id)).toHaveLength(3);
    expect(examQuestions.some((question) => question.type === "single")).toBe(true);
    expect(examQuestions.some((question) => question.type === "true-false")).toBe(true);
    expect(examQuestions.some((question) => question.type === "short")).toBe(true);
    expect(examQuestions.every((question) => question.correctAnswer && question.explanation && question.points > 0)).toBe(true);
  });

  it("provides a teachable module for every original 3AC topic", () => {
    const moduleIds = new Set(studyModules.map((module) => module.lessonId));
    expect(curriculum3ac.every((lesson) => moduleIds.has(lesson.id))).toBe(true);
  });

  it("offers grade-specific revision books and authorized slots", () => {
    expect(books.some((book) => book.access === "offline")).toBe(true);
    expect(allBooks.filter((book) => book.id.startsWith("madrasti-")).length).toBeGreaterThanOrEqual(6);
    expect(allBooks.filter((book) => book.id.startsWith("authorized-")).length).toBe(6);
    expect(allBooks.every((book) => book.sourceLabel.length > 0)).toBe(true);
  });

  it("offers language practice tracks", () => {
    expect(languageTracks.map((track) => track.id)).toEqual(expect.arrayContaining(["fr", "en", "es"]));
  });
});

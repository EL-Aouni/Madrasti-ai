import { describe, expect, it } from "vitest";
import { getOfflineTeacherReply } from "../lib/offline-teacher";

describe("Offline Teacher (Moualim)", () => {
  it("responds to Moroccan greetings warmly", () => {
    const reply = getOfflineTeacherReply("Salam Moualim, labas 3lik?");
    expect(reply).toContain("مدرستي AI");
  });

  it("explains identités remarquables accurately", () => {
    const reply = getOfflineTeacherReply("Explique-moi les identités remarquables");
    expect(reply).toContain("(a + b)² = a² + 2ab + b²");
  });

  it("explains Théorème de Thalès", () => {
    const reply = getOfflineTeacherReply("Comment appliquer Thalès ?");
    expect(reply).toContain("Théorème de Thalès");
    expect(reply).toContain("AM / AB = AN / AC = MN / BC");
  });

  it("explains Les temps du récit in French", () => {
    const reply = getOfflineTeacherReply("Aide-moi avec les temps du récit");
    expect(reply).toContain("L'imparfait");
    expect(reply).toContain("passé simple");
  });

  it("explains Arabic grammar (الإعراب)", () => {
    const reply = getOfflineTeacherReply("ما هو إعراب الفاعل والمفعول به؟");
    expect(reply).toContain("الفاعل");
    expect(reply).toContain("المفعول به");
  });

  it("provides helpful structured fallback for arbitrary questions", () => {
    const reply = getOfflineTeacherReply("Question quelconque sur un devoir", [], "3ème année collège");
    expect(reply).toContain("منهجية معلم");
    expect(reply).toContain("3ème année collège");
  });
});

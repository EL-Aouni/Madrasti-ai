import { describe, expect, it } from "vitest";
import { demoAssignments, demoClasses, languagePrograms } from "../lib/workspace-data";

describe("Madrasti workspaces", () => {
  it("gives every class a joinable code and tracking metrics", () => {
    expect(demoClasses.length).toBeGreaterThanOrEqual(2);
    expect(demoClasses.every((item) => item.code.startsWith("MADR-") && item.students > 0 && item.completion >= 0)).toBe(true);
  });
  it("connects published work to a class", () => {
    expect(demoAssignments.length).toBeGreaterThanOrEqual(3);
    expect(demoAssignments.every((item) => demoClasses.some((classRoom) => classRoom.id === item.classId))).toBe(true);
    expect(new Set(demoAssignments.map((item) => item.kind))).toEqual(new Set(["exam", "course", "exercise"]));
  });
  it("offers professional language pathways", () => {
    expect(languagePrograms.length).toBeGreaterThanOrEqual(4);
    expect(languagePrograms.every((program) => program.level && program.goal && program.modules.length >= 4)).toBe(true);
  });
});

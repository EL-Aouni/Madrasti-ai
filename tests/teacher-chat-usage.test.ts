import { describe, expect, it } from "vitest";
import { incrementAndCheckTeacherChatUsage } from "../server/db";

describe("Moualim chat daily usage cap", () => {
  it("allows messages through when no database is configured (local/tests)", async () => {
    const result = await incrementAndCheckTeacherChatUsage(1, 40);
    expect(result.allowed).toBe(true);
    expect(result.limit).toBe(40);
  });
});

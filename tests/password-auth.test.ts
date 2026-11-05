import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "../server/password";

describe("email password authentication", () => {
  it("hashes passwords and verifies only the original secret", async () => {
    const encoded = await hashPassword("Correct horse battery staple");
    expect(encoded).toMatch(/^scrypt:/);
    await expect(verifyPassword("Correct horse battery staple", encoded)).resolves.toBe(true);
    await expect(verifyPassword("wrong password", encoded)).resolves.toBe(false);
  });
});

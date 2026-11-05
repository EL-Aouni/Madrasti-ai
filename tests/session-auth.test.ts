import { beforeEach, describe, expect, it, vi } from "vitest";

// This covers a bug that made it to a live integration test: every
// email/password session carries an empty appId (that field is leftover
// from the old Manus OAuth system and unused here), but verifySession used
// to require appId to be non-empty — so no password-authenticated request
// could ever pass auth, even though register/login both appeared to
// succeed. This test locks that regression in place.
describe("session verification (password-login path)", () => {
  beforeEach(() => {
    process.env.JWT_SECRET = "test-secret-for-session-tests";
    vi.resetModules();
  });

  it("accepts a session whose appId is empty", async () => {
    const { sdk } = await import("../server/_core/sdk");

    const token = await sdk.createSessionToken("email:student@example.com", { name: "Student Name" });
    const session = await sdk.verifySession(token);

    expect(session).not.toBeNull();
    expect(session?.openId).toBe("email:student@example.com");
    expect(session?.name).toBe("Student Name");
  }, 20000);

  it("still rejects a session with no openId or name", async () => {
    const { sdk } = await import("../server/_core/sdk");
    // Intentionally empty payload: a session with no identity must be rejected.
    const token = await sdk.signSession({ openId: "", appId: "", name: "" });
    const session = await sdk.verifySession(token);
    expect(session).toBeNull();
  }, 20000);
});

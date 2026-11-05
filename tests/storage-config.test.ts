import { describe, expect, it } from "vitest";
import { storagePut } from "../server/storage";

describe("object storage configuration", () => {
  it("fails with a clear message when S3 credentials are not set", async () => {
    // In the test environment S3_* env vars are intentionally unset.
    await expect(storagePut("test/file.txt", "hello", "text/plain")).rejects.toThrow(
      /Storage config missing/,
    );
  });
});

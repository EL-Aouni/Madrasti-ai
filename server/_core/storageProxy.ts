import type { Express } from "express";
import { storageGetSignedUrl } from "../storage";

// Serves files previously saved with storagePut(). The app/DB only ever
// stores the short "/manus-storage/{key}" reference path; this route
// resolves that to a real (signed or public) URL on request, so the signing
// credentials never need to reach the client.
export function registerStorageProxy(app: Express) {
  app.get("/manus-storage/*", async (req, res) => {
    const key = (req.params as Record<string, string>)[0];
    if (!key) {
      res.status(400).send("Missing storage key");
      return;
    }

    try {
      const url = await storageGetSignedUrl(key);
      res.set("Cache-Control", "no-store");
      res.redirect(307, url);
    } catch (err) {
      console.error("[StorageProxy] failed:", err);
      res.status(502).send("Storage proxy error");
    }
  });
}

// Object storage helpers backed by any S3-compatible provider (Cloudflare R2,
// AWS S3, Backblaze B2, MinIO, etc). Configure with S3_ENDPOINT, S3_REGION,
// S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY (see .env.example).
//
// Uploads go straight to the bucket with PutObjectCommand. Downloads are
// served either via a public base URL (if the bucket/CDN is public) or a
// short-lived signed GET URL (if it is private, the default and recommended
// setup since recordings are private student data).

import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { ENV } from "./_core/env";

let _client: S3Client | null = null;

function getClient(): S3Client {
  if (_client) return _client;

  if (!ENV.s3Endpoint || !ENV.s3Bucket || !ENV.s3AccessKeyId || !ENV.s3SecretAccessKey) {
    throw new Error(
      "Storage config missing: set S3_ENDPOINT, S3_BUCKET, S3_ACCESS_KEY_ID and S3_SECRET_ACCESS_KEY",
    );
  }

  _client = new S3Client({
    region: ENV.s3Region || "auto",
    endpoint: ENV.s3Endpoint,
    credentials: {
      accessKeyId: ENV.s3AccessKeyId,
      secretAccessKey: ENV.s3SecretAccessKey,
    },
    // Most S3-compatible providers (R2, MinIO, Backblaze) require path-style
    // addressing rather than the AWS-only virtual-hosted-style bucket URLs.
    forcePathStyle: true,
  });

  return _client;
}

function normalizeKey(relKey: string): string {
  return relKey.replace(/^\/+/, "");
}

function appendHashSuffix(relKey: string): string {
  const hash = crypto.randomUUID().replace(/-/g, "").slice(0, 8);
  const lastDot = relKey.lastIndexOf(".");
  if (lastDot === -1) return `${relKey}_${hash}`;
  return `${relKey.slice(0, lastDot)}_${hash}${relKey.slice(lastDot)}`;
}

export async function storagePut(
  relKey: string,
  data: Buffer | Uint8Array | string,
  contentType = "application/octet-stream",
): Promise<{ key: string; url: string }> {
  const client = getClient();
  const key = appendHashSuffix(normalizeKey(relKey));

  const body =
    typeof data === "string" ? Buffer.from(data, "utf-8") : Buffer.from(data as Uint8Array);

  await client.send(
    new PutObjectCommand({
      Bucket: ENV.s3Bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    }),
  );

  // Callers that just need a reference path (e.g. to store in the DB) get
  // the internal proxy path; use storageGetSignedUrl for a fetchable URL.
  return { key, url: `/manus-storage/${key}` };
}

export async function storageGet(relKey: string): Promise<{ key: string; url: string }> {
  const key = normalizeKey(relKey);
  return { key, url: `/manus-storage/${key}` };
}

export async function storageGetSignedUrl(relKey: string): Promise<string> {
  const key = normalizeKey(relKey);

  if (ENV.s3PublicBaseUrl) {
    const base = ENV.s3PublicBaseUrl.replace(/\/+$/, "");
    return `${base}/${key}`;
  }

  const client = getClient();
  const command = new GetObjectCommand({ Bucket: ENV.s3Bucket, Key: key });
  // 1 hour is enough for a browser/app to fetch and use the file; regenerate
  // on every request rather than caching long-lived URLs.
  return getSignedUrl(client, command, { expiresIn: 3600 });
}

export const ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  // OpenAI-compatible endpoint used for chat/completions and Whisper transcription.
  // Accepts either the standard OPENAI_* names or the legacy BUILT_IN_FORGE_* names
  // left over from the original template, so existing deployments keep working.
  forgeApiUrl: process.env.OPENAI_BASE_URL ?? process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.OPENAI_API_KEY ?? process.env.BUILT_IN_FORGE_API_KEY ?? "",
  // S3-compatible object storage (works with Cloudflare R2, AWS S3, Backblaze B2, etc.)
  // used for voice recordings and any other uploaded/generated files.
  s3Endpoint: process.env.S3_ENDPOINT ?? "",
  s3Region: process.env.S3_REGION ?? "auto",
  s3Bucket: process.env.S3_BUCKET ?? "",
  s3AccessKeyId: process.env.S3_ACCESS_KEY_ID ?? "",
  s3SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? "",
  // Optional: public CDN/bucket URL prefix, if the bucket is served publicly instead
  // of through signed URLs (e.g. an R2 public bucket or CloudFront domain).
  s3PublicBaseUrl: process.env.S3_PUBLIC_BASE_URL ?? "",
  // Model names for chat and transcription. Defaults assume Groq's free,
  // OpenAI-compatible API (see .env.example) — override if you point
  // OPENAI_BASE_URL at OpenAI itself or another provider instead.
  llmModel: process.env.LLM_MODEL || "llama-3.3-70b-versatile",
  transcriptionModel: process.env.TRANSCRIPTION_MODEL || "whisper-large-v3-turbo",
  // How many Moualim (AI teacher) messages a single student can send per day.
  // Protects a shared free-tier API quota from being exhausted by one user.
  teacherChatDailyLimit: Number(process.env.TEACHER_CHAT_DAILY_LIMIT) || 40,
};

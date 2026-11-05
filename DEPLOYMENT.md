# Madrasti AI: GitHub and Google Play deployment

## Important security rule

Never commit `.project-config.json`, `.env`, database URLs, API keys, JWT secrets, Android keystores, or service-account JSON files. This source package intentionally excludes those files. If a credential was ever exposed publicly, rotate it before publishing.

## 1. Prepare a private GitHub repository

Create a new **private** repository on GitHub, for example `madrasti-ai`. Do not add a README, `.gitignore`, or license during repository creation because this package already contains them.

From this project folder, run:

```bash
git init
git branch -M main
git add .
git commit -m "Initial Madrasti AI app"
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/madrasti-ai.git
git push -u origin main
```

If GitHub asks for authentication, use GitHub Desktop, GitHub CLI (`gh auth login`), or a fine-grained personal access token. Do not put a token in the remote URL.

## 2. Install tools on your computer

Install Node.js LTS, Git, pnpm, and the Expo Application Services CLI:

```bash
corepack enable
corepack prepare pnpm@9.12.0 --activate
npm install -g eas-cli
```

Then clone the private repository and install dependencies:

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/madrasti-ai.git
cd madrasti-ai
pnpm install
pnpm check
pnpm test
```

## 3. Configure the backend before publishing the app

This project is not only a static APK. Student accounts, classes, assignments, feedback, and audio analysis use the server and database. The app no longer depends on the Manus platform — everything below uses standard, independently-hosted services.

Create a private `.env` file on the backend host using `.env.example` as the checklist. Set real values for:

- `DATABASE_URL`: your MySQL-compatible connection string (see step 3a)
- `JWT_SECRET`: a long random secret — generate with `openssl rand -base64 32`
- `S3_ENDPOINT`, `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`: object storage for voice recordings (see step 3b). Required — the pronunciation-practice feature uploads audio through this.
- `OPENAI_API_KEY` + `OPENAI_BASE_URL` (recommended): powers the "Moualim" AI tutor chat (`app/teacher.tsx` → `teacher.chat`) and pronunciation transcription. Defaults are wired for **Groq's free API** (no credit card, generous rate limits, OpenAI-compatible) — see `.env.example` for the exact values, including the model names and the `TEACHER_CHAT_DAILY_LIMIT` cap that protects the shared free quota from one very active user. Without a key, Moualim shows a friendly unavailable message instead of crashing, and voice practice can't transcribe recordings.
- Login already works out of the box via email/password (`app/login.tsx`, `server/password.ts`). The `OAUTH_SERVER_URL`/`VITE_APP_ID`/`OWNER_OPEN_ID` variables are legacy and unused — leave them unset unless you build out a real third-party OAuth flow yourself.

### 3a. Database (MySQL-compatible)

Any MySQL-compatible host works with `drizzle.config.ts` as-is (no code changes needed):
- **Aiven** — free-forever tier, good for getting started.
- **Railway** — paid (~$5/mo), hosts DB + server together, no cold starts.

Get the connection string from your provider's dashboard and set it as `DATABASE_URL`.

### 3b. Object storage (S3-compatible)

`server/storage.ts` uses the standard S3 API, so any of these work:
- **Cloudflare R2** — free tier (10 GB storage, no egress fees), a solid default.
- AWS S3, Backblaze B2, MinIO, etc. all work the same way.

Create a bucket and an access key/secret pair with read/write access, then set `S3_ENDPOINT`, `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`. Leave `S3_PUBLIC_BASE_URL` blank unless you deliberately make the bucket public — the app generates short-lived signed URLs by default, which is the right choice for private student recordings.

### 3c. Run migrations and start the server

```bash
DATABASE_URL="..." pnpm db:push   # one-time, points schema at your real DB
pnpm build
pnpm start
```

Use a managed Node.js host that supports a persistent database connection and environment variables (e.g. Render, Railway). Do not put server secrets in the Expo mobile bundle — only `EXPO_PUBLIC_*` variables belong there.

## 4. Set the production API URL in the mobile app

Before creating a store build, set `EXPO_PUBLIC_API_BASE_URL` to your deployed backend's HTTPS URL (e.g. `https://madrasti-ai.onrender.com`) in the `.env` file used at build time — `lib/trpc.ts` and `lib/_core/api.ts` both read this automatically via `constants/oauth.ts`, no code changes needed. The production API must use HTTPS and a real public domain.

Test this order before building:

1. Register a new student account.
2. Log out and log in again.
3. Create a professor account or use the approved administrator account.
4. Create a class and copy its join code.
5. Join the class as a student.
6. Publish a course or exam as professor.
7. Submit, grade, and read feedback as student.
8. Test audio upload and language pronunciation history.

## 5. Create an Expo/EAS account and Android credentials

Run this from the project folder:

```bash
eas login
eas project:init
```

If EAS asks to create or link a project, accept the prompt. Confirm the Android package identifier shown by Expo. It must remain stable after the first Google Play release; changing it creates a different app.

Configure Android signing credentials:

```bash
eas credentials
```

Let EAS manage the Android keystore unless you already have a controlled company signing process. Store any downloaded keystore securely and never commit it.

## 6. Build a test APK

The included `preview` EAS profile creates an installable APK:

```bash
pnpm build:apk
```

When EAS finishes, download the APK URL, install it on several Android phones, and test registration, login, classroom flows, offline books, audio, and language practice. An APK is for testing/internal distribution; Google Play production normally uses an Android App Bundle (AAB).

## 7. Create the Google Play production bundle

Build the store bundle with:

```bash
pnpm build:android
```

Download the resulting `.aab` only if you need a local copy. EAS can also submit the build after Google Play setup is complete.

## 8. Create the Google Play Console app

1. Open Google Play Console and create a developer account.
2. Pay the one-time developer registration fee directly in Google’s console.
3. Create an app named **Madrasti AI**.
4. Choose **App**, **Free**, and the appropriate education category.
5. Complete the store listing: icon, feature graphic, screenshots, short description, full description, support email, and privacy-policy URL.
6. Complete the Data safety form accurately. This app uses accounts, classroom/progress data, and audio uploads; describe collection, processing, retention, and deletion truthfully.
7. Complete the content rating questionnaire and target-audience declaration. Because the app is for children/students, read Google’s Families Policy carefully and declare the audience accurately.
8. Upload the `.aab` to an **Internal testing** release first.
9. Add tester email addresses, install from the Play testing link, and verify the full flow.
10. Fix any Play pre-launch report issues.
11. Promote the tested build to closed testing or production according to the requirements shown in your Play Console.

## 9. Release updates safely

For each update:

```bash
git pull
git tag v1.0.1
git push origin v1.0.1
pnpm check
pnpm test
pnpm build:android
```

Increase the Expo `version` in `app.config.ts` for the user-visible version and let EAS/Expo manage the Android version code. Never change the Android package identifier after release.

## 10. What this ZIP does not include

It does not include `node_modules`, generated `dist`, Expo cache files, Manus project metadata, database credentials, API keys, private signing files, or the current local server environment. After cloning, install dependencies and configure the backend secrets yourself.

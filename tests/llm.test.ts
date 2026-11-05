import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("invokeLLM (OpenAI-compatible client)", () => {
  const originalFetch = global.fetch;
  const originalKey = process.env.OPENAI_API_KEY;
  const originalBase = process.env.OPENAI_BASE_URL;

  beforeEach(() => {
    process.env.OPENAI_API_KEY = "test-key";
    delete process.env.OPENAI_BASE_URL;
    vi.resetModules();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    process.env.OPENAI_API_KEY = originalKey;
    process.env.OPENAI_BASE_URL = originalBase;
  });

  it("posts to api.openai.com by default and parses the assistant reply", async () => {
    const { invokeLLM } = await import("../server/_core/llm");

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        id: "chatcmpl-1",
        created: 0,
        model: "gpt-4o-mini",
        choices: [{ index: 0, message: { role: "assistant", content: "Bonjour, comment puis-je t'aider ?" }, finish_reason: "stop" }],
      }),
    });
    global.fetch = fetchMock as unknown as typeof fetch;

    const result = await invokeLLM({
      messages: [
        { role: "system", content: "Tu es un professeur." },
        { role: "user", content: "Salut" },
      ],
      model: "gpt-4o-mini",
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.openai.com/v1/chat/completions");
    expect(init.headers.authorization).toBe("Bearer test-key");
    expect(JSON.parse(init.body).model).toBe("gpt-4o-mini");
    expect(result.choices[0].message.content).toBe("Bonjour, comment puis-je t'aider ?");
  });

  it("throws a clear error when no API key is configured", async () => {
    delete process.env.OPENAI_API_KEY;
    vi.resetModules();
    const { invokeLLM } = await import("../server/_core/llm");

    await expect(invokeLLM({ messages: [{ role: "user", content: "Salut" }] })).rejects.toThrow(
      /OPENAI_API_KEY is not configured/,
    );
  });
});

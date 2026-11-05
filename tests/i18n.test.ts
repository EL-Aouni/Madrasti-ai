import { describe, expect, it } from "vitest";
import fr from "../lib/locales/fr";
import en from "../lib/locales/en";
import ar from "../lib/locales/ar";

function flattenKeys(obj: Record<string, unknown>, prefix = ""): string[] {
  return Object.entries(obj).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return typeof value === "object" && value !== null ? flattenKeys(value as Record<string, unknown>, path) : [path];
  });
}

describe("app translations (fr / en / ar)", () => {
  it("have exactly the same set of keys in every language", () => {
    const frKeys = flattenKeys(fr).sort();
    const enKeys = flattenKeys(en).sort();
    const arKeys = flattenKeys(ar).sort();

    expect(enKeys).toEqual(frKeys);
    expect(arKeys).toEqual(frKeys);
  });

  it("has no empty translation values", () => {
    for (const [name, locale] of [["fr", fr], ["en", en], ["ar", ar]] as const) {
      for (const key of flattenKeys(locale)) {
        const value = key.split(".").reduce((acc: any, part) => acc?.[part], locale);
        expect(value, `${name}.${key} should not be empty`).toBeTruthy();
      }
    }
  });
});

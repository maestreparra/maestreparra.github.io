import { describe, expect, it } from "vitest";
import { homeContent, type LocalizedValue } from "@/content/home";

function isLocalizedValue(value: unknown): value is LocalizedValue {
  return (
    typeof value === "object" &&
    value !== null &&
    "es" in value &&
    "en" in value &&
    typeof (value as LocalizedValue).es === "string" &&
    typeof (value as LocalizedValue).en === "string"
  );
}

/**
 * Recursively walks the content tree and asserts every LocalizedValue pair
 * has non-empty Spanish and English strings, per the content model's ES/EN
 * key-parity rule.
 */
function collectLocalizedValues(node: unknown, path: string, out: Array<{ path: string; value: LocalizedValue }>): void {
  if (isLocalizedValue(node)) {
    out.push({ path, value: node });
    return;
  }
  if (Array.isArray(node)) {
    node.forEach((item, index) => collectLocalizedValues(item, `${path}[${index}]`, out));
    return;
  }
  if (typeof node === "object" && node !== null) {
    for (const [key, value] of Object.entries(node)) {
      collectLocalizedValues(value, path ? `${path}.${key}` : key, out);
    }
  }
}

describe("bilingual content parity", () => {
  const pairs: Array<{ path: string; value: LocalizedValue }> = [];
  collectLocalizedValues(homeContent, "", pairs);

  it("finds at least one localized value pair", () => {
    expect(pairs.length).toBeGreaterThan(0);
  });

  it("has a non-empty Spanish and English string for every localized value", () => {
    for (const { path, value } of pairs) {
      expect(value.es.trim().length, `${path}.es should not be empty`).toBeGreaterThan(0);
      expect(value.en.trim().length, `${path}.en should not be empty`).toBeGreaterThan(0);
    }
  });

  it("never renders a client-facing TODO placeholder", () => {
    for (const { path, value } of pairs) {
      expect(value.es, path).not.toMatch(/TODO\(/);
      expect(value.en, path).not.toMatch(/TODO\(/);
    }
  });
});

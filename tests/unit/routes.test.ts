import { describe, expect, it } from "vitest";
import { locales } from "@/i18n/locales";
import {
  buildRouteSwitchHref,
  getHomeAnchorHref,
  getHomePath,
  getRoutePath,
  homeAnchors,
  primaryNavigationRouteKeys,
  publicRouteKeys,
  publicRoutes,
  type PublicRouteKey,
} from "@/i18n/routes";

describe("route and locale parity — single publicRoutes registry (P7-QA-04)", () => {
  it("defines every public route key for every supported locale", () => {
    for (const routeKey of publicRouteKeys) {
      for (const locale of locales) {
        expect(publicRoutes[routeKey].paths[locale]).toMatch(/^\//);
      }
    }
  });

  it("resolves the home path per locale via the single registry", () => {
    expect(getHomePath("es")).toBe("/es/");
    expect(getHomePath("en")).toBe("/en/");
    expect(getHomePath("es")).toBe(getRoutePath("home", "es"));
    expect(getHomePath("en")).toBe(getRoutePath("home", "en"));
  });

  it("builds home anchor hrefs scoped to the correct locale home path", () => {
    expect(getHomeAnchorHref("es", "selectedWork")).toBe(`/es/#${homeAnchors.selectedWork}`);
    expect(getHomeAnchorHref("en", "selectedWork")).toBe(`/en/#${homeAnchors.selectedWork}`);
  });
});

describe("route-aware locale switch target (buildRouteSwitchHref)", () => {
  it("preserves an empty query string and fragment", () => {
    expect(buildRouteSwitchHref("home", "en", "", "")).toBe("/en/");
  });

  it("preserves a query string when switching locale", () => {
    expect(buildRouteSwitchHref("home", "en", "?ref=cv", "")).toBe("/en/?ref=cv");
  });

  it("preserves a fragment when switching locale", () => {
    expect(buildRouteSwitchHref("home", "es", "", "#selected-work")).toBe("/es/#selected-work");
  });

  it("preserves both query string and fragment together", () => {
    expect(buildRouteSwitchHref("home", "en", "?ref=cv", "#selected-work")).toBe("/en/?ref=cv#selected-work");
  });

  it("switches non-Home routes too (About/Work/Contact)", () => {
    expect(buildRouteSwitchHref("about", "en", "", "")).toBe("/en/about/");
    expect(buildRouteSwitchHref("work", "es", "", "")).toBe("/es/proyectos/");
    expect(buildRouteSwitchHref("contact", "en", "?ref=cv", "#links")).toBe("/en/contact/?ref=cv#links");
  });

  it("switches both Case Study routes, preserving query and fragment (P9-QA)", () => {
    expect(buildRouteSwitchHref("vitalink", "en", "", "")).toBe("/en/work/vitalink-digital-ecosystem/");
    expect(buildRouteSwitchHref("vitalink", "es", "?ref=cv", "#evidence")).toBe(
      "/es/proyectos/vitalink-digital-ecosystem/?ref=cv#evidence",
    );
    expect(buildRouteSwitchHref("bm-envios", "en", "", "")).toBe("/en/work/bm-envios-digital-experience/");
    expect(buildRouteSwitchHref("bm-envios", "es", "?ref=cv", "#evidence")).toBe(
      "/es/proyectos/bm-envios-digital-experience/?ref=cv#evidence",
    );
  });
});

describe("P9 Architecture Amendment 1 — primary-navigation subset stays typed and separate from detail routes", () => {
  it("publicRoutes/PublicRouteKey contain exactly the six approved P9 route keys", () => {
    const expectedKeys: PublicRouteKey[] = ["home", "about", "work", "contact", "vitalink", "bm-envios"];
    expect([...publicRouteKeys].sort()).toEqual([...expectedKeys].sort());
    for (const key of expectedKeys) {
      expect(publicRoutes[key]).toBeDefined();
    }
  });

  it("primaryNavigationRouteKeys contains exactly home, work, and about, in that order", () => {
    expect(primaryNavigationRouteKeys).toEqual(["home", "work", "about"]);
  });

  it("the Case Study routes are not part of the primary-navigation subset", () => {
    expect(primaryNavigationRouteKeys).not.toContain("vitalink");
    expect(primaryNavigationRouteKeys).not.toContain("bm-envios");
    expect(primaryNavigationRouteKeys).not.toContain("contact");
  });
});

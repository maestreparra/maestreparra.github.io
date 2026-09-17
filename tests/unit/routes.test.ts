import { describe, expect, it } from "vitest";
import { locales } from "@/i18n/locales";
import {
  buildRouteSwitchHref,
  getHomeAnchorHref,
  getHomePath,
  getRoutePath,
  homeAnchors,
  publicRouteKeys,
  publicRoutes,
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
});

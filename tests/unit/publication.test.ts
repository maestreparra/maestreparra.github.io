import { describe, expect, it } from "vitest";
import { homeContent } from "@/content/home";
import { assertPublishableProjects } from "@/lib/publication";

describe("publication status labels", () => {
  it("labels VitaLink as a published case study in both locales", () => {
    const vitalink = homeContent.selectedWork.projects.find((project) => project.id === "vitalink");
    expect(vitalink?.publicationStatus).toBe("published");
    expect(vitalink?.status.es).toBe("CASO PUBLICADO");
    expect(vitalink?.status.en).toBe("PUBLISHED CASE STUDY");
  });

  it("labels BM Envios as final refinement in both locales, per D-019", () => {
    const bmEnvios = homeContent.selectedWork.projects.find((project) => project.id === "bm-envios");
    expect(bmEnvios?.publicationStatus).toBe("final-refinement");
    expect(bmEnvios?.status.es).toBe("REFINAMIENTO FINAL");
    expect(bmEnvios?.status.en).toBe("FINAL REFINEMENT");
  });

  it("does not throw for the approved V1 project set", () => {
    expect(() => assertPublishableProjects()).not.toThrow();
  });
});

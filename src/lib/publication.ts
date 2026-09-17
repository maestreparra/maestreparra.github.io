import { homeContent, type PublicationStatus } from "@/content/home";
import { workContent } from "@/content/core-pages";

const allowedStatuses: readonly PublicationStatus[] = ["published", "final-refinement"];

/**
 * Guards against a draft/hold project accidentally entering the public
 * build. Every project on Home and on the Work index must be either
 * published or explicitly labelled as a final refinement, per D-019.
 */
export function assertPublishableProjects(): void {
  for (const project of homeContent.selectedWork.projects) {
    if (!allowedStatuses.includes(project.publicationStatus)) {
      throw new Error(`Unpublishable Home project status for "${project.id}": ${project.publicationStatus}`);
    }
  }
  for (const project of workContent.projects) {
    if (!allowedStatuses.includes(project.publicationStatus)) {
      throw new Error(`Unpublishable Work project status for "${project.id}": ${project.publicationStatus}`);
    }
  }
}

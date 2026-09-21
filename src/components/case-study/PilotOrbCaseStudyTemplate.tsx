import type { Locale } from "@/i18n/locales";
import { pilotorbCaseContent } from "@/content/pilotorb";
import { SingleFlowCaseStudyTemplate } from "./SingleFlowCaseStudyTemplate";

export interface PilotOrbCaseStudyTemplateProps {
  locale: Locale;
}

export function PilotOrbCaseStudyTemplate({ locale }: PilotOrbCaseStudyTemplateProps) {
  return <SingleFlowCaseStudyTemplate locale={locale} content={pilotorbCaseContent} routeKey="pilotorb" />;
}

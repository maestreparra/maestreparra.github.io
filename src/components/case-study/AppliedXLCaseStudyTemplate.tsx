import type { Locale } from "@/i18n/locales";
import { appliedxlCaseContent } from "@/content/appliedxl";
import { SingleFlowCaseStudyTemplate } from "./SingleFlowCaseStudyTemplate";

export interface AppliedXLCaseStudyTemplateProps {
  locale: Locale;
}

export function AppliedXLCaseStudyTemplate({ locale }: AppliedXLCaseStudyTemplateProps) {
  return <SingleFlowCaseStudyTemplate locale={locale} content={appliedxlCaseContent} routeKey="appliedxl" />;
}

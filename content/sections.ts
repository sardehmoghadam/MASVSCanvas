import type { Section } from "@/types/content";

/**
 * MASVS 2.0.0 has no section layer between control groups (MASVS-XXXXX) and
 * individual controls (MASVS-XXXXX-N). The sections route therefore generates
 * no pages and this list stays empty.
 */
export const sections: Section[] = [];

/** Lookup a section by its slug. */
export function getSectionBySlug(slug: string): Section | undefined {
  return sections.find((section) => section.slug === slug);
}

/** Return all sections belonging to a chapter. */
export function getSectionsByChapter(chapterId: string): Section[] {
  return sections.filter((section) => section.chapterId === chapterId);
}

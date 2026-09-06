/**
 * Single source of truth for the standard that powers this site.
 *
 * Everything standard-specific — identity, branding, version, ID shapes,
 * hierarchy, and levels — lives here. Components, pages, content loaders, and
 * the Zod schema all read from this object, so standing up a site for a
 * different OWASP standard only requires swapping this file (and the content
 * under `content/`), with no changes to the React code.
 *
 * The default configuration points at OWASP MASVS 2.0.0.
 */

export type LevelOption = {
  /** Machine id used in frontmatter `levels`, e.g. "1" or "L1". */
  id: string;
  /** Human-readable label, e.g. "Level 1" or "L1 — Standard Security". */
  label: string;
};

export type StandardConfig = {
  /** Machine id, e.g. "masvs". */
  id: string;
  /** Short acronym rendered in UI, e.g. "MASVS". */
  name: string;
  /** Brand used as the site/academy name, e.g. "MASVS Academy". */
  academyName: string;
  /** Full standard name, e.g. "Mobile Application Security Verification Standard". */
  fullName: string;
  /** Version tag rendered in UI, e.g. "2.0.0". */
  version: string;
  /** Absolute production base URL (GitHub Pages project site). */
  siteUrl: string;
  /** Repository name used as the GitHub Pages base path in CI. */
  repoName: string;
  /** One-line site description used for SEO and hero copy. */
  description: string;
  /** SEO keywords for the root layout metadata. */
  keywords: string[];
  /** Canonical OWASP project URL for the standard. */
  standardUrl: string;
  /** Slug of the first category; drives "Start learning" CTAs. */
  startCategorySlug: string;
  /** Whether the standard has a section layer between groups and controls. */
  hasSections: boolean;
  /** Singular UI label for the top-level grouping, e.g. "chapter". */
  groupLabel: string;
  /** Plural UI label for the top-level grouping, e.g. "chapters". */
  groupLabelPlural: string;
  /** Singular UI label for the mid-level grouping, e.g. "section". */
  sectionLabel: string;
  /** Plural UI label for the mid-level grouping, e.g. "sections". */
  sectionLabelPlural: string;
  /** Regexes describing the id shapes used by the standard. */
  groupIdPattern: RegExp;
  sectionIdPattern: RegExp;
  controlIdPattern: RegExp;
  canonicalIdPattern: RegExp;
  /** Example ids used to make schema error messages readable. */
  examples: {
    groupId: string;
    sectionId: string;
    controlId: string;
    canonicalId: string;
  };
  /** Levels a control may be tagged with in frontmatter `levels`. */
  levels: LevelOption[];
  /** Derive the group id (e.g. "MASVS-STORAGE") from a control id. */
  deriveGroupId(controlId: string): string;
  /** Derive the section id, or null when hasSections is false. */
  deriveSectionId(controlId: string): string | null;
  /** Build the canonical id (e.g. "MASVS-STORAGE-1") from a control id. */
  buildCanonicalId(controlId: string): string;
  /** Natural ordering for control ids. */
  compareControlIds(a: string, b: string): number;
};

export const standard: StandardConfig = {
  id: "masvs",
  name: "MASVS",
  academyName: "MASVS Academy",
  fullName: "Mobile Application Security Verification Standard",
  version: "2.0.0",
  siteUrl: "https://sardehmoghadam.github.io/MASVSCanvas",
  repoName: "MASVSCanvas",
  description:
    "Free, open-source OWASP MASVS 2.0.0 training with plain-English explanations, secure and insecure code examples, and review checklists for every mobile security control.",
  keywords: [
    "OWASP MASVS",
    "mobile app security",
    "secure mobile development",
    "MASVS 2.0.0",
    "mobile security controls",
    "AppSec training",
  ],
  standardUrl: "https://mas.owasp.org/MASVS/",
  startCategorySlug: "masvs-storage",
  hasSections: false,
  groupLabel: "control group",
  groupLabelPlural: "control groups",
  sectionLabel: "section",
  sectionLabelPlural: "sections",
  groupIdPattern: /^MASVS-[A-Z]+$/,
  sectionIdPattern: /^MASVS-[A-Z]+$/,
  controlIdPattern: /^MASVS-[A-Z]+-\d+$/,
  canonicalIdPattern: /^MASVS-[A-Z]+-\d+$/,
  examples: {
    groupId: "MASVS-STORAGE",
    sectionId: "MASVS-STORAGE",
    controlId: "MASVS-STORAGE-1",
    canonicalId: "MASVS-STORAGE-1",
  },
  levels: [
    { id: "L1", label: "Level 1" },
    { id: "L2", label: "Level 2" },
    { id: "R", label: "Resilience" },
  ],
  deriveGroupId(controlId: string): string {
    return controlId.replace(/-\d+$/, "");
  },
  deriveSectionId(): string | null {
    return null;
  },
  buildCanonicalId(controlId: string): string {
    return controlId;
  },
  compareControlIds(a: string, b: string): number {
    const order = [
      "MASVS-STORAGE",
      "MASVS-CRYPTO",
      "MASVS-AUTH",
      "MASVS-NETWORK",
      "MASVS-PLATFORM",
      "MASVS-CODE",
      "MASVS-RESILIENCE",
      "MASVS-PRIVACY",
    ];
    const ga = a.replace(/-\d+$/, "");
    const gb = b.replace(/-\d+$/, "");
    const oa = order.indexOf(ga);
    const ob = order.indexOf(gb);
    if (oa !== ob) {
      return (oa < 0 ? Number.MAX_SAFE_INTEGER : oa) - (ob < 0 ? Number.MAX_SAFE_INTEGER : ob);
    }
    const na = Number(a.match(/-(\d+)$/)?.[1] ?? 0);
    const nb = Number(b.match(/-(\d+)$/)?.[1] ?? 0);
    return na - nb;
  },
};

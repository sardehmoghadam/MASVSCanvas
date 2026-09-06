import type { Category } from "@/types/content";

/** MASVS 2.0.0 control groups - official group/title hierarchy. */
export const categories: Category[] = [
  {
    id: "MASVS-STORAGE",
    slug: "masvs-storage",
    title: "Storage",
    description: "Securely store sensitive data on-device and prevent unintentional leaks via APIs, backups, and logs.",
    icon: "Database",
    color: "teal",
    standardVersion: "2.0.0",
  },
  {
    id: "MASVS-CRYPTO",
    slug: "masvs-crypto",
    title: "Cryptography",
    description: "Use current strong cryptography and manage keys correctly throughout their lifecycle.",
    icon: "KeyRound",
    color: "amber",
    standardVersion: "2.0.0",
  },
  {
    id: "MASVS-AUTH",
    slug: "masvs-auth",
    title: "Authentication and Authorization",
    description: "Use secure authentication and authorization protocols, local auth, and step-up auth for sensitive operations.",
    icon: "Fingerprint",
    color: "fuchsia",
    standardVersion: "2.0.0",
  },
  {
    id: "MASVS-NETWORK",
    slug: "masvs-network",
    title: "Network Communication",
    description: "Secure all data in transit with TLS and pin identity for endpoints under your control.",
    icon: "Wifi",
    color: "blue",
    standardVersion: "2.0.0",
  },
  {
    id: "MASVS-PLATFORM",
    slug: "masvs-platform",
    title: "Platform Interaction",
    description: "Securely use IPC mechanisms, WebViews, and the UI to avoid leaking sensitive data across the platform.",
    icon: "PanelsTopLeft",
    color: "violet",
    standardVersion: "2.0.0",
  },
  {
    id: "MASVS-CODE",
    slug: "masvs-code",
    title: "Code Quality",
    description: "Treat untrusted input safely, run on up-to-date platforms, and enforce app updates.",
    icon: "Code2",
    color: "sky",
    standardVersion: "2.0.0",
  },
  {
    id: "MASVS-RESILIENCE",
    slug: "masvs-resilience",
    title: "Resilience Against Reverse Engineering and Tampering",
    description: "Increase resilience against reverse engineering and tampering with defense-in-depth protection.",
    icon: "ShieldCheck",
    color: "rose",
    standardVersion: "2.0.0",
  },
  {
    id: "MASVS-PRIVACY",
    slug: "masvs-privacy",
    title: "Privacy",
    description: "Minimize data access, prevent user identification, and stay transparent with user control over their data.",
    icon: "LockKeyhole",
    color: "emerald",
    standardVersion: "2.0.0",
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getCategoryById(id: string) {
  return categories.find((category) => category.id === id);
}

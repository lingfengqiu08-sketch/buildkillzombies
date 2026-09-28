export interface NavItem {
  key: string;
  path: `/${string}`;
  isContentType: boolean;
}

// Category slugs mirror content/<locale>/<category>/ and the categories in the keyword research file.
export const NAVIGATION_CONFIG = [
  { key: "codes", path: "/codes", isContentType: true },
  { key: "guide", path: "/guide", isContentType: true },
  { key: "builds", path: "/builds", isContentType: true },
  { key: "equipment", path: "/equipment", isContentType: true },
  { key: "progression", path: "/progression", isContentType: true },
  { key: "events", path: "/events", isContentType: true },
  { key: "community", path: "/community", isContentType: true },
] satisfies readonly NavItem[];

export const CONTENT_TYPES: string[] = NAVIGATION_CONFIG.filter((item) => item.isContentType).map((item) => item.path.replace(/^\//, ""));

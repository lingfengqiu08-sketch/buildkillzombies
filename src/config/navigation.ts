export interface NavItem {
  key: string;
  path: `/${string}`;
  isContentType: boolean;
}

// Content navigation is rebuilt in a later step; keep the explicit element type so CONTENT_TYPES stays string[] instead of never[].
export const NAVIGATION_CONFIG: NavItem[] = [];

export const CONTENT_TYPES: string[] = NAVIGATION_CONFIG.filter((item) => item.isContentType).map((item) => item.path.replace(/^\//, ""));

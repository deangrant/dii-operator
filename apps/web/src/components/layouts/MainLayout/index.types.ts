import type { ReactNode } from "react";

/**
 * Sidebar navigation entry for the main shell.
 */
export interface MainLayoutNavItem {
  /** Icon rendered beside the label. */
  icon: ReactNode;
  /** Label shown in the drawer. */
  label: string;
  /** Absolute path within the app router (basename applied by the router). */
  path: string;
}

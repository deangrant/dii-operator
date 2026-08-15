import type { ReactNode } from 'react';

/**
 * Sidebar navigation entry for the main shell.
 */
export interface MainLayoutNavItem {
  /** Absolute path within the app router (basename applied by the router). */
  path: string;
  /** Label shown in the drawer. */
  label: string;
  /** Icon rendered beside the label. */
  icon: ReactNode;
}

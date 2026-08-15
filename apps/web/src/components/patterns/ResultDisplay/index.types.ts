/**
 * Props for a titled result row with optional copy affordance.
 */
export interface ResultDisplayProps {
  /** Heading shown above the value. */
  title: string;
  /** Value rendered in monospace; empty values show a dash. */
  value: string;
}

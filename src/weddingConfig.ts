// Single source of truth for the couple's details used across the site and admin page.
export const WEDDING = {
  groomName: 'Navindu',
  brideName: 'Anjalee',
};

export type Prefix = 'Mr.' | 'Mrs.' | 'Miss' | 'Mr. & Mrs.' | 'Family' | 'Dear';

export const PREFIXES: Prefix[] = ['Mr.', 'Mrs.', 'Miss', 'Mr. & Mrs.', 'Family', 'Dear'];

/** Combines prefix + name for display. "Dear" adds nothing — it's handled by the greeting. */
export function getDisplayName(prefix: string, name: string): string {
  const n = name.trim();
  if (!n) return '';
  switch (prefix) {
    case 'Mr.': return `Mr. ${n}`;
    case 'Mrs.': return `Mrs. ${n}`;
    case 'Miss': return `Miss ${n}`;
    case 'Mr. & Mrs.': return `Mr. & Mrs. ${n}`;
    case 'Family': return `${n} and Family`;
    case 'Dear': return n;
    default: return prefix ? `${prefix} ${n}` : n;
  }
}

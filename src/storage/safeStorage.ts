export function readStringList(key: string): string[] {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(key) ?? '[]');
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === 'string') : [];
  } catch {
    // Storage can be blocked (private mode) or hold corrupt JSON; start with an empty list.
    return [];
  }
}

export function writeStringList(key: string, list: string[]): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(list));
  } catch {
    // Quota or blocked storage: the list stays in memory for this session only.
  }
}

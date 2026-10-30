export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Clipboard access can be denied (insecure context or permissions); the caller shows a message.
    return false;
  }
}

/** Puts the encoded pitch in the address bar and returns the full shareable URL. */
export function updateShareUrl(code: string): string {
  const url = new URL(window.location.href);
  url.search = `?p=${code}`;
  window.history.replaceState(null, '', url);
  return url.toString();
}

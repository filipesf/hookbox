import { useCallback, useEffect, useState } from 'react';
import { readStringList, writeStringList } from '../storage/safeStorage';
import { dedupe, pushUnique, toggleUnique } from '../storage/uniqueList';

/** A persisted list of encoded pitches, newest first. */
export function useStoredCodes(storageKey: string, limit: number) {
  const [codes, setCodes] = useState<string[]>(() => dedupe(readStringList(storageKey), limit));

  useEffect(() => writeStringList(storageKey, codes), [storageKey, codes]);

  const push = useCallback((code: string) => setCodes((list) => pushUnique(list, code, limit)), [limit]);

  const toggle = useCallback((code: string) => setCodes((list) => toggleUnique(list, code, limit)), [limit]);

  const remove = useCallback((code: string) => setCodes((list) => list.filter((c) => c !== code)), []);

  return { codes, push, toggle, remove };
}

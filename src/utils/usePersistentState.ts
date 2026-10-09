import { useEffect, useState } from 'react';

const PREFIX = 'liks-lms:';

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // storage unavailable (private mode, quota exceeded, disabled) — edits stay in memory for this session
  }
}

export function usePersistentState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => readStorage(key, initial));

  useEffect(() => {
    writeStorage(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}

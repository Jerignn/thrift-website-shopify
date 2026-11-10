"use client";
import { useSyncExternalStore } from "react";

/** Tiny external store, optionally persisted to localStorage. */
export function createStore<T>(initial: T, key?: string) {
  let value: T | null = null;
  const listeners = new Set<() => void>();
  const read = (): T => {
    if (value !== null) return value;
    value = initial;
    if (key) {
      try {
        const raw = localStorage.getItem(key);
        if (raw) value = JSON.parse(raw);
      } catch {}
    }
    return value as T;
  };
  const set = (next: T) => {
    value = next;
    if (key) {
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {}
    }
    listeners.forEach((l) => l());
  };
  const use = () =>
    useSyncExternalStore(
      (cb) => {
        listeners.add(cb);
        return () => listeners.delete(cb);
      },
      read,
      () => initial,
    );
  return { use, get: read, set };
}

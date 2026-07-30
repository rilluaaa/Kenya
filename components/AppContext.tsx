"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Locale, UserMode } from "@/types/content";
import { isLocale, isUserMode, STORAGE_KEYS } from "@/lib/storage";
import { translate, type TranslationKey } from "@/lib/i18n";

type AppContextValue = {
  mode: UserMode | null;
  locale: Locale;
  hydrated: boolean;
  storageError: boolean;
  setMode: (mode: UserMode) => void;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<UserMode | null>(null);
  const [locale, setLocaleState] = useState<Locale>("en");
  const [hydrated, setHydrated] = useState(false);
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    try {
      const savedMode = window.localStorage.getItem(STORAGE_KEYS.mode);
      const savedLocale = window.localStorage.getItem(STORAGE_KEYS.locale);
      if (isUserMode(savedMode)) setModeState(savedMode);
      if (isLocale(savedLocale)) setLocaleState(savedLocale);
    } catch {
      setStorageError(true);
    } finally {
      setHydrated(true);
    }
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
      navigator.serviceWorker.register(`${basePath}/sw.js`).catch(() => undefined);
    }
  }, []);

  const setMode = useCallback((nextMode: UserMode) => {
    setModeState(nextMode);
    try { window.localStorage.setItem(STORAGE_KEYS.mode, nextMode); } catch { setStorageError(true); }
  }, []);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    try { window.localStorage.setItem(STORAGE_KEYS.locale, nextLocale); } catch { setStorageError(true); }
  }, []);

  const value = useMemo<AppContextValue>(() => ({
    mode,
    locale,
    hydrated,
    storageError,
    setMode,
    setLocale,
    t: (key) => translate(locale, key),
  }), [mode, locale, hydrated, storageError, setMode, setLocale]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside AppProvider");
  return context;
}

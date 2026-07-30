import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "motion/react";

type Theme = "light" | "dark";

type AccessibilityValue = {
  theme: Theme;
  largeText: boolean;
  reduceMotion: boolean;
  toggleTheme: () => void;
  toggleLargeText: () => void;
  toggleMotion: () => void;
};

const AccessibilityContext = createContext<AccessibilityValue | null>(null);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const systemReduceMotion = useReducedMotion();
  const [theme, setTheme] = useState<Theme>(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  );
  const [largeText, setLargeText] = useState(false);
  const [manualReduceMotion, setManualReduceMotion] = useState(false);
  const reduceMotion = Boolean(systemReduceMotion || manualReduceMotion);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.textSize = largeText ? "large" : "default";
    document.documentElement.dataset.motion = reduceMotion ? "reduced" : "full";
  }, [largeText, reduceMotion, theme]);

  const value = useMemo(
    () => ({
      theme,
      largeText,
      reduceMotion,
      toggleTheme: () =>
        setTheme((value) => (value === "light" ? "dark" : "light")),
      toggleLargeText: () => setLargeText((value) => !value),
      toggleMotion: () => setManualReduceMotion((value) => !value),
    }),
    [largeText, reduceMotion, theme],
  );

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const value = useContext(AccessibilityContext);
  if (!value) {
    throw new Error(
      "useAccessibility must be used within AccessibilityProvider",
    );
  }
  return value;
}

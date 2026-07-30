import type { Locale } from "@/types/content";

export const dictionaries = {
  en: {
    "brand.name": "Care Begins at Home",
    "nav.home": "Home",
    "nav.stories": "Stories",
    "nav.tools": "Tools",
    "nav.plan": "Current plan",
    "nav.visit": "Guided visit",
    "nav.safety": "Safety",
    "action.start": "Start learning",
    "action.tools": "Explore quick tools",
    "action.continue": "Continue story",
    "action.back": "Back",
    "action.next": "Next",
    "action.save": "Save plan",
    "language.english": "English",
    "language.kiswahili": "Kiswahili",
    "mode.family": "Women and Families",
    "mode.chp": "Community Health Promoters",
    "safety.short": "Education only. Urgent concerns need help from the appropriate local health service.",
    "offline.message": "You are offline. Saved tools and stories remain available on this device.",
  },
  sw: {
    "brand.name": "Care Begins at Home",
    "nav.home": "Home",
    "nav.stories": "Stories",
    "nav.tools": "Tools",
    "nav.plan": "Current plan",
    "nav.visit": "Guided visit",
    "nav.safety": "Safety",
    "action.start": "Start learning",
    "action.tools": "Explore quick tools",
    "action.continue": "Continue story",
    "action.back": "Back",
    "action.next": "Next",
    "action.save": "Save plan",
    "language.english": "English",
    "language.kiswahili": "Kiswahili",
    "mode.family": "Women and Families",
    "mode.chp": "Community Health Promoters",
    "safety.short": "Education only. Urgent concerns need help from the appropriate local health service.",
    "offline.message": "You are offline. Saved tools and stories remain available on this device.",
  },
} as const;

export type TranslationKey = keyof typeof dictionaries.en;

export function translate(locale: Locale, key: TranslationKey): string {
  return dictionaries[locale][key] ?? dictionaries.en[key];
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpenText, FirstAidKit, House, ListChecks, Path, ShieldCheck, UsersThree } from "@phosphor-icons/react";
import { useApp } from "@/components/AppContext";
import { useEffect, useState } from "react";

const links = [
  { href: "/", key: "nav.home" as const, icon: House },
  { href: "/scenarios", key: "nav.stories" as const, icon: BookOpenText },
  { href: "/quick-tools", key: "nav.tools" as const, icon: FirstAidKit },
];

export function AppHeader() {
  const pathname = usePathname();
  const { locale, mode, setLocale, t } = useApp();
  return (
    <header className="app-header">
      <div className="page-wrap header-inner">
        <Link href="/" className="brand" aria-label="Care Begins at Home, home">
          <span className="brand-mark"><Path size={21} weight="bold" /></span>
          <span>{t("brand.name")}</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(({ href, key }) => <Link key={href} className="nav-link" data-active={pathname === href || (href !== "/" && pathname.startsWith(href))} href={href}>{t(key)}</Link>)}
          <Link className="nav-link" data-active={pathname === "/about-safety"} href="/about-safety">{t("nav.safety")}</Link>
        </nav>
        <div className="header-actions">
          {mode && <Link href="/choose-mode" className="mode-chip"><UsersThree size={18} />{t(mode === "family" ? "mode.family" : "mode.chp")}</Link>}
          <label className="sr-only" htmlFor="language-select">Language</label>
          <select id="language-select" className="select-compact" value={locale} onChange={(event) => setLocale(event.target.value as "en" | "sw")}>
            <option value="en">EN</option><option value="sw">SW</option>
          </select>
        </div>
      </div>
      {locale === "sw" && <div className="translation-bar" role="status">Kiswahili content is awaiting professional review. English fallback is shown.</div>}
    </header>
  );
}

export function MobileNavigation() {
  const pathname = usePathname();
  const { mode, t } = useApp();
  const last = mode === "chp" ? { href: "/guided-visit", key: "nav.visit" as const, icon: ListChecks } : { href: "/quick-tools/birth-plan", key: "nav.plan" as const, icon: ShieldCheck };
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {[...links, last].map(({ href, key, icon: Icon }) => (
        <Link key={href} href={href} data-active={pathname === href || (href !== "/" && pathname.startsWith(href))}>
          <Icon size={21} weight={pathname.startsWith(href) ? "fill" : "regular"} /><span>{t(key)}</span>
        </Link>
      ))}
    </nav>
  );
}

export function OfflineIndicator() {
  const [offline, setOffline] = useState(false);
  const { t } = useApp();
  useEffect(() => {
    const update = () => setOffline(!navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => { window.removeEventListener("online", update); window.removeEventListener("offline", update); };
  }, []);
  return offline ? <div className="offline-bar" role="status">{t("offline.message")}</div> : null;
}

export function StorageWarning() {
  const { storageError } = useApp();
  return storageError ? <div className="page-wrap"><div className="review-note" role="alert">This browser could not save progress. You can continue, but changes may be lost when the page closes.</div></div> : null;
}

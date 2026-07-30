import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProvider } from "@/components/AppContext";
import { AppHeader, MobileNavigation, OfflineIndicator, StorageWarning } from "@/components/AppChrome";

export const metadata: Metadata = {
  title: { default: "Care Begins at Home", template: "%s | Care Begins at Home" },
  description: "Interactive maternal and newborn health learning for families and Community Health Promoters.",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icons/icon.svg", apple: "/icons/icon.svg" },
};

export const viewport: Viewport = { themeColor: "#174f3a", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <a href="#main-content" className="skip-link">Skip to main content</a>
          <div className="site-shell">
            <AppHeader />
            <OfflineIndicator />
            <StorageWarning />
            <main id="main-content">{children}</main>
            <footer className="site-footer"><div className="page-wrap">Prototype education content. Review by qualified Kenyan maternal-health and localisation professionals is required before public use. Progress stays on this device.</div></footer>
            <MobileNavigation />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}

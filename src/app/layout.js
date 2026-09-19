import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/playfair-display/800.css";
import "./globals.css";
import BackToTop from "@/components/BackToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent";
import StructuredData from "@/components/StructuredData";
import TopLoader from "@/components/TopLoader";
import { Suspense } from "react";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export const metadata = {
  metadataBase: new URL("https://ariana-expeditions.com"),
  title: {
    default: "Ariana Expeditions | Afghanistan Tours & Travel Specialist",
    template: "%s | Ariana Expeditions",
  },
  description:
    "Ariana Expeditions is an Afghanistan travel specialist offering guided Afghanistan tours, cultural tours, and small group tours — from Bamiyan to the Silk Road cities of Herat and Balkh.",
  keywords: [
    "Afghanistan tours",
    "Afghanistan cultural tours",
    "Afghanistan group tours",
    "Bamiyan tours",
    "Ariana Expeditions",
    "Afghanistan photography tour",
    "Afghanistan archaeology tour",
    "Afghanistan travel specialist",
    "Central Asia cultural tours",
  ],
  openGraph: {
    title: "Ariana Expeditions | Afghanistan Tours & Travel Specialist",
    description:
      "Guided Afghanistan tours and cultural expeditions — Bamiyan, the Silk Road cities, and the Wakhan Corridor, led by a trusted Afghanistan travel specialist.",
    url: "https://ariana-expeditions.com",
    siteName: "Ariana Expeditions",
    images: ["/images/hero1.jpg"],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <Suspense fallback={null}>
          <TopLoader />
        </Suspense>
        <CookieConsent gaId={process.env.NEXT_PUBLIC_GA_ID} />
        <AnalyticsTracker />
        <StructuredData />
        {children}
        <BackToTop />
        <WhatsAppButton />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://callflowai.example.com"),
  title: {
    default: "CallFlow AI — Never Miss Another Customer Call",
    template: "%s | CallFlow AI",
  },
  description:
    "CallFlow AI is an AI receptionist that answers your business calls 24/7, books appointments, qualifies leads, and helps you capture revenue you're currently missing.",
  keywords: [
    "AI receptionist",
    "AI answering service",
    "virtual receptionist",
    "AI phone agent",
    "missed call recovery",
  ],
  openGraph: {
    title: "CallFlow AI — Never Miss Another Customer Call",
    description:
      "AI receptionists that answer calls 24/7, handle customer questions, qualify leads, and book appointments.",
    url: "https://callflowai.example.com",
    siteName: "CallFlow AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CallFlow AI — Never Miss Another Customer Call",
    description:
      "AI receptionists that answer calls 24/7, handle customer questions, qualify leads, and book appointments.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-void font-body text-ink antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-signal focus:px-4 focus:py-2 focus:text-void"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

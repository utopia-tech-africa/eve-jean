import type { Metadata } from "next";
import { Instrument_Sans, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const display = localFont({
  src: "./fonts/Astetes.woff2",
  variable: "--font-display",
  display: "swap",
  weight: "400",
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "Eve Jean",
  description:
    "A design studio crafting considered interiors for homes, hospitality, and workplaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${instrument.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body
        className={`${instrument.className} min-h-full overflow-x-hidden bg-cream text-ink`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

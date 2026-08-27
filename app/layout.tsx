import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Instrument_Sans,
  Montserrat,
} from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
      <body className="min-h-full overflow-x-auto bg-cream text-ink">
        {children}
      </body>
    </html>
  );
}

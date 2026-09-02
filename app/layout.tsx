import type { Metadata } from "next";
import { Fraunces, Public_Sans } from "next/font/google";
import "./globals.css";

/* Fraunces and Public Sans, which is where this page started before two
   restyles took it elsewhere. The pairing was right for the subject the whole
   time: a soft, slightly wonky old-style serif reads as something made by a
   person, and the product is sold on being cut from one board per pair by
   somebody in Bristol. A geometric uppercase system said museum instead. */
const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: "variable",
  axes: ["SOFT", "WONK"],
});

const body = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Ora — one speaker, made properly",
  description:
    "A single wireless speaker in solid walnut or blackened ash. Two drivers, one amplifier, a rear port cut by hand, and no second model to upsell you to.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

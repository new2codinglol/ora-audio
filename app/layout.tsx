import type { Metadata } from "next";
import { Fraunces, Public_Sans } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "600", "700"],
});

const body = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public",
  weight: ["300", "400", "500", "600"],
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

import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

/* ORYZO uses Halyard Display Variable and nothing else. The brief's own
   substitute list is Inter / Söhne / Neue Haas — all neo-grotesques, where
   Halyard is geometric with a tall x-height. Figtree is the closer free
   match on that axis, and one family is the point: there is no second face
   anywhere on this page except Arial at 8px for the legal line, which the
   brief specifies precisely because it should not look designed. */
const sans = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  weight: ["400", "500"],
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
    <html lang="en" className={sans.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

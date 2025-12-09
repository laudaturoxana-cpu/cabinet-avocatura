import type { Metadata } from "next";
import "./globals.css";
import { Inter, Playfair_Display, Lora } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"]
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["500", "600", "700"]
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "500", "600"]
});

export const metadata: Metadata = {
  title:
    "Cabinet Avocatură [Nume Cabinet] | Drept comercial, civil, contencios | [Oraș]",
  description:
    "Cabinet de avocatură [Nume Cabinet], specializat în drept comercial, civil și contencios. Asistență juridică profesionistă pentru antreprenori, companii și persoane fizice.",
  metadataBase: new URL("https://exemplu-domeniu.ro"),
  openGraph: {
    title: "Cabinet Avocatură [Nume Cabinet]",
    description:
      "Asistență juridică de încredere pentru afacerea și viața dumneavoastră. Drept comercial, civil, contencios.",
    url: "https://exemplu-domeniu.ro",
    siteName: "Cabinet Avocatură [Nume Cabinet]",
    type: "website"
  },
  alternates: {
    canonical: "https://exemplu-domeniu.ro"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ro"
      className={`${inter.variable} ${playfair.variable} ${lora.variable}`}
    >
      <body className="bg-background text-textMain antialiased">
        {children}
      </body>
    </html>
  );
}


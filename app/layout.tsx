import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Devarshi Vidhyalaya – Knowledge. Character. Vision.",
  description:
    "Devarshi Vidhyalaya is a premier academic institution dedicated to holistic education, nurturing every child's potential through excellence in curriculum, facilities, and values.",
  generator: "v0.app",
  keywords: [
    "Devarshi Vidhyalaya",
    "admission",
    "education",
    "school",
    "curriculum",
  ],
  openGraph: {
    title: "Devarshi Vidhyalaya",
    description: "Knowledge. Character. Vision.",
    type: "website",
  },
  icons: {
    icon: "/images/devarshi-logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#7B1F2A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}

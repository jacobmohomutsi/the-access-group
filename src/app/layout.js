import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "The Access Group",
  description: "The Access Group is a youth-led strategic consultancy focused on business activation, digital transformation, and market access across Africa. We help entrepreneurs, creatives, organisations, and community-led enterprises transition from informal activity into structured, scalable, and globally connected operations. Built around accessibility, compliance, and innovation, our work combines local understanding with internationally aligned business systems designed for long-term impact.",
  openGraph: {
    title: "The Access Group",
    description:
      "African innovation packaged for a global audience.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

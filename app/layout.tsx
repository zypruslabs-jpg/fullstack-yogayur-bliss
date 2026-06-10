import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YogAyur Bliss | Ancient Ayurvedic Wisdom & Modern Wellness",
  description: "Transform your mind, body and soul with YogAyur Bliss. Expert Ayurvedic consultations, yoga therapy, meditation, and holistic wellness programs. 2500+ clients, 98% satisfaction, 8+ years.",
  keywords: "Ayurveda, Yoga, Meditation, Holistic Wellness, Ayurvedic Consultation, Yoga Therapy, Natural Healing",
  openGraph: {
    title: "YogAyur Bliss | Ancient Ayurvedic Wisdom & Modern Wellness",
    description: "Transform your mind, body and soul naturally. 2500+ clients across 40+ countries.",
    url: "https://yogayurbliss.com",
    siteName: "YogAyur Bliss",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

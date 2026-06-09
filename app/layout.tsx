import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

export const metadata: Metadata = {
  title: "YogAyur Bliss | Ayurveda, Yoga & Holistic Wellness",
  description:
    "Transform your mind, body & soul with ancient Ayurvedic wisdom and modern wellness solutions. Book online yoga therapy, Ayurvedic consultation, meditation, stress management & holistic healing programs.",
  keywords:
    "ayurveda consultation, yoga therapy, online yoga classes, meditation, holistic wellness, stress relief, ayurvedic lifestyle, PCOS wellness, gut health, weight management",
  authors: [{ name: "YogAyur Bliss" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yogayurbliss.com",
    siteName: "YogAyur Bliss",
    title: "YogAyur Bliss | Ayurveda, Yoga & Holistic Wellness",
    description:
      "Ancient Ayurvedic wisdom & modern wellness solutions for a balanced life. Book consultation today.",
  },
  twitter: {
    card: "summary_large_image",
    title: "YogAyur Bliss | Ayurveda, Yoga & Holistic Wellness",
    description:
      "Ancient Ayurvedic wisdom & modern wellness solutions for a balanced life.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HealthAndBeautyBusiness",
              name: "YogAyur Bliss",
              description: "Ayurveda, Yoga & Holistic Wellness",
              url: "https://yogayurbliss.com",
              sameAs: ["https://www.instagram.com/yogayurbliss"],
            }),
          }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

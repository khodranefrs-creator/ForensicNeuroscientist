import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/content/site";
import { newsreader, plexMono, plexSans } from "@/lib/fonts";
import "./globals.css";
import "./pages.css";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: configuredSiteUrl ? new URL(configuredSiteUrl) : undefined,
  title: {
    default:
      "The Forensic Neuroscientist | Neuroscience, Behavior & Law",
    template: "%s | The Forensic Neuroscientist",
  },
  description:
    "Explore the connections between neuroscience, human behavior, and the law through educational resources and professional learning.",
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  category: "education",
  keywords: [
    "forensic neuroscience",
    "neuroscience and law",
    "forensic psychology",
    "criminal behavior",
    "neuroethics",
    "professional education",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title: "The Forensic Neuroscientist | Neuroscience, Behavior & Law",
    description:
      "Explore the connections between neuroscience, human behavior, and the law through educational resources and professional learning.",
    images: [
      {
        url: "/brand/og.png",
        width: 1200,
        height: 630,
        alt: "The Forensic Neuroscientist — the science behind the evidence.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Forensic Neuroscientist | Neuroscience, Behavior & Law",
    description:
      "Explore the connections between neuroscience, human behavior, and the law through educational resources and professional learning.",
    images: ["/brand/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08222F",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body>
        <a className="skipLink" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <div className="pageFrame">
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

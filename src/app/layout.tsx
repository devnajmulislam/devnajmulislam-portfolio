import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { site } from "@/data/site";
import { seo } from "@/data/seo";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AiSnippet } from "@/components/ui/ai-snippet";
import { CommandPalette } from "@/components/ui/command-palette";
import { DevShield } from "@/components/ui/dev-shield";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(seo.url),
  title: {
    default: seo.title,
    template: `%s — ${seo.name}`,
  },
  description: seo.description,
  applicationName: `${seo.name} Portfolio`,
  authors: [{ name: seo.name, url: seo.sameAs[0] }],
  creator: seo.name,
  keywords: [...seo.keywords],
  verification: { google: "googleba28431f5dd16e41.html" },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: seo.url,
    siteName: `${seo.name} Portfolio`,
    title: seo.title,
    description: seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    creator: `@${site.handle}`,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0e1512" },
    { media: "(prefers-color-scheme: light)", color: "#f7f4ec" },
  ],
  colorScheme: "dark light",
};

const themeScript = `(function(){try{var k='theme';var s=localStorage.getItem(k);var d=document.documentElement;var t=(s==='light'||s==='dark')?s:(window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');d.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: seo.name,
  alternateName: seo.alternateName,
  url: seo.url,
  jobTitle: seo.jobTitle,
  email: `mailto:${site.email}`,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sylhet",
    addressCountry: "BD",
  },
  sameAs: [...seo.sameAs],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Tailwind CSS",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Russkin Bright",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <head>
      <meta name="google-site-verification" content="ePeZt0v3gHudV6JUkAmJdAC-GL4-Sah3IHFbZ9XjFK0" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body className="bg-bg text-fg flex min-h-full flex-col">
        <ThemeProvider>
          <a
            href="#main"
            className="bg-accent text-accent-contrast sr-only rounded-md px-4 py-2 font-medium focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100]"
          >
            Skip to content
          </a>
          <DevShield />
          <div id="site-shell" className="flex min-h-full grow flex-col">
            <Navbar />
            {children}
            <Footer />
          </div>
          <ScrollProgress />
          <AiSnippet />
          <CommandPalette />
        </ThemeProvider>
      </body>
    </html>
  );
}

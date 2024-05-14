import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "next-themes";
import ReactQueryProviders from "./hooks/useReactQuery";
import RecoilRootWrapper from "./hooks/useRecoilRootWrapper";

import { META } from "./constants/metadata";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(META.url),
  title: META.title,
  description: META.description,
  icons: META.icons,
  robots: META.robots,
  verification: {
    google: META.googleVerification,
    other: {
      "naver-site-verification": META.naverVerification,
    },
  },
  keywords: [...META.keyword],
  openGraph: {
    title: META.title,
    description: META.description,
    siteName: META.title,
    locale: "ko_KR",
    type: "website",
    url: META.url,
    images: {
      url: META.ogImage,
    },
  },
  twitter: {
    title: META.title,
    description: META.description,
    images: {
      url: META.ogImage,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class">
          <ReactQueryProviders>
            <RecoilRootWrapper>{children}</RecoilRootWrapper>
          </ReactQueryProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}

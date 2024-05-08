import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "next-themes";
import ReactQueryProviders from "./hooks/useReactQuery";
import RecoilRootWrapper from "./hooks/useRecoilRootWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "이 노래 노래방에 있을까",
  description:
    "당신이 부르고 싶은 노래가 노래방에 있는지 확인하세요. TJ와 금영 노래방의 곡 목록을 한 번에 검색할 수 있는 사이트입니다.",
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

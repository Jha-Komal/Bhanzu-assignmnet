import type { Metadata, Viewport } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import "./deck.css";
import { SiteHeader } from "@/components/SiteHeader";

const quicksand = Quicksand({ subsets: ["latin"], variable: "--font-quicksand", display: "swap" });

export const metadata: Metadata = {
  title: "Bhanzu Growth PM case study",
  description:
    "A Growth PM case study on free-demo attendance: read the data, diagnose the drop, propose ideas, and a working prototype, the Mission Pass.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f15d22" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={quicksand.variable}>
      <body>
        <StoreProvider>
          <SiteHeader />
          <main>{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}

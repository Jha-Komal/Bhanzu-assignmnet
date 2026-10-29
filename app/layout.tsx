import type { Metadata, Viewport } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import { Header } from "@/components/Header";
import { ReviewerTools } from "@/components/ReviewerTools";

const quicksand = Quicksand({ subsets: ["latin"], variable: "--font-quicksand", display: "swap" });

export const metadata: Metadata = {
  title: "Mission Pass · Bhanzu growth case study",
  description:
    "A case-study prototype of the Mission Pass: a short game a child plays between booking a free demo and the demo itself. Everything is simulated.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f15d22" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={quicksand.variable}>
      <body>
        <StoreProvider>
          <div className="ribbon">
            Growth PM case study prototype. <b>Not an official Bhanzu product.</b> Sign-up, messages and data are simulated in your browser.
          </div>
          <Header />
          <main>{children}</main>
          <footer className="footer">
            <div className="wrap">
              Built for the Bhanzu Growth PM case study, Part 4. Nothing you enter leaves this browser. Use the Reviewer tools (bottom left)
              to move through the days.
            </div>
          </footer>
          <ReviewerTools />
        </StoreProvider>
      </body>
    </html>
  );
}

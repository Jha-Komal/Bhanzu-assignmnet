import { ProductNav } from "@/components/ProductNav";
import { ReviewerTools } from "@/components/ReviewerTools";

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="ribbon">
        Growth PM case study prototype. <b>Not an official Bhanzu product.</b> Sign-up, messages and data are simulated in your browser.
      </div>
      <ProductNav />
      <div className="product">{children}</div>
      <footer className="footer">
        <div className="wrap">
          Built for the Bhanzu Growth PM case study, Part 4. Nothing you enter leaves this browser. Use the Reviewer tools (bottom left) to
          move through the days.
        </div>
      </footer>
      <ReviewerTools />
    </>
  );
}

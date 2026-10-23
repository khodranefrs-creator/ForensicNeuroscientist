import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/Icons";
import { FieldDiagram } from "@/components/FieldDiagram";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="notFound">
      <div className="notFoundInner">
        <div className="notFoundCopy">
          <p className="eyebrow">
            <span className="eyebrowMark" aria-hidden="true" />
            404 / Page not found
          </p>
          <h1>
            A gap in the <em>record</em>.
          </h1>
          <p>
            The page you are looking for is not here. The field is large; the
            navigation is a better place to start.
          </p>
          <div className="notFoundActions">
            <Link className="btn btnPrimary" href="/">
              Return home <ArrowRight />
            </Link>
            <Link className="textLink" href="/explore">
              Explore the field
            </Link>
          </div>
          <nav className="notFoundNav" aria-label="Helpful pages">
            <Link href="/videos">Video Library</Link>
            <Link href="/resources">Research & Resources</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
        <div className="notFoundVisual">
          <FieldDiagram variant="ethics" />
          <p>“The absence of a page is not the absence of a question.”</p>
        </div>
      </div>
    </section>
  );
}

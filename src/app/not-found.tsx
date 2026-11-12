import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[75vh] items-center justify-center bg-ivory px-4 pt-20">
      <div className="max-w-lg border border-sand bg-white p-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-dark">
          404 · Page Not Found
        </p>
        <h1 className="heading-editorial mt-3 text-4xl text-navy">
          This address isn’t on our map.
        </h1>
        <p className="body-editorial mt-3 text-charcoal/80">
          The property or page you’re looking for may have moved or closed.
          Explore our current portfolio or contact our team directly.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 bg-navy px-6 py-3.5 font-sans text-[14px] font-semibold tracking-[0.04em] text-white hover:bg-navy-light"
          >
            <span>Browse Properties</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/"
            className="border border-sand px-6 py-3.5 font-sans text-[14px] font-semibold tracking-[0.04em] text-navy hover:border-navy"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}


"use client";

import Link from "next/link";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[75vh] items-center justify-center bg-ivory px-4 pt-20">
      <div className="max-w-md border border-sand bg-white p-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-dark">
          Something went wrong
        </p>
        <h1 className="heading-editorial mt-3 text-3xl text-navy">
          We couldn’t load this page.
        </h1>
        <p className="body-editorial mt-3 text-charcoal/80">
          Please try again or reach out directly to our Miami office at (305)
          301-0525.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="bg-navy px-5 py-3 font-sans text-[14px] font-semibold tracking-[0.04em] text-white"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="border border-sand px-5 py-3 font-sans text-[14px] font-semibold tracking-[0.04em] text-navy"
          >
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}


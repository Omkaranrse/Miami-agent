export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-ivory pt-20">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-sand border-t-navy" />
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-muted">
          Move Miami Realtor
        </p>
      </div>
    </div>
  );
}


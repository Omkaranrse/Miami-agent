import type { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return <div className="w-full">{children}</div>;
}


"use client";

import { ClerkProvider } from "@clerk/nextjs";

export default function Providers({ children }: { children: React.ReactNode }) {
  // ClerkProvider is a client component – keep it isolated here
  return <ClerkProvider>{children}</ClerkProvider>;
}

import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";
import { Toaster } from "@/components/ui/sonner";

export function SiteShell({
  children,
  transparentHeader,
}: {
  children: ReactNode;
  transparentHeader?: boolean;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className={transparentHeader ? "" : "pt-0"}>{children}</main>
      <Footer />
      <WhatsAppButton />
      <Toaster position="top-center" />
    </div>
  );
}

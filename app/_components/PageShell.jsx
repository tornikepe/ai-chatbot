"use client";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

export default function PageShell({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

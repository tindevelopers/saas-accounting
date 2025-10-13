import type { Metadata } from "next";
import AppSidebar from "@/layout/AppSidebar";
import AppHeader from "@/layout/AppHeader";

export const metadata: Metadata = {
  title: "Blog Writer Dashboard | TinAdmin",
  description: "Comprehensive blog management and content creation platform",
};

export default function BlogWriterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar />
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <AppHeader />
        <main className="relative flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}


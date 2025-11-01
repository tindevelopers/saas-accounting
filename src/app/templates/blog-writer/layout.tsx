import type { Metadata } from "next";

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
    <>
      {children}
    </>
  );
}


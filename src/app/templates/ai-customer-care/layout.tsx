import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Customer Care Dashboard | TinAdmin",
  description: "Enterprise-grade admin platform for managing AI voice agents, chat conversations, and call analytics",
};

export default function AICustomerCareLayout({
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


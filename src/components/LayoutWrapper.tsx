"use client";

import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import { usePathname } from "next/navigation";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute ? (
        <>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </>
      ) : (
        <main>{children}</main>
      )}
    </>
  );
}

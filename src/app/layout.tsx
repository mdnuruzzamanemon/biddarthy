import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper"; // Import the new wrapper

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Biddarthi - Your Learning Partner",
  description: "Quality education and guidance for competitive exams",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressContentEditableWarning={true}>
      <body className={roboto.className}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}

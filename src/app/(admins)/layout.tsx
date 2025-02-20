import type { Metadata } from "next";
import { Roboto } from "next/font/google";


const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Biddarthi - Your Learning Partner",
  description: "Quality education and guidance for competitive exams",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main >
          {children}
        </main>

      </body>
    </html>
  );
}

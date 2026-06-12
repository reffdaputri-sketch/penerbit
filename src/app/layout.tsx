import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PenerbitWeb - Toko Buku Premium',
  description: 'Toko buku dan penerbit terpercaya dengan koleksi buku terbaik dan eksklusif.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        {children}
      </body>
    </html>
  );
}

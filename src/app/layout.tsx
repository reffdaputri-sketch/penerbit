import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
        <Navbar />
        <main className="container" style={{ minHeight: 'calc(100vh - 200px)', marginTop: '2rem', marginBottom: '4rem' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

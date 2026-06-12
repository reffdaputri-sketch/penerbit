import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="container" style={{ minHeight: 'calc(100vh - 200px)', marginTop: '2rem', marginBottom: '4rem' }}>
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

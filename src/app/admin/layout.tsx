'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, BookOpen, Building2, LogOut, ShoppingCart, Image as ImageIcon, FileText } from 'lucide-react';
import styles from './admin.module.css';
import { supabase } from '@/lib/supabaseClient';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // If it's the login page, we don't need to check auth for layout protection 
    // (the login page itself handles redirecting away if already logged in)
    if (pathname === '/admin/login') {
      setLoading(false);
      return;
    }

    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
      } else {
        setAuthenticated(true);
      }
      setLoading(false);
    };

    checkAuth();
  }, [pathname, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', background: 'var(--background)' }}>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Memeriksa akses keamanan...</p>
      </div>
    );
  }

  // If on login page, just render the login page without the sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // If not authenticated and not on login page, render nothing while redirecting
  if (!authenticated) {
    return null;
  }

  return (
    <div className={styles.adminContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          Admin Panel
        </div>
        <nav className={styles.navLinks}>
          <Link 
            href="/admin" 
            className={`${styles.navLink} ${pathname === '/admin' ? styles.navLinkActive : ''}`}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link 
            href="/admin/books" 
            className={`${styles.navLink} ${pathname?.startsWith('/admin/books') ? styles.navLinkActive : ''}`}
          >
            <BookOpen size={20} />
            Kelola Buku
          </Link>
          <Link 
            href="/admin/categories" 
            className={`${styles.navLink} ${pathname?.startsWith('/admin/categories') ? styles.navLinkActive : ''}`}
          >
            <LayoutDashboard size={20} />
            Kategori Buku
          </Link>
          <Link 
            href="/admin/slider" 
            className={`${styles.navLink} ${pathname?.startsWith('/admin/slider') ? styles.navLinkActive : ''}`}
          >
            <ImageIcon size={20} />
            Kelola Slider
          </Link>
          <Link 
            href="/admin/orders" 
            className={`${styles.navLink} ${pathname?.startsWith('/admin/orders') ? styles.navLinkActive : ''}`}
          >
            <ShoppingCart size={20} />
            Data Pesanan
          </Link>
          <Link 
            href="/admin/pages" 
            className={`${styles.navLink} ${pathname?.startsWith('/admin/pages') ? styles.navLinkActive : ''}`}
          >
            <FileText size={20} />
            Halaman Statis
          </Link>
          <Link 
            href="/admin/profile" 
            className={`${styles.navLink} ${pathname?.startsWith('/admin/profile') ? styles.navLinkActive : ''}`}
          >
            <Building2 size={20} />
            Profil Perusahaan
          </Link>
        </nav>
        
        <div style={{ marginTop: 'auto' }}>
          <button onClick={handleLogout} className={styles.navLink} style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}>
            <LogOut size={20} />
            Logout
          </button>
          <Link href="/" className={styles.navLink} style={{ marginTop: '0.5rem' }}>
            <LayoutDashboard size={20} />
            Ke Web Utama
          </Link>
        </div>
      </aside>

      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}

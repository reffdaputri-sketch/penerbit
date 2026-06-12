'use client';

import React, { useEffect, useState } from 'react';
import styles from './admin.module.css';
import { supabase } from '@/lib/supabaseClient';

export default function AdminDashboard() {
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    async function fetchStats() {
      // Fetch books count
      const { count: booksCount } = await supabase
        .from('books')
        .select('*', { count: 'exact', head: true });
        
      if (booksCount !== null) setTotalBooks(booksCount);

      // Fetch orders stats
      const { data: orders } = await supabase
        .from('orders')
        .select('total_price, status');
      
      if (orders) {
        setTotalOrders(orders.length);
        const revenue = orders
          .filter(o => o.status === 'completed' || o.status === 'processing')
          .reduce((sum, o) => sum + (o.total_price || 0), 0);
        setTotalRevenue(revenue);
      }
    }
    fetchStats();
  }, []);

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{totalOrders}</div>
          <div className={styles.statLabel}>Total Pesanan</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statNumber} style={{ fontSize: '1.8rem' }}>
            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(totalRevenue)}
          </div>
          <div className={styles.statLabel}>Pendapatan (Aktif)</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statNumber}>{totalBooks}</div>
          <div className={styles.statLabel}>Katalog Buku</div>
        </div>
      </div>
      
      <div className={styles.card} style={{ marginTop: '2rem' }}>
        <h3>Selamat Datang di Admin Panel</h3>
        <p style={{ marginTop: '1rem', color: '#666' }}>
          Gunakan menu di sebelah kiri untuk mengelola data buku dan profil perusahaan.
          Jika Anda baru pertama kali menggunakan, pastikan tabel `books` dan `company_profile` sudah terbuat di Supabase Anda.
        </p>
      </div>
    </div>
  );
}

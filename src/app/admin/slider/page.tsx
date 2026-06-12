'use client';

import React, { useEffect, useState } from 'react';
import styles from '../admin.module.css';
import { supabase } from '@/lib/supabaseClient';

export default function AdminSlider() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    setLoading(true);
    const { data, error } = await supabase
      .from('books')
      .select('id, title, author, is_featured')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setBooks(data);
    } else if (error) {
      console.error('Error fetching books for slider:', error);
    }
    setLoading(false);
  }

  async function toggleFeatured(id: string, currentStatus: boolean) {
    const newStatus = !currentStatus;
    const { error } = await supabase
      .from('books')
      .update({ is_featured: newStatus })
      .eq('id', id);

    if (!error) {
      setBooks(books.map(b => b.id === id ? { ...b, is_featured: newStatus } : b));
    } else {
      alert('Gagal mengupdate status slider: ' + error.message + '\n\nApakah Anda sudah menambahkan kolom is_featured di tabel books?');
    }
  }

  const featuredBooks = books.filter(b => b.is_featured);
  const otherBooks = books.filter(b => !b.is_featured);

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Kelola Slider Beranda</h1>
      </div>

      <div className={styles.card} style={{ marginBottom: '2rem' }}>
        <h2>Sedang Tampil di Slider ({featuredBooks.length})</h2>
        <p style={{ color: '#666', marginBottom: '1rem' }}>Buku-buku ini akan muncul di slider besar halaman utama.</p>
        
        {loading ? (
          <p>Memuat data...</p>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Judul Buku</th>
                  <th>Penulis</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {featuredBooks.length > 0 ? (
                  featuredBooks.map((book) => (
                    <tr key={book.id}>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>
                        <button 
                          onClick={() => toggleFeatured(book.id, book.is_featured)}
                          className={styles.btn + ' ' + styles.btnDanger}
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}
                        >
                          Keluarkan dari Slider
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} style={{ textAlign: 'center', padding: '1rem' }}>
                      Belum ada buku yang dipilih untuk slider.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className={styles.card}>
        <h2>Daftar Buku Lainnya</h2>
        <p style={{ color: '#666', marginBottom: '1rem' }}>Pilih buku di bawah ini untuk ditambahkan ke slider.</p>
        
        {loading ? (
          <p>Memuat data...</p>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Judul Buku</th>
                  <th>Penulis</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {otherBooks.length > 0 ? (
                  otherBooks.map((book) => (
                    <tr key={book.id}>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>
                        <button 
                          onClick={() => toggleFeatured(book.id, book.is_featured)}
                          className={styles.btn + ' ' + styles.btnPrimary}
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}
                        >
                          Tambahkan ke Slider
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} style={{ textAlign: 'center', padding: '1rem' }}>
                      Tidak ada buku lain yang tersedia.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

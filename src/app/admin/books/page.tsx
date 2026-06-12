'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import styles from '../admin.module.css';
import { supabase } from '@/lib/supabaseClient';

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  publishedDate: string;
}

export default function AdminBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    setLoading(true);
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setBooks(data);
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
      const { error } = await supabase.from('books').delete().eq('id', id);
      if (!error) {
        setBooks(books.filter(b => b.id !== id));
      } else {
        alert('Gagal menghapus buku: ' + error.message);
      }
    }
  }

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Kelola Buku</h1>
        <Link href="/admin/books/add" className={styles.btn + ' ' + styles.btnPrimary}>
          <Plus size={18} />
          Tambah Buku
        </Link>
      </div>

      <div className={styles.card}>
        {loading ? (
          <p>Memuat data...</p>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Judul</th>
                  <th>Penulis</th>
                  <th>Harga</th>
                  <th>Tanggal Terbit</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {books.length > 0 ? (
                  books.map((book) => (
                    <tr key={book.id}>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>Rp {book.price.toLocaleString('id-ID')}</td>
                      <td>{book.publishedDate}</td>
                      <td>
                        <div className={styles.actions}>
                          <Link 
                            href={`/admin/books/edit/${book.id}`}
                            className={styles.btn + ' ' + styles.btnSecondary}
                            style={{ padding: '0.5rem', borderRadius: '6px' }}
                          >
                            <Edit size={16} />
                          </Link>
                          <button 
                            onClick={() => handleDelete(book.id)}
                            className={styles.btn + ' ' + styles.btnDanger}
                            style={{ padding: '0.5rem', borderRadius: '6px' }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>
                      Belum ada data buku.
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

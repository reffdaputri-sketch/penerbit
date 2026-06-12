'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import styles from '../../admin.module.css';
import { supabase } from '@/lib/supabaseClient';

export default function AdminAddBook() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    synopsis: '',
    price: '',
    coverUrl: '',
    publishedDate: '',
    isbn: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const bookData = {
      ...formData,
      price: parseInt(formData.price) || 0
    };

    const { error } = await supabase.from('books').insert([bookData]);

    setLoading(false);

    if (error) {
      alert('Gagal menyimpan buku: ' + error.message);
    } else {
      router.push('/admin/books');
    }
  };

  return (
    <div>
      <div className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/admin/books" className={styles.btn + ' ' + styles.btnSecondary}>
            <ArrowLeft size={18} />
          </Link>
          <h1 className={styles.title}>Tambah Buku Baru</h1>
        </div>
      </div>

      <div className={styles.card}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="title">Judul Buku</label>
            <input 
              required
              type="text" 
              id="title" 
              name="title" 
              className={styles.input} 
              value={formData.title} 
              onChange={handleChange} 
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="author">Penulis</label>
            <input 
              required
              type="text" 
              id="author" 
              name="author" 
              className={styles.input} 
              value={formData.author} 
              onChange={handleChange} 
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="synopsis">Sinopsis</label>
            <textarea 
              required
              id="synopsis" 
              name="synopsis" 
              className={styles.textarea} 
              value={formData.synopsis} 
              onChange={handleChange} 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="price">Harga (Rp)</label>
              <input 
                required
                type="number" 
                id="price" 
                name="price" 
                className={styles.input} 
                value={formData.price} 
                onChange={handleChange} 
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="publishedDate">Tanggal Terbit</label>
              <input 
                required
                type="date" 
                id="publishedDate" 
                name="publishedDate" 
                className={styles.input} 
                value={formData.publishedDate} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="isbn">ISBN</label>
              <input 
                required
                type="text" 
                id="isbn" 
                name="isbn" 
                className={styles.input} 
                value={formData.isbn} 
                onChange={handleChange} 
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="coverUrl">URL Gambar Cover</label>
              <input 
                required
                type="url" 
                id="coverUrl" 
                name="coverUrl" 
                className={styles.input} 
                value={formData.coverUrl} 
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className={styles.btn + ' ' + styles.btnPrimary} disabled={loading}>
              <Save size={18} />
              {loading ? 'Menyimpan...' : 'Simpan Buku'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

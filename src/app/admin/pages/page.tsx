'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Edit } from 'lucide-react';
import styles from '../admin.module.css';
import { supabase } from '@/lib/supabaseClient';

export default function AdminPages() {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Default pages we want to ensure exist
  const defaultPages = [
    { slug: 'cara-belanja', title: 'Cara Belanja' },
    { slug: 'pengiriman', title: 'Pengiriman' },
    { slug: 'faq', title: 'FAQ' },
    { slug: 'hubungi-kami', title: 'Hubungi Kami' },
    { slug: 'kebijakan-privasi', title: 'Kebijakan Privasi' },
    { slug: 'syarat-ketentuan', title: 'Syarat & Ketentuan' }
  ];

  useEffect(() => {
    fetchPages();
  }, []);

  async function fetchPages() {
    setLoading(true);
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .order('slug');

    if (!error && data) {
      setPages(data);
    }
    setLoading(false);
  }

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Halaman Statis</h1>
      </div>

      <div className={styles.card}>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>
          Kelola isi halaman informasi seperti Cara Belanja, FAQ, dan lainnya.
          Jika halaman belum ada di database saat Anda klik edit, ia akan otomatis dibuat.
        </p>

        {loading ? (
          <p>Memuat data...</p>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Judul Halaman</th>
                  <th>URL (Slug)</th>
                  <th>Status Konten</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {defaultPages.map((pageDef) => {
                  const existingPage = pages.find(p => p.slug === pageDef.slug);
                  const hasContent = existingPage && existingPage.content && existingPage.content.trim() !== '';

                  return (
                    <tr key={pageDef.slug}>
                      <td>{pageDef.title}</td>
                      <td><code>/info/{pageDef.slug}</code></td>
                      <td>
                        {hasContent ? (
                          <span style={{ color: '#10b981', fontWeight: 'bold' }}>Sudah Terisi</span>
                        ) : (
                          <span style={{ color: '#ef4444', fontWeight: 'bold' }}>Kosong</span>
                        )}
                      </td>
                      <td>
                        <Link 
                          href={`/admin/pages/edit/${pageDef.slug}?title=${encodeURIComponent(pageDef.title)}`}
                          className={styles.btn + ' ' + styles.btnSecondary}
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}
                        >
                          <Edit size={16} /> Edit
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

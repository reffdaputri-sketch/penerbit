'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import styles from '../../../admin.module.css';
import { supabase } from '@/lib/supabaseClient';

export default function AdminEditPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  
  const slug = params?.slug as string;
  const defaultTitle = searchParams?.get('title') || slug;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    title: defaultTitle,
    content: ''
  });

  useEffect(() => {
    if (slug) fetchPage();
  }, [slug]);

  async function fetchPage() {
    setLoading(true);
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .single();

    if (data) {
      setFormData({
        id: data.id,
        title: data.title,
        content: data.content || ''
      });
    } else {
      // It doesn't exist yet, we will insert it on save
      console.log('Page not found, will create on save.');
    }
    setLoading(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    let errorResult;

    if (formData.id) {
      // Update
      const { error } = await supabase
        .from('pages')
        .update({ title: formData.title, content: formData.content })
        .eq('id', formData.id);
      errorResult = error;
    } else {
      // Insert
      const { error } = await supabase
        .from('pages')
        .insert([{ slug, title: formData.title, content: formData.content }]);
      errorResult = error;
    }

    setSaving(false);

    if (errorResult) {
      alert('Gagal menyimpan halaman: ' + errorResult.message);
    } else {
      router.push('/admin/pages');
    }
  };

  if (loading) return <div className={styles.card}>Memuat data...</div>;

  return (
    <div>
      <div className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/admin/pages" className={styles.btn + ' ' + styles.btnSecondary}>
            <ArrowLeft size={18} />
          </Link>
          <h1 className={styles.title}>Edit Halaman: {formData.title}</h1>
        </div>
      </div>

      <div className={styles.card}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Judul Halaman</label>
            <input 
              required
              type="text" 
              className={styles.input} 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Konten Halaman
              <br/>
              <small style={{ fontWeight: 'normal', color: '#666' }}>Anda bisa menggunakan HTML dasar seperti &lt;b&gt;, &lt;i&gt;, atau cukup ketik biasa. Baris baru akan dipertahankan.</small>
            </label>
            <textarea 
              required
              className={styles.textarea} 
              style={{ minHeight: '400px' }}
              value={formData.content} 
              onChange={(e) => setFormData({...formData, content: e.target.value})} 
            />
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className={styles.btn + ' ' + styles.btnPrimary} disabled={saving}>
              <Save size={18} />
              {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import styles from '../admin.module.css';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });
      
    if (data) setCategories(data);
    setLoading(false);
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (!editingId) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  const handleEdit = (category: any) => {
    setEditingId(category.id);
    setName(category.name);
    setSlug(category.slug);
  };

  const handleCancel = () => {
    setEditingId(null);
    setName('');
    setSlug('');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus kategori ini? Buku dengan kategori ini tidak akan memiliki kategori.')) return;
    
    await supabase.from('categories').delete().eq('id', id);
    fetchCategories();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    if (editingId) {
      await supabase
        .from('categories')
        .update({ name, slug })
        .eq('id', editingId);
    } else {
      await supabase
        .from('categories')
        .insert([{ name, slug }]);
    }

    setSaving(false);
    handleCancel();
    fetchCategories();
  };

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Kelola Kategori Buku</h1>
      </div>

      <div className={styles.card}>
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
            <div className={styles.formGroup} style={{ marginBottom: 0 }}>
              <label className={styles.label}>Nama Kategori</label>
              <input 
                type="text" 
                className={styles.input} 
                value={name} 
                onChange={handleNameChange} 
                required 
                placeholder="Contoh: Fiksi"
              />
            </div>
            <div className={styles.formGroup} style={{ marginBottom: 0 }}>
              <label className={styles.label}>Slug (URL)</label>
              <input 
                type="text" 
                className={styles.input} 
                value={slug} 
                onChange={(e) => setSlug(e.target.value)} 
                required 
                placeholder="contoh-fiksi"
              />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`} disabled={saving}>
                {editingId ? <Edit size={18} /> : <Plus size={18} />}
                {editingId ? 'Update' : 'Tambah'}
              </button>
              {editingId && (
                <button type="button" onClick={handleCancel} className={`${styles.btn} ${styles.btnSecondary}`}>
                  Batal
                </button>
              )}
            </div>
          </div>
        </form>

        <div className={styles.tableContainer}>
          {loading ? (
            <p>Memuat kategori...</p>
          ) : categories.length === 0 ? (
            <p>Belum ada kategori.</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Nama Kategori</th>
                  <th>Slug</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id}>
                    <td>{cat.name}</td>
                    <td><code>{cat.slug}</code></td>
                    <td>
                      <div className={styles.actions}>
                        <button 
                          className={`${styles.btn} ${styles.btnSecondary}`}
                          onClick={() => handleEdit(cat)}
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          className={`${styles.btn} ${styles.btnDanger}`}
                          onClick={() => handleDelete(cat.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

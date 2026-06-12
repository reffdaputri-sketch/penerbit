'use client';

import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import styles from '../admin.module.css';
import { supabase } from '@/lib/supabaseClient';

export default function AdminProfile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    address: '',
    email: '',
    phone: '',
    logoUrl: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    setLoading(true);
    const { data, error } = await supabase
      .from('company_profile')
      .select('*')
      .limit(1)
      .single();

    if (data) {
      setFormData(data);
    } else {
      // If no data exists yet, we just leave it blank (or we can handle it later on save)
      console.log('No profile data found or error:', error?.message);
    }
    setLoading(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    let errorResult;

    if (formData.id) {
      // Update existing
      const { error } = await supabase
        .from('company_profile')
        .update({
          name: formData.name,
          description: formData.description,
          address: formData.address,
          email: formData.email,
          phone: formData.phone,
          logoUrl: formData.logoUrl
        })
        .eq('id', formData.id);
      errorResult = error;
    } else {
      // Insert new
      const { error } = await supabase
        .from('company_profile')
        .insert([{
          name: formData.name,
          description: formData.description,
          address: formData.address,
          email: formData.email,
          phone: formData.phone,
          logoUrl: formData.logoUrl
        }]);
      errorResult = error;
    }

    setSaving(false);

    if (errorResult) {
      alert('Gagal menyimpan profil: ' + errorResult.message);
    } else {
      alert('Profil perusahaan berhasil disimpan!');
      fetchProfile(); // refresh data to get ID if it was an insert
    }
  };

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Profil Perusahaan</h1>
      </div>

      <div className={styles.card}>
        {loading ? (
          <p>Memuat data...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="name">Nama Perusahaan</label>
              <input 
                required
                type="text" 
                id="name" 
                name="name" 
                className={styles.input} 
                value={formData.name} 
                onChange={handleChange} 
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="description">Deskripsi Singkat</label>
              <textarea 
                required
                id="description" 
                name="description" 
                className={styles.textarea} 
                value={formData.description} 
                onChange={handleChange} 
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="address">Alamat Lengkap</label>
              <textarea 
                required
                id="address" 
                name="address" 
                className={styles.textarea} 
                value={formData.address} 
                onChange={handleChange} 
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="email">Email Kontak</label>
                <input 
                  required
                  type="email" 
                  id="email" 
                  name="email" 
                  className={styles.input} 
                  value={formData.email} 
                  onChange={handleChange} 
                />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="phone">Nomor Telepon / WhatsApp</label>
                <input 
                  required
                  type="text" 
                  id="phone" 
                  name="phone" 
                  className={styles.input} 
                  value={formData.phone} 
                  onChange={handleChange} 
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="logoUrl">URL Logo Perusahaan</label>
              <input 
                required
                type="url" 
                id="logoUrl" 
                name="logoUrl" 
                className={styles.input} 
                value={formData.logoUrl} 
                onChange={handleChange}
                placeholder="https://example.com/logo.png"
              />
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className={styles.btn + ' ' + styles.btnPrimary} disabled={saving}>
                <Save size={18} />
                {saving ? 'Menyimpan...' : 'Simpan Profil'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

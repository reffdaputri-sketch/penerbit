'use client';

import React, { useState } from 'react';
import { ShoppingCart, X, CheckCircle } from 'lucide-react';
import styles from './CheckoutForm.module.css';
import { supabase } from '@/lib/supabaseClient';

export default function CheckoutForm({ book }: { book: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('orders').insert([{
      book_id: book.id,
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      customer_address: formData.address,
      total_price: book.price,
      status: 'pending'
    }]);

    setLoading(false);

    if (error) {
      alert('Gagal memproses pesanan: ' + error.message);
    } else {
      setSuccess(true);
    }
  };

  return (
    <>
      <button className={styles.ctaButton} onClick={() => setIsOpen(true)}>
        <ShoppingCart size={20} />
        Beli Sekarang
      </button>

      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
              <X size={24} />
            </button>

            {success ? (
              <div className={styles.successState}>
                <CheckCircle size={64} color="#10b981" />
                <h2>Pesanan Berhasil!</h2>
                <p>Terima kasih telah memesan <strong>{book.title}</strong>.</p>
                <p>Tim kami akan segera menghubungi Anda melalui WhatsApp atau Email untuk proses pembayaran dan pengiriman.</p>
                <button className={styles.primaryBtn} onClick={() => setIsOpen(false)}>Tutup</button>
              </div>
            ) : (
              <>
                <h2>Form Pemesanan</h2>
                <div className={styles.orderSummary}>
                  <p><strong>Buku:</strong> {book.title}</p>
                  <p><strong>Total:</strong> {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(book.price)}</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formGroup}>
                    <label>Nama Lengkap</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleChange} />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Email</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Nomor WhatsApp</label>
                    <input required type="text" name="phone" value={formData.phone} onChange={handleChange} />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Alamat Pengiriman</label>
                    <textarea required name="address" value={formData.address} onChange={handleChange} rows={3} />
                  </div>

                  <button type="submit" className={styles.primaryBtn} disabled={loading}>
                    {loading ? 'Memproses...' : 'Konfirmasi Pesanan'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

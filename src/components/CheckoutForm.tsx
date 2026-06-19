'use client';

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ShoppingCart, X, CheckCircle } from 'lucide-react';
import styles from './CheckoutForm.module.css';
import { supabase } from '@/lib/supabaseClient';

export default function CheckoutForm({ book }: { book: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  // Nomor WA admin dari environment variable
  const adminWa = process.env.NEXT_PUBLIC_ADMIN_WA || '';

  // Ensure portal target is available (client only)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setSuccess(false);
    setFormData({ name: '', email: '', phone: '', address: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendWhatsAppNotification = (orderData: typeof formData) => {
    if (!adminWa) return;

    const harga = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(book.price);
    const pesan = [
      `🛒 *PESANAN BARU MASUK!*`,
      ``,
      `📚 *Buku:* ${book.title}`,
      `💰 *Harga:* ${harga}`,
      ``,
      `👤 *Data Pembeli:*`,
      `• Nama: ${orderData.name}`,
      `• Email: ${orderData.email}`,
      `• WhatsApp: ${orderData.phone}`,
      `• Alamat: ${orderData.address}`,
      ``,
      `⏰ Waktu: ${new Date().toLocaleString('id-ID')}`,
      ``,
      `_Silakan segera konfirmasi pesanan ini._`
    ].join('\n');

    const waUrl = `https://wa.me/${adminWa}?text=${encodeURIComponent(pesan)}`;
    window.open(waUrl, '_blank');
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
      // Kirim notifikasi WA ke admin setelah order tersimpan
      sendWhatsAppNotification(formData);
    }
  };


  const modal = isOpen ? (
    <div className={styles.modalOverlay} onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={handleClose} aria-label="Tutup">
          <X size={24} />
        </button>

        {success ? (
          <div className={styles.successState}>
            <CheckCircle size={64} color="#10b981" />
            <h2>Pesanan Berhasil!</h2>
            <p>Terima kasih telah memesan <strong>{book.title}</strong>.</p>
            <p>Tim kami akan segera menghubungi Anda melalui WhatsApp atau Email untuk proses pembayaran dan pengiriman.</p>
            <button className={styles.primaryBtn} onClick={handleClose}>Tutup</button>
          </div>
        ) : (
          <>
            <h2>Form Pemesanan</h2>
            <div className={styles.orderSummary}>
              <p><strong>Buku:</strong> <span>{book.title}</span></p>
              <p><strong>Total:</strong> <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(book.price)}</span></p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Nama Lengkap</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Masukkan nama lengkap" />
              </div>
              
              <div className={styles.formGroup}>
                <label>Email</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="contoh@email.com" />
              </div>
              
              <div className={styles.formGroup}>
                <label>Nomor WhatsApp</label>
                <input required type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="08xxxxxxxxxx" />
              </div>
              
              <div className={styles.formGroup}>
                <label>Alamat Pengiriman</label>
                <textarea required name="address" value={formData.address} onChange={handleChange} rows={3} placeholder="Masukkan alamat lengkap pengiriman" />
              </div>

              <button type="submit" className={styles.primaryBtn} disabled={loading}>
                {loading ? 'Memproses...' : 'Konfirmasi Pesanan'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  ) : null;

  return (
    <>
      <button className={styles.ctaButton} onClick={() => setIsOpen(true)}>
        <ShoppingCart size={20} />
        Beli Sekarang
      </button>

      {mounted && ReactDOM.createPortal(modal, document.body)}
    </>
  );
}

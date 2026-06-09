"use client";

import { useEffect, useRef } from 'react';
import styles from './page.module.css';
import BookCard from '@/components/BookCard';
import { mockBooks } from '@/lib/mockData';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, ShoppingBag, FileText, ShieldCheck } from 'lucide-react';

export default function Home() {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      if (slider.scrollWidth - slider.clientWidth <= slider.scrollLeft + 10) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: slider.clientWidth, behavior: 'smooth' });
      }
    }, 4000);

    return () => clearInterval(slideTimer);
  }, []);
  return (
    <div className="animate-fade-in">
      {/* Welcome & Services Section */}
      <section className={styles.welcomeSection}>
        <div className={styles.welcomeHeader}>
          <h2 className={styles.welcomeTitle}>Selamat Datang di <span className="gradient-text">PenerbitWeb</span></h2>
          <p className={styles.welcomeDesc}>
            PenerbitWeb adalah Perusahaan penerbitan, anggota IKAPI dan percetakan buku, sekaligus penyedia Jasa Konversi KTI (Skripsi, Tesis, dan Disertasi) ber-ISBN siap terbit. Kami juga melayani pengadaan bahan pustaka terpercaya dengan legalitas resmi.
          </p>
        </div>

        <div className={styles.servicesGrid}>
          <div className={`glass-panel ${styles.serviceCard}`}>
            <div className={styles.serviceIconWrapper}>
              <BookOpen size={32} />
            </div>
            <h3>Penerbitan Buku</h3>
            <p>Menawarkan paket penerbitan Indie dan Mayor (masuk toko buku nasional) yang disesuaikan dengan kebutuhan setiap penulis.</p>
          </div>

          <div className={`glass-panel ${styles.serviceCard}`}>
            <div className={styles.serviceIconWrapper}>
              <ShoppingBag size={32} />
            </div>
            <h3>Toko Buku Online</h3>
            <p>Katalog buku lengkap yang bisa dipesan melalui web ini maupun *marketplace* ternama (Tokopedia, Shopee, dll).</p>
          </div>

          <div className={`glass-panel ${styles.serviceCard}`}>
            <div className={styles.serviceIconWrapper}>
              <FileText size={32} />
            </div>
            <h3>Konversi KTI Jadi Buku</h3>
            <p>Ubah Skripsi, Tesis, atau Disertasi Anda menjadi buku ber-ISBN secara profesional tanpa ribet.</p>
          </div>

          <div className={`glass-panel ${styles.serviceCard}`}>
            <div className={styles.serviceIconWrapper}>
              <ShieldCheck size={32} />
            </div>
            <h3>Pengurusan HAKI</h3>
            <p>Kami bantu lindungi Hak atas Kekayaan Intelektual karya Anda agar diakui secara hukum dan bebas dari plagiasi.</p>
          </div>
        </div>
      </section>

      <section className={styles.sliderSection}>
        <div className={styles.sliderContainer} ref={sliderRef}>
          {/* Menggunakan mockBooks pertama dan kedua sebagai slide unggulan */}
          {mockBooks.slice(0, 3).map((book) => (
            <div key={`slide-${book.id}`} className={styles.slideItem}>
              <Image 
                src={book.coverUrl} 
                alt={book.title} 
                fill 
                className={styles.slideImage} 
                priority 
              />
              <div className={styles.slideOverlay}>
                <h2 className={styles.slideTitle}>{book.title}</h2>
                <p className={styles.slideDesc}>{book.synopsis.substring(0, 100)}...</p>
                <Link href={`/buku/${book.id}`} className={styles.slideBtn}>
                  Lihat Detail Buku
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className={styles.catalogSection}>
        <div className={styles.sectionHeader}>
          <h2>Katalog Terbaru</h2>
        </div>
        
        <div className={styles.grid}>
          {mockBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </div>
  );
}

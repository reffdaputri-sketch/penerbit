"use client";

import { useEffect, useRef } from 'react';
import styles from './page.module.css';
import BookCard from '@/components/BookCard';
import { mockBooks } from '@/lib/mockData';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, ShoppingBag, FileText, ShieldCheck, ChevronRight } from 'lucide-react';

export default function Home() {
  const heroSliderRef = useRef<HTMLDivElement>(null);

  // Auto slide for hero section (optional)
  useEffect(() => {
    const slider = heroSliderRef.current;
    if (!slider) return;

    const slideTimer = setInterval(() => {
      if (slider.scrollWidth - slider.clientWidth <= slider.scrollLeft + 10) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: slider.clientWidth, behavior: 'smooth' });
      }
    }, 5000);

    return () => clearInterval(slideTimer);
  }, []);

  return (
    <div className="animate-fade-in">
      
      {/* Hero Featured Books (Like Play Books Header Carousel) */}
      <section className={styles.heroSliderSection}>
        <div className={styles.heroSliderContainer} ref={heroSliderRef}>
          {mockBooks.slice(0, 3).map((book) => (
            <div key={`hero-${book.id}`} className={styles.heroSlideItem}>
              <Image src={book.coverUrl} alt={book.title} fill className={styles.heroSlideImage} />
              <div className={styles.heroSlideOverlay}>
                <h2 className={styles.heroSlideTitle}>{book.title}</h2>
                <p className={styles.heroSlideDesc}>{book.synopsis}</p>
                <Link href={`/buku/${book.id}`} className={styles.heroSlideBtn}>
                  Lihat Buku
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Catalog Sliders */}
      <section className={styles.catalogSection}>
        <div className={styles.sectionHeader}>
          <h2>Ebook Populer</h2>
          <Link href="/katalog" className={styles.seeAllLink}>
            Lihat semua <ChevronRight size={16} />
          </Link>
        </div>
        <div className={styles.horizontalScroll}>
          {mockBooks.map((book) => (
            <div key={`populer-${book.id}`} className={styles.scrollItem}>
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.catalogSection}>
        <div className={styles.sectionHeader}>
          <h2>Rilis Baru</h2>
          <Link href="/katalog" className={styles.seeAllLink}>
            Lihat semua <ChevronRight size={16} />
          </Link>
        </div>
        <div className={styles.horizontalScroll}>
          {/* Reverse mock data just to show something different */}
          {[...mockBooks].reverse().map((book) => (
            <div key={`baru-${book.id}`} className={styles.scrollItem}>
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.catalogSection}>
        <div className={styles.sectionHeader}>
          <h2>Pilihan Editor</h2>
          <Link href="/katalog" className={styles.seeAllLink}>
            Lihat semua <ChevronRight size={16} />
          </Link>
        </div>
        <div className={styles.horizontalScroll}>
          {/* Slice data just to show something different */}
          {mockBooks.slice(3, 8).map((book) => (
            <div key={`editor-${book.id}`} className={styles.scrollItem}>
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </section>

      {/* Welcome & Services Section moved to bottom */}
      <section className={styles.welcomeSection}>
        <div className={styles.welcomeHeader}>
          <h2 className={styles.welcomeTitle}>Layanan <span className="gradient-text">PenerbitWeb</span></h2>
          <p className={styles.welcomeDesc}>
            Selain menyediakan buku digital berkualitas, kami juga hadir dengan berbagai layanan penerbitan terpadu.
          </p>
        </div>

        <div className={styles.servicesGrid}>
          <div className={`glass-panel ${styles.serviceCard}`}>
            <div className={styles.serviceIconWrapper}>
              <BookOpen size={32} />
            </div>
            <h3>Penerbitan Buku</h3>
            <p>Menawarkan paket penerbitan Indie dan Mayor yang disesuaikan dengan kebutuhan penulis.</p>
          </div>

          <div className={`glass-panel ${styles.serviceCard}`}>
            <div className={styles.serviceIconWrapper}>
              <ShoppingBag size={32} />
            </div>
            <h3>Toko Buku Online</h3>
            <p>Pesan buku fisik langsung melalui web ini maupun *marketplace* ternama.</p>
          </div>

          <div className={`glass-panel ${styles.serviceCard}`}>
            <div className={styles.serviceIconWrapper}>
              <FileText size={32} />
            </div>
            <h3>Konversi KTI</h3>
            <p>Ubah Skripsi, Tesis, atau Disertasi Anda menjadi buku ber-ISBN secara profesional.</p>
          </div>

          <div className={`glass-panel ${styles.serviceCard}`}>
            <div className={styles.serviceIconWrapper}>
              <ShieldCheck size={32} />
            </div>
            <h3>Pengurusan HAKI</h3>
            <p>Lindungi Hak atas Kekayaan Intelektual karya Anda agar diakui secara hukum.</p>
          </div>
        </div>
      </section>

    </div>
  );
}

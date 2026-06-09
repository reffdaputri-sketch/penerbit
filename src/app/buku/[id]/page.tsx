import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ShoppingCart, Calendar, Hash } from 'lucide-react';
import styles from './detail.module.css';
import { mockBooks } from '@/lib/mockData';
import BookCard from '@/components/BookCard';

export default async function BookDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const book = mockBooks.find((b) => b.id === resolvedParams.id);
  
  if (!book) {
    notFound();
  }

  return (
    <div className={`animate-fade-in ${styles.container}`}>
      <Link href="/" className={styles.backLink}>
        <ArrowLeft size={20} />
        Kembali ke Katalog
      </Link>
      
      <div className={`${styles.contentWrapper} glass-panel`}>
        <div className={styles.imageSection}>
          <div className={styles.imageWrapper}>
            <Image 
              src={book.coverUrl} 
              alt={book.title} 
              fill
              className={styles.coverImage}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
        
        <div className={styles.detailsSection}>
          <div className={styles.header}>
            <h1 className={styles.title}>{book.title}</h1>
            <p className={styles.author}>Oleh <span className="gradient-text">{book.author}</span></p>
          </div>
          
          <div className={styles.priceSection}>
            <span className={styles.price}>
              {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(book.price)}
            </span>
          </div>

          <div className={styles.metaData}>
            <div className={styles.metaItem}>
              <Calendar size={18} className={styles.metaIcon} />
              <span>Rilis: {new Date(book.publishedDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className={styles.metaItem}>
              <Hash size={18} className={styles.metaIcon} />
              <span>ISBN: {book.isbn}</span>
            </div>
          </div>

          <div className={styles.synopsis}>
            <h3>Sinopsis</h3>
            <p>{book.synopsis}</p>
          </div>

          <div className={styles.actions}>
            <button className={styles.ctaButton}>
              <ShoppingCart size={20} />
              Beli Sekarang
            </button>
          </div>
        </div>
      </div>

      <div className={styles.relatedSection}>
        <div className={styles.sectionHeader}>
          <h2>Buku Lainnya</h2>
        </div>
        <div className={styles.horizontalScroll}>
          {mockBooks
            .filter((b) => b.id !== book.id)
            .slice(0, 10)
            .map((relatedBook) => (
              <div key={relatedBook.id} className={styles.scrollItem}>
                <BookCard book={relatedBook} />
              </div>
          ))}
        </div>
      </div>
    </div>
  );
}

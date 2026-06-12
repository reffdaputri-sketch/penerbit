import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Hash } from 'lucide-react';
import styles from './detail.module.css';
import { supabase } from '@/lib/supabaseClient';
import BookCard from '@/components/BookCard';
import CheckoutForm from '@/components/CheckoutForm';

export default async function BookDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  // Fetch specific book
  const { data: book } = await supabase.from('books').select('*, categories(name)').eq('id', resolvedParams.id).single();
  
  if (!book) {
    notFound();
  }

  // Fetch related books (excluding the current one)
  const { data: relatedBooks } = await supabase
    .from('books')
    .select('*, categories(name)')
    .neq('id', book.id)
    .limit(10);

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
            {book.categories?.name && (
              <div style={{ marginBottom: '0.5rem' }}>
                <span style={{ 
                  fontSize: '0.8rem', 
                  backgroundColor: 'var(--accent-primary)', 
                  color: 'white', 
                  padding: '0.2rem 0.6rem', 
                  borderRadius: '4px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {book.categories.name}
                </span>
              </div>
            )}
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
            <CheckoutForm book={book} />
          </div>
        </div>
      </div>

      {relatedBooks && relatedBooks.length > 0 && (
        <div className={styles.relatedSection}>
          <div className={styles.sectionHeader}>
            <h2>Buku Lainnya</h2>
          </div>
          <div className={styles.horizontalScroll}>
            {relatedBooks.map((relatedBook: any) => (
              <div key={relatedBook.id} className={styles.scrollItem}>
                <BookCard book={relatedBook} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

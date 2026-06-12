import { supabase } from '@/lib/supabaseClient';
import BookCard from '@/components/BookCard';
import styles from './katalog.module.css';

// To ensure Next.js fetches fresh data or uses ISR
export const revalidate = 60;

export default async function Katalog() {
  const { data: books } = await supabase.from('books').select('*, categories(name)').order('created_at', { ascending: false });

  return (
    <div className={`animate-fade-in ${styles.katalogContainer}`}>
      <div className={styles.headerSection}>
        <h1 className={styles.title}>Katalog Buku</h1>
        <p className={styles.subtitle}>Jelajahi seluruh koleksi bacaan inspiratif kami</p>
      </div>

      <div className={styles.filtersSection}>
        <button className={`${styles.filterBtn} ${styles.active}`}>Semua</button>
        <button className={styles.filterBtn}>Fiksi</button>
        <button className={styles.filterBtn}>Non-Fiksi</button>
        <button className={styles.filterBtn}>Bisnis & Keuangan</button>
        <button className={styles.filterBtn}>Teknologi</button>
      </div>

      <div className={styles.grid}>
        {books && books.length > 0 ? (
          books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))
        ) : (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>Belum ada buku di katalog.</p>
        )}
      </div>
    </div>
  );
}

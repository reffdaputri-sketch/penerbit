import { mockBooks } from '@/lib/mockData';
import BookCard from '@/components/BookCard';
import styles from './katalog.module.css';

export default function Katalog() {
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
        {mockBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

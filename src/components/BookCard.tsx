import Image from 'next/image';
import Link from 'next/link';
import styles from './BookCard.module.css';
import { Book } from '@/lib/mockData';

export default function BookCard({ book }: { book: Book }) {
  return (
    <Link href={`/buku/${book.id}`} className={styles.cardLink}>
      <div className={`${styles.card} glass-panel`}>
        <div className={styles.imageWrapper}>
          <Image 
            src={book.coverUrl} 
            alt={`Cover ${book.title}`} 
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className={styles.overlay}>
            <span className={styles.readMore}>Lihat Detail</span>
          </div>
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{book.title}</h3>
          <p className={styles.author}>{book.author}</p>
          <div className={styles.priceTag}>
            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(book.price)}
          </div>
        </div>
      </div>
    </Link>
  );
}

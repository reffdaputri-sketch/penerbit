import Image from 'next/image';
import Link from 'next/link';
import styles from './BookCard.module.css';
import { Book } from '@/lib/mockData';

export default function BookCard({ book }: { book: any }) {
  return (
    <Link href={`/buku/${book.id}`} className={styles.cardLink}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <Image 
            src={book.coverUrl} 
            alt={`Cover ${book.title}`} 
            fill 
            className={styles.image} 
          />
        </div>
        <div className={styles.content}>
          {book.categories?.name && (
            <span className={styles.categoryBadge}>{book.categories.name}</span>
          )}
          <h3 className={styles.title}>{book.title}</h3>
          <p className={styles.author}>{book.author}</p>
          <p className={styles.priceTag}>
            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(book.price)}
          </p>
        </div>
      </div>
    </Link>
  );
}

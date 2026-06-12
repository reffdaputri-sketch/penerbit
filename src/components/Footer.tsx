import Link from 'next/link';
import { BookOpen, Globe, MessageCircle, Phone, Mail } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContent}`}>
        <div className={styles.brandSection}>
          <Link href="/" className={styles.logo}>
            <div className={styles.iconWrapper}>
              <BookOpen size={24} />
            </div>
            <span className="gradient-text">PenerbitWeb</span>
          </Link>
          <p className={styles.description}>
            Menghadirkan karya literasi berkualitas untuk mencerahkan, menginspirasi, dan menemani setiap langkah perjalanan Anda.
          </p>
          <div className={styles.socials}>
            <a href="#" className={styles.socialLink}><Globe size={20} /></a>
            <a href="#" className={styles.socialLink}><MessageCircle size={20} /></a>
            <a href="#" className={styles.socialLink}><Phone size={20} /></a>
            <a href="#" className={styles.socialLink}><Mail size={20} /></a>
          </div>
        </div>

        <div className={styles.linksSection}>
          <h4 className={styles.linkTitle}>Jelajahi</h4>
          <ul className={styles.linkList}>
            <li><Link href="/">Katalog Buku</Link></li>
            <li><Link href="/penerbit">Profil Penerbit</Link></li>
            <li><Link href="#">Promo & Diskon</Link></li>
            <li><Link href="#">Penulis Kami</Link></li>
          </ul>
        </div>

        <div className={styles.linksSection}>
          <h4 className={styles.linkTitle}>Bantuan</h4>
          <ul className={styles.linkList}>
            <li><Link href="/info/cara-belanja">Cara Belanja</Link></li>
            <li><Link href="/info/pengiriman">Pengiriman</Link></li>
            <li><Link href="/info/faq">FAQ</Link></li>
            <li><Link href="/info/hubungi-kami">Hubungi Kami</Link></li>
          </ul>
        </div>
      </div>
      
      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomContent}`}>
          <p>&copy; {new Date().getFullYear()} PenerbitWeb. Hak Cipta Dilindungi.</p>
          <div className={styles.bottomLinks}>
            <Link href="/info/kebijakan-privasi">Kebijakan Privasi</Link>
            <Link href="/info/syarat-ketentuan">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

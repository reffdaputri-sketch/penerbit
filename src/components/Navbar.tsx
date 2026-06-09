"use client";

import { useState } from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';
import { BookOpen, User, Menu, X } from 'lucide-react';

const categories = [
  "Semua Kategori",
  "Teknologi & IT",
  "Bisnis & Keuangan",
  "Pengembangan Diri",
  "Fiksi & Sastra",
  "Sains & Sejarah"
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={`${styles.navbar} glass-panel`}>
      <div className={`container ${styles.navContainer}`}>
        <div className={styles.leftSection}>
          <button 
            className={styles.menuBtn} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Category Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <Link href="/" className={styles.logo}>
            <div className={styles.iconWrapper}>
              <BookOpen size={24} />
            </div>
            <span className="gradient-text">PenerbitWeb</span>
          </Link>
        </div>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className={styles.dropdownMenu}>
            <ul className={styles.categoryList}>
              <li className={`${styles.dropdownHeader} ${styles.mobileOnlyLink}`}>Menu Utama</li>
              <li className={styles.mobileOnlyLink}>
                <Link href="/" className={styles.categoryItem} onClick={() => setIsMenuOpen(false)}>Katalog Buku</Link>
              </li>
              <li className={styles.mobileOnlyLink}>
                <Link href="/profile" className={styles.categoryItem} onClick={() => setIsMenuOpen(false)}>Profil Pengguna</Link>
              </li>
              <li className={styles.mobileOnlyLink}><hr className={styles.divider} /></li>
              
              <li className={styles.dropdownHeader}>Kategori Buku</li>
              {categories.map((cat, idx) => (
                <li key={idx}>
                  <Link 
                    href="#" 
                    className={styles.categoryItem}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className={styles.navLinks}>
          <Link href="/" className={styles.link}>Katalog</Link>
          <Link href="/profile" className={styles.profileBtn}>
            <User size={18} />
            <span>Profil</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

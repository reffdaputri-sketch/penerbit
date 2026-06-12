import Image from 'next/image';
import { Target, Users, Award, BookOpen } from 'lucide-react';
import styles from './penerbit.module.css';

export default function PenerbitProfile() {
  return (
    <div className={`animate-fade-in ${styles.container}`}>
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Tentang <span className="gradient-text">PenerbitWeb</span></h1>
          <p className={styles.subtitle}>
            Berdiri sejak tahun 2015, kami berkomitmen untuk menjadi jembatan antara gagasan cemerlang penulis dengan antusiasme para pembaca di seluruh nusantara.
          </p>
        </div>
        <div className={styles.heroImageWrapper}>
          <Image 
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
            alt="Perpustakaan PenerbitWeb" 
            fill 
            className={styles.heroImage} 
          />
        </div>
      </div>

      <div className={styles.statsSection}>
        <div className={`glass-panel ${styles.statBox}`}>
          <BookOpen className={styles.statIcon} size={36} />
          <h3 className={styles.statNumber}>500+</h3>
          <p className={styles.statLabel}>Judul Buku</p>
        </div>
        <div className={`glass-panel ${styles.statBox}`}>
          <Users className={styles.statIcon} size={36} />
          <h3 className={styles.statNumber}>150+</h3>
          <p className={styles.statLabel}>Penulis Aktif</p>
        </div>
        <div className={`glass-panel ${styles.statBox}`}>
          <Award className={styles.statIcon} size={36} />
          <h3 className={styles.statNumber}>12</h3>
          <p className={styles.statLabel}>Penghargaan Nasional</p>
        </div>
      </div>

      <div className={styles.missionSection}>
        <h2 className={styles.sectionTitle}>Visi & Misi</h2>
        <div className={styles.missionGrid}>
          <div className={`glass-panel ${styles.missionCard}`}>
            <Target className={styles.missionIcon} size={32} />
            <h3>Visi Kami</h3>
            <p>Menjadi penerbit terdepan yang menginspirasi generasi melalui literatur berkualitas tinggi yang mencerdaskan kehidupan bangsa.</p>
          </div>
          <div className={`glass-panel ${styles.missionCard}`}>
            <Users className={styles.missionIcon} size={32} />
            <h3>Misi Kami</h3>
            <p>Memfasilitasi penulis berbakat, menjamin standar editorial tertinggi, dan memanfaatkan teknologi untuk mendistribusikan ilmu secara merata.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

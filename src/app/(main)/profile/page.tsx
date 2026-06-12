import { User, Mail, Shield, BookOpen, Clock } from 'lucide-react';
import styles from './profile.module.css';

export default function Profile() {
  return (
    <div className={`animate-fade-in ${styles.container}`}>
      <div className={styles.header}>
        <h1>Profil Saya</h1>
        <p className={styles.subtitle}>Kelola informasi akun dan riwayat aktivitas Anda.</p>
      </div>

      <div className={styles.grid}>
        <div className={`${styles.card} glass-panel`}>
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>
              <User size={48} />
            </div>
            <div>
              <h2 className={styles.name}>Pengguna Demo</h2>
              <p className={styles.role}>Anggota Premium</p>
            </div>
          </div>

          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <Mail className={styles.icon} size={20} />
              <div>
                <span className={styles.label}>Email</span>
                <p className={styles.value}>demo@penerbitweb.com</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <Shield className={styles.icon} size={20} />
              <div>
                <span className={styles.label}>Keamanan</span>
                <p className={styles.value}>Password terakhir diubah 30 hari yang lalu</p>
              </div>
            </div>
          </div>
          
          <button className={styles.editBtn}>Edit Profil</button>
        </div>

        <div className={styles.activitySection}>
          <div className={`${styles.card} glass-panel`}>
            <h3 className={styles.sectionTitle}>Statistik Aktivitas</h3>
            <div className={styles.statsGrid}>
              <div className={styles.statBox}>
                <BookOpen size={32} className={styles.statIcon} />
                <span className={styles.statNumber}>12</span>
                <span className={styles.statLabel}>Buku Dibeli</span>
              </div>
              <div className={styles.statBox}>
                <Clock size={32} className={styles.statIcon} />
                <span className={styles.statNumber}>5</span>
                <span className={styles.statLabel}>Menunggu Pembayaran</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

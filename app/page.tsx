'use client';
import styles from '../styles/page.module.css';
import { usePathname } from 'next/navigation';
import Header from '../components/header';

export default function Home() {
  const pathname = usePathname();

  return (
    <div className={styles.page}>
      <Header pathname={pathname} />
      <section className={styles.section}>
        <main className={styles.mainColumns}>
          <div className={styles.card}></div>
        </main>
      </section>
    </div>
  );
}

'use client';
import styles from '../styles/page.module.css';
import { usePathname } from 'next/navigation';
import Header from '../components/header';

export default function Home() {
  const pathname = usePathname();

  return (
    <div className={styles.page}>
      <Header pathname={pathname} />
      <main className={styles.section} id="main-content" tabIndex={-1}>
        <section className={styles.mainColumns} aria-labelledby="form-title">
          <div className={styles.card}>
            <h1 className={styles.hidden} id="form-title">
              Home
            </h1>
          </div>
        </section>
      </main>
    </div>
  );
}

'use client';
import Image from 'next/image';
import styles from '../styles/page.module.css';
import { isSelected } from '@/lib/path';
import { usePathname } from 'next/navigation';

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a className={styles.logoLink} href="/">
          <Image className={styles.logo} src="/images/open-audio-stack-logo.svg" width={194} height={34} alt="Open Audio Stack logo" />
        </a>
        <nav className={styles.nav}>
          <ul>
            <li>
              <a
                href="/"
                className={isSelected(usePathname(), `/`)}
              >plugin</a>
            </li>
            <li>
              <a
                href="/preset"
                className={isSelected(usePathname(), `/preset`)}
              >preset</a>
            </li>
            <li>
              <a
                href="/project"
                className={isSelected(usePathname(), `/project`)}
              >project</a>
            </li>
          </ul>
        </nav>
      </header>
      <section className={styles.section}>
        <main className={styles.main}>
          <p>content</p>
        </main>
      </section>
    </div>
  )
}

'use client';
import Image from 'next/image';
import styles from '../styles/page.module.css';
import { isSelected } from '@/lib/path';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.logoLink} href="/">
          <Image
            className={styles.logo}
            src="/images/open-audio-stack-logo.svg"
            width={194}
            height={34}
            alt="Open Audio Stack logo"
          />
        </Link>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href="/" className={isSelected(usePathname(), `/`)}>
                plugin
              </Link>
            </li>
            <li>
              <Link href="/preset" className={isSelected(usePathname(), `/preset`)}>
                preset
              </Link>
            </li>
            <li>
              <Link href="/project" className={isSelected(usePathname(), `/project`)}>
                project
              </Link>
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
  );
}

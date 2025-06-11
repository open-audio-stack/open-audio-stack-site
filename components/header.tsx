import Link from 'next/link';
import styles from '../styles/components/header.module.css';
import Image from 'next/image';
import { getBasePath, isSelected } from '../lib/path';

type HeaderProps = {
  pathname: string;
};

const Header = ({ pathname }: HeaderProps) => (
  <header className={styles.header}>
    <Link className={styles.logoLink} href="/">
      <Image
        className={styles.logo}
        src={`${getBasePath()}/images/open-audio-stack-logo.svg`}
        width={194}
        height={34}
        alt="Open Audio Stack logo"
      />
    </Link>
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href="/" className={isSelected(pathname, `/`)}>
            <span className={pathname === '/' ? styles.selectedTab : ''}>plugin</span>
          </Link>
        </li>
        <li>
          <Link href="/preset" className={isSelected(pathname, `/preset`)}>
            <span className={pathname === '/preset' ? styles.selectedTab : ''}>preset</span>
          </Link>
        </li>
        <li>
          <Link href="/project" className={isSelected(pathname, `/project`)}>
            <span className={pathname === '/project' ? styles.selectedTab : ''}>project</span>
          </Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;

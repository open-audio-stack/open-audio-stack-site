import Link from 'next/link';
import styles from '../styles/components/header.module.css';
import Image from 'next/image';
import { isSelected } from '../lib/path';
import logo from '../public/images/open-audio-stack-logo.svg';

type HeaderProps = {
  pathname: string;
};

const Header = ({ pathname }: HeaderProps) => (
  <header className={styles.header}>
    <Link className={styles.logoLink} href="/">
      <Image className={styles.logo} src={logo} width={194} height={34} alt="Open Audio Stack logo" />
    </Link>
    <nav className={styles.nav} aria-label="Main navigation">
      <ul>
        <li>
          <Link
            href="/plugin"
            className={isSelected(pathname, `/plugin`)}
            aria-current={isSelected(pathname, `/plugin`) ? 'page' : undefined}
          >
            <span className={isSelected(pathname, `/plugin`) ? styles.selectedTab : ''}>add plugin</span>
          </Link>
        </li>
        <li>
          <Link
            href="/preset"
            className={isSelected(pathname, `/preset`)}
            aria-current={isSelected(pathname, `/preset`) ? 'page' : undefined}
          >
            <span className={isSelected(pathname, `/preset`) ? styles.selectedTab : ''}>add preset</span>
          </Link>
        </li>
        <li>
          <Link
            href="/project"
            className={isSelected(pathname, `/project`)}
            aria-current={isSelected(pathname, `/project`) ? 'page' : undefined}
          >
            <span className={isSelected(pathname, `/project`) ? styles.selectedTab : ''}>add project</span>
          </Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;

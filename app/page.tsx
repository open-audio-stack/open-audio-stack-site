'use client';
import styles from '../styles/page.module.css';
import { usePathname } from 'next/navigation';
import Header from '../components/header';
import { Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import diagram from '../public/images/open-audio-stack-diagram.svg';
import external from '../public/icons/external.svg';
import owlplug from '../public/images/owlplug-logo.svg';
import studiorack from '../public/images/studiorack-logo.svg';

export default function Home() {
  const pathname = usePathname();

  return (
    <div className={styles.page}>
      <Header pathname={pathname} />
      <main className={styles.section} id="main-content" tabIndex={-1}>
        <section className={`${styles.mainColumns} ${styles.mainHome}`} aria-labelledby="form-title">
          <div className={styles.card}>
            <h1 id="form-title">An open standard for audio package management</h1>
            <p>
              Built on principles from modern software package managers, our specification simplifies the management and
              distribution of audio plugins, presets, and projects.
            </p>
            <Button className={styles.button} variant="contained" component={Link} href="/plugin">
              Add a package
            </Button>
            <Button
              className={`${styles.button} ${styles.buttonOutlined}`}
              variant="outlined"
              href="https://open-audio-stack.github.io/open-audio-stack-registry/"
              target="_blank"
              endIcon={<Image src={external} alt="" width={12} height={12} />}
            >
              View the registry
            </Button>
          </div>
          <div className={`${styles.card} ${styles.cardDiagram}`}>
            <Image src={diagram} alt="Open Audio Stack diagram" className={styles.image} />
            <div className={`${styles.caption} ${styles.captionRegistry}`}>
              <h3>Registry</h3>
              <p>Database of package metadata and files with an API for read access.</p>
              <Button
                variant="contained"
                href="https://github.com/open-audio-stack/open-audio-stack-registry/blob/main/specification.md"
                target="_blank"
                endIcon={<Image src={external} alt="" width={12} height={12} />}
              >
                View docs
              </Button>
            </div>
            <div className={`${styles.caption} ${styles.captionManager}`}>
              <h3>Manager</h3>
              <p>Uses Registry API to search, view, download and install packages.</p>
              <Button
                variant="contained"
                href="https://github.com/open-audio-stack/open-audio-stack-core/blob/main/specification.md"
                target="_blank"
                endIcon={<Image src={external} alt="" width={12} height={12} />}
              >
                View docs
              </Button>
            </div>
          </div>
        </section>
        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <p>INTEGRATED WITH</p>
            <div className={styles.logos}>
              <Link href="https://studiorack.github.io/studiorack-site/" target="_blank">
                <Image src={studiorack} alt="StudioRack logo" width={155} height={19} />
              </Link>
              <Link href="https://owlplug.com" target="_blank">
                <Image src={owlplug} alt="OwlPlug logo" width={99} height={27} />
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

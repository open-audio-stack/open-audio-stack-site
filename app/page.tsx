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
          <p className={styles.message}>
  Open Audio Stack is a newly created set of open-source audio package management software and standards. The 

  goal is to simplify the distribution and installation of FOSS plugins, presets, projects, and eventually 
also 
  samples and MIDI.
          </p>
          <p className={styles.message}>
  Platforms that have currently integrated OAS as of July 2025:
  <br/>
  <a href="https://studiorack.github.io/studiorack-site">StudioRack</a>
  <br/>
  <a href="https://owlplug.com">OwlPlug</a>
          </p>
          <p className={styles.message}>
  The registry API can be accessed <a 
href="https://open-audio-stack.github.io/open-audio-stack-registry">here</a>
          </p>
          <p className={styles.message}>
  The npm package can be accessed <a href="https://www.npmjs.com/package/@open-audio-stack/core">here</a>
          </p>
          <p className={styles.message}>
  For any inquiries, <a href="mailto:hello@kimturley.co.uk">get in touch</a>
          </p>
          <p className={styles.message}>
  Our Github is <a href="https://github.com/open-audio-stack">here</a>
          </p>
        </main>
      </section>
    </div>
  );

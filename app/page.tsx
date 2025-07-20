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
          Open Audio Stack is a newly created set of open-source audio package management software and standards. The goal is to simplify the distribution and installation of FOSS plugins, presets, projects, and eventually also samples and MIDI.

Platforms that have currently integrated OAS as of July 2025:
- [StudioRack](https://studiorack.github.io/studiorack-site)
- [OwlPlug](https://owlplug.com)

The registry API can be accessed [here](https://open-audio-stack.github.io/open-audio-stack-registry)

The npm package can be accessed [here](https://www.npmjs.com/package/@open-audio-stack/core)

For any inquiries, [get in touch](hello@kimturley.co.uk)

Our Github is [here](https://github.com/open-audio-stack)
        </p>
        </main>
      </section>
    </div>
  );

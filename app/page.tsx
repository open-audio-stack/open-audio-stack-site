'use client';
import styles from '../styles/page.module.css';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PluginInterface } from '@open-audio-stack/core';

import Header from '../components/header';
import Selector from '../components/selector';
import Details from '../components/details';
import Files from '../components/files';
import Editor from '../components/editor';

const DEFAULT_PLUGIN = 'surge-synthesizer/surge/1.3.4';

export default function Home() {
  const pathname = usePathname();
  const [form, setForm] = useState<PluginInterface | null>(null);
  const [selectedPlugin, setSelectedPlugin] = useState(DEFAULT_PLUGIN);

  useEffect(() => {
    fetch(`https://open-audio-stack.github.io/open-audio-stack-registry/plugins/${DEFAULT_PLUGIN}/`)
      .then(res => res.json())
      .then(data => setForm(data));
  }, []);

  return (
    <div className={styles.page}>
      <Header pathname={pathname} />
      <section className={styles.section}>
        {form ? (
          <main className={styles.mainColumns}>
            <div className={styles.card}>
              <Selector setForm={setForm} selectedPlugin={selectedPlugin} setSelectedPlugin={setSelectedPlugin} />
              <Details form={form} setForm={setForm} />
            </div>
            <div className={styles.card}>
              <Files form={form} setForm={setForm} />
            </div>
            <div className={`${styles.card} ${styles.metadata}`}>
              <Editor form={form} setForm={setForm} />
            </div>
          </main>
        ) : (
          <main className={styles.mainColumns}>
            <div className={styles.card}>Loading...</div>
          </main>
        )}
      </section>
    </div>
  );
}

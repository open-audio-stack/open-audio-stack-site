'use client';
import styles from '../styles/page.module.css';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PackageVersion, pluginFormats, pluginTypes, RegistryType } from '@open-audio-stack/core';

import Header from '../components/header';
import Selector from '../components/selector';
import Details from '../components/details';
import Files from '../components/files';
import Editor from '../components/editor';

const ROOT_URL = `https://open-audio-stack.github.io/open-audio-stack-registry`;
const PKG: string = 'surge-synthesizer/surge/1.3.4';
const PKG_FORMATS = pluginFormats;
const PKG_TYPE: RegistryType = RegistryType.Plugins;
const PKG_TYPES = pluginTypes;

export default function Home() {
  const pathname = usePathname();
  const [form, setForm] = useState<PackageVersion | null>(null);
  const [selectedPkg, setSelectedPkg] = useState(PKG);

  useEffect(() => {
    fetch(`${ROOT_URL}/${PKG_TYPE}/${PKG}/`)
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
              <Selector
                setForm={setForm}
                selectedPkg={selectedPkg}
                setSelectedPkg={setSelectedPkg}
                url={`${ROOT_URL}/${PKG_TYPE}`}
              />
              <Details form={form} pkgTypes={PKG_TYPES} setForm={setForm} />
            </div>
            <div className={styles.card}>
              <Files form={form} pkgFormats={PKG_FORMATS} setForm={setForm} />
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

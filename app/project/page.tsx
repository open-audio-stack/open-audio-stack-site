'use client';
import styles from '../../styles/page.module.css';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PackageVersion, projectFormats, ProjectInterface, projectTypes, RegistryType } from '@open-audio-stack/core';

import Header from '../../components/header';
import Selector from '../../components/selector';
import Details from '../../components/details';
import Files from '../../components/files';
import Editor from '../../components/editor';
import MultiSelect from '../../components/multiselect';

const ROOT_URL = `https://open-audio-stack.github.io/open-audio-stack-registry`;
const PKG: string = 'kmt/banwer/1.0.1';
const PKG_FORMATS = projectFormats;
const PKG_TYPE: RegistryType = RegistryType.Projects;
const PKG_TYPES = projectTypes;

export default function Home() {
  const pathname = usePathname();
  const [form, setForm] = useState<PackageVersion | null>(null);
  const [selectedPkg, setSelectedPkg] = useState(PKG);
  const [version, setVersion] = useState<string | undefined>(PKG.split('/').pop());

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
                setVersion={setVersion}
                url={`${ROOT_URL}/${PKG_TYPE}`}
              />
              <Details form={form} pkgTypes={PKG_TYPES} setForm={setForm} version={version} setVersion={setVersion} />
              <MultiSelect
                value={(form as ProjectInterface).plugins || {}}
                onChange={plugins => setForm(f => (f ? { ...f, plugins } : f))}
                url={`${ROOT_URL}/plugins`}
              />
            </div>
            <div className={styles.card}>
              <Files form={form} pkgFormats={PKG_FORMATS} setForm={setForm} />
            </div>
            <div className={`${styles.card} ${styles.metadata}`}>
              <Editor form={form} pkgType={PKG_TYPE} setForm={setForm} version={version} />
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

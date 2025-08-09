'use client';
import styles from '../../styles/page.module.css';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  PackageVersion,
  presetFormats,
  presetTypes,
  RegistryType,
  PresetFile,
  PresetType,
  License,
  FileType,
  PresetInterface,
} from '@open-audio-stack/core';

import Header from '../../components/header';
import Selector from '../../components/selector';
import Details from '../../components/details';
import Files from '../../components/files';
import Editor from '../../components/editor';
import MultiSelect from '../../components/multiselect';

const ROOT_URL = `https://open-audio-stack.github.io/open-audio-stack-registry`;
const PKG_FORMATS = presetFormats;
const PKG_TYPE: RegistryType = RegistryType.Presets;
const PKG_TYPES = presetTypes;

function getBlankFile(): PresetFile {
  return {
    architectures: [],
    contains: [],
    sha256: '',
    systems: [],
    size: 0,
    type: FileType.Archive,
    url: '',
  };
}

function getBlankPresetVersion(): PackageVersion {
  return {
    name: '',
    author: '',
    description: '',
    type: PresetType.Patch,
    license: License.GNUGeneralPublicLicensev3,
    tags: [],
    url: '',
    audio: '',
    image: '',
    date: '',
    changes: '',
    files: [getBlankFile()],
    [RegistryType.Plugins]: {},
  };
}

export default function Home() {
  const pathname = usePathname();
  const [form, setForm] = useState<PackageVersion>(getBlankPresetVersion());
  const [selectedPkg, setSelectedPkg] = useState<string>('');
  const [version, setVersion] = useState<string | undefined>(undefined);

  const handleSelectPkg = (pkg: string) => {
    setSelectedPkg(pkg);
    if (pkg) {
      fetch(`${ROOT_URL}/${PKG_TYPE}/${pkg}/`)
        .then(res => res.json())
        .then((data: PackageVersion) => {
          // Remove calculated field.
          delete data.verified;
          setForm(data);
          setVersion(pkg.split('/').pop());
        });
    } else {
      setForm(getBlankPresetVersion());
      setVersion(undefined);
    }
  };

  return (
    <div className={styles.page}>
      <Header pathname={pathname} />
      <main className={styles.section} id="main-content" tabIndex={-1}>
        <section className={styles.mainColumns} aria-labelledby="form-title">
          <div className={styles.card}>
            <h1 className={styles.hidden} id="form-title">
              Add preset
            </h1>
            <Selector
              selectedPkg={selectedPkg}
              setSelectedPkg={handleSelectPkg}
              setVersion={setVersion}
              url={`${ROOT_URL}/${PKG_TYPE}`}
              includeBlankTemplate
              blankLabel="Select a template"
            />
            <Details form={form} pkgTypes={PKG_TYPES} setForm={setForm} version={version} setVersion={setVersion} />
            <MultiSelect
              value={(form as PresetInterface).plugins || {}}
              onChange={plugins => setForm(f => ({ ...f, plugins }))}
              url={`${ROOT_URL}/plugins`}
            />
          </div>
          <div className={styles.card}>
            <Files form={form} pkgFormats={PKG_FORMATS} setForm={setForm} />
          </div>
          <div className={`${styles.card} ${styles.metadata}`}>
            <Editor form={form} pkgType={PKG_TYPE} setForm={setForm} version={version} />
          </div>
        </section>
      </main>
    </div>
  );
}

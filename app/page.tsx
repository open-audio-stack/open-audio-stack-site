'use client';
import Image from 'next/image';
import styles from '../styles/page.module.css';
import { isSelected } from '@/lib/path';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const pathname = usePathname();

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
      <section className={styles.section}>
        <main className={styles.mainColumns}>
          <div className={styles.card}>
            <h4>Details</h4>
            <div className={styles.formGroup}>
              <input className={styles.input} placeholder="Name" />
              <input className={styles.input} placeholder="Author" />
            </div>
            <textarea className={styles.textarea} placeholder="Description" />
            <div className={styles.formGroup}>
              <select className={styles.select}>
                <option>Type</option>
              </select>
              <select className={styles.select}>
                <option>License</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <select className={styles.select}>
                <option>Synth</option>
              </select>
            </div>
            <input className={styles.input} placeholder="Homepage url" />
            <input className={styles.input} placeholder="Audio preview url" />
            <input className={styles.input} placeholder="Image preview url" />
            <div className={styles.formGroup}>
              <input className={styles.input} placeholder="Version" />
              <input className={styles.input} placeholder="Release date" type="date" />
            </div>
            <textarea className={styles.textarea} placeholder="List of changes" />
          </div>
          <div className={styles.card}>
            <div className={styles.filesHeader}>
              <h4>Files</h4>
            </div>
            <div className={styles.formGroup}>
              <select className={styles.select}>
                <option>Type</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <input className={styles.input} placeholder="Url" />
            </div>
            <div className={styles.formGroup}>
              <input className={styles.input} placeholder="Size" />
              <input className={styles.input} placeholder="Sha256" />
            </div>
          </div>
          <div className={`${styles.card} ${styles.metadata}`}>
            <h4>Metadata</h4>
            <pre className={styles.codeBlock}>
              {`name: Surge XT
author: Surge Synth Team
description: Hybrid synthesizer featuring many synth engines
license: gpl-3.0
type: instrument
tags:
  - Instrument
  - Synth
  - Modulation
url: https://github.com/surge-synthesizer/surge
audio: https://open-audio-stack.github.io/open-audio-stack/surge.mp3
image: https://open-audio-stack.github.io/open-audio-stack/surge.png
date: '2024-08-11T00:00:00.000Z'
changes:
  - Fix a logic error in creating Surge XT folder in macOS
  - Add 1.3.3 cherry pick list and bump cmakelists version
  - Update tempo after patch load and calculate time...
  - Update LFO and Step Seq presets to have the LFO Env...
files:
  - systems:
      - type: linux
        architectures:
          - x64
        contains:
          - elf
          - clap
          - lv2
          - vst3
    type: installer
    size: 223339140
    sha256: d6e560448f7624147d515b9ae5fc79a586b69746
`}
            </pre>
          </div>
        </main>
      </section>
    </div>
  );
}

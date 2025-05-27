'use client';
import Image from 'next/image';
import styles from '../styles/page.module.css';
import { isSelected } from '@/lib/path';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { fileTypes, licenses, pluginTypes } from '@open-audio-stack/core';
import {
  Autocomplete,
  Chip,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

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
              <TextField label="Name" variant="filled" fullWidth />
              <TextField label="Author" variant="filled" fullWidth />
            </div>
            <TextField label="Description" variant="filled" multiline />
            <div className={styles.formGroup}>
              <FormControl variant="filled" fullWidth>
                <InputLabel id="label-type">Type</InputLabel>
                <Select label="Type" labelId="label-type">
                  {pluginTypes.map(pluginType => {
                    return (
                      <MenuItem value={pluginType.value} key={pluginType.value}>
                        {pluginType.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl variant="filled" fullWidth>
                <InputLabel id="label-license">License</InputLabel>
                <Select label="License" variant="filled" labelId="label-license">
                  {licenses.map(license => {
                    return (
                      <MenuItem value={license.value} key={license.value}>
                        {license.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className={styles.formGroup}>
              <Autocomplete
                options={[]}
                freeSolo
                renderValue={(value: readonly string[], getItemProps) =>
                  value.map((option: string, index: number) => {
                    const { key, ...itemProps } = getItemProps({ index });
                    return <Chip variant="outlined" label={option} key={key} {...itemProps} />;
                  })
                }
                renderInput={params => (console.log(params), (<TextField {...params} variant="filled" label="Tags" />))}
                fullWidth
                multiple
              />
            </div>
            <TextField label="Homepage url" variant="filled" fullWidth />
            <TextField label="Audio preview url" variant="filled" fullWidth />
            <TextField label="Image preview url" variant="filled" fullWidth />
            <div className={styles.formGroup}>
              <TextField
                label="Version"
                variant="filled"
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start">v</InputAdornment>,
                  },
                }}
              />
              <input className={styles.input} placeholder="Release date" type="date" />
            </div>
            <TextField label="Change list" variant="filled" fullWidth multiline />
          </div>
          <div className={styles.card}>
            <div className={styles.filesHeader}>
              <h4>Files</h4>
            </div>
            <div className={styles.formGroup}>
              <FormControl variant="filled" fullWidth>
                <InputLabel id="label-filetype">File type</InputLabel>
                <Select label="File type" variant="filled" labelId="label-filetype">
                  {fileTypes.map(fileType => {
                    return (
                      <MenuItem value={fileType.value} key={fileType.value}>
                        {fileType.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className={styles.formGroup}>
              <TextField label="File url" variant="filled" fullWidth />
            </div>
            <div className={styles.formGroup}>
              <TextField label="File size" variant="filled" fullWidth />
              <TextField label="File sha256" variant="filled" fullWidth />
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

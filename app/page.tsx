'use client';
import Image from 'next/image';
import styles from '../styles/page.module.css';
import { isSelected } from '../lib/path';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import {
  fileTypes,
  licenses,
  PackageVersionValidator,
  pluginTypes,
  PluginInterface,
  Architecture,
  PluginFormat,
  SystemType,
  FileType,
  License,
  PluginType,
  PackageFileValidator,
  PluginFile,
  packageToYaml,
} from '@open-audio-stack/core';
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

// Example data to show how the form populates
/* eslint-disable  prefer-const */
let VERSION: string = '1.3.1';
const PLUGIN: PluginInterface = {
  audio: 'https://open-audio-stack.github.io/open-audio-stack-registry/plugins/surge-synthesizer/surge/surge.flac',
  author: 'Surge Synth Team',
  changes: '- Fixed bug with audio\n- New feature added\n',
  date: '2024-03-02T00:00:00.000Z',
  description:
    'Hybrid synthesizer featuring many synthesis techniques, a great selection of filters, a flexible modulation engine, a smorgasbord of effects, and modern features like MPE and microtuning.',
  files: [
    {
      architectures: [Architecture.X64],
      contains: [
        PluginFormat.LinuxStandalone,
        PluginFormat.CleverAudioPlugin,
        PluginFormat.LADSPAVersion2,
        PluginFormat.VST3,
      ],
      sha256: '729d92b5a4288f4c22587b8e84244c26aef34e58312ab5b4f4d1f196699b802e',
      systems: [{ type: SystemType.Linux }],
      size: 220693484,
      type: FileType.Installer,
      url: 'https://github.com/surge-synthesizer/releases-xt/releases/download/1.3.1/surge-xt-linux-x64-1.3.1.deb',
    },
    {
      architectures: [Architecture.X64],
      contains: [
        PluginFormat.LinuxStandalone,
        PluginFormat.CleverAudioPlugin,
        PluginFormat.LADSPAVersion2,
        PluginFormat.VST3,
      ],
      sha256: '135e9b8d3e71ab4dd502eee464b99f82c733be2ae23e8fca3724773dee3d54e8',
      systems: [{ type: SystemType.Linux }],
      size: 346260010,
      type: FileType.Installer,
      url: 'https://github.com/surge-synthesizer/releases-xt/releases/download/1.3.1/surge-xt-x86_64-1.3.1.rpm',
    },
    {
      architectures: [Architecture.Arm64, Architecture.X64],
      contains: [
        PluginFormat.MacStandalone,
        PluginFormat.CleverAudioPlugin,
        PluginFormat.AudioUnits,
        PluginFormat.VST3,
      ],
      sha256: 'e30b218700d4067edb3a0eadb4128784e41f91f663cff19e3fbb38460883cf59',
      systems: [{ type: SystemType.Mac }],
      size: 411860016,
      type: FileType.Installer,
      url: 'https://github.com/surge-synthesizer/releases-xt/releases/download/1.3.1/surge-xt-macOS-1.3.1.dmg',
    },
    {
      architectures: [Architecture.X32],
      contains: [PluginFormat.WinStandalone, PluginFormat.VST3],
      sha256: '3d766adb0d04b86f7aca8c136bc4c7b0727d316ec10895f679f1c01b0c236a00',
      systems: [{ type: SystemType.Win }],
      size: 180270273,
      type: FileType.Installer,
      url: 'https://github.com/surge-synthesizer/releases-xt/releases/download/1.3.1/surge-xt-win32-1.3.1-setup.exe',
    },
    {
      architectures: [Architecture.X64],
      contains: [PluginFormat.WinStandalone, PluginFormat.CleverAudioPlugin, PluginFormat.VST3],
      sha256: '2bac9c87c3e4293ecc4110087f5bb90a5218427921613409b84673f513f02bd3',
      systems: [{ type: SystemType.Win }],
      size: 182890274,
      type: FileType.Installer,
      url: 'https://github.com/surge-synthesizer/releases-xt/releases/download/1.3.1/surge-xt-win64-1.3.1-setup.exe',
    },
  ],
  image: 'https://open-audio-stack.github.io/open-audio-stack-registry/plugins/surge-synthesizer/surge/surge.jpg',
  license: License.GNUGeneralPublicLicensev3,
  name: 'Surge XT',
  tags: ['Instrument', 'Synth', 'Modulation'],
  type: PluginType.Instrument,
  url: 'https://github.com/surge-synthesizer/surge',
};

export default function Home() {
  const pathname = usePathname();
  const [form, setForm] = useState(PLUGIN);
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [errors, setErrors] = useState({} as any);
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [touched, setTouched] = useState({} as any);

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  function handleChange(field: string, value: any) {
    console.log('handleChange', field, value);
    handleValidate({ ...form, [field]: value } as PluginInterface);
    updateForm(field, value);
  }

  function handleFileChange(index: number, field: string, value: any) {
    console.log('handleFileChange', field, value);
    const updatedFiles = form.files.map((file, i) => (i === index ? { ...file, [field]: value } : file));
    handleFileValidate(index, updatedFiles[index]);
    updateForm('files', updatedFiles);
  }

  function handleValidate(data: PluginInterface) {
    const result = PackageVersionValidator.safeParse(data);
    if (!result.success) {
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      const fieldErrors: any = {};
      result.error.errors.forEach(e => {
        if (e.path[0]) fieldErrors[e.path[0]] = e.message;
      });
      console.log('handleValidate errors:', fieldErrors);
      setErrors(fieldErrors);
    } else {
      setErrors({});
    }
  }

  function handleFileValidate(index: number, data: PluginFile) {
    const result = PackageFileValidator.safeParse(data);
    if (!result.success) {
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      const fieldErrors: any = {
        files: [],
      };
      if (!fieldErrors.files[index]) fieldErrors.files[index] = {};
      result.error.errors.forEach(e => {
        if (e.path[0]) fieldErrors.files[index][e.path[0]] = e.message;
      });
      console.log('handleFileValidate errors:', fieldErrors);
      setErrors(fieldErrors);
    } else {
      setErrors({});
    }
  }

  function updateForm(field: string, value: any) {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    setForm((f: any) => ({ ...f, [field]: value }));
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    setTouched((t: any) => ({ ...t, [field]: true }));
  }

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
              <TextField
                label="Name"
                variant="filled"
                fullWidth
                value={form.name}
                onChange={e => handleChange('name', e.target.value)}
                error={!!errors.name && touched.name}
                helperText={touched.name && errors.name}
              />
              <TextField
                label="Author"
                variant="filled"
                fullWidth
                value={form.author}
                onChange={e => handleChange('author', e.target.value)}
                error={!!errors.author && touched.author}
                helperText={touched.author && errors.author}
              />
            </div>
            <TextField
              label="Description"
              variant="filled"
              multiline
              value={form.description}
              onChange={e => handleChange('description', e.target.value)}
              error={!!errors.description && touched.description}
              helperText={touched.description && errors.description}
            />
            <div className={styles.formGroup}>
              <FormControl variant="filled" fullWidth error={!!errors.type && touched.type}>
                <InputLabel id="label-type">Type</InputLabel>
                <Select
                  label="Type"
                  labelId="label-type"
                  value={form.type}
                  onChange={e => handleChange('type', e.target.value)}
                >
                  {pluginTypes.map(pluginType => (
                    <MenuItem value={pluginType.value} key={pluginType.value}>
                      {pluginType.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="filled" fullWidth error={!!errors.license && touched.license}>
                <InputLabel id="label-license">License</InputLabel>
                <Select
                  label="License"
                  variant="filled"
                  labelId="label-license"
                  value={form.license}
                  onChange={e => handleChange('license', e.target.value)}
                >
                  {licenses.map(license => (
                    <MenuItem value={license.value} key={license.value}>
                      {license.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className={styles.formGroup}>
              <Autocomplete
                options={[]} // You can provide tag suggestions here
                freeSolo
                value={form.tags}
                onChange={(_, value) => handleChange('tags', value)}
                renderTags={(value: readonly string[], getTagProps) =>
                  value.map((option: string, index: number) => (
                    <Chip variant="outlined" label={option} {...getTagProps({ index })} key={option} />
                  ))
                }
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="filled"
                    label="Tags"
                    error={!!errors.tags && touched.tags}
                    helperText={touched.tags && errors.tags}
                  />
                )}
                fullWidth
                multiple
              />
            </div>
            <TextField
              label="Homepage url"
              variant="filled"
              fullWidth
              value={form.url}
              onChange={e => handleChange('url', e.target.value)}
              error={!!errors.url && touched.url}
              helperText={touched.url && errors.url}
            />
            <TextField
              label="Audio preview url"
              variant="filled"
              fullWidth
              value={form.audio}
              onChange={e => handleChange('audio', e.target.value)}
              error={!!errors.audio && touched.audio}
              helperText={touched.audio && errors.audio}
            />
            <TextField
              label="Image preview url"
              variant="filled"
              fullWidth
              value={form.image}
              onChange={e => handleChange('image', e.target.value)}
              error={!!errors.image && touched.image}
              helperText={touched.image && errors.image}
            />
            <div className={styles.formGroup}>
              <TextField
                label="Version"
                variant="filled"
                fullWidth
                value={VERSION}
                InputProps={{
                  startAdornment: <InputAdornment position="start">v</InputAdornment>,
                }}
              />
              <TextField
                className={styles.input}
                label="Release date"
                type="datetime-local"
                variant="filled"
                value={form.date.substring(0, 16)}
                onChange={e => handleChange('date', e.target.value + ':00.000Z')}
                error={!!errors.date && touched.date}
                helperText={touched.date && errors.date}
                fullWidth
              />
            </div>
            <TextField
              label="Change list"
              variant="filled"
              fullWidth
              multiline
              value={form.changes}
              onChange={e => handleChange('changes', e.target.value)}
              error={!!errors.changes && touched.changes}
              helperText={touched.changes && errors.changes}
            />
          </div>
          <div className={styles.card}>
            <div className={styles.filesHeader}>
              <h4>Files</h4>
            </div>
            {form.files.map((file, index) => (
              <div className={styles.file} key={index}>
                <div className={styles.formGroup}>
                  <FormControl variant="filled" fullWidth>
                    <InputLabel id={`label-filetype-${index}`}>File type</InputLabel>
                    <Select
                      label="File type"
                      variant="filled"
                      labelId={`label-filetype-${index}`}
                      value={file.type}
                      onChange={e => handleFileChange(index, 'type', e.target.value)}
                    >
                      {fileTypes.map(fileType => (
                        <MenuItem value={fileType.value} key={fileType.value}>
                          {fileType.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.files && errors.files[index]?.type && (
                      <span style={{ color: 'red', fontSize: 12 }}>{errors.files[index].type}</span>
                    )}
                  </FormControl>
                </div>
                <div className={styles.formGroup}>
                  <Autocomplete
                    multiple
                    options={Object.values(Architecture)}
                    getOptionLabel={option => option}
                    value={file.architectures}
                    onChange={(_, value) => handleFileChange(index, 'architectures', value)}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant="filled"
                        label="File architectures"
                        error={!!(errors.files && errors.files[index]?.architectures)}
                        helperText={errors.files && errors.files[index]?.architectures}
                      />
                    )}
                    fullWidth
                  />
                </div>
                <div className={styles.formGroup}>
                  <Autocomplete
                    multiple
                    options={Object.values(PluginFormat)}
                    getOptionLabel={option => option}
                    value={file.contains}
                    onChange={(_, value) => handleFileChange(index, 'contains', value)}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant="filled"
                        label="File contains"
                        error={!!(errors.files && errors.files[index]?.contains)}
                        helperText={errors.files && errors.files[index]?.contains}
                      />
                    )}
                    fullWidth
                  />
                </div>
                <div className={styles.formGroup}>
                  <Autocomplete
                    multiple
                    options={Object.values(SystemType)}
                    getOptionLabel={option => option}
                    value={file.systems.map(s => s.type)}
                    onChange={(_, value) =>
                      handleFileChange(
                        index,
                        'systems',
                        value.map(type => ({ type })),
                      )
                    }
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant="filled"
                        label="File systems"
                        error={!!(errors.files && errors.files[index]?.systems)}
                        helperText={errors.files && errors.files[index]?.systems}
                      />
                    )}
                    fullWidth
                  />
                </div>
                <div className={styles.formGroup}>
                  <TextField
                    label="File url"
                    variant="filled"
                    value={file.url}
                    fullWidth
                    onChange={e => handleFileChange(index, 'url', e.target.value)}
                    error={!!(errors.files && errors.files[index]?.url)}
                    helperText={errors.files && errors.files[index]?.url}
                  />
                </div>
                <div className={styles.formGroup}>
                  <TextField
                    label="File size"
                    variant="filled"
                    value={file.size}
                    fullWidth
                    onChange={e => handleFileChange(index, 'size', Number(e.target.value))}
                    error={!!(errors.files && errors.files[index]?.size)}
                    helperText={errors.files && errors.files[index]?.size}
                  />
                  <TextField
                    label="File sha256"
                    variant="filled"
                    value={file.sha256}
                    fullWidth
                    onChange={e => handleFileChange(index, 'sha256', e.target.value)}
                    error={!!(errors.files && errors.files[index]?.sha256)}
                    helperText={errors.files && errors.files[index]?.sha256}
                  />
                </div>
                <div className={styles.formGroup} style={{ marginTop: 8 }}>
                  <button
                    type="button"
                    onClick={() => {
                      const blankFile: PluginFile = {
                        architectures: [],
                        contains: [],
                        sha256: '',
                        systems: [],
                        size: 0,
                        type: FileType.Installer,
                        url: '',
                      };
                      // Insert blank file after current index
                      const newFiles = [...form.files.slice(0, index + 1), blankFile, ...form.files.slice(index + 1)];
                      updateForm('files', newFiles);

                      // Insert blank error object at the same index+1
                      setErrors((prev: any) => {
                        const newErrors = { ...prev };
                        if (newErrors.files) {
                          const filesArr = Array.isArray(newErrors.files) ? [...newErrors.files] : [];
                          filesArr.splice(index + 1, 0, {});
                          newErrors.files = filesArr;
                        }
                        return newErrors;
                      });
                    }}
                    style={{
                      marginRight: 8,
                      padding: '6px 14px',
                      borderRadius: 8,
                      border: '1px solid #ccc',
                      background: '#f7f7f7',
                      cursor: 'pointer',
                    }}
                  >
                    Add file
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      // Remove file at current index
                      const newFiles = form.files.filter((_, i) => i !== index);
                      updateForm('files', newFiles);

                      // Remove error at the same index
                      setErrors((prev: any) => {
                        const newErrors = { ...prev };
                        if (newErrors.files) {
                          const filesArr = Array.isArray(newErrors.files) ? [...newErrors.files] : [];
                          filesArr.splice(index, 1);
                          newErrors.files = filesArr;
                        }
                        return newErrors;
                      });
                    }}
                    disabled={form.files.length === 1}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 8,
                      border: '1px solid #e57373',
                      background: '#fff0f0',
                      color: '#d32f2f',
                      cursor: form.files.length === 1 ? 'not-allowed' : 'pointer',
                    }}
                  >
                    Remove file
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className={`${styles.card} ${styles.metadata}`}>
            <h4>Metadata</h4>
            <pre className={styles.codeBlock}>{packageToYaml(form)}</pre>
          </div>
        </main>
      </section>
    </div>
  );
}

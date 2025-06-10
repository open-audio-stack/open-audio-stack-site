'use client';
import Image from 'next/image';
import styles from '../styles/page.module.css';
import { isSelected } from '../lib/path';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
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
  packageJsToYaml,
  packageYamlToJs,
  RegistryPackages,
  architectures,
  pluginFormats,
  systemTypes,
} from '@open-audio-stack/core';
import {
  Autocomplete,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

// Import ace-yaml mode and theme (make sure these are installed in your project)
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-monokai';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

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
  const [yamlError, setYamlError] = useState<string | null>(null);

  // yaml editor
  const [yamlValue, setYamlValue] = useState(packageJsToYaml(form));
  useEffect(() => {
    setYamlValue(packageJsToYaml(form));
  }, [form]);

  const [pluginList, setPluginList] = useState<string[]>([]);
  const [pluginLoading, setPluginLoading] = useState(false);
  const [selectedPlugin, setSelectedPlugin] = useState<string>('');

  useEffect(() => {
    setPluginLoading(true);
    fetch('https://open-audio-stack.github.io/open-audio-stack-registry/plugins/')
      .then(res => res.json())
      .then((packages: RegistryPackages) => {
        const ids = Object.keys(packages).map((key: string) => `${packages[key].slug}/${packages[key].version}`);
        ids.sort();
        setPluginList(ids);
        setPluginLoading(false);
      })
      .catch(() => setPluginLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedPlugin) return;
    setPluginLoading(true);
    fetch(`https://open-audio-stack.github.io/open-audio-stack-registry/plugins/${selectedPlugin}/`)
      .then(res => res.json())
      .then((data: any) => {
        setForm(data);
        setPluginLoading(false);
      })
      .catch(() => setPluginLoading(false));
  }, [selectedPlugin]);

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
            src={`${basePath}/images/open-audio-stack-logo.svg`}
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h4 style={{ margin: 0 }}>Details</h4>
              <FormControl variant="filled" size="small" style={{ minWidth: 260 }}>
                <InputLabel id="plugin-select-label">Load plugin metadata</InputLabel>
                <Select
                  labelId="plugin-select-label"
                  value={selectedPlugin}
                  onChange={e => setSelectedPlugin(e.target.value)}
                  disabled={pluginLoading || pluginList.length === 0}
                  style={{ background: '#fff' }}
                >
                  {pluginList.map(id => (
                    <MenuItem value={id} key={id}>
                      {id}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {pluginLoading && <CircularProgress size={22} />}
            </div>
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
                options={[]}
                freeSolo
                value={form.tags}
                onChange={(_, value) => handleChange('tags', value)}
                renderTags={(value: readonly string[], getTagProps) =>
                  value.map((option: string, index: number) => (
                    <Chip variant="filled" label={option} {...getTagProps({ index })} key={option} />
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
                  <Autocomplete
                    multiple
                    options={systemTypes}
                    getOptionLabel={option => option.name}
                    value={file.systems.map(
                      s => systemTypes.find(sys => sys.value === s.type) || { value: s.type, name: s.type },
                    )}
                    onChange={(_, value) =>
                      handleFileChange(
                        index,
                        'systems',
                        value.map(v => ({ type: v.value })),
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
                  <Autocomplete
                    multiple
                    options={architectures}
                    getOptionLabel={option => option.name}
                    value={file.architectures.map(
                      a => architectures.find(arch => arch.value === a) || { value: a, name: a },
                    )}
                    onChange={(_, value) =>
                      handleFileChange(
                        index,
                        'architectures',
                        value.map(v => v.value),
                      )
                    }
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
                    options={pluginFormats}
                    getOptionLabel={option => option.name}
                    value={file.contains.map(f => pluginFormats.find(fmt => fmt.value === f) || { value: f, name: f })}
                    onChange={(_, value) =>
                      handleFileChange(
                        index,
                        'contains',
                        value.map(v => v.value),
                      )
                    }
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
                <div className={styles.formGroup}>
                  <Button
                    variant="outlined"
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
                      const newFiles = [...form.files.slice(0, index + 1), blankFile, ...form.files.slice(index + 1)];
                      updateForm('files', newFiles);
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
                  >
                    + Add file
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      const newFiles = form.files.filter((_, i) => i !== index);
                      updateForm('files', newFiles);
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
                  >
                    - Remove file
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className={`${styles.card} ${styles.metadata}`}>
            <h4>Metadata</h4>
            <AceEditor
              mode="yaml"
              theme="monokai"
              name="metadata-yaml-editor"
              value={yamlValue}
              onChange={val => {
                setYamlValue(val);
                try {
                  const parsed = packageYamlToJs(val);
                  // Only update form if parsed YAML is an object
                  if (parsed && typeof parsed === 'object') {
                    setForm(parsed as PluginInterface);
                  }
                  setYamlError(null);
                } catch (e: any) {
                  setYamlError(e.message || 'Invalid YAML');
                }
              }}
              width="100%"
              height="580px"
              fontSize={16}
              setOptions={{
                useWorker: false,
                showLineNumbers: true,
                tabSize: 2,
              }}
              editorProps={{ $blockScrolling: true }}
              style={{
                borderRadius: 12,
                border: '1px solid #e0e0e0',
                marginBottom: 8,
                fontFamily: 'Fira Mono, Consolas, monospace',
              }}
            />
            {yamlError && (
              <div
                style={{ color: '#fff', background: '#d32f2f', borderRadius: 8, padding: '8px 14px', marginBottom: 12 }}
              >
                YAML Error: {yamlError}
              </div>
            )}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'end' }}>
              <Button
                variant="outlined"
                onClick={() => {
                  navigator.clipboard.writeText(packageJsToYaml(form));
                }}
              >
                Copy
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  const blob = new Blob([packageJsToYaml(form)], { type: 'text/yaml' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${form.name || 'plugin'}.yaml`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                }}
              >
                Download
              </Button>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => {
                  const title = encodeURIComponent(`Plugin: ${form.name} (v${VERSION})`);
                  const body = encodeURIComponent('```yaml\n' + packageJsToYaml(form) + '\n```');
                  window.open(
                    `https://github.com/open-audio-stack/open-audio-stack-registry/issues/new?title=${title}&body=${body}`,
                    '_blank',
                  );
                }}
              >
                Submit via GitHub
              </Button>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}

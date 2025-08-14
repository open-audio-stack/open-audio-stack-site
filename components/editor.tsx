import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-tomorrow_night_bright';
import { packageJsToYaml, packageYamlToJs, PackageVersion, RegistryType } from '@open-audio-stack/core';
import { Dispatch, SetStateAction, useEffect, useState, useRef } from 'react';
import { Button } from '@mui/material';
import styles from '../styles/components/editor.module.css';
import Image from 'next/image';

type EditorProps = {
  form: PackageVersion;
  pkgType: RegistryType;
  setForm: Dispatch<SetStateAction<PackageVersion>>;
  version: string | undefined;
};

interface EditorError {
  mark: object;
  message: string;
  name: string;
  reason: string;
}

const handleCopy = (form: PackageVersion) => {
  navigator.clipboard.writeText(packageJsToYaml(form));
};

const handleDownload = (form: PackageVersion) => {
  const blob = new Blob([packageJsToYaml(form)], { type: 'text/yaml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${form.name || 'package'}.yaml`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const handleSubmitViaGitHub = (pkgType: RegistryType, form: PackageVersion, version: string | undefined) => {
  const title = encodeURIComponent(`${pkgType}: ${form.name} (v${version})`);
  const body = encodeURIComponent('```yaml\n' + packageJsToYaml(form) + '\n```');
  window.open(
    `https://github.com/open-audio-stack/open-audio-stack-registry/issues/new?title=${title}&labels=submission&body=${body}`,
    '_blank',
  );
};

const parseYamlToForm = (
  val: string,
  setForm: Dispatch<SetStateAction<PackageVersion>>,
  setYamlError: (e: string | null) => void,
) => {
  try {
    const parsed = packageYamlToJs(val);
    if (parsed && typeof parsed === 'object') {
      setForm(parsed as PackageVersion);
    }
    setYamlError(null);
  } catch (e: unknown) {
    console.error('YAML parsing error:', e);
    setYamlError((e as EditorError).message || 'Invalid YAML');
  }
};

const Editor = ({ form, pkgType, setForm, version }: EditorProps) => {
  const [yamlError, setYamlError] = useState<string | null>(null);
  const [yamlValue, setYamlValue] = useState(packageJsToYaml(form));
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setYamlValue(packageJsToYaml(form));
  }, [form]);

  // Debounced editor change handler
  const handleEditorChange = (val: string) => {
    setYamlValue(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      parseYamlToForm(val, setForm, setYamlError);
    }, 400); // 400ms debounce
  };

  return (
    <div>
      <h4>Metadata</h4>
      <AceEditor
        className={styles.ace}
        mode="yaml"
        theme="tomorrow_night_bright"
        name="metadata-yaml-editor"
        value={yamlValue ?? ''}
        onChange={handleEditorChange}
        width="100%"
        height="580px"
        fontSize={16}
        setOptions={{
          useWorker: false,
          showLineNumbers: true,
          tabSize: 2,
          enableKeyboardAccessibility: true,
        }}
      />
      {yamlError && <div className={styles.error}>YAML Error: {yamlError}</div>}
      <div className={styles.buttons}>
        <Button variant="outlined" onClick={() => handleCopy(form)}>
          Copy
        </Button>
        <Button variant="outlined" onClick={() => handleDownload(form)}>
          Download
        </Button>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => handleSubmitViaGitHub(pkgType, form, version)}
          endIcon={<Image src="/icons/external.svg" alt="" width={12} height={12} />}
        >
          Submit via GitHub
        </Button>
      </div>
    </div>
  );
};

export default Editor;

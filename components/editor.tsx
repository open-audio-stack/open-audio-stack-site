import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-tomorrow_night_bright';
import {
  packageErrors,
  packageJsToYaml,
  packageRecommendations,
  packageYamlToJs,
  PackageVersion,
  RegistryType,
} from '@open-audio-stack/core';
import { Dispatch, SetStateAction, useEffect, useMemo, useState, useRef } from 'react';
import { Button } from '@mui/material';
import styles from '../styles/components/editor.module.css';
import Image from 'next/image';

import external from '../public/icons/external.svg';

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

  // Validation errors block submission-worthiness (missing/invalid required fields).
  // Recommendations are non-blocking suggestions (e.g. missing arm64 support).
  const errors = useMemo(() => packageErrors(form), [form]);
  const recs = useMemo(() => packageRecommendations(form), [form]);

  // Only surface errors/recommendations once the user has actually changed a value,
  // rather than immediately flooding a freshly loaded (or blank) form with warnings.
  // Loading a different template/version resets the baseline to compare against.
  const baselineRef = useRef<string>(JSON.stringify(form));
  const prevVersionRef = useRef(version);
  if (prevVersionRef.current !== version) {
    prevVersionRef.current = version;
    baselineRef.current = JSON.stringify(form);
  }
  const touched = JSON.stringify(form) !== baselineRef.current;

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
      {touched && errors.length > 0 && (
        <div className={styles.errors}>
          <strong>{errors.length === 1 ? 'Error' : `${errors.length} errors`}</strong>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>
                {error.path.join('.') || 'package'}: {error.message}
              </li>
            ))}
          </ul>
        </div>
      )}
      {touched && recs.length > 0 && (
        <div className={styles.recommendations}>
          <strong>{recs.length === 1 ? 'Recommendation' : `${recs.length} recommendations`}</strong>
          <ul>
            {recs.map((rec, index) => (
              <li key={index}>
                {rec.field}: {rec.rec}
              </li>
            ))}
          </ul>
        </div>
      )}
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
          endIcon={<Image src={external} alt="" width={12} height={12} />}
        >
          Submit via GitHub
        </Button>
      </div>
    </div>
  );
};

export default Editor;

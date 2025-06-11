// Import ace-yaml mode and theme (make sure these are installed in your project)
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-monokai';
import { packageJsToYaml, packageYamlToJs, PluginInterface } from '@open-audio-stack/core';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button } from '@mui/material';

type EditorProps = {
  form: PluginInterface;
  setForm: Dispatch<SetStateAction<PluginInterface>>;
};

/* eslint-disable prefer-const */
let VERSION: string = '1.3.1';

const Editor = ({ form, setForm }: EditorProps) => {
  const [yamlError, setYamlError] = useState<string | null>(null);
  const [yamlValue, setYamlValue] = useState(packageJsToYaml(form));
  useEffect(() => {
    setYamlValue(packageJsToYaml(form));
  }, [form]);

  return (
    <div>
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
            /* eslint-disable  @typescript-eslint/no-explicit-any */
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
        <div style={{ color: '#fff', background: '#d32f2f', borderRadius: 8, padding: '8px 14px', marginBottom: 12 }}>
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
  );
};

export default Editor;

import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import styles from '../styles/components/files.module.css';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  architectures,
  FileType,
  fileTypes,
  PackageFileValidator,
  PackageFile,
  PackageVersion,
  systemTypes,
  PluginFormatOption,
  PresetFormatOption,
  ProjectFormatOption,
} from '@open-audio-stack/core';

type FilesProps = {
  form: PackageVersion;
  pkgFormats: PluginFormatOption[] | PresetFormatOption[] | ProjectFormatOption[];
  setForm: Dispatch<SetStateAction<PackageVersion | null>>;
};

type FilesError = {
  files?: Array<Partial<Record<keyof PackageFile, string>>>;
};

type FilesTouched = {
  files?: Array<Partial<Record<keyof PackageFile, boolean>>>;
};

function getBlankFile(): PackageFile {
  return {
    architectures: [],
    contains: [],
    sha256: '',
    systems: [],
    size: 0,
    type: FileType.Installer,
    url: '',
  };
}

function handleAddFile(
  index: number,
  form: PackageVersion,
  updateForm: (field: keyof PackageVersion, value: PackageFile[]) => void,
  setErrors: React.Dispatch<React.SetStateAction<FilesError>>,
) {
  const blankFile = getBlankFile();
  const newFiles = [...form.files.slice(0, index + 1), blankFile, ...form.files.slice(index + 1)];
  updateForm('files', newFiles);
  setErrors(prev => {
    const newErrors: FilesError = { ...prev };
    if (newErrors.files) {
      const filesArr = Array.isArray(newErrors.files) ? [...newErrors.files] : [];
      filesArr.splice(index + 1, 0, {});
      newErrors.files = filesArr;
    }
    return newErrors;
  });
}

function handleRemoveFile(
  index: number,
  form: PackageVersion,
  updateForm: (field: keyof PackageVersion, value: PackageFile[]) => void,
  setErrors: React.Dispatch<React.SetStateAction<FilesError>>,
) {
  const newFiles = form.files.filter((_, i) => i !== index);
  updateForm('files', newFiles);
  setErrors(prev => {
    const newErrors: FilesError = { ...prev };
    if (newErrors.files) {
      const filesArr = Array.isArray(newErrors.files) ? [...newErrors.files] : [];
      filesArr.splice(index, 1);
      newErrors.files = filesArr;
    }
    return newErrors;
  });
}

const Files = ({ form, pkgFormats, setForm }: FilesProps) => {
  const [errors, setErrors] = useState<FilesError>({});
  const [touched, setTouched] = useState<FilesTouched>({});

  function handleFileChange(index: number, field: keyof PackageFile, value: unknown) {
    const updatedFiles = form.files.map((file, i) => (i === index ? { ...file, [field]: value } : file));
    handleFileValidate(index, updatedFiles[index]);
    updateForm('files', updatedFiles);
  }

  function handleFileValidate(index: number, data: PackageFile) {
    const result = PackageFileValidator.safeParse(data);
    if (!result.success) {
      const fieldErrors: FilesError = { files: [] };
      if (!fieldErrors.files![index]) fieldErrors.files![index] = {};
      result.error.errors.forEach(e => {
        if (e.path[0]) fieldErrors.files![index][e.path[0] as keyof PackageFile] = e.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
    }
  }

  function updateForm(field: keyof PackageVersion, value: PackageFile[]) {
    setForm(f => (f ? { ...f, [field]: value } : f));
    setTouched(t => ({ ...t, [field]: true }));
  }

  return (
    <div className={styles.cardInner}>
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
              {touched.files && errors.files && errors.files[index]?.type && (
                <span className={styles.error}>{errors.files[index].type}</span>
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
              value={file.architectures.map(a => architectures.find(arch => arch.value === a) || { value: a, name: a })}
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
              options={pkgFormats}
              getOptionLabel={option => option.name}
              value={file.contains.map(
                f => pkgFormats.find(pkgFormat => pkgFormat.value === f) || { value: f, name: f },
              )}
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
            <Button variant="outlined" onClick={() => handleAddFile(index, form, updateForm, setErrors)}>
              + Add file
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleRemoveFile(index, form, updateForm, setErrors)}
              disabled={form.files.length === 1}
            >
              - Remove file
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Files;

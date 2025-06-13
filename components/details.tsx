import {
  Autocomplete,
  Chip,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  AutocompleteRenderInputParams,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import styles from '../styles/components/details.module.css';
import {
  licenses,
  PackageVersionValidator,
  PackageVersion,
  PluginTypeOption,
  ProjectTypeOption,
  PresetTypeOption,
} from '@open-audio-stack/core';
import { Dispatch, SetStateAction, useState, SyntheticEvent } from 'react';

type DetailsProps = {
  form: PackageVersion;
  pkgTypes: PluginTypeOption[] | PresetTypeOption[] | ProjectTypeOption[];
  setForm: Dispatch<SetStateAction<PackageVersion | null>>;
};

/* eslint-disable  prefer-const */
let VERSION: string = '1.3.1';

const Details = ({ form, pkgTypes, setForm }: DetailsProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  function handleChange(field: keyof PackageVersion, value: string | string[]) {
    handleValidate({ ...form, [field]: value } as PackageVersion);
    setForm(f => (f ? { ...f, [field]: value } : f));
    setTouched((t: Record<string, boolean>) => ({ ...t, [field]: true }));
  }

  function handleValidate(data: PackageVersion) {
    const result = PackageVersionValidator.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(e => {
        if (e.path[0]) fieldErrors[e.path[0] as string] = e.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
    }
  }

  function renderTag(
    option: string,
    index: number,
    getTagProps: (params: { index: number }) => Record<string, unknown>,
  ) {
    return <Chip variant="filled" label={option} {...getTagProps({ index })} key={option} />;
  }

  function renderTags(value: readonly string[], getTagProps: (params: { index: number }) => Record<string, unknown>) {
    return value.map((option: string, index: number) => renderTag(option, index, getTagProps));
  }

  function handleTagsChange(_: SyntheticEvent<Element, Event>, value: string[]) {
    handleChange('tags', value);
  }

  function renderTagsInput(params: AutocompleteRenderInputParams) {
    return (
      <TextField
        {...params}
        variant="filled"
        label="Tags"
        error={!!errors.tags && touched.tags}
        helperText={touched.tags && errors.tags}
      />
    );
  }

  function handleInputChange(field: keyof PackageVersion) {
    return (e: React.ChangeEvent<HTMLInputElement>) => handleChange(field, e.target.value);
  }

  function handleSelectChange(field: keyof PackageVersion) {
    return (e: SelectChangeEvent<string>) => handleChange(field, e.target.value);
  }

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    handleChange('date', e.target.value + ':00.000Z');
  }

  return (
    <div className={styles.cardInner}>
      <div className={styles.formGroup}>
        <TextField
          label="Name"
          variant="filled"
          fullWidth
          value={form.name}
          onChange={handleInputChange('name')}
          error={!!errors.name && touched.name}
          helperText={touched.name && errors.name}
        />
        <TextField
          label="Author"
          variant="filled"
          fullWidth
          value={form.author}
          onChange={handleInputChange('author')}
          error={!!errors.author && touched.author}
          helperText={touched.author && errors.author}
        />
      </div>
      <TextField
        label="Description"
        variant="filled"
        multiline
        value={form.description}
        onChange={handleInputChange('description')}
        error={!!errors.description && touched.description}
        helperText={touched.description && errors.description}
      />
      <div className={styles.formGroup}>
        <FormControl variant="filled" fullWidth error={!!errors.type && touched.type}>
          <InputLabel id="label-type">Type</InputLabel>
          <Select label="Type" labelId="label-type" value={form.type} onChange={handleSelectChange('type')}>
            {pkgTypes.map(pkgType => (
              <MenuItem value={pkgType.value} key={pkgType.value}>
                {pkgType.name}
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
            onChange={handleSelectChange('license')}
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
          onChange={handleTagsChange}
          renderTags={renderTags}
          renderInput={renderTagsInput}
          fullWidth
          multiple
        />
      </div>
      <TextField
        label="Homepage url"
        variant="filled"
        fullWidth
        value={form.url}
        onChange={handleInputChange('url')}
        error={!!errors.url && touched.url}
        helperText={touched.url && errors.url}
      />
      <TextField
        label="Audio preview url"
        variant="filled"
        fullWidth
        value={form.audio}
        onChange={handleInputChange('audio')}
        error={!!errors.audio && touched.audio}
        helperText={touched.audio && errors.audio}
      />
      <TextField
        label="Image preview url"
        variant="filled"
        fullWidth
        value={form.image}
        onChange={handleInputChange('image')}
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
          onChange={handleDateChange}
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
        onChange={handleInputChange('changes')}
        error={!!errors.changes && touched.changes}
        helperText={touched.changes && errors.changes}
      />
    </div>
  );
};

export default Details;

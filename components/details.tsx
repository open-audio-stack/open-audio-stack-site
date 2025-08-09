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
import { GuideType, withTooltip } from './tooltip';

type DetailsProps = {
  form: PackageVersion;
  pkgTypes: PluginTypeOption[] | PresetTypeOption[] | ProjectTypeOption[];
  setForm: Dispatch<SetStateAction<PackageVersion>>;
  version: string | undefined;
  setVersion: Dispatch<SetStateAction<string | undefined>>;
};

const Details = ({ form, pkgTypes, setForm, version, setVersion }: DetailsProps) => {
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
        label={withTooltip(GuideType.Details, 'Tags', 'tags')}
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

  function handleVersionChange(e: React.ChangeEvent<HTMLInputElement>) {
    setVersion(e.target.value);
  }

  return (
    <div className={styles.cardInner}>
      <div className={styles.formGroup}>
        <TextField
          label={withTooltip(GuideType.Details, 'Name', 'name')}
          variant="filled"
          fullWidth
          value={form.name ?? ''}
          onChange={handleInputChange('name')}
          error={!!errors.name && touched.name}
          helperText={touched.name && errors.name}
        />
        <TextField
          label={withTooltip(GuideType.Details, 'Author', 'author')}
          variant="filled"
          fullWidth
          value={form.author ?? ''}
          onChange={handleInputChange('author')}
          error={!!errors.author && touched.author}
          helperText={touched.author && errors.author}
        />
      </div>
      <TextField
        label={withTooltip(GuideType.Details, 'Description', 'description')}
        variant="filled"
        multiline
        value={form.description ?? ''}
        onChange={handleInputChange('description')}
        error={!!errors.description && touched.description}
        helperText={touched.description && errors.description}
      />
      <div className={styles.formGroup}>
        <FormControl variant="filled" fullWidth error={!!errors.type && touched.type}>
          <InputLabel id="label-type">{withTooltip(GuideType.Details, 'Type', 'type')}</InputLabel>
          <Select labelId="label-type" value={form.type ?? ''} onChange={handleSelectChange('type')}>
            {pkgTypes.map(pkgType => (
              <MenuItem value={pkgType.value ?? ''} key={pkgType.value}>
                {pkgType.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="filled" fullWidth error={!!errors.license && touched.license}>
          <InputLabel id="label-license">{withTooltip(GuideType.Details, 'License', 'license')}</InputLabel>
          <Select
            variant="filled"
            labelId="label-license"
            value={form.license ?? ''}
            onChange={handleSelectChange('license')}
          >
            {licenses.map(license => (
              <MenuItem value={license.value ?? ''} key={license.value}>
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
          value={form.tags ?? ''}
          onChange={handleTagsChange}
          renderTags={renderTags}
          renderInput={renderTagsInput}
          fullWidth
          multiple
        />
      </div>
      <TextField
        label={withTooltip(GuideType.Details, 'Homepage url', 'url')}
        variant="filled"
        fullWidth
        value={form.url ?? ''}
        onChange={handleInputChange('url')}
        error={!!errors.url && touched.url}
        helperText={touched.url && errors.url}
      />
      <TextField
        label={withTooltip(GuideType.Details, 'Audio preview url', 'audio')}
        variant="filled"
        fullWidth
        value={form.audio ?? ''}
        onChange={handleInputChange('audio')}
        error={!!errors.audio && touched.audio}
        helperText={touched.audio && errors.audio}
      />
      <TextField
        label={withTooltip(GuideType.Details, 'Image preview url', 'image')}
        variant="filled"
        fullWidth
        value={form.image ?? ''}
        onChange={handleInputChange('image')}
        error={!!errors.image && touched.image}
        helperText={touched.image && errors.image}
      />
      <TextField
        label={withTooltip(GuideType.Details, 'Donate url', 'donate')}
        variant="filled"
        fullWidth
        value={form.donate ?? ''}
        onChange={handleInputChange('donate')}
        error={!!errors.donate && touched.donate}
        helperText={touched.donate && errors.donate}
      />
      <div className={styles.formGroup}>
        <TextField
          label={withTooltip(GuideType.Details, 'Version', 'version')}
          variant="filled"
          fullWidth
          value={version ?? ''}
          onChange={handleVersionChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">v</InputAdornment>,
          }}
        />
        <TextField
          className={styles.input}
          label={withTooltip(GuideType.Details, 'Release date', 'date')}
          type="datetime-local"
          variant="filled"
          value={form.date.substring(0, 16) ?? ''}
          onChange={handleDateChange}
          error={!!errors.date && touched.date}
          helperText={touched.date && errors.date}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </div>
      <TextField
        label={withTooltip(GuideType.Details, 'Change list', 'changes')}
        variant="filled"
        fullWidth
        multiline
        value={form.changes ?? ''}
        onChange={handleInputChange('changes')}
        error={!!errors.changes && touched.changes}
        helperText={touched.changes && errors.changes}
      />
    </div>
  );
};

export default Details;

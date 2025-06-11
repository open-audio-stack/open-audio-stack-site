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
import styles from '../styles/components/details.module.css';
import { licenses, PackageVersionValidator, PluginInterface, pluginTypes } from '@open-audio-stack/core';
import { Dispatch, SetStateAction, useState } from 'react';

type DetailsProps = {
  form: PluginInterface;
  setForm: Dispatch<SetStateAction<PluginInterface>>;
};

/* eslint-disable  prefer-const */
let VERSION: string = '1.3.1';

const Details = ({ form, setForm }: DetailsProps) => {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [errors, setErrors] = useState({} as any);
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [touched, setTouched] = useState({} as any);

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  function handleChange(field: string, value: any) {
    console.log('handleChange', field, value);
    handleValidate({ ...form, [field]: value } as PluginInterface);
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    setForm((f: any) => ({ ...f, [field]: value }));
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    setTouched((t: any) => ({ ...t, [field]: true }));
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

  return (
    <div className={styles.cardInner}>
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
  );
};

export default Details;

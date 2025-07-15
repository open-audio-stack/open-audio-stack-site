import { GuideType, withTooltip } from '@/lib/tooltip';
import { Autocomplete, TextField, Chip } from '@mui/material';
import { PackageInterface, PresetPlugins, RegistryPackages } from '@open-audio-stack/core';
import { useEffect, useState } from 'react';

type MultiSelectProps = {
  value: PresetPlugins;
  onChange: (plugins: PresetPlugins) => void;
  url: string;
};

type PluginOption = {
  slug: string;
  version: string;
  label: string;
};

export default function MultiSelect({ value, onChange, url }: MultiSelectProps) {
  const [options, setOptions] = useState<PluginOption[]>([]);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then((data: RegistryPackages) => {
        const opts: PluginOption[] = Object.values(data).map((entry: PackageInterface) => ({
          slug: entry.slug,
          version: entry.version,
          label: entry.slug,
        }));
        opts.sort((a, b) => a.slug.localeCompare(b.slug));
        setOptions(opts);
      });
  }, [url]);

  const selectedOptions = options.filter(opt => value[opt.slug]);
  const handleChange = (_: unknown, selected: PluginOption[]) => {
    const plugins: PresetPlugins = {};
    selected.forEach(opt => {
      plugins[opt.slug] = opt.version;
    });
    onChange(plugins);
  };

  return (
    <Autocomplete
      multiple
      options={options}
      getOptionLabel={option => option.label}
      value={selectedOptions}
      onChange={handleChange}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip label={option.label} {...getTagProps({ index })} key={option.slug} sx={{ marginTop: '5px' }} />
        ))
      }
      renderInput={params => (
        <TextField
          {...params}
          variant="filled"
          label={withTooltip(GuideType.Details, 'Plugin dependencies', 'plugins')}
        />
      )}
      fullWidth
      disableCloseOnSelect
      filterSelectedOptions
    />
  );
}

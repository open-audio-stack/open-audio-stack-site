import { CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { PluginInterface, RegistryPackages } from '@open-audio-stack/core';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type SelectorProps = {
  setForm: Dispatch<SetStateAction<PluginInterface>>;
};

const Selector = ({ setForm }: SelectorProps) => {
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
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      .then((data: any) => {
        setForm(data);
        setPluginLoading(false);
      })
      .catch(() => setPluginLoading(false));
  }, [selectedPlugin, setForm]);

  return (
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
  );
};

export default Selector;

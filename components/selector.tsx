import { CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { PluginInterface, RegistryPackages } from '@open-audio-stack/core';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type SelectorProps = {
  setForm: Dispatch<SetStateAction<PluginInterface>>;
};

const PLUGIN_LIST_URL = 'https://open-audio-stack.github.io/open-audio-stack-registry/plugins/';

const fetchPluginList = async (): Promise<string[]> => {
  const res = await fetch(PLUGIN_LIST_URL);
  const packages: RegistryPackages = await res.json();
  const ids = Object.keys(packages).map((key: string) => `${packages[key].slug}/${packages[key].version}`);
  ids.sort();
  return ids;
};

const fetchPluginData = async (selectedPlugin: string): Promise<PluginInterface> => {
  const res = await fetch(`${PLUGIN_LIST_URL}${selectedPlugin}/`);
  return res.json();
};

const Selector = ({ setForm }: SelectorProps) => {
  const [pluginList, setPluginList] = useState<string[]>([]);
  const [pluginLoading, setPluginLoading] = useState(false);
  const [selectedPlugin, setSelectedPlugin] = useState<string>('');

  useEffect(() => {
    setPluginLoading(true);
    fetchPluginList()
      .then(ids => setPluginList(ids))
      .finally(() => setPluginLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedPlugin) return;
    setPluginLoading(true);
    fetchPluginData(selectedPlugin)
      .then(data => setForm(data))
      .finally(() => setPluginLoading(false));
  }, [selectedPlugin, setForm]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedPlugin(event.target.value as string);
  };

  const renderMenuItem = (id: string) => (
    <MenuItem value={id} key={id}>
      {id}
    </MenuItem>
  );

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <h4 style={{ margin: 0 }}>Details</h4>
      <FormControl variant="filled" size="small" style={{ minWidth: 260 }}>
        <InputLabel id="plugin-select-label">Load plugin metadata</InputLabel>
        <Select
          labelId="plugin-select-label"
          value={selectedPlugin}
          onChange={handleChange}
          disabled={pluginLoading || pluginList.length === 0}
          style={{ background: '#fff' }}
        >
          {pluginList.map(renderMenuItem)}
        </Select>
      </FormControl>
      {pluginLoading && <CircularProgress size={22} />}
    </div>
  );
};

export default Selector;

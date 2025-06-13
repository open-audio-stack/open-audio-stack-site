import { CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { PluginInterface, RegistryPackages } from '@open-audio-stack/core';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from '../styles/components/selector.module.css';

type SelectorProps = {
  setForm: Dispatch<SetStateAction<PluginInterface | null>>;
  selectedPlugin: string;
  setSelectedPlugin: Dispatch<SetStateAction<string>>;
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

const Selector = ({ setForm, selectedPlugin, setSelectedPlugin }: SelectorProps) => {
  const [pluginList, setPluginList] = useState<string[]>([]);
  const [pluginLoading, setPluginLoading] = useState(false);

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
    <div className={styles.selector}>
      <h4>Details</h4>
      <FormControl variant="filled" size="small">
        <InputLabel id="plugin-select-label" className="label-dark">
          Load plugin metadata
        </InputLabel>
        <Select
          className="select-dark"
          labelId="plugin-select-label"
          value={selectedPlugin}
          onChange={handleChange}
          disabled={pluginLoading || pluginList.length === 0}
        >
          {pluginList.map(renderMenuItem)}
        </Select>
      </FormControl>
      {pluginLoading && <CircularProgress size={22} />}
    </div>
  );
};

export default Selector;

import { CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { PackageVersion, RegistryPackages } from '@open-audio-stack/core';
import { useEffect, useState } from 'react';
import styles from '../styles/components/selector.module.css';

type SelectorProps = {
  setForm: (form: PackageVersion) => void;
  selectedPkg: string;
  setSelectedPkg: (pkg: string) => void;
  setVersion: (version: string | undefined) => void;
  url: string;
  includeBlankTemplate?: boolean;
  blankLabel?: string;
};

const fetchPkgList = async (url: string): Promise<string[]> => {
  const res = await fetch(url);
  const packages: RegistryPackages = await res.json();
  const ids = Object.keys(packages).map((key: string) => `${packages[key].slug}/${packages[key].version}`);
  ids.sort();
  return ids;
};

const fetchPkgData = async (url: string, selectedPkg: string): Promise<PackageVersion> => {
  const res = await fetch(`${url}/${selectedPkg}/`);
  return res.json();
};

const Selector = ({ setForm, selectedPkg, setSelectedPkg, setVersion, url }: SelectorProps) => {
  const [pkgList, setPkgList] = useState<string[]>([]);
  const [pkgLoading, setPkgLoading] = useState(false);

  useEffect(() => {
    setPkgLoading(true);
    fetchPkgList(url)
      .then(ids => setPkgList(ids))
      .finally(() => setPkgLoading(false));
  }, [url]);

  useEffect(() => {
    if (!selectedPkg) return;
    setPkgLoading(true);
    fetchPkgData(url, selectedPkg)
      .then(data => {
        if (data.verified) delete data.verified;
        setForm(data);
      })
      .finally(() => setPkgLoading(false));
  }, [url, selectedPkg, setForm]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedPkg(event.target.value as string);
    setVersion(event.target.value.split('/').pop());
  };

  const renderMenuItem = (id: string) => (
    <MenuItem value={id ?? ''} key={id}>
      {id}
    </MenuItem>
  );

  return (
    <div className={styles.selector}>
      <h4>Details</h4>
      <FormControl variant="filled" size="small" className={styles.control}>
        <InputLabel id="select-label" className="label-dark">
          Load template
        </InputLabel>
        <Select
          className="select-dark"
          labelId="select-label"
          value={selectedPkg ?? ''}
          onChange={handleChange}
          disabled={pkgLoading || pkgList.length === 0}
        >
          {pkgList.map(renderMenuItem)}
        </Select>
      </FormControl>
      {pkgLoading && <CircularProgress size={22} />}
    </div>
  );
};

export default Selector;

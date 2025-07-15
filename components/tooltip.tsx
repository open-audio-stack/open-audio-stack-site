import { Tooltip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export enum GuideType {
  Details,
  Files,
}

const details: Record<string, string> = {
  name: 'Package name',
  author: 'Package author name',
  description: 'Package description',
  type: 'Package type',
  license: 'Package license',
  tags: 'Package tags/keywords',
  url: 'Website url (https). We recommend hosting files on GitHub',
  audio:
    'Audio preview url (https). Allows users to preview the sound of the package before downloading. We recommend hosting files on GitHub',
  image:
    'Image preview url (https). Allows users to preview the user interface of the package before downloading. We recommend hosting files on GitHub',
  date: 'Package release datetime in Unix timestamp format in UTC timezone',
  changes: 'Package changes made since previous version',
  version: 'Package version number in the Semantic Version format',
  plugins: 'Select one or more plugins which have to be installed for this to load',
};

const files: Record<string, string> = {
  architectures: 'CPU architectures supported by this file',
  contains: 'Formats contained in this file',
  sha256:
    'File checksum for security validation that the published file matches the downloaded file. Use the command line `sha256sum <filename>` on Linux `shasum -a 256 <filename>` on MacOS or `CertUtil -hashfile <filename> SHA256` on Windows.',
  systems: 'Operating systems supported by this file',
  size: 'File size in bytes. Use the command line `stat <filename>` to get the size of a file on your computer.',
  type: 'File type (archive or installer)',
  url: 'Direct download url (https) for this file. We recommend hosting files on GitHub',
};

const guides = {
  [GuideType.Details]: details,
  [GuideType.Files]: files,
};

export function withTooltip(type: GuideType, label: string, field: string) {
  return (
    <span>
      {label}
      <Tooltip title={guides[type][field] || ''} placement="top" arrow>
        <InfoOutlinedIcon fontSize="small" sx={{ verticalAlign: 'middle', ml: 0.5, cursor: 'pointer' }} />
      </Tooltip>
    </span>
  );
}

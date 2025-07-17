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
  date: 'Package release datetime, the date when the builds were created, uploaded and "released" (in Unix timestamp format and UTC timezone)',
  changes: 'Package changes made since previous version',
  version: 'Package version number in the Semantic Version format',
  plugins: 'Select one or more plugins which have to be installed for this to load',
};

const files: Record<string, string> = {
  architectures: 'CPU architectures supported by this file',
  contains: 'Formats contained in this file',
  sha256: `File checksum for security validation ensures the published file matches the downloaded file.

    If File url above points to a GitHub Release uploaded after June 3, 2025, this will be autopopulated for you.

    Otherwise you will need to manually populate using a command line tool:
    - Linux "sha256sum <filename>"
    - MacOS "shasum -a 256 <filename>"
    - Windows "CertUtil -hashfile <filename> SHA256"`,
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
  const content = guides[type][field] || '';
  return (
    <span>
      {label}
      <Tooltip title={<span style={{ whiteSpace: 'pre-line' }}>{content}</span>} placement="top" arrow>
        <InfoOutlinedIcon fontSize="small" sx={{ verticalAlign: 'middle', ml: 0.5, cursor: 'pointer' }} />
      </Tooltip>
    </span>
  );
}

// import { usePathname } from 'next/navigation';
// import { use } from 'react';

// export function getBasePath() {
//   return usePathname;
// }

// export function getCrumbUrl(items: string[], itemToMatch: string) {
//   let url: string = '';
//   for (const item of items) {
//     url += '/' + item;
//     if (item === itemToMatch) break;
//   }
//   return url;
// }

export function isSelected(pathname: string, match: string) {
  console.log('isSelected', pathname, match);
  if (match === '/') {
    return pathname === match ? 'active' : '';
  }
  return pathname.startsWith(match) ? 'active' : '';
}

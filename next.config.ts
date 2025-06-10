import type { NextConfig } from 'next';
import { getBasePath } from './lib/path';

console.log('NODE_ENV', process.env.NODE_ENV);
console.log('CI', process.env.CI);

const nextConfig: NextConfig = {
  basePath: getBasePath(),
  generateBuildId: async () => {
    return 'latest'; // TODO version the site feed using package.version
  },
  output: 'export',
};

export default nextConfig;

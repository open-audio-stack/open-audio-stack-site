import type { NextConfig } from 'next';

console.log('NODE_ENV', process.env.NODE_ENV);
console.log('CI', process.env.CI);

const nextConfig: NextConfig = {
  basePath: process.env.CI ? '/open-audio-stack-site' : '',
  generateBuildId: async () => {
    return 'latest'; // TODO version the site feed using package.version
  },
  output: 'export',
};

export default nextConfig;

import type { NextConfig } from 'next';

console.log('NODE_ENV', process.env.NODE_ENV);
console.log('CI', process.env.CI);

const basePath = process.env.CI ? '/open-audio-stack-site' : '';

const nextConfig: NextConfig = {
  basePath,
  assetPrefix: basePath,
  generateBuildId: async () => {
    return 'latest'; // TODO version the site feed using package.version
  },
  output: 'export',
};

export default nextConfig;

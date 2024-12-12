/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'niralidecor.nyc3.digitaloceanspaces.com',
          pathname: '/**', // This allows all paths under the domain
        },
        {
          protocol: 'https',
          hostname: 'niralidecor.nyc3.cdn.digitaloceanspaces.com',
          pathname: '/**', // This allows all paths under the domain
        },
      ],
    },
  };
  
  export default nextConfig;
  
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.lulumalls.co.in',
                port: '',
                pathname: '/assets/img/**',
            },
            {
                protocol: 'https',
                hostname: 'www.avikalp.com',
                port: '',
                pathname: 'cdn/shop/products/**',
            },
        ],
    },
};

export default nextConfig;

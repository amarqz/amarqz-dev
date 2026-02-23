/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    env: {
        BUILD_TIMESTAMP: new Date().toISOString(),
    },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const allowedOrigin =
  process.env.NODE_ENV === 'production'
    ? 'https://webguyian.com'
    : 'http://localhost:8000';
const allowedMethods = 'GET,OPTIONS,PATCH,POST,PUT,DELETE';
const allowedHeaders =
  'Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          {
            key: 'Access-Control-Allow-Origin',
            value: allowedOrigin
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: allowedMethods
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: allowedHeaders
          }
        ]
      },
      {
        source: '/api/auth/token',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: allowedHeaders
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;

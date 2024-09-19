//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

const CHAT_URL = 'http://localhost:8000';

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false
  },
  async rewrites() {
    return [
      {
        source: '/pirate-speak',
        destination: 'http://localhost:8000/'
      }
    ];
  },
  // async rewrites() {
  // 	return [
  // 		{
  // 			source: '/chat/:path*',
  // 			destination: `${CHAT_URL}/:path*`,
  // 		},
  // 	]
  // }
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: "Access-Control-Allow-Origin", value: "http://127.0.0.1:8000" },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS'},
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization'}
        ]
      }
    ]
  }
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx
];

module.exports = composePlugins(...plugins)(nextConfig);

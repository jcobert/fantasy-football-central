import { env } from './env.mjs'
import withBundleAnalyzer from '@next/bundle-analyzer'
import withPlugins from 'next-compose-plugins'

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = withPlugins(
  [[withBundleAnalyzer({ enabled: env.ANALYZE })]],
  {
    reactStrictMode: true,
    experimental: { instrumentationHook: true, taint: true },
    images: {
      remotePatterns: [],
      minimumCacheTTL: 31536000,
    },
    rewrites() {
      return [
        { source: '/healthz', destination: '/api/health' },
        { source: '/api/healthz', destination: '/api/health' },
        { source: '/health', destination: '/api/health' },
        { source: '/ping', destination: '/api/health' },
      ]
    },
  },
)

export default nextConfig

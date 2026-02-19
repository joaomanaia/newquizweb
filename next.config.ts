import createMDX from "@next/mdx"
import type { NextConfig } from "next"
import "./src/env"

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  reactStrictMode: true,
  typedRoutes: true,
  experimental: {
    mdxRs: true,
  },
  redirects: async () => [
    {
      source: "/list",
      destination: "/",
      permanent: true,
    },
  ],
}

const withMDX = createMDX({})

export default withMDX(nextConfig)

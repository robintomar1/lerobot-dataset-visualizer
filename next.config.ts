import type { NextConfig } from "next";
import packageJson from "./package.json";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ["three"],
  // Avoid the 200-800ms cold-start cost of barrel-file imports.
  // react-icons re-exports thousands of icon components from /fa, etc.;
  // recharts and @huggingface/hub also have wide entry surfaces.
  experimental: {
    optimizePackageImports: ["react-icons", "recharts", "@huggingface/hub"],
  },
  generateBuildId: () => packageJson.version,
  // Datasets are fetched from the browser, where only inlined variables exist:
  // without this, DATASET_URL was read on the server and ignored by the viewer.
  env: process.env.DATASET_URL
    ? { DATASET_URL: process.env.DATASET_URL }
    : undefined,
};

export default nextConfig;

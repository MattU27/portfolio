import type { NextConfig } from "next";

const pages = process.env.GITHUB_PAGES === "true";
const basePath = pages ? process.env.PAGES_BASE_PATH || "" : "";
const config: NextConfig = {
  // Bound local/CI worker memory without disabling type checking.
  experimental: { cpus: 1, useTypeScriptCli: true },
  ...(pages ? { output: "export" as const, trailingSlash: true } : {}),
  basePath,
  images: { unoptimized: pages },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};
export default config;

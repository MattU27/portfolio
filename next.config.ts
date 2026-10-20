import type { NextConfig } from "next";

const pages = process.env.GITHUB_PAGES === "true";
const basePath = pages ? process.env.PAGES_BASE_PATH || "" : "";
const config: NextConfig = {
  ...(pages ? { output: "export" as const, trailingSlash: true } : {}),
  basePath,
  images: { unoptimized: pages },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};
export default config;

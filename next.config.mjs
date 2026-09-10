/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Placeholders locaux uniquement (SVG générés par scripts/generate-placeholders.mjs).
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;

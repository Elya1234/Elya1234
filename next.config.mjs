/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Les visuels sont des placeholders SVG locaux (scripts/generate-placeholders.mjs) ; aucune
    // optimisation raster n'est nécessaire et l'optimiseur d'image de Next échoue à les détecter
    // sans le paquet `sharp`. À réactiver (retirer `unoptimized`) une fois de vraies photos fournies.
    unoptimized: true,
  },
};

export default nextConfig;

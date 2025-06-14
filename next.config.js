/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Enables React's Strict Mode for better development experience and catching
   * potential issues
   */
  reactStrictMode: true,
  
  /**
   * Disables the development indicators that show in the bottom right corner
   * during development
   */
  devIndicators: false,
  
  /**
   * Enables static HTML export instead of server-side rendering
   */
  output: 'export',
  
  /**
   * Sets the base path for the application, useful when deploying to a
   * subdirectory In this case, the app will be served from /dii-operator/
   */
  basePath: '/dii-operator',
  
  /**
   * Configures Next.js Image component behavior
   */
  images: {
    /**
     * Disables the built-in image optimization since it's not available in
     * static exports This is required when using static exports with images
     */
    unoptimized: true,
  },
};

module.exports = nextConfig;

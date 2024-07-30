import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/images/hero-pattern.svg')",
        'footer-texture': "url('/images/footer-texture.png')",
      },
      colors: {
        primary: '#1D4ED8',
        secondary: '#D97706',
      },
    },
  },
  plugins: [],
};

export default config;

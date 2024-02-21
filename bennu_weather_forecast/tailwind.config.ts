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
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'generale-bg': '#3879e0',
      'black': '#03030e',
      'swatch3': '#e4f5fd',
      'swatch4': '#2a60b8',
      'swatch5': '#aac2df',
      'swatch6': '#3c405c',
      'swatch7': '#986580',
    }
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        helvetica: ['"Helvetica Neue"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;

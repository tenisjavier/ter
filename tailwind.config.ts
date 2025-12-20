import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primario: "var(--color-primario)",
        secundario: "var(--color-secundario)",
        suave: "var(--color-suave)",
        blanco: "var(--color-blanco)",
        destacado: "var(--color-destacado)",
      },
    },
  },
};
export default config;

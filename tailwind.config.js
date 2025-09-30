/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        light: {
          primary: "#2563EB", // Azul brand (mais claro)
          secondary: "#7C3AED", // Roxo secundário
          tertiary: "#0D9488", // Verde/teal apoio
          success: "#16A34A", // Verde sucesso
          warning: "#EAB308", // Amarelo alerta
          error: "#DC2626", // Vermelho erro
          neutral100: "#111827", // Texto principal (quase preto)
          neutral200: "#374151", // Texto secundário
          neutral300: "#6B7280", // Texto desabilitado/cinza
          background: "#F9FAFB", // Fundo principal claro
          surface: "#FFFFFF",
        },
        dark: {
          primary: "#1D4ED8", // Azul brand (mais escuro)
          secondary: "#9333EA", // Roxo secundário
          tertiary: "#10B981", // Verde/teal apoio
          success: "#22C55E", // Verde sucesso
          warning: "#FACC15", // Amarelo alerta
          error: "#EF4444", // Vermelho erro
          neutral100: "#F3F4F6", // Texto mais claro (quase branco)
          neutral200: "#E5E7EB", // Texto secundário claro
          neutral300: "#9CA3AF", // Texto desabilitado/cinza
          background: "#0F172A", // Fundo principal escuro
          surface: "#1E293B",
        },
      },
    },
  },
  plugins: [],
};

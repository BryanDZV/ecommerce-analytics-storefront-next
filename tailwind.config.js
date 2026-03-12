/** @type {import('tailwindcss').Config} */
exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    // "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
        colors: {
          brand: {
            50: '#00027e'
          }
            // 'marca-principal': '#00027e',
            // 'marca-oscuro': '#7a74cb',
            //  'rosa': '#ad2dab',
            //  'brand': 'pink',
            // background: "hsl(var(--background))",
            // foreground: "hsl(var(--foreground))",
            // primary: "hsl(var(--primary))",
        }
    },
  },
  plugins: [],
}
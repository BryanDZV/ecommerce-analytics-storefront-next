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
          // brand: {
          //   50: '#866a16'
          // }
            // 'marca-principal': '#00027e',
            // 'marca-oscuro': '#7a74cb',
           'marron': '#4e3b09',
            //  'brand': 'pink',
            // background: "hsl(var(--background))",
            // foreground: "hsl(var(--foreground))",
            // primary: "hsl(var(--primary))",
        }
    },
  },
  plugins: [],
}
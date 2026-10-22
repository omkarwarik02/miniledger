// Tailwind config: tells NativeWind which files to scan for classNames and defines the MiniLedger color palette.
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        base: "#0B0F14",
        surface: "#151B23",
        line: "#2A3441",
        fg: "#E6EDF3",
        muted: "#8B98A5",
        primary: "#818CF8",
        success: "#22C55E",
        danger: "#EF4444",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        valentine: {
          ...require("daisyui/src/theming/themes")["[data-theme=valentine]"],
          "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes,
          "--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
        }
      }
    ]
  }
}


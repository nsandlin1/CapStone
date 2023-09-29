/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'red2': '#d30b0d',
        'navy': '#013364',
        'lightred': '#E64141',
        'lightblue': '#428bca',
        'babyblue': '#25B3DE'
      },
      screens: {
      'navbar': '868px',
      'cardCollapse' : '1445px',
      },
    },
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['Oswald'],
      'body': ['"Open Sans"'],
    },
  },
  plugins: [],

}



import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "sitePink": "#F10086",
                "siteBlack": "#180A0A",
                "siteLigthPink": "#F582A7",
                "sitePurple": "#711A75"
            },
        fontFamily: {
            body: ['"itimRegular"', 'sans-serif'], 
          },
        }
    },
    plugins: [],
}

export default config
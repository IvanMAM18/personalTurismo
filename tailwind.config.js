import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            screens: {
                '3xl': '1600px',
                '4xl': '2100px',
                '5xl': '3100px',
              },
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                'red-c': {
                    '50': '#fff0f4',
                    '100': '#ffdde6',
                    '200': '#ffc0d1',
                    '300': '#ff94b1',
                    '400': '#ff5784',
                    '500': '#ff235e',
                    '600': '#ff0044',
                    '700': '#d70039',
                    '800': '#b10331',
                    '900': '#920a2e',
                    '950': '#500015',
                },
                'orange-c': {
                    '50': '#fff7ec',
                    '100': '#ffedd3',
                    '200': '#ffd8a5',
                    '300': '#ffbb6d',
                    '400': '#ff9332',
                    '500': '#ff730a',
                    '600': '#ff5b02',
                    '700': '#cc3f02',
                    '800': '#a1310b',
                    '900': '#822b0c',
                    '950': '#461304',
                },
                'rose-c': {
                    '50': '#fef1f8',
                    '100': '#fde6f3',
                    '200': '#fdcde8',
                    '300': '#fda4d4',
                    '400': '#fa6cb6',
                    '500': '#f44099',
                    '600': '#e31f76',
                    '700': '#cf1160',
                    '800': '#a3114c',
                    '900': '#881342',
                    '950': '#530423',
                },
                'blue-c': {
                    '50': '#f1f8fe',
                    '100': '#e2effc',
                    '200': '#bfddf8',
                    '300': '#86c3f3',
                    '400': '#46a5ea',
                    '500': '#1e89d9',
                    '600': '#106bb7',
                    '700': '#0e5696',
                    '800': '#104a7c',
                    '900': '#133e67',
                    '950': '#0d2844',
                },
                'amber-c': {
                    '50': '#fffbec',
                    '100': '#fff7d3',
                    '200': '#ffeba5',
                    '300': '#ffda6d',
                    '400': '#ffbe32',
                    '500': '#ffa70a',
                    '600': '#ff8f00',
                    '700': '#cc6902',
                    '800': '#a1510b',
                    '900': '#82440c',
                    '950': '#462004',
                },
                'yellow-c': {
                    '50': '#ffffea',
                    '100': '#fffbc5',
                    '200': '#fff885',
                    '300': '#ffee46',
                    '400': '#ffdf1b',
                    '500': '#ffc000',
                    '600': '#e29400',
                    '700': '#bb6902',
                    '800': '#985108',
                    '900': '#7c420b',
                    '950': '#482200',
                },
                'sky-c': {
                    '50': '#ebfdff',
                    '100': '#cef9ff',
                    '200': '#a2f1ff',
                    '300': '#63e4fd',
                    '400': '#1ccdf4',
                    '500': '#00add6',
                    '600': '#038cb7',
                    '700': '#0a7094',
                    '800': '#125a78',
                    '900': '#144b65',
                    '950': '#063146',
                },
                'purple-c': {
                    '50': '#fff3fd',
                    '100': '#ffe7fb',
                    '200': '#ffcdf5',
                    '300': '#ffa7ec',
                    '400': '#ff72df',
                    '500': '#f83dce',
                    '600': '#dd1caf',
                    '700': '#af1386',
                    '800': '#961272',
                    '900': '#7a155d',
                    '950': '#520039',
                },
                'green-c': {
                    '50': '#f4fce9',
                    '100': '#e6f8cf',
                    '200': '#cdf1a5',
                    '300': '#ace670',
                    '400': '#8cd744',
                    '500': '#6dbd25',
                    '600': '#54991a',
                    '700': '#407318',
                    '800': '#355b19',
                    '900': '#2f4e19',
                    '950': '#152b08',
                },
                
                
            },
            borderRadius: {
                lg: `var(--radius)`,
                md: `calc(var(--radius) - 2px)`,
                sm: "calc(var(--radius) - 4px)",
            },

            keyframes: {
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [forms, require("tailwindcss-animate")],
};

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      colors: {
        "clr-primary": {
          light: "hsl(var(--clr-primary-light))",
          DEFAULT: "hsl(var(--clr-primary))",
          dark: "hsl(var(--clr-primary-dark))",
        },
        "clr-secondary": {
          DEFAULT: "hsl(var(--clr-secondary))",
          foreground: "hsl(var(--clr-secondary-foreground))",
        },

        "clr-navbar": {
          light: "hsl(var(--clr-navbar-light))",
          DEFAULT: "hsl(var(--clr-navbar))",
          dark: "hsl(var(--clr-navbar-dark))",
        },

        "clr-sidebar": {
          light: "hsl(var(--clr-sidebar-light))",
          DEFAULT: "hsl(var(--clr-sidebar))",
          dark: "hsl(var(--clr-sidebar-dark))",
        },

        "clr-surface": {
          light: "hsl(var(--clr-background-light))",
          DEFAULT: "hsl(var(--clr-background))",
          dark: "hsl(var(--clr-background-dark))",
        },

        "clr-surface-accent": {
          light: "hsl(var(--clr-accent-light))",
          DEFAULT: "hsl(var(--clr-accent))",
          dark: "hsl(var(--clr-accent-dark))",
        },

        "clr-accent": {
          light: "hsl(var(--clr-text-accent-light))",
          DEFAULT: "hsl(var(--clr-text-accent))",
          dark: "hsl(var(--clr-text-accent-dark))",
        },

        "clr-content": {
          light: "hsl(var(--clr-text-content-light))",
          DEFAULT: "hsl(var(--clr-text-content))",
          dark: "hsl(var(--clr-text-content-dark))",
        },

        "clr-caption": {
          light: "hsl(var(--clr-text-caption-light))",
          DEFAULT: "hsl(var(--clr-text-caption))",
          dark: "hsl(var(--clr-text-caption-dark))",
        },

        "clr-heading": {
          light: "hsl(var(--clr-text-heading-light))",
          DEFAULT: "hsl(var(--clr-text-heading))",
          dark: "hsl(var(--clr-text-heading-dark))",
        },

        "clr-menu": {
          light: "hsl(var(--clr-text-menu-light))",
          DEFAULT: "hsl(var(--clr-text-menu))",
          dark: "hsl(var(--clr-text-menu-dark))",
        },

        "clr-surface-hover": {
          light: "hsl(var(--clr-surface-hover-light))",
          DEFAULT: "hsl(var(--clr-surface-hover))",
          dark: "hsl(var(--clr-surface-hover-darl))",
        },

        "clr-popup": {
          light: "hsl(var(--clr-popup-light))",
          DEFAULT: "hsl(var(--clr-popup))",
          dark: "hsl(var(--clr-popup-dark))",
        },

        "clr-warning": {
          light: "hsl(var(--clr-warning-light))",
          DEFAULT: "hsl(var(--clr-warning))",
          dark: "hsl(var(--clr-warning-dark))",
        },

        "clr-error": {
          light: "hsl(var(--clr-error-light))",
          DEFAULT: "hsl(var(--clr-error))",
          dark: "hsl(var(--clr-error-dark))",
        },

        "clr-success": {
          light: "hsl(var(--clr-success-light))",
          DEFAULT: "hsl(var(--clr-success))",
          dark: "hsl(var(--clr-success-dark))",
        },

        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "custom-sm": "0 0 10px 1px rgba(0,0,0,0.5)",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

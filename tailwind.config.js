const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["./src/pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    100: "#023E8A"
                },
                secondary: {
                    100: "#ADE8F4"
                }
            },
            fontFamily: {
                sans: ["Raleway", ...defaultTheme.fontFamily.sans],
                oswald: ["Oswald", "sans-serif"]
            }
        }
    },
    plugins: []
};

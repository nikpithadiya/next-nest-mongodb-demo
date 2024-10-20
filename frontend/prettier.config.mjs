/** @type {import("prettier").Config} */
const config = {
    plugins: [require.resolve("prettier-plugin-tailwindcss")],
    endOfLine: "auto",
    trailingComma: "none",
    printWidth: 160
  };
  
  module.exports = config;
  
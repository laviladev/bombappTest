import js from "@eslint/js"
import solid from "eslint-plugin-solid/configs/typescript"
import * as tsParser from "@typescript-eslint/parser"
import globals from "globals"

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    ...solid,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "tsconfig.json",
      },
      globals: {
        ...globals.browser
      }
    },
  },
  {
    rules: {
      // Indentación de 2 espacios
      "indent": ["error", 2],
      // Error si no hay punto y coma
      "semi": ["error", "never"],
      // Permitir omitir comas finales
      "comma-dangle": ["off"],
    },
  },
]
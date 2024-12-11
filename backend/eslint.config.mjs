import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"]
  },
  {
    languageOptions: {
      globals: globals.browser,
    }
  },
  pluginJs.configs.recommended,

  ...tseslint.configs.recommended,

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

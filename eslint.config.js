import globals from "globals";


export default [
  {
    languageOptions: { globals: globals.browser },
    rules: {
      "indent": ['error', 4],
      "quotes": ['error', 'single'],
      "semi": ['error', 'never'],
      "no-var": "error",
      "no-unused-vars": ["warn", { "args": "none" }],
      "comma-dangle": ["error", "only-multiline"],
      "arrow-spacing": ["error", { "before": true, "after": true }],
      "array-bracket-spacing": ["error", "never"],
      "object-curly-spacing": ["error", "always"],
      "no-shadow": "warn"
    }
  },
];
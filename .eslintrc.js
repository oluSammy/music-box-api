module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
<<<<<<< HEAD
    // "prettier/@typescript-eslint",
=======
>>>>>>> 5fcd1357b36b5937bde85b6c8c5d69048e169e81
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "no-underscore-dangle": "off",
    "no-var": "off",
    camelcase: "off",
    "func-names": "off",
    "import/order": "off",
    "no-use-before-define": "off",
    "vars-on-top": "off",
    "prefer-template": "off",
    "import/prefer-default-export": "off",
    "no-useless-escape": "off",
<<<<<<< HEAD
=======
    "@typescript-eslint/no-explicit-any": "off",
>>>>>>> 5fcd1357b36b5937bde85b6c8c5d69048e169e81
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
    jest: {
      version: 26,
    },
  },
};

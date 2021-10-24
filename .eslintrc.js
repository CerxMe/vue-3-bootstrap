module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/vue3-essential", "plugin:prettier/recommended", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2020
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "max-len": ["warn", { code: 130 }],
    "prettier/prettier": ["warn", { printWidth: 130 }]
  },
  overrides: [
    {
      files: ["**/tests/unit/**/*.spec.{j,t}s?(x)"],
      env: {
        jest: true
      }
    }
  ]
};

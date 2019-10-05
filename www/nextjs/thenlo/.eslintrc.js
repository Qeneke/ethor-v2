const path = require("path");
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: path.resolve(__dirname, "./tsconfig.json"),
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "plugin:react/recommended",
    "plugin:security/recommended"
  ],
  rules: {
    semi: 1,
    "react/react-in-jsx-scope": 0,
    "class-methods-use-this": ["error", { exceptMethods: ["render"] }], // for react render method with no use this
    "react/prop-types": 0, // for propTypes - typescript
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }]
  },
  settings: {
    "import/resolver": {
      typescript: {},
      alias: {
        map: [
          ["@@components", path.resolve(__dirname, "./components")],
          ["@@static", path.resolve(__dirname, "./static")],
          ["@@utils", path.resolve(__dirname, "./utils")]
        ],
        extensions: [".ts", ".tsx", ".css"]
      }
    },
    react: {
      version: require("../../../package.json").dependencies.react
    }
  }
};

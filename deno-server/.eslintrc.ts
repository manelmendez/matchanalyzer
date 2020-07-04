module.exports = {
  root: true,
  parserOptions: {
    "ecmaVersion": 9
  },
  extends: ["eslint:recommended","prettier"],
  env: {
    "es6": true,
    "node": true,
    "jest": true
  },
  rules: {
    "semi": "off",
    "no-console": 0,
    "no-var": "error"
  }
};
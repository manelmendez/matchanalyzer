module.exports = {
  root: true,
  parserOptions: {
    "ecmaVersion": 2017,
    "sourceType": "module"
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
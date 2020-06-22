module.exports = {
  root: true,
  parserOptions: {
    "ecmaVersion": 9,
    "sourceType": "module"
  },
  extends: ["eslint:recommended","prettier"],
  env: {
    "browser": true, //enable window. ...
    "es6": true,
    "node": true,
    "jest": true
  },
  rules: {
    "semi": "off",
    "no-console": "off",
    "no-var": "error"
  }
}
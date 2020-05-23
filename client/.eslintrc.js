module.exports = {
  root: true,
  parserOptions: {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  extends: ["eslint:recommended", "prettier"],
  env: {
    "browser": true, //enable window. ...
    "es6": true,
    "node": true,
    "jest": true
  },
  rules: {
    "no-console": "warn"
  }
}
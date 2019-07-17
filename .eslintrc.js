module.exports = {
  "env": {
    "es6": true,
    "node": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
    "indent": [
      "error",
      2,
      { "SwitchCase": 1 }
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-console": [
      "off"
    ],
    "no-case-declarations": [
      "off"
    ],
    "prefer-const": [
      "error"
    ],
    "arrow-parens": [
      "error",
      "as-needed"
    ],
    "@typescript-eslint/no-angle-bracket-type-assertion": ["off"],
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/indent": ["error", 2]
  },
  "overrides": [{
    "files": ["**/*.js", "**/*.json"],
    "rules": {
      "@typescript-eslint/no-var-requires": "off"
    }
  },
  {
    "files": ["*.json"],
    "rules": {
      "quotes": [
        "error",
        "double"
      ],
      "semi": [
        "error",
        "never"
      ]
    }
  }]
};

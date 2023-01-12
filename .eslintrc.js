module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'airbnb',
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        // 'plugin:jest/recommended',
        'prettier',
        'plugin:prettier/recommended',
    ],
    env: {
        browser: true,
        // jest: true,
        es6: true
    },
    plugins: ['react', /*'jest',*/ '@typescript-eslint', 'prettier'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports,
        project: './tsconfig.json',
    },
    rules: {
        "react/jsx-no-bind": "off",
        "react/jsx-props-no-spreading": "off",
        "react/require-default-props": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "prettier/prettier": [
            "error",
            {
                trailingComma: "es5",
                semi: false,
                singleQuote: false,
                printWidth: 120,
                endOfLine: "auto"
            }
        ]
    }
};

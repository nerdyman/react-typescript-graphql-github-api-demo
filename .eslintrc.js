module.exports = {
    root: true,

    parser: '@typescript-eslint/parser',

    extends: [
        'eslint:recommended',
        'plugin:jest/recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:jsx-a11y/recommended',
        'prettier',
        'prettier/react',
        'prettier/@typescript-eslint',
    ],

    plugins: ['@typescript-eslint', 'jest'],

    env: {
        browser: true,
        es6: true,
        'jest/globals': true,
    },

    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },

    globals: {
        __ENV__: 'readonly'
    },

    rules: {
        'linebreak-style': ['error', 'unix'],
        'lines-around-comment': 0,
        'no-confusing-arrow': 0,
        'no-tabs': 0,
        semi: ['error', 'always'],

        // Accessible emoji reports false positives, `SharedEmoji` component abides
        'jsx-a11y/accessible-emoji': 0,

        'babel/object-curly-spacing': 0,

        'import/no-default-export': ['error'],
        'import/order': ['warn', { 'newlines-between': 'always' }],

        'react/jsx-filename-extension': 0,
        'react/jsx-indent': 0,
        'react/jsx-indent-props': 0,
        'react/prop-types': 0,

        '@typescript-eslint/no-unused-vars': 'error',
    },
};

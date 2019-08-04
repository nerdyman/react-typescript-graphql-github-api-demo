/* eslint-env node */
module.exports = {
    presets: ['@babel/env', '@babel/react', ['@babel/typescript']],
    plugins: [
        'react-hot-loader/babel',
        '@babel/plugin-proposal-class-properties',
    ],
};

/* eslint-env node */
module.exports = {
    plugins: {
        'postcss-import': {},
        'postcss-preset-env': {
            autoprefixer: {
                flexbox: 'no-2009',
            },
            stage: 3,
        },
        'postcss-normalize': {},
    },
};

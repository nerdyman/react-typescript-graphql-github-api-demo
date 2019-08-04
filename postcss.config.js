/* eslint-env node */

const postcssConfig = {
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

if (process.env.NODE_ENV === 'production') {
    postcssConfig.plugins['postcss-clean'] = {};
}

module.exports = postcssConfig;

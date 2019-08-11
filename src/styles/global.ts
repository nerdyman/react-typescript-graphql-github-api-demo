import { css, SerializedStyles } from '@emotion/core';

import { Theme } from '../styles/theme';

export const globalCss = (theme: Theme): SerializedStyles => css`
    @font-face {
        font-family: '${theme.fonts.bodys[0]}';
        font-weight: 100 900;
        font-style: normal;
        font-display: swap;
        font-named-instance: 'Regular';
        src: url('https://rsms.me/inter/font-files/Inter-upright.var.woff2?v=3.7')
            format('woff2');
    }

    @font-face {
        font-family: '${theme.fonts.bodys[1]}';
        font-weight: 100 900;
        font-style: italic;
        font-display: swap;
        font-named-instance: 'Italic';
        src: url('https://rsms.me/inter/font-files/Inter-upright.var.woff2?v=3.7')
            format('woff2');
    }

    :root {
        font-size: ${theme.root.fontSizes.bases[0]};

        ${theme.mediaQuery.medium`
            font-size: ${theme.root.fontSizes.bases[1]};
        `}
    }

    body {
        font-size: ${theme.fontSizes.normal};
        line-height: ${theme.lineHeights.multi};
        font-family: '${theme.fonts.body}', arial, sans-serif;
        font-weight: ${theme.fontWeights.base};
        background-color: ${theme.colors.uiBodyBase};
        color: ${theme.colors.uiBodyContrast};
    }

    h1, h2, h3, h4, h5 {
        font-family: '${theme.fonts.bodys[0]}', arial, sans-serif;
        font-weight: ${theme.fontWeights.bases[4]};
        line-height: ${theme.lineHeights.normal};
    }

    a {
        color: ${theme.colors.brandPrimaryBase};
    }
`;

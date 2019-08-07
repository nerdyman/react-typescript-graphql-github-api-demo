/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { css, SerializedStyles } from '@emotion/core';

/**
 * Get Theme without having to duplicate definition values
 */
const getTheme = () => {
    const rootBreakpoints = {
        lowest: '375px',
        lower: '500px',
        low: '640px',
        medium: '800px',
        high: '1024px',
        higher: '1280px',
        highest: '1400px',
    };

    type RootBreakpoints = typeof rootBreakpoints;

    // Root color definitions, not directly included in theme
    const rootColors = {
        // Blacks
        black: '#322C3C',
        blacks: [
            '#000000',
            '#110f14',
            '#1c1922',
            '#26222e',
            '#322C3C',
            '#423a4e',
            '#544b61',
            '#6a6079',
            '#746a83',
        ],
        // Blues
        blue: '#36c3f1',
        blues: [
            '#113541',
            '#1b576c',
            '#25809e',
            '#2faad2',
            '#36c3f1',
            '#56CCF2',
            '#6bd9fc',
            '#91e3fc',
            '#b3edff',
        ],
        // Greens
        green: '#49b43b',
        greens: [
            '#182f16',
            '#20421c',
            '#2d6926',
            '#3e9134',
            '#49b43b',
            '#7ce76e',
            '#8df480',
            '#a3ff98',
            '#bdffb5',
        ],
        // Oranges
        orange: '#ee9d30',
        oranges: [
            '#1f1304',
            '#372309',
            '#543b19',
            '#795628',
            '#bb7e2d',
            '#ee9d30',
            '#faae48',
            '#ffc981',
            '#ffe0b5',
        ],
        purple: '#612C83',
        purples: [
            '#1d0031',
            '#2a004d',
            '#320557',
            '#3d268e',
            '#612C83',
            '#8D50F0',
            '#a56ffb',
            '#b78dfa',
            '#cbb0f7',
        ],
        // Reds
        red: '#d21515',
        reds: [
            '#3c1010',
            '#5e1515',
            '#791717',
            '#a31a1a',
            '#d21515',
            '#f04343',
            '#f66565',
            '#f68686',
            '#f7d2d2',
        ],
        // Whites
        white: '#f8f8f8',
        whites: [
            '#7a7a7a',
            '#999999',
            '#aaaaaa',
            '#bebebe',
            '#d2d2d2',
            '#eff2f4',
            '#f3f3f3',
            '#f8f8f8',
            '#ffffff',
        ],

        outline: 'rgba(97, 44, 131, .35)',
        shadow: 'rgba(0, 0, 0, 0.07)',
        shadows: [
            'rgba(0, 0, 0, 0.07)',
            'rgba(0, 0, 0, 0.35)',
            'rgba(0, 0, 0, 0.65)',
        ],
    };

    const rootLineHeights = {
        single: 1,
        normal: 1.2,
        multi: 1.4375,
        spaced: 1.6,
    };

    const rootFontSizes = {
        smallest: '.65rem',
        smaller: '.75rem',
        small: '.85rem',
        normal: '1rem',
        medium: '1.25rem',
        large: '1.6rem',
        larger: '1.85rem',
    };

    const rootSpace = {
        nudge: '.1rem',
        fifth: '.2rem',
        quarter: '.25rem',
        third: '.333333rem',
        twoFifth: '.4rem',
        half: '.5rem',
        threeFifth: '.6rem',
        twoThird: '.666666rem',
        threeQuarter: '.75rem',
        fourFifth: '.8rem',
        whole: '1rem',
        wholeQuarter: '1.25rem',
        wholeHalf: '1.5rem',
        wholeThreeQuarter: '1.75rem',
        double: '2rem',
    };

    const rootTransition = {
        delay: 0,
        duration: '.275s',
        timingFunction: 'cubic-bezier(.5, -.5, .3, 1.3)',
    };

    /**
     * Css transition helper
     */
    const getTransitionCss = (
        property = 'all',
        {
            delay = rootTransition.delay,
            duration = rootTransition.duration,
            timingFunction = rootTransition.timingFunction,
        } = {},
    ) => css`
        transition-delay: ${delay};
        transition-duration: ${duration};
        transition-property: ${property};
        transition-timing-function: ${timingFunction};
    `;

    type MediaQuery = {
        [key in keyof RootBreakpoints]: typeof css;
    };

    const mediaQuery = Object.keys(rootBreakpoints).reduce(
        (acc: { [key: string]: () => SerializedStyles }, label) => {
            acc[label] = (...args: []) => css`
                @media (min-width: ${rootBreakpoints[
                        label as keyof RootBreakpoints
                    ]}) {
                    ${css(...args)}
                }
            `;

            return acc;
        },
        {},
    );

    const zIndices = {
        negative: -1,
        zero: 0,
        low: 2,
        media: 4,
        high: 6,
        maximum: 999,
    };

    const rootTheme = {
        root: {
            fontSizes: {
                bases: ['15px', '17px'],
            },
        },
        zIndices: {
            ...Object.values(zIndices),
            ...zIndices,
        },
        radii: ['.125rem', '.2rem', '.3rem'],
        borders: {
            borderStyles: ['solid'],
            borderWidths: [0, '1px', '2px'],
        },
        breakpoints: {
            ...Object.values(rootBreakpoints),
            ...rootBreakpoints,
        },
        colors: {
            // Branding
            brandPrimaryBase: rootColors.purple,
            brandPrimaryContrast: rootColors.white,
            brandPrimaryOnBase: rootColors.purples[6],
            brandPrimaryOnContrast: rootColors.white,
            // Intents (statuses)
            intentGoodBase: rootColors.green,
            intentGoodContrast: rootColors.white,
            intentBadBase: rootColors.orange,
            intentBadContrast: rootColors.white,
            intentUglyBase: rootColors.red,
            intentUglyContrast: rootColors.white,
            intentNeutralBase: rootColors.blue,
            intentNeutralContrast: rootColors.white,
            // Standard UI
            uiBannerBase: rootColors.purples[2],
            uiBannerContrast: rootColors.white,
            uiBodyBase: rootColors.whites[5],
            uiBodyContrast: rootColors.black,
            uiBodyAlt: rootColors.whites[4],
            uiContentBorderBase: rootColors.whites[4],
            uiContentBodyBase: rootColors.white,
            uiContentBodyContrast: rootColors.blacks[6],
            uiInteractiveOutlineBase: rootColors.outline,
            uiOverlayBase: rootColors.shadows[2],
            uiOverlayContrast: rootColors.white,
        },
        fonts: {
            body: 'font-body-0',
            bodys: ['font-body-0', 'font-body-1'],
        },
        fontSizes: { ...Object.values(rootFontSizes), ...rootFontSizes },
        fontWeights: {
            base: 500,
            bases: [300, 400, 500, 600, 750, 900],
        },
        lineHeights: {
            ...Object.values(rootLineHeights),
            ...rootLineHeights,
        },
        // Automagically generate media queries based on `breakpoint` key/values
        // Allows us to use media queries as functions in `styled` components like:
        // `${props => props.theme.mediaQuery.low`
        //     content: 'Only on low and up!';
        // `}`
        mediaQuery: mediaQuery as MediaQuery,
        shadows: {
            base: `0 0.08rem 0.15rem ${rootColors.shadow}`,
            active: `0 0.16rem 0.15rem ${rootColors.shadow}`,
        },
        space: {
            ...Object.values(rootSpace),
            ...rootSpace,
        },
        transition: {
            ...rootTransition,
            call: (...args: []) => getTransitionCss(...args),
        },
    };

    return rootTheme;
};

export const theme = getTheme();
export type Theme = typeof theme;

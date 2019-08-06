import { css } from '@emotion/core';

import { Theme } from './theme';

interface ShadowCssProps {
    theme: Theme;
    shadow?: boolean;
}

export const shadowCss = (props: ShadowCssProps) =>
    props.shadow &&
    css`
        box-shadow: 0 0 0 0.25rem ${props.theme.colors.uiInteractiveOutlineBase};
    `;

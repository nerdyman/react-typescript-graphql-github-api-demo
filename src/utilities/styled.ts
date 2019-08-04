import styled, { CreateStyled } from '@emotion/styled';

import { Theme } from '../styles/theme';

/**
 * Fix for color prop conflict between styled-system and native html
 */
export interface ColorPropFix {
    color?: string | undefined;
}

/**
 * Wrapper for emotion's `styled` with our theme context type provided
 */
export default styled as CreateStyled<Theme>; // eslint-disable-line import/no-default-export

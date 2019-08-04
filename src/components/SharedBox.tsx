import {
    background,
    BackgroundProps,
    border,
    BorderProps,
    color,
    ColorProps,
    flexbox,
    FlexboxProps,
    grid,
    GridProps,
    layout,
    LayoutProps,
    position,
    PositionProps,
    space,
    SpaceProps,
    typography,
    TypographyProps,
} from 'styled-system';
import shouldForwardProp from '@styled-system/should-forward-prop';

import styled, { ColorPropFix } from '../utilities/styled';

export type SharedBoxProps = BackgroundProps &
    BorderProps &
    ColorProps &
    FlexboxProps &
    GridProps &
    LayoutProps &
    PositionProps &
    SpaceProps &
    TypographyProps &
    ColorPropFix;

/**
 * Generic Box component, compatible with all relevant styled-system props
 */
export const SharedBox = styled('div', { shouldForwardProp })<SharedBoxProps>`
	${background}
	${border}
	${color}
	${flexbox}
	${grid}
	${layout}
	${position}
	${space}
	${typography}
`;

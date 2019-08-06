import React from 'react';

import styled from '../utilities/styled';

// import { SharedBox } from './SharedBox';

/**
 * Generic unstyled button
 */
export const SharedButtonRoot: React.FC<
    React.ButtonHTMLAttributes<HTMLButtonElement>
> = props => <button tabIndex={0} {...props} />;

/**
 * Generic unstyled button with styled system props
 */
// const SharedButtonSystem = SharedBox.withComponent(SharedButtonRoot);

/**
 * Generic styled button
 */
export const SharedButton = styled(SharedButtonRoot)`
    padding: ${props =>
        `${props.theme.space.half} ${props.theme.space.threeQuarter}`};
    border-radius: ${props => props.theme.radii[0]};
    font-weight: ${props => props.theme.fontWeights.bases[3]};
    background-color: ${props => props.theme.colors.brandPrimaryBase};
    color: ${props => props.theme.colors.brandPrimaryContrast};
    cursor: pointer;

    &:focus {
        box-shadow: 0 0 0 0.25rem
            ${props => props.theme.colors.uiInteractiveOutlineBase};
        outline-style: solid;
        outline-offset: -1px;
    }

    &[disabled] {
        cursor: not-allowed;
        opacity: 0.65;
    }
`;

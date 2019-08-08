import React from 'react';

import styled from '../utilities/styled';

export type SharedButtonPrimitiveProps = React.ButtonHTMLAttributes<
    HTMLButtonElement
>;

/**
 * Generic unstyled button
 */
export const SharedButtonPrimitive: React.FC<
    SharedButtonPrimitiveProps
> = props => <button tabIndex={0} {...props} />;

/**
 * Generic styled button
 */
export const SharedButtonRoot = styled(SharedButtonPrimitive)`
    border-radius: ${props => props.theme.radii[1]};
    line-height: ${props => props.theme.lineHeights.single};
    font-weight: ${props => props.theme.fontWeights.bases[3]};
    color: ${props => props.theme.colors.brandPrimaryBase};
    cursor: pointer;

    &:focus {
        outline-style: solid;
        outline-offset: -1px;
    }

    &:active:not([disabled]) {
        transform: translateY(${props => props.theme.space.nudge});
    }

    &[disabled] {
        cursor: not-allowed;
        opacity: 0.65;
    }
`;

interface SharedButtonProps extends SharedButtonPrimitiveProps {
    icon?: React.ReactElement;
}

export const SharedButton: React.FC<SharedButtonProps> = ({
    icon,
    children,
    ...props
}): React.ReactElement => (
    <SharedButtonRoot {...props}>
        {icon && <span>{icon}</span>}
        <span>{children}</span>
    </SharedButtonRoot>
);

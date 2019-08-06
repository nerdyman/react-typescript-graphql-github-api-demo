import React from 'react';

import styled from '../utilities/styled';

export const SharedLayoutRoot = styled.div`
    display: flex;
    width: 100%;
    min-height: 100vh;
    flex-direction: column;
`;

export const SharedLayoutExtremity = styled.header`
    flex-shrink: 0;
`;

export const SharedLayoutBody = styled.div`
    flex-grow: 1;
`;

interface SharedLayoutProps {
    header: React.ReactElement;
    footer: React.ReactElement;
}

/**
 * Main layout component, stretches body to fill space between header and footer
 */
export const SharedLayout: React.FC<SharedLayoutProps> = ({
    header,
    children,
    footer,
    ...props
}) => (
    <SharedLayoutRoot {...props}>
        <SharedLayoutExtremity>{header}</SharedLayoutExtremity>
        <SharedLayoutBody>{children}</SharedLayoutBody>
        <SharedLayoutExtremity>{footer}</SharedLayoutExtremity>
    </SharedLayoutRoot>
);

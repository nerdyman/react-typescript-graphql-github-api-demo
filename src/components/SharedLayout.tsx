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
    display: flex;
    flex-direction: column;
    padding-top: ${props => props.theme.space.double};
    padding-bottom: ${props => props.theme.space.double};
    flex-grow: 1;
`;

const SharedLayoutTitleRoot = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${props => props.theme.space.whole};

    ${props => props.theme.mediaQuery.higher`
        margin-bottom: ${props.theme.space.wholeHalf};
    `}
`;

const SharedLayoutTitleMain = styled.h1`
    font-size: ${props => props.theme.fontSizes.larger};
`;

interface SharedLayoutTitleProps {
    /** Component to show after main heading (outside of actual `h1` element) */
    after?: React.ReactElement;
}

export const SharedLayoutTitle: React.FC<SharedLayoutTitleProps> = ({
    after,
    children,
    ...props
}): React.ReactElement => (
    <SharedLayoutTitleRoot {...props}>
        <SharedLayoutTitleMain>{children}</SharedLayoutTitleMain>
        {after && after}
    </SharedLayoutTitleRoot>
);

interface SharedLayoutProps {
    /** Header component instance */
    header: React.ReactElement;
    /** Footer component instance */
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
}): React.ReactElement => (
    <SharedLayoutRoot {...props}>
        <SharedLayoutExtremity role="banner">{header}</SharedLayoutExtremity>
        <SharedLayoutBody>{children}</SharedLayoutBody>
        <SharedLayoutExtremity>{footer}</SharedLayoutExtremity>
    </SharedLayoutRoot>
);

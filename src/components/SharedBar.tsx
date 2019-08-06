import React from 'react';

import styled from '../utilities/styled';

import { SharedBox, SharedBoxProps } from './SharedBox';

const SharedBarRoot = styled(SharedBox.withComponent('ul'))`
    list-style-type: none;
`;

interface SharedBarProps extends SharedBoxProps {
    items?: { key: string; value: React.ReactElement | string }[];
}

/**
 * Generic horizontal bar with spaced children
 */
export const SharedBar: React.FC<SharedBarProps> = ({ items, ...props }) => (
    <SharedBarRoot
        display="grid"
        gridGap="whole"
        gridAutoFlow="column"
        justifyContent="start"
        {...props}
    >
        {items && items.map(item => <li key={item}>{item}</li>)}
    </SharedBarRoot>
);

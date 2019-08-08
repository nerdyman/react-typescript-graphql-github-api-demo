import React from 'react';

import { useNetworkStatus } from '../store/network-status';
import styled from '../utilities/styled';

const SharedNetworkStatusIndicatorRoot = styled.div<{ isOnline: boolean }>`
    display: flex;
    align-items: center;
    font-size: ${props => props.theme.fontSizes.small};
    line-height: ${props => props.theme.lineHeights.single};

    &::after {
        content: '';
        width: 0.65rem;
        height: 0.65rem;
        margin-left: ${props => props.theme.space.half};
        border-radius: 100%;
        background-color: ${props =>
            props.isOnline
                ? props.theme.colors.intentGoodBase
                : props.theme.colors.intentUglyBase};
    }
`;

export const SharedNetworkStatusIndicator: React.FC = (
    props,
): React.ReactElement | null => {
    const { isOnline } = useNetworkStatus();
    const status = isOnline ? 'Online' : 'Offline';

    return (
        <SharedNetworkStatusIndicatorRoot
            role="status"
            isOnline={isOnline}
            title={`Network is ${status}`}
            {...props}
        >
            <span>Status: {status}</span>
        </SharedNetworkStatusIndicatorRoot>
    );
};

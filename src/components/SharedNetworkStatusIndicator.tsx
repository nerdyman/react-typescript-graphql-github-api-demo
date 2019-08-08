import React from 'react';

import { useNetworkStatus } from '../store/network-status';

export const SharedNetworkStatusIndicator: React.FC = (props): (React.ReactElement|null) => {
    const { isOnline } = useNetworkStatus();

    if (!isOnline) {
        return null;
    }

    return <div {...props}>You&apos;re offline!</div>;
};

import React from 'react';

import { SharedLayoutTitle } from './SharedLayout';
import { SharedWrapper } from './SharedWrapper';

export const Route404: React.FC = props => (
    <SharedWrapper {...props}>
        <SharedLayoutTitle>Unable to find page</SharedLayoutTitle>
    </SharedWrapper>
);

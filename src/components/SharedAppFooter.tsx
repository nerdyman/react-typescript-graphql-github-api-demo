import React from 'react';

import { SharedBox } from './SharedBox';
import { SharedWrapper } from './SharedWrapper';

const SharedAppFooterRoot = SharedBox.withComponent('footer');

export const SharedAppFooter: React.FC = ({ children, ...props }) => (
    <SharedAppFooterRoot
        display="flex"
        justifyContent="center"
        bg="uiBannerBase"
        color="uiBannerContrast"
        py="half"
        fontSize="small"
        {...props}
    >
        <SharedWrapper>{children}</SharedWrapper>
    </SharedAppFooterRoot>
);

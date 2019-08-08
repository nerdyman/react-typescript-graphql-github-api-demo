import React from 'react';
import { Link } from 'react-router-dom';

import { Routes } from '../config';
import styled from '../utilities/styled';

import { SharedBox } from './SharedBox';
import { SharedNetworkStatusIndicator } from './SharedNetworkStatusIndicator';
import { SharedWrapper } from './SharedWrapper';

const SharedAppHeaderWrapper = styled(SharedWrapper)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const SharedBannerHeaderNavLink = SharedBox.withComponent(Link);

export const SharedAppHeader: React.FC<{ routes: Routes }> = ({
    routes,
    ...props
}) => (
    <SharedBox
        bg="uiBannerBase"
        color="uiBannerContrast"
        py="threeQuarter"
        {...props}
    >
        <SharedAppHeaderWrapper>
            <nav role="navigation">
                {Object.values(routes).map(route => (
                    <SharedBannerHeaderNavLink
                        key={route.link}
                        color="uiBannerContrast"
                        to={route.link}
                    >
                        {route.label}
                    </SharedBannerHeaderNavLink>
                ))}
            </nav>
            <SharedNetworkStatusIndicator />
        </SharedAppHeaderWrapper>
    </SharedBox>
);

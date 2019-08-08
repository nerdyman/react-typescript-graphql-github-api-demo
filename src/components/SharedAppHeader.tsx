import React from 'react';
import { Link } from 'react-router-dom';

import { Routes } from '../config';
import styled from '../utilities/styled';

import { SharedBox } from './SharedBox';
import { SharedNetworkStatusIndicator } from './SharedNetworkStatusIndicator';
import { SharedWrapper } from './SharedWrapper';

const SharedAppHeaderRoot = SharedBox.withComponent('header');

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
    <SharedAppHeaderRoot
        bg="uiBannerBase"
        color="uiBannerContrast"
        py="threeQuarter"
        role="banner"
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
    </SharedAppHeaderRoot>
);

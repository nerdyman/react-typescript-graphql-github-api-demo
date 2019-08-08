import React from 'react';
import { Link } from 'react-router-dom';

import { Routes } from '../config';

import { SharedBox } from './SharedBox';
import { SharedNetworkStatusIndicator } from './SharedNetworkStatusIndicator';
import { SharedWrapper } from './SharedWrapper';

const SharedBannerHeaderRoot = SharedBox.withComponent('header');
const SharedBannerHeaderNavLink = SharedBox.withComponent(Link);

export const SharedAppHeader: React.FC<{ routes: Routes }> = ({
    routes,
    ...props
}) => (
    <SharedBannerHeaderRoot
        bg="uiBannerBase"
        color="uiBannerContrast"
        py="threeQuarter"
        role="banner"
        {...props}
    >
        <SharedWrapper>
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
        </SharedWrapper>
    </SharedBannerHeaderRoot>
);

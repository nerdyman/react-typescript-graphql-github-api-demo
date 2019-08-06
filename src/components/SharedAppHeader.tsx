import React from 'react';
import { Link } from 'react-router-dom';

import { Routes } from '../App';

import { SharedBox } from './SharedBox';
import { SharedWrapper } from './SharedWrapper';

const SharedBannerHeaderRoot = SharedWrapper.withComponent('header');
const SharedBannerHeaderNavLink = SharedBox.withComponent(Link);

export const SharedBannerHeader: React.FC<{ routes: Routes }> = ({
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
        <nav role="navigation">
            <SharedBannerHeaderNavLink
                color="uiBannerContrast"
                to={routes.me.link}
            >
                {routes.me.label}
            </SharedBannerHeaderNavLink>
            {/* <Link to={routes.starred.link}>
                {routes.starred.label}
            </Link> */}
        </nav>
    </SharedBannerHeaderRoot>
);

import React from 'react';
import { space, SpaceProps } from 'styled-system';

import styled from '../utilities/styled';

const SharedAvatarRoot = styled.a`
    ${space}
    display: block;
    width: 4rem;
    height: 4rem;
    background-image: url('https://via.placeholder.com/240x240?text=...');
    background-size: cover;
    border-radius: 100%;
    background-color: ${props => props.theme.colors.uiBodyBase};
    overflow: hidden;
`;

const SharedAvatarImg = styled.img`
    width: 100%;
    height: 100%;
`;

interface SharedAvatarProps extends SpaceProps {
    avatarUrl: string;
    login: string;
    url: string;
}

/**
 * Generic Avatar component
 */
export const SharedAvatar: React.SFC<SharedAvatarProps> = ({
    avatarUrl,
    login,
    url,
    ...props
}): React.ReactElement => (
    <SharedAvatarRoot
        target="_blank"
        rel="noopener noreferrer"
        href={url}
        title={login}
        {...props}
    >
        <SharedAvatarImg src={avatarUrl} alt={login} />
    </SharedAvatarRoot>
);

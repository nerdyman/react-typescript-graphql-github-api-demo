import React from 'react';
import { space, SpaceProps } from 'styled-system';

import styled from '../utilities/styled';

const SharedAvatarRoot = styled.a`
    ${space}
    display: block;
`;

const SharedAvatarImg = styled.img`
    width: 4rem;
    height: 4rem;
    background-color: ${props => props.theme.colors.uiBodyBase};
    border-radius: 100%;
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

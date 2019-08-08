import React from 'react';
import { useMutation } from 'urql';

import { Maybe, Starrable } from '../generated/graphql';
import {
    repositoryMutationStar,
    repositoryMutationUnstar,
} from '../graphql/respository';

import { SharedButton } from './SharedButton';
import { SharedEmoji } from './SharedEmoji';

export interface SharedListingStarButtonProps {
    id: Starrable['id'];
    viewerHasStarred: Maybe<Starrable['viewerHasStarred']>;
}

/**
 * Toggle star/unstar
 */
export const RepositoryButtonStar: React.FC<SharedListingStarButtonProps> = ({
    id,
    viewerHasStarred,
    ...props
}): React.ReactElement => {
    const [resStar, execStarMutation] = useMutation(repositoryMutationStar);
    const [resUnstar, execUnstarMutation] = useMutation(
        repositoryMutationUnstar,
    );

    const isFetching = resStar.fetching || resUnstar.fetching;
    const label = viewerHasStarred ? 'Unstar' : 'Star';
    const emoji = viewerHasStarred ? '🤩' : '💫';

    const handleClick = () => {
        if (viewerHasStarred) {
            execUnstarMutation({ id });
        } else {
            execStarMutation({ id });
        }
    };

    return (
        <SharedButton
            {...props}
            icon={<SharedEmoji label={label}>{emoji}</SharedEmoji>}
            disabled={isFetching}
            onClick={handleClick}
            title={label}
        />
    );
};

import React from 'react';
import { useMutation } from 'urql';

import {
    Maybe,
    Starrable,
    Subscribable,
    SubscriptionState,
} from '../generated/graphql';
import {
    repositoryMutationStar,
    repositoryMutationUnstar,
    repositoryMutationUpdateSubscription,
} from '../graphql/respository';

import { SharedButton, SharedButtonPrimitiveProps } from './SharedButton';
import { SharedEmoji } from './SharedEmoji';

interface RepositoryButtonToggleStarProps extends SharedButtonPrimitiveProps {
    id: Starrable['id'];
    viewerHasStarred: Maybe<Starrable['viewerHasStarred']>;
}

/**
 * Toggle star
 */
export const RepositoryButtonToggleStar: React.FC<
    RepositoryButtonToggleStarProps
> = ({ id, viewerHasStarred, ...props }): React.ReactElement => {
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
            disabled={isFetching || props.disabled}
            onClick={handleClick}
            title={props.title || label}
        />
    );
};

interface RepositoryButtonToggleSubscibeWatchProps
    extends SharedButtonPrimitiveProps {
    id: Subscribable['id'];
    viewerCanSubscribe: Maybe<Subscribable['viewerCanSubscribe']>;
    viewerSubscription: Maybe<Subscribable['viewerSubscription']>;
}

/**
 * Toggle watch
 */
export const RepositoryButtonToggleSubscibe: React.FC<
    RepositoryButtonToggleSubscibeWatchProps
> = ({
    id,
    viewerCanSubscribe,
    viewerSubscription,
    ...props
}): React.ReactElement => {
    const [res, execUpdateSubscription] = useMutation(
        repositoryMutationUpdateSubscription,
    );

    const viewerIsSubcribed =
        viewerSubscription === SubscriptionState.Subscribed;
    const isFetching = res.fetching || res.fetching;
    const disabled = !viewerCanSubscribe || isFetching;

    const label = !viewerIsSubcribed ? 'Watch' : 'Unwatch';
    const emoji = !viewerIsSubcribed ? '🧐' : '🙈️';

    const handleClick = () => {
        const mutationVars = {
            id,
            viewerSubscription: viewerIsSubcribed
                ? SubscriptionState.Unsubscribed
                : SubscriptionState.Subscribed,
        };

        execUpdateSubscription(mutationVars);
    };

    return (
        <SharedButton
            {...props}
            icon={<SharedEmoji label={label}>{emoji}</SharedEmoji>}
            disabled={disabled}
            onClick={handleClick}
            title={label}
        />
    );
};

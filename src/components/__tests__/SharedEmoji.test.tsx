import React from 'react';

import { render } from '../../utilities/test-utils';
import {
    SharedEmoji,
    SharedEmojiLink,
    sharedEmojiLinkDefaultProps,
} from '../SharedEmoji';

describe('SharedEmoji', (): void => {
    let props: any = undefined;

    beforeEach(() => {
        props = {
            'data-testid': 'SharedEmoji',
            label: 'Shocked face with exploding head',
            children: '🤯',
        };
    });

    test('has aria label', (): void => {
        const { getByTestId } = render(<SharedEmoji {...props} />, undefined);
        const labelContainer = getByTestId(props['data-testid']);
        expect(labelContainer).toHaveAttribute('aria-label', props.label);
    });

    test('has img role', (): void => {
        const { getByTestId } = render(<SharedEmoji {...props} />, undefined);
        const labelContainer = getByTestId(props['data-testid']);
        expect(labelContainer).toHaveAttribute('role', 'img');
    });
});

describe('SharedEmojiLink', (): void => {
    let props: any = undefined;

    beforeEach(() => {
        props = {
            ...sharedEmojiLinkDefaultProps,
            'data-testid': 'SharedEmojiLink',
        };
    });

    test('has aria label', (): void => {
        const { getByTestId } = render(
            <SharedEmojiLink {...props} />,
            undefined,
        );
        const labelContainer = getByTestId(props['data-testid']);
        expect(labelContainer).toHaveAttribute('aria-label', props.label);
    });

    test('has img role', (): void => {
        const { getByTestId } = render(
            <SharedEmojiLink {...props} />,
            undefined,
        );
        const labelContainer = getByTestId(props['data-testid']);
        expect(labelContainer).toHaveAttribute('role', 'img');
    });
});

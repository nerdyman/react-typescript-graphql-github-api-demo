import React from 'react';

/**
 * Acessible wrapper for emojis
 */
export const SharedEmoji: React.FC<{ label: string }> = ({
    label,
    ...props
}) => <span role="img" aria-label={label} {...props} />;

export const sharedEmojiLinkDefaultProps = {
    label: 'link',
    children: '🔗',
};

export const SharedEmojiLink: React.FC = props => (
    <SharedEmoji {...sharedEmojiLinkDefaultProps} {...props} />
);

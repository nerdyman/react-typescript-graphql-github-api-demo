import { Repository } from '../generated/graphql';
import { theme } from '../styles/theme';

export const getPrimaryLanguageWithFallbackFallbacks = {
    id: null,
    color: theme.colors.brandPrimaryBase,
    name: 'unknown',
};

/**
 * Get primary language from `Repository['primaryLanguage']` with fallback values
 */
export const getPrimaryLanguageWithFallback = (
    primaryLanguage: Repository['primaryLanguage'],
) => ({
    id:
        primaryLanguage && primaryLanguage.id
            ? primaryLanguage.id
            : getPrimaryLanguageWithFallbackFallbacks.id,
    color:
        primaryLanguage && primaryLanguage.color
            ? primaryLanguage.color
            : getPrimaryLanguageWithFallbackFallbacks.color,
    name:
        primaryLanguage && primaryLanguage.name
            ? primaryLanguage.name
            : getPrimaryLanguageWithFallbackFallbacks.name,
});

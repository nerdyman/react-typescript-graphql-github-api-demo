import { Repository } from '../generated/graphql';
import { theme } from '../styles/theme';

interface GetPrimaryLanguageWithFallbackDefaults {
    id: string;
    color: string;
    name: string;
}

export const getPrimaryLanguageWithFallbackDefaults: GetPrimaryLanguageWithFallbackDefaults = {
    id: '',
    color: theme.colors.brandPrimaryBase,
    name: 'unknown',
};

/**
 * Get primary language from `Repository['primaryLanguage']` with fallback values
 */
export const getPrimaryLanguageWithFallback = (
    primaryLanguage: Repository['primaryLanguage'],
): GetPrimaryLanguageWithFallbackDefaults => ({
    id:
        primaryLanguage && primaryLanguage.id
            ? primaryLanguage.id
            : getPrimaryLanguageWithFallbackDefaults.id,
    color:
        primaryLanguage && primaryLanguage.color
            ? primaryLanguage.color
            : getPrimaryLanguageWithFallbackDefaults.color,
    name:
        primaryLanguage && primaryLanguage.name
            ? primaryLanguage.name
            : getPrimaryLanguageWithFallbackDefaults.name,
});

/**
 * Get date in 'pretty' format
 * @param  rawDate - Valid value for `Date`
 */
export const getPrettyDate = (rawDate: string): string => {
    const date = new Date(rawDate);
    const mins = (date.getUTCMinutes() < 10 ? '0' : '') + date.getUTCMinutes();
    const hours = `${date.getUTCHours()}:${mins}`;

    return `${date.toDateString()} at ${hours}:${mins}`;
};

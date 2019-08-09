import * as data from './data';

it('should return fallback primary language values', (): void => {
    expect(data.getPrimaryLanguageWithFallback(null)).toMatchObject(
        data.getPrimaryLanguageWithFallbackDefaults,
    );
});

it('should return valid primary language values', (): void => {
    const validData = {
        color: '#f00f00',
        id: '1234',
        name: 'test name',
    };

    expect(
        data.getPrimaryLanguageWithFallback({
            ...validData,
        }),
    ).toMatchObject(validData);
});

it('should return pretty date', (): void => {
    const dateIn = '2012-08-01T21:27:02Z';
    const dateOut = 'Wed Aug 01 2012 at 21:27:27';

    expect(data.getPrettyDate(dateIn)).toMatch(dateOut);
});

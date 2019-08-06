import * as data from './data';

it('should use fallback values', () => {
    expect(data.getPrimaryLanguageWithFallback(null)).toMatchObject(
        data.getPrimaryLanguageWithFallbackFallbacks,
    );
});

it('should use valid values', () => {
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

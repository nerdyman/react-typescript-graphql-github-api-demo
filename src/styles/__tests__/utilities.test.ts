import { theme } from '../theme';
import * as utilities from '../utilities';

describe('shadowCss', (): void => {
    test('should return css', (): void => {
        expect(
            typeof utilities.shadowCss({
                theme,
                shadow: true,
            }),
        ).toBe('object');
    });

    test('should not return css', (): void => {
        expect(
            utilities.shadowCss({
                theme,
                shadow: false,
            }),
        ).toBeFalsy();
    });
});

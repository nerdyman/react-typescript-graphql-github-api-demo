/**
 * Build environment exposed by webpack ( via `config/build.js`)
 */
declare const __ENV__: {
    envIsHot: boolean;
    apiAuthToken: string;
    apiEndpoint: string;
    appTitle: string;
};

declare module '@styled-system/should-forward-prop' {
    // eslint-disable-next-line import/no-default-export
    export default function(props: string): boolean;
}

/**
 * Build environment exposed by webpack ( via `config/build.js`)
 */
declare const __ENV__: {
    clientPublicUrl: string;
    envIsHot: boolean;
    envIsProduction: boolean;
    apiAuthToken: string;
    apiEndpoint: string;
};

declare module '@styled-system/should-forward-prop' {
    // eslint-disable-next-line import/no-default-export
    export default function(props: string): boolean;
}

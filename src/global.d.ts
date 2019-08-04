/**
 * Build environment exposed by webpack ( via `config/build.js`)
 */
declare const __ENV__: {
    envIsHot: boolean;
    apiAuthToken: string;
    apiEndpoint: string;
    appTitle: string;
};

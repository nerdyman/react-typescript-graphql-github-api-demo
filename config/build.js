/* eslint-env node */
/* eslint-disable no-console, @typescript-eslint/no-var-requires */

'use strict';

const path = require('path');

const packageJson = require('../package.json');

require('dotenv').config({
    path: path.resolve(__dirname, '..', '.env'),
});

/**
 * Get, define and build variables
 * @return {Object} - Config object for app
 */
const getBuildConfig = () => {
    const {
        API_AUTH_TOKEN,
        API_ENDPOINT,
        CLIENT_HOST,
        CLIENT_PORT,
        CLIENT_PUBLIC_URL,
        NODE_ENV,
    } = process.env;

    // Set paths
    const dirRoot = path.resolve(__dirname, '..');
    const dirOutput = path.join(dirRoot, 'build');
    const dirSrc = path.join(dirRoot, 'src');
    const dirPublic = path.join(dirRoot, 'public');
    const dirNodeModules = path.join(dirRoot, 'node_modules');

    const config = {
        appTitle: packageJson.description,
        dirRoot,
        dirOutput,
        dirSrc,
        dirNodeModules,
        dirPublic,
        apiAuthToken: API_AUTH_TOKEN,
        apiEndpoint: API_ENDPOINT,
        clientHost: CLIENT_HOST,
        clientPort: CLIENT_PORT,
        clientPublicUrl: CLIENT_PUBLIC_URL,
    };

    const PRODUCTION = 'production';
    const errors = [];

    if (!config.apiAuthToken) {
        errors.push('API_AUTH_TOKEN not provided, cannot continue.');
    }

    if (!config.apiEndpoint) {
        errors.push('API_ENDPOINT not provided, cannot continue.');
    }

    if (!config.clientHost) {
        errors.push('CLIENT_HOST not provided, cannot continue.');
    }

    if (!config.clientPort) {
        errors.push('CLIENT_PORT not provided, cannot continue.');
    }

    if (!config.clientPublicUrl) {
        console.info('[env] CLIENT_PUBLIC_URL not provided, will use root.');
    }

    if (errors.length > 0) {
        console.error(
            '[env] Unable to get required environment variables, bailing out.',
            JSON.stringify({ errors }, null, 2),
        );

        process.exit(1);
    }

    config.isProduction = NODE_ENV === PRODUCTION;

    return config;
};

const config = getBuildConfig();

const buildConfig = {
    config,
    // Config properties to expose to the client
    clientConfig: {
        appTitle: config.appTitle,
        apiAuthToken: config.apiAuthToken,
        apiEndpoint: config.apiEndpoint,
    },
};

module.exports = buildConfig;

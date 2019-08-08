'use strict';

const path = require('path');

require('./env');

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

    const PRODUCTION = 'production';
    const envIsProduction = NODE_ENV === PRODUCTION;

    const config = {
        envIsHot: !envIsProduction,
        envIsProduction,
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
        NODE_ENV,
    };

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

    return config;
};

const config = getBuildConfig();

const buildConfig = {
    config,
    // Config properties to expose to the client
    clientConfig: {
        clientPublicUrl: config.clientPublicUrl,
        envIsHot: config.envIsHot,
        envIsProduction: config.envIsProduction,
        apiAuthToken: config.apiAuthToken,
        apiEndpoint: config.apiEndpoint,
    },
};

module.exports = buildConfig;

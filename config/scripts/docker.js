/**
 * Wrapper for docker commands to use values specified in '.env'
 */

const path = require('path');
const { execSync } = require('child_process');

require('../env');

const { CLIENT_PORT, DOCKER_IMAGE_NAME } = process.env;
const ROOT_DIR = path.resolve(__dirname, '..', '..');

const [, , cmd] = process.argv;

const cmds = {
    bootstrap: 'bootstrap',
    build: 'build',
    start: 'start',
    test: 'test',
};

if (!Object.hasOwnProperty.call(cmds, cmd)) {
    console.error(
        '[docker] Invalid command:',
        JSON.stringify(
            {
                received: cmd,
                expected: Object.values(cmds).join('|'),
            },
            null,
            2,
        ),
    );

    process.exit(1);
}

const run = exec => {
    console.log(exec);
    execSync(exec, { stdio: 'inherit' });
};

const portRange = `${CLIENT_PORT}:${CLIENT_PORT}`;

switch (cmd) {
    case `${cmds.bootstrap}`: {
        run(`docker image build -t ${DOCKER_IMAGE_NAME} .`);
        break;
    }
    case `${cmds.build}`: {
        run(
            `docker container run -it -v ${ROOT_DIR}:/app ${DOCKER_IMAGE_NAME} build`,
        );
        break;
    }
    case `${cmds.start}`: {
        run(
            `docker container run -it -p ${portRange} -p 35729:35729 -v ${ROOT_DIR}:/app ${DOCKER_IMAGE_NAME}`,
        );
        break;
    }
    case `${cmds.test}`: {
        run(
            `docker container run -it -v ${ROOT_DIR}:/app ${DOCKER_IMAGE_NAME} test`,
        );
        break;
    }
    default: {
        console.error('[docker] How did we end up like this?');
        process.exit(1);
    }
}

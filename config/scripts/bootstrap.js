'use strict';

const fs = require('fs');
const path = require('path');

const ENV_FILE = path.join(__dirname, '..', '..', '.env');

// Copy '.env.example' to '.env' if it doesn't already exist
if (!fs.existsSync(ENV_FILE)) {
    console.log(`[bootstrap] '${ENV_FILE}' does not exist, copying example`);
    fs.copyFileSync(`${ENV_FILE}.example`, ENV_FILE);
}

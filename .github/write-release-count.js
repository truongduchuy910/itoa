// the release-count file is used by create-itoa-5-app to get the last commit that where a release happened

const fs = require('fs');
const path = require('path');

const releaseCountPath = path.join(__dirname, 'release-count');

let count = parseInt(fs.readFileSync(releaseCountPath, 'utf8'));

fs.writeFileSync(releaseCountPath, (count + 1).toString());

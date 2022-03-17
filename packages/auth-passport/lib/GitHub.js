const PassportGitHub = require('passport-github');
const PassportAuthStrategy = require('./Passport');

class GitHubAuthStrategy extends PassportAuthStrategy {
  constructor(itoa, listKey, config) {
    super(GitHubAuthStrategy.authType, itoa, listKey, config, PassportGitHub);
  }
}

GitHubAuthStrategy.authType = 'github';

module.exports = GitHubAuthStrategy;

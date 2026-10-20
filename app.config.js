const appJson = require('./app.json');

module.exports = ({ config }) => ({
  ...config,
  extra: {
    ...config.extra,
    commitHash: process.env.EAS_BUILD_GIT_COMMIT_HASH || 'desenvolvimento',
  },
});

module.exports = {
  apps: [{
    name: 'api',
    script: 'service.js',
    cwd: 'api',
    watch: true
  }, {
    name: 'remote-service',
    script: 'service.js',
    cwd: 'remote-service',
    watch: true
  }]
};

module.exports = {
  dic: {
    options: {
      server: {
        port: 3000
      },
      heavyService: {
        iterationCount: 50000
      },
      jobSchedulerMessagePublisher: {
        service: 'JobScheduler'
      },
      messagePublisher: {
        service: 'UserService'
      }
    }
  }
};

import {SendTemplateParams} from './mailer-service';
import {DeleteUserEventsParams} from './event/service';

// type JobType =
//   {service: 'mailerService', method: 'sendTemplate', params: SendTemplateParams } |
//   {service: 'eventService', method: 'deleteUserEvents', params: DeleteUserEventsParams};

class JobScheduler {
  constructor(protected jobSchedulerMessagePublisher) {
  }

  /**
   * @link MailerService#sendTemplate
   */
  sendTemplate(params: SendTemplateParams)  {
    this.schedule({
      service: 'mailerService',
      method: 'sendTemplate',
      params
    })
  }

  /**
   * @link EventService#deleteUserEvents
   */
  deleteUserEvents(params: DeleteUserEventsParams) {
    this.schedule({
      service: 'eventService',
      method: 'deleteUserEvents',
      params
    })
  }

  schedule(params: {service: string, method: string, params: any}) {
    console.log('JobScheduler: job scheduled', params); //XXX
    this.jobSchedulerMessagePublisher.emit({
      type: 'methodInvocation',
      data: params
    });
  }
}

export default JobScheduler;

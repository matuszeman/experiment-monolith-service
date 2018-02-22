import MailerService from './mailer-service';
import JobScheduler from './job-scheduler';
import {MessagePublisher} from '@kapitchi/bb-service-message';
import EventService from './event/service';

class UserService {
  constructor(
    protected mailerService: MailerService,
    protected eventService: EventService,
    // protected jobScheduler: JobScheduler,
    // protected messagePublisher: MessagePublisher,
  ) {}

  async register(params: {name: string, email: string}) {
    console.log('UserService: user registered: ', params); //XXX

    const sendTemplateParams = {
      template: 'user-register',
      to: [{name: params.name, address: params.email}]
    };

    //1. Direct call
    await this.mailerService.sendTemplate(sendTemplateParams);

    //2. No await
    //this.mailerService.sendTemplate(sendTemplateParams);

    //3. Using job
    //this.jobScheduler.sendTemplate(sendTemplateParams);

    //4. Publishing event
    // this.messagePublisher.emit({
    //   type: 'userRegistered',
    //   data: params
    // });

    return params;
  }

  async deactivateUser(params: {userId: string}) {
    console.log('UserService: user deactivate'); //XXX

    const deleteUserEventsParams = {
      userId: params.userId
    };

    //1. Direct event delete call
    await this.eventService.deleteUserEvents(deleteUserEventsParams)

    //2. Job
    //this.jobScheduler.deleteUserEvents(deleteUserEventsParams);

    //3. Event
    // this.messagePublisher.emit({
    //   type: 'userDeactivated',
    //   data: params
    // });

    return params;
  }
}

export default UserService;

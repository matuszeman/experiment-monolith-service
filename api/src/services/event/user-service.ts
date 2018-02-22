import EventService from './service';

class EventUserService {
  constructor(
    protected eventService: EventService,
    protected messageSubscriber,
  ) {}

  async handleMessage(msg) {
    await this.eventService.deleteUserEvents({
      userId: msg.data.userId
    });
  }

  start() {
    this.messageSubscriber.subscribe((msg) => {
      if (msg.type !== 'userDeactivated') {
        //console.log('Skip.'); //XXX
        return;
      }
      console.log('EventUserService: message received', msg); //XXX
      this.handleMessage(msg).then(() => {
        this.messageSubscriber.ack(msg);
      }).catch((e) => {
        console.log(e); //XXX
        this.messageSubscriber.nack(msg);
      });
    });
  }
}

export default EventUserService;

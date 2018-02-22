import MailerService from '../mailer-service';

export class UserMailerService {
  constructor(
    protected mailerService: MailerService,
    protected messageSubscriber,
  ) {}

  async handleMessage(msg) {
    const params = msg.data;

    await this.mailerService.sendTemplate({
      template: 'user-register',
      to: [{name: params.name, address: params.email}]
    })
  }

  start() {
    this.messageSubscriber.subscribe((msg) => {
      if (msg.type !== 'userRegistered') {
        //console.log('Skip.'); //XXX
        return;
      }

      console.log('UserMailerService: message received', msg); //XXX

      this.handleMessage(msg).then(() => {
        this.messageSubscriber.ack(msg);
      }).catch((e) => {
        console.log(e); //XXX
        this.messageSubscriber.nack(msg);
      });
    });
  }
}

export default UserMailerService;

import MailerService from '../mailer-service';
import EventService from '../event/service';

class JobWorkerService {
  jobServices: {[key: string]: any};

  constructor(
    protected jobWorkerMessageSubscriber,
    mailerService: MailerService,
    //eventService: EventService
  ) {

    this.jobServices = {
      mailerService,
      //eventService
    };
  }

  async handleMethodInvocation({data}) {
    console.log(`JobWorker: starting job ${data.service}.${data.method}`); //XXX

    if (!this.jobServices[data.service]) {
      throw new Error(`Service ${data.service} not registered with job worker`);
    }

    const service = this.jobServices[data.service];
    if (!service[data.method]) {
      throw new Error(`Service method does not exist: ${data.service}.${data.method}`);
    }

    const ret = await service[data.method](data.params);

    console.log(`JobWorker: finished`, ret); //XXX
  }

  start() {
    this.jobWorkerMessageSubscriber.subscribe((msg) => {
      this.handleMethodInvocation(msg).then(() => {
        this.jobWorkerMessageSubscriber.ack(msg);
      }).catch((e) => {
        console.log(e); //XXX
        this.jobWorkerMessageSubscriber.nack(msg);
      });
    });
  }
}

export default JobWorkerService;

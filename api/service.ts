import {MdPrinter, SnapshotGenerator} from '@kapitchi/bb-dic-graph';
import {dic} from './dic';
import JobWorkerService from './src/services/job-worker/service';
import {UserMailerService} from './src/services/user-mailer/service';
import EventUserService from './src/services/event/user-service';

(async function() {
  const generator = new SnapshotGenerator();
  const printer = new MdPrinter();

  dic.instance('depsGenerator', (service) => {
    return generator.generate(dic, service);
  });

  console.log('===================================='); //XXX
  console.log('Starting apiServer'); //XXX
  const server = await dic.getAsync('apiServer');
  await server.listen();

  console.log(printer.print(generator.generate(dic, 'apiServer'))); //XXX

  console.log('===================================='); //XXX
  console.log('Starting jobWorkerService'); //XXX
  const jobWorker: JobWorkerService = await dic.getAsync('jobWorkerService');
  jobWorker.start();

  console.log(printer.print(generator.generate(dic, 'jobWorkerService'))); //XXX

  console.log('===================================='); //XXX
  console.log('Starting userMailerService'); //XXX
  const userMailerService: UserMailerService = await dic.getAsync('userMailerService');
  userMailerService.start();

  console.log(printer.print(generator.generate(dic, 'userMailerService'))); //XXX

  console.log('===================================='); //XXX
  console.log('Starting eventUserService'); //XXX
  const eventUserService: EventUserService = await dic.getAsync('eventUserService');
  eventUserService.start();

  console.log(printer.print(generator.generate(dic, 'eventUserService'))); //XXX
}());

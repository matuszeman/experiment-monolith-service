import {MessagePublisher} from '@kapitchi/bb-service-message';

export default function(jobSchedulerMessagePublisherOpts, jobWorkerMessageSubscriber) {
  return new MessagePublisher(jobSchedulerMessagePublisherOpts, jobWorkerMessageSubscriber);
}

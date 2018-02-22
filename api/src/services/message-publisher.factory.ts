import {MessagePublisher} from '@kapitchi/bb-service-message';

export default function(messagePublisherOpts, messageSubscriber) {
  return new MessagePublisher(messagePublisherOpts, messageSubscriber);
}

import * as _ from 'lodash';
import {SenecaServer} from '@kapitchi/bb-service-seneca';
import {dic} from '../../dic';

export default async function serverFactory(
  serverOpts, exposedServicesOpts) {

  const services = {};
  _.each(exposedServicesOpts, (ser, exposeName) => {
    const instance = dic.get(ser.service);
    services[exposeName] = {
      instance,
      methods: ser.methods
    }
  });

  const server = new SenecaServer(serverOpts, services);
  await server.asyncInit();
  return server;
}

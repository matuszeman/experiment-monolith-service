import {dic} from './dic';

(async function() {
  const server = await dic.getAsync('server');
  await server.listen();
}());

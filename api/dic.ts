import * as _ from 'lodash';
import {Dic, DicLoader, DicConfigLoader} from '@kapitchi/bb-dic';

//service logger
class Logger {
  log(msg) {
    console.log(msg);//XXX
  }
}
const logger = new Logger();
function factoryListener(instance) {
  if (_.isFunction(instance.setLogger)) {
    instance.setLogger(logger);
  }
  return instance;
}

export const dic = new Dic({
  debug: true
});
dic.factoryListener = factoryListener;

const loader = new DicLoader({
  rootDir: __dirname + '/src/services'
});
loader.loadPath(dic, '**/*.js');

// config
import * as configObj from 'config';
const config = JSON.parse(JSON.stringify(configObj));

const configLoader = new DicConfigLoader();
configLoader.loadConfig(dic, config.dic);

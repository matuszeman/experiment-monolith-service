import {randomBytes} from 'crypto';
import {AbstractService, Joi} from '@kapitchi/bb-service';

class HeavyService extends AbstractService {
  constructor(heavyServiceOpts) {
    super(heavyServiceOpts, {
      iterationCount: Joi.number()
    });
  }

  async compute() {
    const tokens = [];
    for (let i = 0; i < this.options.iterationCount; i++) {
      const token = await new Promise((resolve) => {
        randomBytes(1024, (err, buff) => {
          resolve(buff.toString('hex'));
        })
      });
      tokens.push(token);
    }
    return {
      heavy: true
    }
  }
}

export default HeavyService;

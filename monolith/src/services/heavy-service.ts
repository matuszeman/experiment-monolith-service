import {randomBytes} from 'crypto';

class HeavyService {
  async compute() {
    const tokens = [];
    for (let i = 0; i < 100000; i++) {
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

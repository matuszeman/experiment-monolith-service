import * as Koa from 'koa';
import * as Router from 'koa-router';
import {AbstractService, Joi} from '@kapitchi/bb-service';
import HeavyService from './heavy-service';
import ErrorService from './error-service';

export class Server extends AbstractService {
  protected server: any;
  protected requestCount = 0;

  constructor(serverOpts,
              protected heavyService: HeavyService,
              protected errorService: ErrorService) {
    super(serverOpts, {
      port: Joi.number()
    });
    this.server = this.createServer();
  }

  createServer() {
    const app = new Koa();
    const router = new Router();

    router.get('/error/syntax', async (ctx, next) => {
      try {
        await this.errorService.syntaxError({});
      } catch (e) {
        console.log(e); //XXX
        ctx.body = {
          error: {
            code: e.code,
            name: e.name,
            message: e.message
          }
        };
        ctx.statusCode = 400;
      }
    });

    router.get('/error/service', async (ctx, next) => {
      try {
        await this.errorService.serviceError({});
      } catch (e) {
        console.log(e); //XXX
        ctx.body = {
          error: {
            code: e.code,
            name: e.name,
            message: e.message
          }
        };
        ctx.statusCode = 400;
      }
    });

    router.get('/load', async (ctx, next) => {
      const req = ++this.requestCount;
      console.log(`Request ${req}: vvvvvvvvvvvvv`); //XXX

      let start = Date.now();
      console.log(`Request ${req}: heavy started`); //XXX
      const heavyRet = await this.heavyService.compute();
      console.log(`Request ${req}: heavy finished`); //XXX
      const heavyDuration = Date.now() - start;

      console.log(`Request ${req}: ^^^^^^^^^^^^^`); //XXX

      ctx.body = {
        duration: this.formatDuration(heavyDuration)
      };
    });

    app.use(router.middleware());

    return app;
  }

  async listen() {
    this.server.listen(this.options.port);
    this.logger.log({
      level: 'info',
      msg: `Server listening on ${this.options.port}`
    })
  }

  protected formatDuration(ms) {
    return ms;
  }
}

export default Server;

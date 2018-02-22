import * as Koa from 'koa';
import * as Router from 'koa-router';
import {AbstractService, Joi} from '@kapitchi/bb-service';
import UserService from '../user-service';

export class Server extends AbstractService {
  protected server: any;
  protected requestCount = 0;

  constructor(
    serverOpts,
    protected depsGenerator,
    protected userService: UserService
  ) {
    super(serverOpts, {
      port: Joi.number()
    });
    this.server = this.createServer();
  }

  createServer() {
    const app = new Koa();
    const router = new Router();

    router.get('/register', async (ctx, next) => {
      try {
        const ret = await this.userService.register({
          name: 'User Name',
          email: 'test@example.org'
        });
        ctx.body = {
          result: ret,
          deps: {
            userService: this.depsGenerator('userService'),
            jobWorkerService: this.depsGenerator('jobWorkerService')
          }
        };
      } catch (e) {
        console.log(e); //XXX
        ctx.statusCode = 400;
      }
    });

    router.get('/deactivate', async (ctx, next) => {
      try {
        const ret = await this.userService.deactivateUser({
          userId: 'UUID'
        });
        ctx.body = {
          result: ret,
          deps: {
            userService: this.depsGenerator('userService'),
            jobWorkerService: this.depsGenerator('jobWorkerService')
          }
        };
      } catch (e) {
        console.log(e); //XXX
        ctx.statusCode = 400;
      }
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

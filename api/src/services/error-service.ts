import {AbstractService} from '@kapitchi/bb-service';

export class ErrorService extends AbstractService {

  async syntaxError(params) {
    error
  }

  async serviceError(params) {
    const err = new Error('This is just some error');
    err.code = 'SomeError';
    throw err;
  }
}

export default ErrorService;

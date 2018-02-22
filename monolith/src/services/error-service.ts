import {AbstractService} from '@kapitchi/bb-service';
import {ServiceError} from '../lib/service-error';

export class ErrorService extends AbstractService {

  async syntaxError(params) {
    error
  }

  async serviceError(params) {
    throw new ServiceError('UserNotExist', 'User does not exist');
  }
}

export default ErrorService;

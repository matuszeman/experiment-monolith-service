import { AbstractService } from '@kapitchi/bb-service';
export declare class ErrorService extends AbstractService {
    syntaxError(params: any): Promise<void>;
    serviceError(params: any): Promise<void>;
}
export default ErrorService;

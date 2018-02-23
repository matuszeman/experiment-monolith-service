import { AbstractService } from '@kapitchi/bb-service';
declare class HeavyService extends AbstractService {
    constructor(heavyServiceOpts: any);
    compute(): Promise<{
        heavy: boolean;
    }>;
}
export default HeavyService;

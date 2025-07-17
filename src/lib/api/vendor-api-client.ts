import { BaseApiClient } from '@lib/api/base-api-client';
import { HttpClient } from '@services/http-client';

export class VendorApiClient extends BaseApiClient {
    constructor(httpClient: HttpClient) {
        super('api/vendors', httpClient);
    }
}

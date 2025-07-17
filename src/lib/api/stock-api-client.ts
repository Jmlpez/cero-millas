import { ReceiveStockTransferOrderRequest } from '@/contracts/stock/receive-stock-transfer-order-request';
import { SetInTransitRequest } from '@/contracts/stock/set-in-transit-request';
import { BaseApiClient } from '@lib/api/base-api-client';
import { HttpClient } from '@services/http-client';

export class StockApiClient extends BaseApiClient {
    constructor(httpClient: HttpClient) {
        super('api/inventory/stock', httpClient);
    }

    async approve(id: string): Promise<void> {
        return this.httpClient.post<void>(this.buildEndpoint(`${id}/approve`));
    }

    async reject(id: string, note: string): Promise<void> {
        return this.httpClient.post<void>(this.buildEndpoint(`${id}/reject`), { rejectionReason: note });
    }

    async cancel(id: string): Promise<void> {
        return this.httpClient.post<void>(this.buildEndpoint(`${id}/cancel`));
    }

    async setInTransit(id: string, data: SetInTransitRequest): Promise<void> {
        return this.httpClient.post<void>(this.buildEndpoint(`${id}/set-in-transit`), data);
    }

    async receive(id: string, data: ReceiveStockTransferOrderRequest): Promise<void> {
        return this.httpClient.post<void>(this.buildEndpoint(`${id}/receive`), data);
    }
}

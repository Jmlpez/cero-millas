import { ProductSerialNumberDto } from '@/contracts/product/product-serial-numbers/product-serial-number-dto';
import { PagedResult } from '@/types/common';
import { BaseApiClient } from '@lib/api/base-api-client';
import { HttpClient } from '@services/http-client';
import { PaginationState } from '@tanstack/react-table';
import { Filter, OrderBy } from 'odata-query';

export class ProductSerialNumbersApiClient extends BaseApiClient {
    constructor(httpClient: HttpClient) {
        super('api/inventory/productSerialNumbers', httpClient);
    }

    async getSerialNumbersByProductId(
        productId: string,
        pagination?: PaginationState,
        sorting?: OrderBy<ProductSerialNumberDto>,
        filters?: Filter<ProductSerialNumberDto>,
    ): Promise<PagedResult<ProductSerialNumberDto[]>> {
        return this.httpClient.get<PagedResult<ProductSerialNumberDto[]>>(
            this.buildEndpoint(`product/${productId}`, this.buildODataQuery(pagination, sorting, filters)),
        );
    }

    async getSerialNumbersByProductIdAndProvinceId(
        productId: string,
        provinceId: number,
        pagination?: PaginationState,
        sorting?: OrderBy<ProductSerialNumberDto>,
        filters?: Filter<ProductSerialNumberDto>,
    ): Promise<PagedResult<ProductSerialNumberDto[]>> {
        return this.httpClient.get<PagedResult<ProductSerialNumberDto[]>>(
            this.buildEndpoint(`product/${productId}/province/${provinceId}`, this.buildODataQuery(pagination, sorting, filters)),
        );
    }

    //endregion

    //TODO: Add actions in batch
}

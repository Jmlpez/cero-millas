import { StockTransferItemRequest } from '@/contracts/stock/stock-transfer-item-request';
import { Provinces } from '@lib/provinces';

export interface CreateStockTransferOrderRequest {
    fromProvinceId: Provinces;
    toProvinceId: Provinces;
    observation?: string;
    lines: StockTransferItemRequest[];
}

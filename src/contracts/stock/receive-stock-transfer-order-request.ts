import { StockTransferItemRequest } from '@/contracts/stock/stock-transfer-item-request';

export interface ReceiveStockTransferOrderRequest {
    receivedItems: StockTransferItemRequest[];
}

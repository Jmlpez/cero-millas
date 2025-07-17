import { BaseEntityDto } from '@/contracts/common/base-entity-dto';

export interface StockTransferOrderLineDto extends BaseEntityDto {
    productId: string;
    productName: string;
    quantity: number;
    receivedQuantity: number;
    requiresSerialNumber: boolean;
    serialNumbers?: string[];
}

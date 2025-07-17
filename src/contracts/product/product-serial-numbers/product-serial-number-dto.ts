import { ProductSerialNumberStatus } from './product-serial-number-status';

export interface ProductSerialNumberDto {
    id: string;
    productId: string;
    productName: string;
    serialNumber: string;
    description?: string;
    status: ProductSerialNumberStatus;
    currentProvinceId?: number;
    currentProvinceName?: string;
    receivedDate?: Date;
    soldDate?: Date;
    purchaseOrderLineId?: string;
    salesOrderLineId?: string;
    stockTransferOrderLineId?: string;
    createdAt: Date;
    modifiedAt?: Date;
    provinceHistory: number[];
}

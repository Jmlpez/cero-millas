import { BaseAuditableDto } from '@/contracts/common/base-auditable-dto';
import { StockTransferOrderLineDto } from '@/contracts/stock/stock-transfer-order-line-dto';
import { StockTransferOrderStatus } from '@/contracts/stock/stock-transfer-order-status';

export interface StockTransferOrderDto extends BaseAuditableDto {
    fromProvinceId: number;
    toProvinceId: number;
    status: StockTransferOrderStatus;
    requestedBy: string;
    requestedAt: Date;
    approvedBy?: string;
    approvedAt?: Date;
    rejectedBy?: string;
    rejectedAt?: Date;
    receivedBy?: string;
    receivedAt?: Date;
    canceledBy?: string;
    canceledAt?: Date;
    canceledReason?: string;
    setInTransitBy?: string;
    setInTransitAt?: Date;
    courier?: string;
    rejectionReason?: string;
    observation?: string;
    lines: StockTransferOrderLineDto[];
}

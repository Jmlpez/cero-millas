import { StockTransferOrderStatus } from '@/contracts/stock/stock-transfer-order-status';
import { LucideCheck, LucideCheckCircle2, LucideClock, LucidePackageCheck, LucideTruck, LucideX, LucideXCircle } from 'lucide-react';

export type StatusBadgeConfig = {
    color: 'primary' | 'success' | 'error' | 'warning' | 'info' | 'light' | 'dark';
    variant?: 'light' | 'solid';
    className?: string;
};

export const getStockTransferStatusBadgeConfig = (status: StockTransferOrderStatus): StatusBadgeConfig => {
    switch (status) {
        case StockTransferOrderStatus.PendingApproval:
            return {
                color: 'warning',
                variant: 'light',
                className: 'animate-pulse',
            };
        case StockTransferOrderStatus.Approved:
            return {
                color: 'info',
                variant: 'light',
            };
        case StockTransferOrderStatus.Rejected:
            return {
                color: 'error',
                variant: 'solid',
            };
        case StockTransferOrderStatus.InTransit:
            return {
                color: 'primary',
                variant: 'solid',
                className: 'animate-pulse',
            };
        case StockTransferOrderStatus.PartiallyReceived:
            return {
                color: 'warning',
                variant: 'solid',
            };
        case StockTransferOrderStatus.Received:
            return {
                color: 'success',
                variant: 'solid',
            };
        case StockTransferOrderStatus.Cancelled:
            return {
                color: 'dark',
                variant: 'light',
            };
        default:
            return {
                color: 'light',
                variant: 'light',
            };
    }
};

export const getStockTransferStatusIcon = (status: StockTransferOrderStatus) => {
    switch (status) {
        case StockTransferOrderStatus.PendingApproval:
            return LucideClock;
        case StockTransferOrderStatus.Approved:
            return LucideCheck;
        case StockTransferOrderStatus.Rejected:
            return LucideX;
        case StockTransferOrderStatus.InTransit:
            return LucideTruck;
        case StockTransferOrderStatus.PartiallyReceived:
            return LucidePackageCheck;
        case StockTransferOrderStatus.Received:
            return LucideCheckCircle2;
        case StockTransferOrderStatus.Cancelled:
            return LucideXCircle;
        default:
            return null;
    }
};

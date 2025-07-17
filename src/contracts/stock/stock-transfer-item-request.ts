export interface StockTransferItemRequest {
    productId: string;
    quantity: number;
    serialNumbers?: string[];
    requiredSerialNumber?: boolean; // Indicates if serial numbers are required for this item
    productName?: string; // Optional: for showing products by name
}

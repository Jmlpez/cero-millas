export enum StockTransferOrderStatus {
    PendingApproval = 0, // Request created, awaiting approval
    Approved = 1, // Request approved, awaiting shipment/processing
    InTransit = 2, // Goods are on their way (can be an alias for Shipped or a distinct step)
    PartiallyReceived = 3, // Destination received some but not all goods
    Received = 4, // Destination received all (expected) goods
    Rejected = 5, // Request rejected
    Cancelled = 6, // Request canceled (e.g., before shipment)
}

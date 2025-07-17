export enum ProductSerialNumberStatus {
    Available = 0, // Product is available in inventory
    Sold = 1, // Product has been sold
    InTransit = 2, // Product is in transit between locations
    Defective = 3, // Product is defective and cannot be sold
    Returned = 4, // Product has been returned
}

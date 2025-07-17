/**
 * Represents the different types of products
 */
export enum StockType {
    /**
     * Represents a stock type classified as "Normal".
     * A normal stock refers that its stock is handled as usual.
     */
    Normal = 0,

    /**
     * Represents a product type categorized as a "PreOrder".
     * A pre-order stock refers that the product can be ordered before it is available for sale (event with no stock at all).
     */
    PreOrder = 1,
}

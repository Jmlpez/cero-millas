/**
 * Centralized Query Key Factories for React Query
 *
 * This file contains factory functions to generate consistent queryKeys for each feature.
 * Benefits:
 * - Prevents typos and inconsistencies in queryKeys
 * - Makes refactoring easier (change keys in one place)
 * - Provides TypeScript autocompletion and type safety
 * - Better organization by feature
 * - Easier debugging and cache management
 */

import type { PaginationState } from '@tanstack/react-table';

// ==========================================
// PRODUCT QUERY KEYS
// ==========================================
export const productKeys = {
    // Base key for all product-related queries
    all: () => ['product'] as const,

    // List queries
    lists: () => [...productKeys.all(), 'list'] as const,
    list: (pagination?: PaginationState) => [...productKeys.lists(), { pagination }] as const,

    // Detail queries
    details: () => [...productKeys.all(), 'detail'] as const,
    detail: (id: string) => [...productKeys.details(), id] as const,

    // Pack product queries
    packs: () => [...productKeys.all(), 'pack'] as const,
    packDetails: () => [...productKeys.packs(), 'detail'] as const,
    packDetail: (id: string) => [...productKeys.packDetails(), id] as const,

    // Product search queries
    searches: () => [...productKeys.all(), 'search'] as const,
    search: (query: string) => [...productKeys.searches(), query] as const,
} as const;

// ==========================================
// CATEGORY QUERY KEYS
// ==========================================
export const categoryKeys = {
    // Base key for all category-related queries
    all: () => ['categories'] as const,

    // List queries
    lists: () => [...categoryKeys.all(), 'list'] as const,
    list: (pagination?: PaginationState) => [...categoryKeys.lists(), { pagination }] as const,

    // Detail queries
    details: () => [...categoryKeys.all(), 'detail'] as const,
    detail: (id: string) => [...categoryKeys.details(), id] as const,
} as const;

// ==========================================
// PROVINCE PRODUCT QUERY KEYS
// ==========================================
export const provinceProductKeys = {
    // Base key for all province-product-related queries
    all: () => ['province-product'] as const,

    // List queries
    lists: () => [...provinceProductKeys.all(), 'list'] as const,
    list: (provinceId?: number, pagination?: PaginationState) => [...provinceProductKeys.lists(), provinceId, { pagination }] as const,

    // Detail queries
    details: () => [...provinceProductKeys.all(), 'detail'] as const,
    detail: (productId: string, provinceId: string | number) => [...provinceProductKeys.details(), productId, provinceId] as const,

    // Queries by product
    byProducts: () => [...provinceProductKeys.all(), 'by-product'] as const,
    byProduct: (productId: string, pagination?: PaginationState) => [...provinceProductKeys.byProducts(), productId, { pagination }] as const,
} as const;

// ==========================================
// TAG QUERY KEYS
// ==========================================
export const tagKeys = {
    // Base key for all tag-related queries
    all: ['tags'] as const,

    // Search queries
    searches: () => [...tagKeys.all, 'search'] as const,
    search: (query: string) => [...tagKeys.searches(), query] as const,
} as const;

// ==========================================
// STOCK TRANSFER ORDER KEYS
// ==========================================
export const stockTransferOrderKeys = {
    all: () => ['stockTransferOrders'] as const,
    lists: () => [...stockTransferOrderKeys.all(), 'list'] as const,
    list: (pagination: PaginationState) => [...stockTransferOrderKeys.lists(), pagination] as const,
    details: () => [...stockTransferOrderKeys.all(), 'detail'] as const,
    detail: (id: string) => [...stockTransferOrderKeys.details(), id] as const,
};

// ==========================================
// VENDORS KEYS
// ==========================================

export const vendorKeys = {
    all: () => ['vendors'] as const,
    lists: () => [...vendorKeys.all(), 'list'] as const,
    list: (pagination: PaginationState) => [...vendorKeys.lists(), pagination] as const,
    //TODO: list: (filters: any) => [...vendorKeys.lists(), { filters }] as const,
    details: () => [...vendorKeys.all(), 'detail'] as const,
    detail: (id: string) => [...vendorKeys.details(), id] as const,
};

// ==========================================
// PURCHASE ORDERS KEYS
// ==========================================

export const purchaseOrderKeys = {
    all: () => ['purchaseOrders'] as const,
    lists: () => [...purchaseOrderKeys.all(), 'list'] as const,
    list: (pagination: PaginationState) => [...purchaseOrderKeys.lists(), pagination] as const,
    details: () => [...purchaseOrderKeys.all(), 'detail'] as const,
    detail: (id: string) => [...purchaseOrderKeys.details(), id] as const,
};

// ==========================================
// PURCHASE ORDERS KEYS
// ==========================================

export const productSerialNumbersKeys = {
    all: () => ['product-serial-numbers'] as const,
    lists: () => [...productSerialNumbersKeys.all(), 'list'] as const,
    list: (pagination: PaginationState) => [...productSerialNumbersKeys.lists(), pagination] as const,
    byProductAndProvince: (productId: string, provinceId: number) => [...productSerialNumbersKeys.all(), productId, provinceId],
    details: () => [...productSerialNumbersKeys.all(), 'detail'] as const,
    detail: (id: string) => [...productSerialNumbersKeys.details(), id] as const,
};

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Helper function to get all possible invalidation keys for a feature
 * Useful when you want to invalidate all queries related to a specific entity
 */
export const getInvalidationKeys = {
    products: {
        all: () => [productKeys.all()],
        lists: () => [productKeys.lists()],
        details: () => [productKeys.details()],
        union: () => [productKeys.lists(), productKeys.details()],
        specific: (id: string) => [productKeys.lists(), productKeys.detail(id)],
    },
    categories: {
        all: () => [categoryKeys.all()],
        lists: () => [categoryKeys.lists()],
        details: () => [categoryKeys.details()],
        union: () => [categoryKeys.lists(), categoryKeys.details()],
        specific: (id: string) => [categoryKeys.lists(), categoryKeys.detail(id)],
    },
    provinceProducts: {
        all: () => [provinceProductKeys.all()],
        lists: () => [provinceProductKeys.lists()],
        details: () => [provinceProductKeys.details()],
        union: () => [provinceProductKeys.lists(), provinceProductKeys.details()],
        byProducts: () => [provinceProductKeys.byProducts()],
        specific: (productId: string, provinceId?: string | number) => [
            provinceProductKeys.lists(),
            provinceProductKeys.byProducts(),
            ...(provinceId ? [provinceProductKeys.detail(productId, provinceId)] : []),
        ],
    },
    tags: {
        all: () => [tagKeys.all],
        searches: () => [tagKeys.searches()],
    },
    stockTransferOrders: {
        all: () => [stockTransferOrderKeys.all()],
        lists: () => [stockTransferOrderKeys.lists()],
        details: () => [stockTransferOrderKeys.details()],
        union: () => [stockTransferOrderKeys.lists(), stockTransferOrderKeys.details()],
        specific: (id: string) => [stockTransferOrderKeys.lists(), stockTransferOrderKeys.detail(id)],
    },
    purchaseOrders: {
        all: () => [purchaseOrderKeys.all()],
        lists: () => [purchaseOrderKeys.lists()],
        details: () => [purchaseOrderKeys.details()],
        union: () => [purchaseOrderKeys.lists(), purchaseOrderKeys.details()],
        specific: (id: string) => [purchaseOrderKeys.lists(), purchaseOrderKeys.detail(id)],
    },
    vendors: {
        all: () => [vendorKeys.all()],
        lists: () => [vendorKeys.lists()],
        details: () => [vendorKeys.details()],
        union: () => [vendorKeys.lists(), vendorKeys.details()],
        specific: (id: string) => [vendorKeys.lists(), vendorKeys.detail(id)],
    },
} as const;

// ==========================================
// TYPE EXPORTS FOR BETTER INTELLISENSE
// ==========================================
export type ProductQueryKeys = typeof productKeys;
export type CategoryQueryKeys = typeof categoryKeys;
export type ProvinceProductQueryKeys = typeof provinceProductKeys;
export type TagQueryKeys = typeof tagKeys;
export type StockTransferOrderKeys = typeof stockTransferOrderKeys;
export type VendorKeys = typeof vendorKeys;
export type PurchaseOrderKeys = typeof purchaseOrderKeys;

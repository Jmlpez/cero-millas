import { PackItemRequest } from '@/contracts/product/pack-item-request';

export interface CreateProductPackDto {
    name: string;
    description: string;
    alias?: string;
    items: PackItemRequest[];
    isActive?: boolean;
    categoryId: string;
}

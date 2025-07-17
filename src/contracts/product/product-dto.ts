import { BaseEntityDto } from '@/contracts/common/base-entity-dto';
import { PackProductItemDto } from '@/contracts/product/pack-product-item-dto';
import { ProductType } from '@/contracts/product/product-type';
import { UnitOfMeasure } from '@/contracts/product/unit-of-measure';

export interface ProductDto extends BaseEntityDto {
    name: string;
    model: string;
    brand: string;
    categoryId: string;
    categoryName: string;
    description?: string;
    sku?: string;
    unitOfMeasure?: UnitOfMeasure;
    isActive: boolean;
    alias?: string;
    isLowStock: boolean;
    productType: ProductType;
    tags: string[];
    items?: PackProductItemDto[];
    images: string[];
    requiresSerialNumber: boolean;
}

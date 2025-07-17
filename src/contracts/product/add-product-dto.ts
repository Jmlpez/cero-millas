import { ProductDto } from '@/contracts/product/product-dto';
export type AddProductDto = Omit<ProductDto, 'id' | 'isLowStock' | 'tags' | 'images' | 'isActive' | 'categoryName'>;
export type UpdateProductDto = Omit<ProductDto, 'isLowStock' | 'images' | 'categoryName'>;

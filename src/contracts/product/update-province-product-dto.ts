import { ProvinceProductDto } from '@/contracts/product/province-product-dto';

export type UpdateProvinceProductDto = Omit<
    ProvinceProductDto,
    'productName' | 'productId' | 'provinceId' | 'sellPrice' | 'stockAmount' | 'costPrice'
>;

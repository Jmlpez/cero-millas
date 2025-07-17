import { BaseEntityDto } from '@/contracts/common/base-entity-dto';
import { StockType } from '@/contracts/product/stock-type';

export interface ProvinceProductDto extends BaseEntityDto {
    productId: string;
    provinceId: number;
    productName: string;
    price: number;
    costPrice: number;
    catalogPosition?: number;
    stockType: StockType;
    stockAmount: number;
    inOffer: boolean;
    offerPercent?: number;
    sellPrice?: number;
}

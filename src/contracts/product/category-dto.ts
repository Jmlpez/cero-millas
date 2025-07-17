import { BaseEntityDto } from '@/contracts/common/base-entity-dto';

export interface CategoryDto extends BaseEntityDto {
    name: string;
    displayHome: boolean;
}

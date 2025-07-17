import { BaseEntityDto } from '@/contracts/common/base-entity-dto';

export interface BaseAuditableDto extends BaseEntityDto {
    createdBy: string;
    createdAt: Date;
    modifiedBy: string;
    modifiedAt: Date;
}

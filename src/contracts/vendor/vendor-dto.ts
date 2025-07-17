import { BaseEntityActivable } from '@/contracts/common/base-entity-dto';

export interface VendorDto extends BaseEntityActivable {
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    createdAt?: Date;
}

export type CreateVendorDto = Omit<VendorDto, 'id' | 'createdAt'>;

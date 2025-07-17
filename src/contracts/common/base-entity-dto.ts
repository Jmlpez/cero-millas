export interface BaseEntityDto {
    id: string;
}

export interface BaseEntityActivable extends BaseEntityDto {
    isActive: boolean;
}

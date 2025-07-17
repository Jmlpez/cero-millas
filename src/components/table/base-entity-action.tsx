import React from 'react';

export interface BaseEntityActionLegacy<TData> {
    id: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
    hidden?: (entity: TData) => boolean;
    disabled?: (entity: TData) => boolean;
    isLoading?: (entity: TData) => boolean;
    className?: string;
}

export interface EntityButtonActionLegacy<TData = never> extends BaseEntityActionLegacy<TData> {
    type: 'button';
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    onClick: (entity: TData) => void;
}

export interface EntityLinkActionLegacy<TData = never> extends BaseEntityActionLegacy<TData> {
    type: 'link';
    href: string | ((row: TData) => string);
    external?: boolean;
}

export interface EntitySeparatorActionLegacy<TData> {
    type: 'separator';
    id: string;
    hidden?: (entity: TData) => boolean;
}

export type EntityActionLegacy<TData = never> = EntityButtonActionLegacy<TData> | EntityLinkActionLegacy<TData> | EntitySeparatorActionLegacy<TData>;

export interface EntityActionsConfigLegacy<TData = never> {
    actions: EntityActionLegacy<TData>[];
}

import { BaseEntityActivable, BaseEntityDto } from '@/contracts/common/base-entity-dto';
import { EntityActionsConfigLegacy } from '@components/table/base-entity-action';
import { LucideEdit, LucideEye } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface UseTableActionsOptions<TData> {
    basePath: string | ((row: TData) => string);
    customActions?: {
        view?: {
            href?: (row: TData) => string;
            hidden?: (row: TData) => boolean;
        };
        edit?: {
            href?: (row: TData) => string;
            hidden?: (row: TData) => boolean;
        };
    };
}

// Type guard to check if an entity has isActive property
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hasIsActiveProperty(entity: any): entity is BaseEntityActivable {
    return 'isActive' in entity && typeof entity.isActive === 'boolean';
}

export function useEntityActions<TData extends BaseEntityActivable | BaseEntityDto>({ basePath, customActions }: UseTableActionsOptions<TData>) {
    const { t } = useTranslation();

    const resolveBasePath = (row: TData): string => {
        return typeof basePath === 'function' ? basePath(row) : basePath;
    };

    // TODO: Separate actions in files
    const getStandardActions = (): EntityActionsConfigLegacy<TData> => {
        const actions: EntityActionsConfigLegacy<TData>['actions'] = [];

        // View action
        actions.push({
            id: 'view',
            label: t('common.actions.view.label'),
            icon: LucideEye,
            type: 'link',
            href: customActions?.view?.href || ((row: TData) => `${resolveBasePath(row)}/${row.id}`),
            hidden: customActions?.view?.hidden,
        });

        // Edit action
        actions.push({
            id: 'edit',
            label: t('common.actions.edit.label'),
            icon: LucideEdit,
            type: 'link',
            href: customActions?.edit?.href || ((row: TData) => `${resolveBasePath(row)}/${row.id}/edit`),
            hidden: customActions?.edit?.hidden,
        });

        actions.push({
            type: 'separator',
            id: 'separator-1',
        });
        return { actions };
    };

    return {
        getStandardActions,
    };
}

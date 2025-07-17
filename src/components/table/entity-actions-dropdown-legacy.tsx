import { Button } from '@ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@ui/dropdown-menu';
import { cn } from '@utils';
import { LucideLoader2, LucideSettings } from 'lucide-react';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { EntityActionLegacy, EntityActionsConfigLegacy } from './base-entity-action';

interface EntityActionsDropdownLegacyProps<TData> {
    entity: TData;
    actionsConfig: EntityActionsConfigLegacy<TData>;
    variant?: 'default' | 'outline' | 'ghost';
    size?: 'default' | 'sm' | 'lg';
    trigger?: React.ReactNode;
}

export function EntityActionsDropdownLegacy<TData>({
    entity,
    actionsConfig,
    variant = 'ghost',
    size = 'sm',
    trigger,
}: EntityActionsDropdownLegacyProps<TData>) {
    const { t } = useTranslation();

    const filterAction = useCallback(
        (action: EntityActionLegacy<TData>) => {
            return !action.hidden?.(entity);
        },
        [entity],
    );

    const isActionDisabled = useCallback(
        (action: EntityActionLegacy<TData>) => {
            if (action.type === 'separator') return false;
            return action.disabled?.(entity) || action.isLoading?.(entity);
        },
        [entity],
    );

    const isActionLoading = useCallback(
        (action: EntityActionLegacy<TData>) => {
            if (action.type === 'separator') return false;
            return action.isLoading?.(entity) || false;
        },
        [entity],
    );

    const handleActionClick = useCallback(
        (action: EntityActionLegacy<TData>) => {
            if (action.type === 'button') {
                action.onClick(entity);
            }
        },
        [entity],
    );

    const visibleActions = actionsConfig.actions.filter(filterAction);

    if (visibleActions.length === 0) {
        return null;
    }

    const defaultTrigger = (
        <Button
            variant={variant}
            size={size}
        >
            <LucideSettings className="h-4 w-4" />
            <span className="sr-only">{t('common.actions.moreActions')}</span>
        </Button>
    );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{trigger || defaultTrigger}</DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-fit"
            >
                {visibleActions.map((action) => {
                    if (action.type === 'separator') {
                        return <DropdownMenuSeparator key={action.id} />;
                    }

                    const disabled = isActionDisabled(action);
                    const loading = isActionLoading(action);
                    const Icon = action.icon;

                    if (action.type === 'link') {
                        return (
                            <DropdownMenuItem
                                key={action.id}
                                asChild
                                disabled={disabled}
                            >
                                <Link
                                    to={typeof action.href === 'function' ? action.href(entity) : action.href}
                                    className={action.className}
                                    target={action.external ? '_blank' : undefined}
                                    rel={action.external ? 'noopener noreferrer' : undefined}
                                >
                                    {Icon && <Icon className="mr-2 h-4 w-4" />}
                                    {action.label}
                                </Link>
                            </DropdownMenuItem>
                        );
                    }

                    return (
                        <DropdownMenuItem
                            key={action.id}
                            onClick={() => handleActionClick(action)}
                            disabled={disabled}
                            className={cn(
                                'cursor-pointer transition',
                                action.variant === 'destructive' && 'text-red-600 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950',
                                action.className,
                            )}
                        >
                            {loading ? <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" /> : Icon && <Icon className="mr-2 h-4 w-4" />}
                            {action.label}
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export const MemoizedEntityActionsDropdown = React.memo(EntityActionsDropdownLegacy) as typeof EntityActionsDropdownLegacy;

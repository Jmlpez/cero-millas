import { useDebounce } from '@/hooks/use-debounce';
import { cn } from '@/lib/utils';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { LucideChevronDown, LucideLoader2 } from 'lucide-react';
import { AnchorProps } from 'node_modules/@headlessui/react/dist/internal/floating';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface AutocompleteOption {
    id: string | number;
    label: string;
    value: string;
}

interface AutocompleteProps {
    options: AutocompleteOption[];
    onSelect: (option: AutocompleteOption) => void;
    onQueryChange: (query: string) => void;
    placeholder?: string;
    loading?: boolean;
    error?: boolean;
    disabled?: boolean;
    className?: string;
    inputClassName?: string;
    onAddNewOption?: (option: string) => void;
    debounceMs?: number;
    allowAddNew?: boolean;
    anchor?: AnchorProps;
}

const ADD_NEW_OPTION: AutocompleteOption = {
    id: '0',
    label: 'Add new option',
    value: 'add-new-option',
};

export const Autocomplete = (props: AutocompleteProps) => {
    const [inputValue, setInputValue] = useState('');
    const [selectedOption, setSelectedOption] = useState<AutocompleteOption | null>(null);

    const { t } = useTranslation();

    const {
        options,
        onSelect,
        onQueryChange,
        placeholder = 'Buscar...',
        loading = false,
        error = false,
        disabled = false,
        className = '',
        inputClassName = '',
        onAddNewOption,
        debounceMs = 300,
        allowAddNew = true,
        anchor,
    } = props;

    // Apply debounce to the input
    const debouncedQuery = useDebounce(inputValue, debounceMs);

    // Effect to notify changes in the query debounced
    useEffect(() => {
        onQueryChange(debouncedQuery);
    }, [debouncedQuery, onQueryChange]);

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        setSelectedOption(null); // Reset selection when typing
    }, []);

    const handleSelect = (option: AutocompleteOption | null) => {
        if (!option || inputValue.length <= 1) return;

        if (option.value == ADD_NEW_OPTION.value && inputValue.trim()) {
            onAddNewOption?.(inputValue);
            setInputValue('');
            setSelectedOption(null);
            return;
        }
        setSelectedOption(option);
        onSelect(option);
        setInputValue('');
    };

    const displayOptions = useMemo(() => {
        if (inputValue.trim() && allowAddNew) {
            return [ADD_NEW_OPTION, ...options];
        }
        return options;
    }, [allowAddNew, inputValue, options]);

    return (
        <div className={cn('relative w-full', className)}>
            <Combobox
                value={selectedOption}
                onChange={handleSelect}
                disabled={disabled}
            >
                <div className="relative">
                    <ComboboxInput
                        className={cn(
                            'border-input bg-background ring-offset-background w-full rounded-md border px-3 py-2 text-sm',
                            'placeholder:text-muted-foreground focus:ring-ring focus:ring-2 focus:ring-offset-2 focus:outline-none',
                            'disabled:cursor-not-allowed disabled:opacity-50',
                            error && 'border-destructive focus:ring-destructive',
                            inputClassName,
                        )}
                        displayValue={() => inputValue}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                    />
                    <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
                        {loading ? (
                            <LucideLoader2 className="h-4 w-4 animate-spin text-gray-400" />
                        ) : (
                            <LucideChevronDown className="h-4 w-4 text-gray-400" />
                        )}
                    </ComboboxButton>
                </div>

                {
                    <ComboboxOptions
                        transition={true}
                        modal={false}
                        className={cn(
                            'bg-background ring-opacity-5 border-input z-[10000] w-(--input-width) rounded-xl border p-1 [--anchor-gap:--spacing(1)] empty:invisible',
                            'transition duration-100 ease-in data-leave:data-closed:opacity-0',
                            'transition duration-200 ease-out',
                            'data-[closed]:scale-95 data-[closed]:opacity-0',
                            'data-[enter]:duration-200 data-[enter]:ease-out',
                            'data-[leave]:duration-150 data-[leave]:ease-in',
                        )}
                        anchor={anchor}
                    >
                        {!allowAddNew && inputValue.trim() && displayOptions.length === 0 && !loading && (
                            <div className="p-4 text-center">{t('common.notFoundElements', { search: `'${inputValue}'` })}</div>
                        )}
                        {inputValue !== '' &&
                            displayOptions.map((option) => (
                                <React.Fragment key={option.id}>
                                    {loading ? (
                                        <div className="p-4 text-center">
                                            <LucideLoader2 className={'inline-block animate-spin'} />
                                        </div>
                                    ) : (
                                        <ComboboxOption
                                            value={option}
                                            className={cn(
                                                'group data-[focus]:bg-accent data-[focus]:text-accent-foreground flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none',
                                                // Transiciones suaves para las opciones individuales
                                                'transition-colors duration-150 ease-in-out',
                                            )}
                                        >
                                            <div className="text-foreground text-sm/6">
                                                {option != ADD_NEW_OPTION ? (
                                                    option.label
                                                ) : (
                                                    <>
                                                        {option.label} - {inputValue}
                                                    </>
                                                )}
                                            </div>
                                        </ComboboxOption>
                                    )}
                                </React.Fragment>
                            ))}
                    </ComboboxOptions>
                }
            </Combobox>
        </div>
    );
};

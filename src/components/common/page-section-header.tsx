import { ReactNode } from 'react';

type PageSectionHeaderProps = {
    title: ReactNode | string;
};

export const PageSectionHeader = (props: PageSectionHeaderProps) => {
    const { title } = props;

    return (
        <header className={'flex flex-col gap-2'}>
            <h2 className={'text-lg'}>{title}</h2>
        </header>
    );
};

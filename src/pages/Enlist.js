import React from 'react';
import CharFilter from '../components/CharFilter';
import PageWithTabs from '../components/PageWithTabs';
import { FilterIcon } from '../components/Icon';
import { LanguageContext } from '../components/LanguageProvider';

export default function Enlist() {
    const { stringData } = React.useContext(LanguageContext)

    return (
        <PageWithTabs
            title={stringData.enlist.documentTitle}
            tabs={[
                { label: stringData.enlist.label[0], icon: FilterIcon, content: <CharFilter /> },
            ]}
        />
    )
}
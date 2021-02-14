import React from 'react';
import CharFilter from '../components/CharFilter';
import PageWithTabs from '../components/PageWithTabs';
import { FilterIcon } from '../components/Icon';
import stringData from '../strings.json';

export default function Enlist() {
    return (
        <PageWithTabs
            title={stringData.enlist.documentTitle}
            tabs={[
                { label: stringData.enlist.label[0], icon: FilterIcon, content: <CharFilter /> },
            ]}
        />
    )
}
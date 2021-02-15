import React from 'react';
import ItemShowcase from '../components/ItemShowcase';
import ItemFilter from '../components/ItemFilter';
import CharPotential from '../components/CharPotential';
import { CalcIcon, OverviewIcon, FilterIcon } from '../components/Icon';
import PageWithTabs from '../components/PageWithTabs';
import { LanguageContext } from '../components/LanguageProvider';

export default function Potential() {
    const { stringData } = React.useContext(LanguageContext)

    return (
        <PageWithTabs
            title={stringData.potential.documentTitle}
            tabs={[
                { label: stringData.potential.label[0], icon: OverviewIcon, content: <ItemShowcase /> },
                { label: stringData.potential.label[1], icon: FilterIcon, content: <ItemFilter /> },
                { label: stringData.potential.label[2], icon: CalcIcon, content: <CharPotential /> },
            ]}
        />
    )
}

import React, { useContext } from 'react';
import Layout from "../components/Layout";
import PageWithTabs from '../components/PageWithTabs';
import ItemShowcase from '../components/ItemShowcase';
import ItemFilter from '../components/ItemFilter';
import CharPotential from '../components/CharPotential';
import { LanguageContext } from '../components/LanguageProvider';
import { CalcIcon, OverviewIcon, FilterIcon } from '../components/icon';

export default () => {
    const { pageString } = useContext(LanguageContext)

    return (
        <Layout
            title={pageString.potential.helmet.title}
            description={pageString.potential.helmet.description}
        >
            <PageWithTabs
                path='potential'
                tabs={[
                    { label: pageString.potential.label[0], icon: OverviewIcon, content: <ItemShowcase /> },
                    { label: pageString.potential.label[1], icon: FilterIcon, content: <ItemFilter /> },
                    { label: pageString.potential.label[2], icon: CalcIcon, content: <CharPotential /> },
                ]}
            />
        </Layout>
    )
}

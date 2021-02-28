import React, { useContext } from 'react';
import Layout from "../components/Layout";
import PageWithTabs from '../components/PageWithTabs';
import CharFilter from '../components/CharFilter';
import CharShowcase from '../components/CharShowcase';
import { LanguageContext } from '../components/LanguageProvider';
import { FilterIcon, OverviewIcon } from '../components/icon';

export default () => {
    const { pageString } = useContext(LanguageContext)

    return (
        <Layout
            title={pageString.enlist.helmet.title}
            description={pageString.enlist.helmet.description}
        >
            <PageWithTabs
                path='enlist'
                tabs={[
                    { label: pageString.enlist.label[0], icon: OverviewIcon, content: <CharShowcase /> },
                    { label: pageString.enlist.label[1], icon: FilterIcon, content: <CharFilter /> },
                ]}
            />
        </Layout>
    )
}

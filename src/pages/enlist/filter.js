import React, { useContext } from 'react';
import Head from '../../components/Head';
import CharFilter from '../../components/CharFilter';
import { LanguageContext } from '../../components/LanguageProvider';

export default () => {
    const { pageString } = useContext(LanguageContext)

    return (
        <>
            <Head
                title={pageString.enlist.filter.helmet.title}
                description={pageString.enlist.filter.helmet.description}
            />
            <CharFilter />
        </>
    )
}

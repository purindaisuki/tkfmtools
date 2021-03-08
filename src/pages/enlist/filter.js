import React, { useContext } from 'react';
import Head from 'components/Head';
import CharFilter from 'components/CharFilter';
import { LanguageContext } from 'components/LanguageProvider';

const Filter = () => {
    const { pageString } = useContext(LanguageContext)

    return (
        <>
            <Head
                title={pageString.enlist.filter.helmet.title}
                description={pageString.enlist.filter.helmet.description}
                path='/enlist/filter/'
            />
            <CharFilter />
        </>
    )
}

export default Filter
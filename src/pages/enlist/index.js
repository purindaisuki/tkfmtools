import React, { useContext } from 'react';
import Head from '../../components/Head';
import CharShowcase from '../../components/CharShowcase';
import { LanguageContext } from '../../components/LanguageProvider';

export default () => {
    const { isDefault, pageString } = useContext(LanguageContext)

    return (
        <>
            <Head
                title={pageString.enlist.index.helmet.title}
                description={pageString.enlist.index.helmet.description}
                path='/enlist'
            />
            <CharShowcase />
        </>
    )
}

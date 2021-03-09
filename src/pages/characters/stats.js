import React, { useContext } from 'react';
import Head from 'components/Head';
import CharStats from 'components/CharStats';
import { LanguageContext } from 'components/LanguageProvider';

const Stats = () => {
    const { pageString } = useContext(LanguageContext)

    return (
        <>
            <Head
                title={pageString.characters.stats.helmet.title}
                description={pageString.characters.stats.helmet.description}
                path='/characters/stats/'
            />
            <CharStats />
        </>
    )
}

export default Stats
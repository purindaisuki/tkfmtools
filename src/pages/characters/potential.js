import React, { useContext } from 'react';
import Head from '../../components/Head';
import CharPotential from '../../components/CharPotential';
import { LanguageContext } from '../../components/LanguageProvider';

export default () => {
    const { pageString } = useContext(LanguageContext)

    return (
        <>
            <Head
                title={pageString.characters.potential.helmet.title}
                description={pageString.characters.potential.helmet.description}
                path='/characters/potential'
            />
            <CharPotential />
        </>
    )
}

import React, { useContext } from 'react';
import Head from 'components/Head';
import ChatStats from 'components/ChatStats';
import { LanguageContext } from 'components/LanguageProvider';

export default () => {
    const { pageString } = useContext(LanguageContext)

    return (
        <>
            <Head
                title={pageString.characters.stats.helmet.title}
                description={pageString.characters.stats.helmet.description}
                path='/characters/stats/'
            />
            <ChatStats />
        </>
    )
}

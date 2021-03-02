import React, { useContext } from 'react';
import Head from "../../../components/Head";
import ItemShowcase from '../../../components/ItemShowcase';
import { LanguageContext } from '../../../components/LanguageProvider';

export default () => {
    const { pageString } = useContext(LanguageContext)

    return (
        <>
            <Head
                title={pageString.items.drop.index.helmet.title}
                description={pageString.items.drop.index.helmet.description}
                path='/items/drop'
            />
            <ItemShowcase />
        </>
    )
}

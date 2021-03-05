import React, { useContext } from 'react';
import Head from "../../../components/Head";
import ItemFilter from '../../../components/ItemFilter';
import { LanguageContext } from '../../../components/LanguageProvider';

export default () => {
    const { pageString } = useContext(LanguageContext)

    return (
        <>
            <Head
                title={pageString.items.drop.filter.helmet.title}
                description={pageString.items.drop.filter.helmet.description}
                path='/items/drop/filter/'
            />
            <ItemFilter />
        </>
    )
}

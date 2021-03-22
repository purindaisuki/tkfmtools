import React from 'react';
import styled from 'styled-components';

import Switchable from 'containers/Switchable';
import { useLanguage } from 'containers/LanguageProvider';

import Head from 'components/Head';
import MyIconButton from 'components/MyIconButton';
import CharTagMasonry from 'components/CharTagMasonry';
import CharTagTable from 'components/CharTagTable';
import {
    MasonryViewIcon,
    TableViewIcon
} from 'components/icon';

const LayoutBtnContainer = styled.div`
    position: absolute;
    right: 0;
    top: -4rem;
    @media screen and (max-width: 410px) {
        font-size: 0;
    }
`
const LayoutSwitcher = ({ layout, setLayout }) => {
    const { pageString } = useLanguage()

    return (
        <LayoutBtnContainer>
            {pageString.enlist.index.layout}
            <MyIconButton
                $active={layout === 'Masonry'}
                onClick={() => setLayout('Masonry')}
                tooltipText={pageString.enlist.index.masonryTooltip}
            >
                {MasonryViewIcon}
            </MyIconButton>
            <MyIconButton
                $active={layout === 'Table'}
                onClick={() => setLayout('Table')}
                tooltipText={pageString.enlist.index.tableTooltip}
            >
                {TableViewIcon}
            </MyIconButton>
        </LayoutBtnContainer>
    )
}

const Index = () => {
    const { pageString } = useLanguage()

    return (<>
        <Head
            title={pageString.enlist.index.helmet.title}
            description={pageString.enlist.index.helmet.description}
            path='/enlist/'
        />
        <Switchable
            localStorageKey='enlist-character-layout'
            layoutSwitcher={<LayoutSwitcher />}
            items={[
                { layout: 'Masonry', content: <CharTagMasonry /> },
                { layout: 'Table', content: <CharTagTable /> },
            ]}
        />
    </>)
}

export default Index
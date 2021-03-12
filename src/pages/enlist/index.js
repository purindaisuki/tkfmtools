import React from 'react';
import styled from 'styled-components';
import Head from 'components/Head';
import MyIconButton from 'components/MyIconButton';
import SwitchableShowcase from 'components/SwitchableShowcase';
import CharTagMasonry from 'components/CharTagMasonry';
import CharTagTable from 'components/CharTagTable';
import { useLanguage } from 'components/LanguageProvider';
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
const LayoutSwitcher = (props) => {
    const { pageString } = useLanguage()

    return (
        <LayoutBtnContainer>
            {pageString.enlist.index.layout}
            <MyIconButton
                $active={props.layout === 'Masonry'}
                onClick={props.handleLayoutChange('Masonry')}
            >
                {MasonryViewIcon}
            </MyIconButton>
            <MyIconButton
                $active={props.layout === 'Table'}
                onClick={props.handleLayoutChange('Table')}
            >
                {TableViewIcon}
            </MyIconButton>
        </LayoutBtnContainer>
    )
}

const Index = () => {
    const { pageString } = useLanguage()

    return (
        <>
            <Head
                title={pageString.enlist.index.helmet.title}
                description={pageString.enlist.index.helmet.description}
                path='/enlist/'
            />
            <SwitchableShowcase
                localLayoutConfig='enlist-character-layout'
                layoutSwitcher={<LayoutSwitcher />}
                items={[
                    { layout: 'Masonry', content: <CharTagMasonry /> },
                    { layout: 'Table', content: <CharTagTable /> },
                ]}
            />
        </>
    )
}

export default Index
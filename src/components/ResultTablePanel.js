import React from 'react';
import styled from 'styled-components';

import Scrollable from 'containers/Scrollable';
import { useLanguage } from 'containers/LanguageProvider';

import Header from 'components/Header';
import SortableTable from 'components/SortableTable';

const TableWrapper = styled(Scrollable)`
    max-height: ${props => props.$maxHeight};
    overflow-x: hidden;
    overflow-y: auto;
`
const StyledSortableTable = styled(SortableTable)`
    img {
        width: 1.8rem; height: 1.8rem;
    }
    td {
        padding-left: .75rem;
    }
`
const ResultTablePanel = ({
    data,
    head,
    body,
    sortFunc,
    defaultSortKey,
    handleModalOpen,
    maxHeight,
    striped,
    headerEnd,
}) => {
    const { pageString } = useLanguage()

    return (<>
        <Header
            title={pageString.items.drop.filter.resultTitle}
            withHelp
            onClickHelp={handleModalOpen}
            end={headerEnd}
            border
        />
        <TableWrapper $maxHeight={maxHeight}>
            <StyledSortableTable
                data={data}
                head={head}
                body={body}
                sortFunc={sortFunc}
                defaultSortKey={defaultSortKey}
                striped={striped}
            />
        </TableWrapper>
    </>)
}

export default ResultTablePanel
import React, { useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Backdrop, Fade, Modal } from '@material-ui/core';
import { Table } from 'react-bootstrap';
import { LanguageContext } from './LanguageProvider';
import { HelpIcon } from './icon';

const StyledContainerHeader = styled.div`
    display: flex;
    align-items: center;
    font-size: large;
    font-weight: normal;
    justify-content: space-between;
    margin-bottom: 1rem;
    padding-bottom: .4rem;
    border-bottom: solid 1px ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.onSurface};
    > div {
        display: flex;
        align-items: center;
    }
`
export const ContainerHeader = ({
    title,
    end
}) => (
    <StyledContainerHeader>
        {title}
        {end}
    </StyledContainerHeader>
)

const StyledFilterPanel = styled.div`
    height: 100%;
    width: ${props => props.widthConfig.default};
    padding: 1rem;
    border-radius: .25rem;
    background-color: ${props => props.theme.colors.surface};
    border: 1px solid ${props => props.theme.colors.border};
    box-shadow: 0 0 .15em lightgray;
    @media screen and (max-width: 1360px) {
        width: ${props => props.widthConfig[1360]};
    }
    @media screen and (max-width: 992px) {
        width: ${props => props.widthConfig[992]};
    }
`
export const FilterPanel = ({
    className,
    children,
    widthConfig
}) => (
    <StyledFilterPanel
        className={className}
        widthConfig={widthConfig}
    >
        {children}
    </StyledFilterPanel>
)

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: large;
    border-bottom: 1px solid ${props => props.theme.colors.border};
`
const ModalBody = styled.div`
    margin: 1rem 0;
`
const HelpModalContent = ({
    handleModalClose,
    content
}) => (
    content.map((item, idx) => {
        const CloseBtn = () => idx === 0
            ? <span onClick={handleModalClose}>&times;</span>
            : null
        return (
            <React.Fragment key={idx}>
                <ModalHeader>
                    <span>{item.title}</span>
                    <CloseBtn />
                </ModalHeader>
                <ModalBody>
                    {item.content.map((text, idx) => <p key={idx}>{text}</p>)}
                </ModalBody>
            </React.Fragment>
        )
    })
)

const StyledModalContainer = styled.div`
    background-color: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.onSurface};
    position: absolute;
    width: 70%;
    left: 15%;
    top: 10%;
    @media screen and (max-width: 992px) {
        width: 80%;
        left: 10%;
    }
    @media screen and (max-width: 768px) {
        width: 90%;
        left: 5%;
        top: 5%;
    }
    padding: 1rem;
    border-radius: .25rem;
    border: 1px solid ${props => props.theme.colors.border};
    > div > div:first-child > span:last-child {
        font-size: x-large;
        cursor: pointer;
    }
`
const ModalContentWrapper = styled.div`
    overflow: auto;
    max-height: calc(80vh - 2rem);
    scrollbar-width: thin;
    padding-right: .5rem;
    margin-right: -.5rem;
    &::-webkit-scrollbar {
        width: .4rem;
        background: ${props => props.theme.colors.surface};
    }
    &::-webkit-scrollbar-thumb {
        background: ${props => props.theme.colors.border};
        border-radius: .25rem;
    }
    &::-webkit-scrollbar-track {
        background: ${props => props.theme.colors.surface};
    }
    &::-webkit-scrollbar-corner {
        background: ${props => props.theme.colors.surface};
    }
`
export const ModalContainer = ({
    children,
    className,
    open,
    onClose
}) => (
    <Modal
        className={className}
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
    >
        <Fade in={open}>
            <StyledModalContainer>
                <ModalContentWrapper>
                    {children}
                </ModalContentWrapper>
            </StyledModalContainer>
        </Fade>
    </Modal>
)

export const HelpModal = ({
    content,
    modalOpen,
    handleModalClose,
}) => (
    <ModalContainer
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="help-modal-title"
        aria-describedby="help-modal-description"
    >
        <HelpModalContent
            content={content}
            handleModalClose={handleModalClose}
        />
    </ModalContainer>
)

export const SortableTh = styled.th`
    position: sticky;
    top: 0;
    z-index: 1;
    cursor: pointer;
    user-select: none;
    background-color: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.onSurface};
    &:after {
        content: '${props => (
        props.direction
            ? props.direction === 'asc'
                ? ' \\25B2'
                : ' \\25BC'
            : undefined
    )}';
    }
`
const StyledTable = styled(Table)`
    width: 100%;
    margin-bottom: 0;
    &, &&& tr {
        color: ${props => props.theme.colors.onSurface};
    }
    th {
        padding: .75rem .25rem;
    }
    th:first-child {
        padding-left: .75rem;
    }
    td {
        vertical-align: middle;
    }
    tr {
        border-bottom: ${props => (
        props.$border
            ? '1px solid ' + props.theme.colors.secondary
            : 'none'
    )};
    }
`
export const SortableTable = ({
    className,
    children,
    result,
    sortFunc,
    defaultSortKey,
    striped,
    border
}) => {
    const useSortableData = (
        items, config = {
            key: defaultSortKey,
            direction: 'desc'
        }
    ) => {
        const [sortConfig, setSortConfig] = useState(config)

        const sortedItems = useMemo(() => {
            let sortableItems = [...items]
            if (sortConfig.key) {
                sortFunc(sortableItems, sortConfig)
            }

            return sortableItems
        }, [items, sortConfig])

        const requestSort = (key) => {
            let direction = (
                sortConfig.key === key &&
                sortConfig.direction === 'desc'
            ) ? 'asc' : 'desc'
            setSortConfig({ key, direction })
        }

        return { sortedResult: sortedItems, requestSort, sortConfig }
    }

    const { sortedResult, requestSort, sortConfig } = useSortableData(result)

    // apply default key if value assigned after first render
    useEffect(() => {
        if (sortConfig.key !== defaultSortKey) {
            requestSort(defaultSortKey)
        }
    }, [defaultSortKey])

    const getSortDirection = (key) => {
        if (sortedResult.length === 0) return

        return sortConfig.key === key ? sortConfig.direction : undefined
    }

    return (
        <StyledTable
            className={className}
            striped={striped}
            borderless
            hover
            $border={border}
            size="sm"
        >
            {React.cloneElement(children, {
                requestSort: requestSort,
                getSortDirection: getSortDirection,
                sortedResult: sortedResult,
            })}
        </StyledTable>
    )
}

const ResultTableContainer = styled.div`
    vertical-align: top;
    position: absolute;
    width: ${props => props.widthConfig.default};
    margin-left: calc(100% - ${props => props.widthConfig.default});
    padding: 1rem;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: .25rem;
    background-color: ${props => props.theme.colors.surface};
    border: 1px solid ${props => props.theme.colors.border};
    box-shadow: 0 0 .15em lightgray;
    @media screen and (max-width: 1360px) {
        width: ${props => props.widthConfig[1360]};
        margin-left: calc(100% - ${props => props.widthConfig[1360]});
    }
    @media screen and (max-width: 992px) {
        width: ${props => props.widthConfig[992]};
        margin-left: calc(100% - ${props => props.widthConfig[992]});
        position: relative;
        margin-top: 1rem;
    }
`
export const TableWrapper = styled.div`
    height: calc(100% - 1.4rem - 1.5rem);
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: thin;
    &::-webkit-scrollbar {
        width: .4rem;
        height: .4rem;
        background: ${props => props.theme.colors.surface};
    }
    &::-webkit-scrollbar-thumb {
        background: ${props => props.theme.colors.border};
        border-radius: .25rem;
    }
    &::-webkit-scrollbar-track {
        background: ${props => props.theme.colors.surface};
    }
    &::-webkit-scrollbar-corner {
        background: ${props => props.theme.colors.surface};
    }
`
const StyledSortableTable = styled(SortableTable)`
    img {
        width: 1.8rem; height: 1.8rem;
    }
    td {
        padding-left: .75rem;
    }
`
const IconWrapper = styled.div`
    svg {
        fill: ${props => props.theme.colors.secondary};
        width: 1.4rem;
        height: 1.4rem;
        margin-left: .4rem;
        cursor: pointer;
        vertical-align: top;
    }
`
export function ResultTable({
    children,
    result,
    sortFunc,
    defaultSortKey,
    modalOpen,
    handleModalOpen,
    handleModalClose,
    modalContent,
    widthConfig,
    striped,
}) {
    const { pageString } = useContext(LanguageContext)

    return (
        <ResultTableContainer widthConfig={widthConfig}>
            <ContainerHeader
                title={
                    <div>
                        {pageString.items.drop.filter.resultTitle}
                        <IconWrapper onClick={handleModalOpen}>
                            {HelpIcon}
                        </IconWrapper>
                    </div>
                }
            />
            <TableWrapper>
                <StyledSortableTable
                    result={result}
                    sortFunc={sortFunc}
                    defaultSortKey={defaultSortKey}
                    striped={striped}
                >
                    {children}
                </StyledSortableTable>
            </TableWrapper>
            <HelpModal
                modalOpen={modalOpen}
                handleModalClose={handleModalClose}
                content={modalContent}
            >
            </HelpModal>
        </ResultTableContainer>
    )
}

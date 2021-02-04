import { Table, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import styled from 'styled-components';
import { ClearIcon } from './icon';
import data from './item.json'

const StyledFilterPanel = styled.div`
    width: 52%; height: 100%;
    padding: 1rem;
    border-radius: .25rem;
    background-color: ${props => props.theme.colors.surface};
    border: 1px solid ${props => props.theme.colors.border};
    box-shadow: 0 0 .15em lightgray;
    @media screen and (max-width: 1360px) {
        width: 62%;
    }
    @media screen and (max-width: 992px) {
        width: 100%;
    }
`
const ContainerHeader = styled.div`
    display: flex;
    align-items: center;
    font-size: large;
    font-weight: normal;
    justify-content: space-between;
    margin-bottom: 1rem;
    padding-bottom: .4rem;
    border-bottom: solid 1px ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.onSurface};
`
const ImgWrapper = styled.div`
    cursor: pointer;
    svg {
        width: 1.2rem;
        height: 1.2rem;
    }
`
const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: .5rem;
    > .active {
        background-color: ${props => props.theme.colors.secondary};
        color: ${props => props.theme.colors.onSecondary};
    }
    @media screen and (max-width: 1360px) {
        grid-template-columns: repeat(4, 1fr);
    }
    @media screen and (max-width: 992px) {
        grid-template-columns: repeat(5, 1fr);
    }
    @media screen and (max-width: 768px) {
        grid-template-columns: repeat(4, 1fr);
    }
    @media screen and (max-width: 624px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media screen and (max-width: 410px) {
        grid-template-columns: repeat(2, 1fr);
    }
`
const StyledToggleButton = styled(ToggleButton)`
    font-size: .85rem;
    font-weight: normal;
    text-align: center;
    padding: .15rem .15rem;
    margin-bottom: 0;
    border-radius: .25rem;
    border: 1px solid ${props => props.theme.colors.secondaryBorder};
    background-color: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.onSurface};
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    &:hover {
        border: 1px solid ${props => props.theme.colors.secondary};
        box-shadow: inset 0 0 .5rem ${props => props.theme.colors.secondary}
            , 0 0 .1rem ${props => props.theme.colors.secondary};
    }
    &:active {
        background-color: ${props => props.theme.colors.secondary};
        color: ${props => props.theme.colors.onSecondary};
    }
    > input {
        display: none;
    }
    > img {
        width: 2.26rem; height: 2.26rem;
    }
`

function FilterPanel(props) {
    return (
        <StyledFilterPanel>
            <ContainerHeader>
                道具選擇
                <ImgWrapper
                    onClick={props.clearFilter}
                >
                    {ClearIcon}
                </ImgWrapper>
            </ContainerHeader>
            <StyledToggleButtonGroup
                type="checkbox"
                value={props.filterBtnValue}
                onChange={props.filterBy}
            >
                {data.map((item, idx) => {
                    return (
                        <StyledToggleButton
                            value={idx}
                            key={item.name}
                            bsPrefix='btn-escape'
                        >
                            <img
                                src={`/img/item_${item.id}.png`}
                                alt=''
                            />
                            {item.name}
                        </StyledToggleButton>
                    )
                })}
            </StyledToggleButtonGroup>
        </StyledFilterPanel>
    )
}

const ResultTableContainer = styled.div`
    vertical-align: top;
    width: 30%;
    position: absolute;
    margin-left: calc(52% + 1rem);
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
        width: calc(38% - 1rem);
        margin-left: calc(62% + 1rem);
    }
    @media screen and (max-width: 992px) {
        width: 100%;
        position: relative;
        margin-left: 0;
        margin-top: 1rem;
    }
`
const ResultTableWrapper = styled.div`
    height: calc(100% - 1.4rem - 1.5rem);
    maring-top: -.5rem;
    overflow-x: hidden; overflow-y: auto;
    scrollbar-width: thin;
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
`
const StyledResultTable = styled(Table)`
    width: 100%;
    table-layout: fixed;
    font-size: normal;
    color: ${props => props.theme.colors.onSurface};
    img {
        width: 1.8rem; height: 1.8rem;
    }
    td {
        padding-left: .75rem;
    }
`
const SortTh = styled.th`
    position: sticky;
    top: 0;
    cursor: pointer;
    user-select: none;
    font-size: 1.1rem;
    font-weight: normal;
    background-color: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.onSurface};
    &:after {
        content: '${props => {
        if (!props.direction) return
        return props.direction === 'asc' ? ' \\25B2' : ' \\25BC'
    }}';
    }
`

function ResultTable(props) {


    const TableHeader = () => {
        if (props.dropTableItems.length === 0) {
            return <SortTh>稀有度</SortTh>
        }

        return (
            props.dropTableItems[0].drop.map((item, idx) => {
                return (
                    <SortTh
                        key={idx}
                        onClick={props.requestSort(idx)}
                        direction={props.getSortDirection(idx)}
                    >
                        <img
                            src={`/img/item_${item.id}.png`}
                            alt={item.name}
                        />
                    </SortTh>
                )
            })
        )
    }

    return (
        <ResultTableContainer>
            <ContainerHeader>篩選結果</ContainerHeader>
            <ResultTableWrapper>
                <StyledResultTable
                    striped
                    borderless
                    size="sm"
                >
                    <thead>
                        <tr>
                            <SortTh
                                onClick={props.requestSort('stage')}
                                direction={props.getSortDirection('stage')}
                            >
                                關卡
                            </SortTh>
                            <TableHeader />
                            <SortTh
                                onClick={props.requestSort('energy')}
                                direction={props.getSortDirection('energy')}
                            >
                                <img
                                    src='/img/energy.png'
                                    className='card-table-img'
                                    alt='體力消耗'
                                />
                            </SortTh>
                        </tr>
                    </thead>
                    <tbody>
                        {props.dropTableItems.map((stage, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{`${stage.chapter}-${stage.stage}`}</td>
                                    {stage.drop.map(item => {
                                        return (
                                            <td key={item.id}>{item.rarity}</td>
                                        )
                                    })}
                                    <td>{stage.energy}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </StyledResultTable>
            </ResultTableWrapper>
        </ResultTableContainer>
    )
}

const FilterContainer = styled.div`
    display: flex;
    @media screen and (max-width: 992px) {
        display: block;
    }
`

function ItemFilter(props) {
    return (
        <FilterContainer>
            <FilterPanel
                filterBtnValue={props.filterBtnValue}
                filterBy={props.filterBy}
                clearFilter={props.clearFilter}
            />
            <ResultTable
                dropTableItems={props.dropTableItems}
                requestSort={props.requestSort}
                getSortDirection={props.getSortDirection}
            />
        </FilterContainer>
    )

}

export default ItemFilter;
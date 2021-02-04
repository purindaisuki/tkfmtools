import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { MainNavbar, Sidebar } from './Navbars';
import { lightTheme, darkTheme } from './Theme';
import { Enlist, Home, Potential } from './pages';
import data from './item.json'

const Body = styled.div`
    min-height: 100vh;
    transition: background-color 204ms ease;
    background-color: ${props => props.theme.colors.background};
`
const Main = styled.main`
    padding: 1rem;
    @media screen and (max-width: 490px) {
        padding: 1rem 0;
    }
`

export default function App() {
    // theme
    const getDefaultTheme = () => {
        let localSetting = localStorage.getItem('color-theme')
        if (localSetting) {
            return localSetting
        }
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark'
        }
        return 'light'
    }

    const [theme, setTheme] = useState(getDefaultTheme)

    const toggleTheme = (event) => {
        // ignore tab and shift key
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        let toTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(toTheme)
        localStorage.setItem('color-theme', toTheme)
    }
    // sidebar
    const [open, setOpen] = useState(false)

    const toggleSidebar = (toOpen) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(toOpen);
    };
    //potential showcase
    const [cardActiveKeys, setCardActiveKeys] = useState(Array(data.length).fill('0'))

    const handleCardClick = (idx) => (e) => {
      let copyActiveKeys = cardActiveKeys.slice()
      copyActiveKeys[idx] ? copyActiveKeys[idx] = undefined : copyActiveKeys[idx] = '0'
      console.log(idx, copyActiveKeys[idx])
      setCardActiveKeys(copyActiveKeys)
    }
    //potential filter
    const [filterBtnValue, setFilterBtnValue] = useState([])
    const [stages, setStages] = useState([])

    const filterBy = (val) => {
        setFilterBtnValue(val)
        if (val.length === 0) {
            setStages([])
            return;
        }
        let curVal = val.sort()
        // deep copy
        let filteredStages = JSON.parse(JSON.stringify(data[curVal[0]].drop))
        filteredStages.forEach(stage => {
            stage['drop'] = [{
                id: data[curVal[0]].id,
                name: data[curVal[0]].name,
                rarity: stage.rarity
            }]
            delete stage['rarity']
        })
        curVal.forEach((itemIdx, idx) => {
            if (idx === 0) return true
            filteredStages = filteredStages.filter(thisStage => {
                let flag = false
                data[itemIdx].drop.forEach(that => {
                    if (
                        that.chapter === thisStage.chapter
                        && that.stage === thisStage.stage
                    ) {
                        let newDrop = {
                            id: data[itemIdx].id,
                            name: data[itemIdx].name,
                            rarity: that.rarity
                        }
                        thisStage.drop.push(newDrop)
                        flag = true
                        return false
                    }
                })
                return flag
            })
        })
        setStages(filteredStages)
    }
    // potential sort table
    const useSortableData = (items, config = { key: 0, direction: 'desc' }) => {
        // when key is number meaning sorted by the number of item
        const [sortConfig, setSortConfig] = useState(config)
    
        const toStageKey = key => {
            return (
                parseInt(key['chapter']) * 1000 +
                parseInt(key['stage'].split(' ')[0]) *10 +
                (key['stage'].includes('free') ? 1 : 0) +
                (key['stage'].includes('-') ? parseInt(key['stage'].split('-')[1]) : 0)
            )
        }
    
        const toRarityKey = (key, idx) => {
            switch(key['drop'][idx]['rarity']) {
                case '罕見': return 0
                case '少見': return 1
                case '常見': return 2
                default: return 3
            }
        }
    
        const sortedItems = React.useMemo(() => {
            let sortableItems = [...items]
    
            sortableItems.sort((a, b) => {
                let aKey
                let bKey
                if (sortConfig.key === 'stage') {
                    aKey = toStageKey(a)
                    bKey = toStageKey(b)
                    console.log(a, aKey)
                } else if (sortConfig.key === 'energy') {
                    aKey = a[sortConfig.key]
                    bKey = b[sortConfig.key]
                } else {
                    aKey = toRarityKey(a, sortConfig.key)
                    bKey = toRarityKey(b, sortConfig.key)
                }
                if (aKey < bKey) {
                    return sortConfig.direction === 'asc' ? -1 : 1
                }
                if (aKey > bKey) {
                    return sortConfig.direction === 'asc' ? 1 : -1
                }
                return 0
            })
    
            return sortableItems
        }, [items, sortConfig])
    
        const requestSort = (key) => (e) => {
            let direction = 'desc';
            if (
                sortConfig.key === key &&
                sortConfig.direction === 'desc'
            ) {
                direction = 'asc';
            }
            setSortConfig({ key, direction })
        }
    
        return { dropTableItems: sortedItems, requestSort, sortConfig }
    }
    const { dropTableItems, requestSort, sortConfig } = useSortableData(stages)
    const getSortDirection = (name) => {
        if (dropTableItems.length === 0) {
            return
        }
        return sortConfig.key === name ? sortConfig.direction : undefined
    }

    return (
        <ThemeProvider
            theme={theme === 'light' ? lightTheme : darkTheme}
        >
            <Body>
                <MainNavbar
                    checked={theme === 'dark'}
                    toggleTheme={toggleTheme}
                    toggleSidebar={toggleSidebar}
                />
                <Sidebar
                    open={open}
                    toggleSidebar={toggleSidebar}
                />
                <Main>
                    <Route path='/' exact component={Home} />
                    <Route
                        path='/potential'
                        component={() => (
                            <Potential
                                cardActiveKeys={cardActiveKeys}
                                handleCardClick={handleCardClick}
                                filterBtnValue={filterBtnValue}
                                filterBy={filterBy}
                                clearFilter={() => filterBy([])}
                                dropTableItems={dropTableItems}
                                requestSort={requestSort}
                                getSortDirection={getSortDirection}
                            />
                        )}
                    />
                    <Route
                        path='/enlist'
                        component={() => (
                            <Enlist />
                        )}
                    />
                </Main>
            </Body>
        </ThemeProvider>
    )
}
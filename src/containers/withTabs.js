import React, { useEffect, useState } from 'react';
import { useLocation } from "@reach/router"
import styled from 'styled-components';
import { Tab, Tabs } from '@material-ui/core';

import { useLanguage } from 'containers/LanguageProvider';

import LocalizedLink from 'components/LocalizedLink'
import {
    FilterIcon,
    OverviewIcon,
    ListIcon,
    PiechartIcon
} from 'components/icon';

const StyledTabs = styled(Tabs)`
    && {
        margin: -1rem;
        margin-bottom: 1rem;
        background-color:  ${props => props.theme.colors.shadow + '1A'};
        .MuiTabs-indicator {
            background-color:  ${props => props.theme.colors.secondary};
        }
        .MuiTab-root {
            min-width: 0;
            min-height: 0;
            padding: .6rem 1.2rem;
            z-index: 1;
            > span {
                display: ${props => props.$lang === 'en' ? 'flex' : 'inline'}};
                font-size: ${props => props.$lang === 'en' ? '1rem' : 'medium'}};
            }
        }
        .MuiTab-wrapper {
            color: ${props => props.theme.colors.onSurface}
        }
        svg {
            width: 1.4rem;
            height: 1.4rem;
            margin: 0rem .2rem;
            margin-left: 0;
            fill: ${props => props.theme.colors.onSurface};
        }
        .Mui-selected > span {
            color: ${props => props.theme.colors.secondary};
            svg {
                fill: ${props => props.theme.colors.secondary};
            }
        }
    }
`
const TabPanel = styled.div`
    position: relative;
`
export default function withTabs({ children, pagePath }) {
    const { userLanguage, pageString } = useLanguage()

    const tabsConfig = {
        enlist: {
            enlist: {
                label: pageString.enlist.tabLabel[0],
                icon: OverviewIcon,
                to: '/enlist/',
            },
            filter: {
                label: pageString.enlist.tabLabel[1],
                icon: FilterIcon,
                to: '/enlist/filter/',
            },
        },
        drop: {
            drop: {
                label: pageString.items.drop.tabLabel[0],
                icon: OverviewIcon,
                to: '/items/drop/',
            },
            filter: {
                label: pageString.items.drop.tabLabel[1],
                icon: FilterIcon,
                to: '/items/drop/filter/',
            },
        },
        analysis: {
            analysis: {
                label: pageString.analysis.tabLabel[0],
                icon: ListIcon,
                to: '/analysis/',
            },
            result: {
                label: pageString.analysis.tabLabel[1],
                icon: PiechartIcon,
                to: '/analysis/result/',
            }
        }
    }

    const configKey = Object.keys(tabsConfig)
        .find(key => pagePath.includes(key))
    const tabIndex = Object.values(tabsConfig[configKey])
        .findIndex(value => value.to === pagePath)

    const [state, setState] = useState({ tab: tabIndex })

    let location = useLocation()

    // handle tab change on location change
    useEffect(() => {
        setState(state => ({ ...state, tab: tabIndex }))
    }, [location])

    return (<>
        <StyledTabs
            value={state.tab}
            $lang={userLanguage}
        >
            {Object.values(tabsConfig[configKey]).map((item, ind) => (
                <Tab
                    value={ind}
                    label={item.label}
                    icon={item.icon}
                    component={LocalizedLink}
                    to={item.to}
                    key={item.label}
                />
            ))}
        </StyledTabs>
        <TabPanel>{children}</TabPanel>
    </>)
}

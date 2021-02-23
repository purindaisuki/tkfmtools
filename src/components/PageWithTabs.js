import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { LanguageContext } from './LanguageProvider';

const StyledTabs = styled(Tabs)`
    && {
        transition: all 0.3s ease;
        border-bottom: 1px solid ${props => props.theme.colors.border};
        .MuiTabs-indicator {
            background-color:  ${props => props.theme.colors.secondary};
            height: 100%;
            border-radius: .25rem;
            border-bottom-right-radius: 0;
            border-bottom-left-radius: 0;
        }
        .MuiTab-root {
            min-width: 0;
            min-height: 0;
            padding: 0 1rem;
            padding-top: .6rem;
            z-index: 1;
            > span {
                display: ${props => {
                    if (props.lang === 'en') return 'flex'
                    else return 'inline'
                }};
                font-size: ${props => {
                    if (props.lang === 'en') return '1rem'
                    else return 'medium'
                }};
                color: ${props => props.theme.colors.onSurface}
            }
        }
        .MuiTab-root.MuiTab-labelIcon {
            min-height: 0;
        }
        && svg {
            width: 1.4rem;
            height: 1.4rem;
            margin: 0rem .2rem;
            margin-left: 0;
        }
        svg {
            fill: ${props => props.theme.colors.onSurface};
        }
        .Mui-selected > span {
            color: ${props => props.theme.colors.onSecondary};
            svg {
                fill: ${props => props.theme.colors.onSecondary};
            }
        }
    }
`
const TabPanel = styled.div`
    position: relative;
    margin-top: 1rem;
`
export default function PageWithTabs(props) {
    const { userLanguage } = useContext(LanguageContext)

    const [tab, setTab] = useState(0)

    useEffect(() => {
        document.title = props.title
        // get previously selected tab
        const localSetting = localStorage.getItem(props.path + '-select-tab')
        if (localSetting) {
            setTab(parseInt(localSetting))
        }
    })

    const handleTabChange = (event, toTab) => {
        setTab(toTab)
        localStorage.setItem(props.path + '-select-tab', toTab)
    }

    return (
        <>
            <StyledTabs
                value={tab}
                onChange={handleTabChange}
                lang={userLanguage}
            >
                {props.tabs.map(item => (
                    <Tab label={item.label} icon={item.icon} key={item.label} />
                ))}
            </StyledTabs>
            {props.tabs.map((item, idx) => (
                <TabPanel hidden={tab !== idx} key={idx}>
                    {item.content}
                </TabPanel>
            ))}
        </>
    )
}

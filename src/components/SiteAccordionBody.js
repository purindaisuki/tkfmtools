import React from 'react';
import styled from 'styled-components';
import { NewBadge } from './Icon';
import { StyledAccordion } from './StyledAccordion';
import { AccordionDetails, AccordionSummary } from '@material-ui/core';

const BodyContainer = styled.div`
    width: 100%;
    font-size: .9rem;
    a {
        color: ${props => props.theme.colors.link};
        &:hover {
            color: ${props => props.theme.colors.linkHover};
        }
    }
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
`
const DescriptionContainer = styled.li`
    margin: 1rem 0;
    &:first-child {
        margin-top : 0;
    }
    &:last-child {
        margin-bottom : 0;
    }
`
const DescriptionHeader = styled.div`
    font-size: large;
    margin-bottom: .5rem;
`
const DescriptionBody = styled.div`
    margin: 0;
    p {
        margin: .3rem .5rem;
    }
`

export const SiteDescription = () => (
    <BodyContainer>
        <ul>
            <DescriptionContainer key={0}>
                <DescriptionHeader>介紹</DescriptionHeader>
                <DescriptionBody>
                    <p>本站為基於手遊"天下布魔"中數據所建之網站，旨在統整資料、並提供方便的工具。</p>
                    <p>網站目前包含主線地圖道具掉落整理及篩選</p>
                </DescriptionBody>
            </DescriptionContainer>
            <DescriptionContainer key={1}>
                <DescriptionHeader>注意事項</DescriptionHeader>
                <DescriptionBody>
                    <p>本站工具所用數據多為熱心玩家自主蒐集，實際情形請以官方及遊戲內為主。</p>
                </DescriptionBody>
            </DescriptionContainer>
            <DescriptionContainer  key={2}>
                <DescriptionHeader>免責聲明</DescriptionHeader>
                <DescriptionBody>
                    <p>依本站工具結果僅供參考，所致利害一概不負責。</p>
                </DescriptionBody>
            </DescriptionContainer>
            <DescriptionContainer  key={3}>
                <DescriptionHeader>意見回饋</DescriptionHeader>
                <DescriptionBody>
                    <p>
                        Bug、建議、使用心得等請至
                        <a
                            href='https://peing.net/ja/b5295760aebf4c'
                            target="_blank"
                            rel="noreferrer"
                        >
                            這裡
                        </a>
                        。
                    </p>
                </DescriptionBody>
            </DescriptionContainer>
            <DescriptionContainer  key={4}>
                <DescriptionHeader>參考</DescriptionHeader>
                <DescriptionBody>
                    {[
                        {
                            link: 'https://reurl.cc/5o5A7z/',
                            title: '資料統整 - 凱薩沒在用的腦',
                        },
                        {
                            link: 'https://reurl.cc/1gZ5nV/',
                            title: '潛力整理&猜測',
                        },
                        {
                            link: 'https://reurl.cc/8ypXzM',
                            title: 'Discord天下布魔場外群資料整理(舊)',
                        },
                        {
                            link: '',
                            title: '',
                        },
                    ].map((item, idx) => (
                        <p key={idx}>
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {item.title}
                            </a>
                        </p>
                    ))}
                    <p>其他Discord天下布魔場外討論群善心人士提供之資料</p>
                </DescriptionBody>
            </DescriptionContainer>
        </ul>
    </BodyContainer>
)

export function SiteUpdateLog() {
    return (
        <BodyContainer>
            {[
                {
                    version: 'v0.1',

                    content: [
                        {
                            badge: NewBadge,
                            title: '網站設置',
                            description: '網站設置',
                        },
                    ],
                },
            ].map((version, idx) => (
                <React.Fragment key={idx}>
                    {version.version}
                    {version.content.map((msg, idx) => (
                        <LogMsg key={idx} msg={msg} />
                    ))}
                </React.Fragment>
            ))}
        </BodyContainer>
    )
}

const AccordionWrapper = styled.div`
    > .MuiAccordion-root {
        box-shadow: none;
    }
`
const UpdateMsgAccordion = styled(StyledAccordion)`
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    > .MuiAccordionSummary-root {
        padding: 0 .5rem;
        border-bottom: lightgray;
        > .MuiAccordionSummary-content {
            display: inline;
            margin: .5rem 0;
            > span {
                padding: .25rem .4rem;
            }
        }
    }
    > .Mui-expanded {
        border-bottom: 1px solid lightgray;
    }
    .MuiAccordionDetails-root {
        font-size: small;
        padding: .4rem .5rem;
    }
}
    
`

function LogMsg(props) {
    const [isExpanded, setExpanded] = React.useState(false)
    const { badge, title, description } = props.msg
    return (
        <AccordionWrapper>
            <UpdateMsgAccordion
                expanded={isExpanded}
                onChange={() => setExpanded(!isExpanded)}
                square={true}
            >
                <AccordionSummary>
                    {badge}
                    {` ${title}`}
                </AccordionSummary>
                <AccordionDetails>
                    {description}
                </AccordionDetails>
            </UpdateMsgAccordion>
        </AccordionWrapper>
    )
}

const LicenseList = styled.ul`
    margin-bottom: -.5rem;
`
const LicenseItemTitle = styled.div`
    font-weight: bold;
`
const LicenseItemContent = styled.div`
    padding-left: .5rem;
    padding-bottom: .5rem;
`

export const SiteLicense = () => (
    <BodyContainer>
        <LicenseList>
            <li key={0}>
                <LicenseItemTitle>
                    <span>遊戲圖像</span>
                </LicenseItemTitle>
                <LicenseItemContent>
                    <span>
                        基於著作權法§65引用，著作財產權屬著作權人所有。若著作權人要求將盡速撤除。
                    </span>
                </LicenseItemContent>
            </li>
            <li key={1}>
                <LicenseItemTitle>
                    <a
                        href='https://github.com/google/material-design-icons'
                        target="_blank"
                        rel="noreferrer"
                    >
                        Material icons - Google Design
                    </a>
                </LicenseItemTitle>
                <LicenseItemContent>
                    <a
                        href='https://github.com/google/material-design-icons/blob/master/LICENSE'
                        target="_blank"
                        rel="noreferrer"
                    >
                        Apache License 2.0
                    </a>
                </LicenseItemContent>
            </li>
            <li key={2}>
                <LicenseItemTitle>
                    <a
                        href='https://github.com/facebook/react'
                        target="_blank"
                        rel="noreferrer"
                    >
                        react
                    </a>
                </LicenseItemTitle>
                <LicenseItemContent>
                    <a
                        href='https://github.com/facebook/react/blob/master/LICENSE'
                        target="_blank"
                        rel="noreferrer"
                    >
                        MIT License
                    </a>
                </LicenseItemContent>
            </li>
            <li key={3}>
                <LicenseItemTitle>
                    <a
                        href='https://github.com/react-bootstrap/react-bootstrap'
                        target="_blank"
                        rel="noreferrer"
                    >
                        react-bootstrap
                    </a>
                </LicenseItemTitle>
                <LicenseItemContent>
                    <a
                        href='https://github.com/react-bootstrap/react-bootstrap/blob/master/LICENSE'
                        target="_blank"
                        rel="noreferrer"
                    >
                        MIT License
                    </a>
                </LicenseItemContent>
            </li>
            <li key={4}>
                <LicenseItemTitle>
                    <a
                        href='https://github.com/paulcollett/react-masonry-css'
                        target="_blank"
                        rel="noreferrer"
                    >
                        react-masonry-css
                    </a>
                </LicenseItemTitle>
                <LicenseItemContent>
                    <a
                        href='https://github.com/paulcollett/react-masonry-css/blob/master/LICENSE'
                        target="_blank"
                        rel="noreferrer"
                    >
                        MIT License
                    </a>
                </LicenseItemContent>
            </li>
            <li key={5}>
                <LicenseItemTitle>
                    <a
                        href='https://github.com/mui-org/material-ui'
                        target="_blank"
                        rel="noreferrer"
                    >
                        material-ui
                    </a>
                </LicenseItemTitle>
                <LicenseItemContent>
                    <a
                        href='https://github.com/mui-org/material-ui/blob/master/LICENSE'
                        target="_blank"
                        rel="noreferrer"
                    >
                        MIT License
                    </a>
                </LicenseItemContent>
            </li>
            <li key={6}>
                <LicenseItemTitle>
                    <a
                        href='https://github.com/mui-org/material-ui'
                        target="_blank"
                        rel="noreferrer"
                    >
                        styled-components
                    </a>
                </LicenseItemTitle>
                <LicenseItemContent>
                    <a
                        href='https://github.com/styled-components/styled-components/blob/master/LICENSE'
                        target="_blank"
                        rel="noreferrer"
                    >
                        MIT License
                    </a>
                </LicenseItemContent>
            </li>
        </LicenseList>
    </BodyContainer>
)



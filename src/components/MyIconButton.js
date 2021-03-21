import React from 'react';
import styled from 'styled-components';
import { CircularProgress, IconButton, Tooltip } from '@material-ui/core';

import { useLanguage } from 'containers/LanguageProvider';

import { ExportIcon } from 'components/icon';

const TextWrapper = styled.span`
    font-size: small;
`
const StyledIconButton = styled(IconButton)`
    padding: .75rem .5rem;
    svg {
        width: 1.6rem;
        height: 1.6rem;
        fill: ${props => (
        props.$active
            ? props.theme.colors.secondary
            : props.theme.colors.onSurface
    )};
    }
    &:hover {
        box-shadow: inset 0 0 10rem 10rem ${props => props.theme.colors.shadow + '33'};
        svg {
            fill: ${props => props.theme.colors.secondary};
        }
    }
`
const MyIconButton = ({ children, className, tooltipText, onClick, dataHtml2canvasIgnore }) => (
    <Tooltip title={<TextWrapper>{tooltipText}</TextWrapper>}>
        <StyledIconButton
            aria-label={tooltipText}
            onClick={onClick}
            className={className}
            data-html2canvas-ignore={dataHtml2canvasIgnore ? 'true' : 'false'}
        >
            {children}
        </StyledIconButton>
    </Tooltip>
)

export const StyledHeaderIconButton = styled(MyIconButton)`
    && {
        padding: .4rem;
        svg {
            width: 1.4rem;
            height: 1.4rem;
        }
    }
`

export const HeaderIconButton = ({ children, className, tooltipText, onClick }) => (
    <StyledHeaderIconButton tooltipText={tooltipText} onClick={onClick} className={className}>
        {children}
    </StyledHeaderIconButton>
)

const tooltipText = {
    'zh-TW': "匯出成圖片",
    "en": "Export as an image"
}

const StyledExportIcon = styled(MyIconButton)`
    &&& {
        ${props => props.$isLoading
        ? `background-color: ${props.theme.colors.dropdownHover};` : ''}
        svg {
            ${props => props.$isLoading
        ? `fill: ${props.theme.colors.shadow};` : ''}
        }
    }
`
const StyledSpinner = styled(CircularProgress)`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    color: ${props => props.theme.colors.blue};  
`
export const ExportButton = ({ className, onClick, isLoading }) => {
    const { userLanguage } = useLanguage()

    return (
        <StyledExportIcon
            className={className}
            onClick={onClick}
            disableFocusRipple
            tooltipText={tooltipText[userLanguage]}
            $isLoading={isLoading}
            dataHtml2canvasIgnore
        >
            {ExportIcon}
            {isLoading && <StyledSpinner size={24} thickness={6} />}
        </StyledExportIcon>
    )
}

export default MyIconButton
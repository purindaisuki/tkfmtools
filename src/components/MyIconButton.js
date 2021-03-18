import React from 'react';
import styled from 'styled-components';
import { IconButton, Tooltip } from '@material-ui/core';

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
    &:hover svg {
        fill: ${props => props.theme.colors.secondary};
    }
`
const MyIconButton = ({ children, className, tooltipText, onClick }) => (
    <Tooltip title={<TextWrapper>{tooltipText}</TextWrapper>}>
        <StyledIconButton aria-label={tooltipText} onClick={onClick} className={className}>
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

export default MyIconButton
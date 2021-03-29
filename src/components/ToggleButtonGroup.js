import React from 'react';
import styled from 'styled-components';
import {
    ToggleButton as MuiToggleButton,
    ToggleButtonGroup as MuiToggleButtonGroup
} from '@material-ui/lab';

const StyledToggleButton = styled(MuiToggleButton)`
    &&& {
        padding: .3rem .15rem;
        border-radius: .25rem;
        border: 1px solid ${props => props.theme.colors.secondaryBorder};
        background-color: ${props => props.theme.colors.surface};
        color: ${props => props.theme.colors.onSurface};
        white-space: break-spaces;
        user-select: none;
        text-transform: none;
        &:hover {
            border: 1px solid ${props => props.theme.colors.secondary};
            box-shadow: inset 0 0 .5rem ${props => props.theme.colors.secondary}
                , 0 0 .1rem ${props => props.theme.colors.secondary};
        }
    }
    svg {
        width: 1.6rem;
        height: 1.4rem;
        margin-right: .6rem;
        vertical-align: middle;
        fill: ${props => props.theme.colors.secondary};
        color: ${props => props.theme.colors.secondary};
    }
`
export const ToggleButton = ({
    className,
    children,
    value,
    ...rest
}) => {
    return (
        <StyledToggleButton
            className={className}
            value={value}
            disableFocusRipple
            {...rest}
        >
            {children}
        </StyledToggleButton>
    )
}

const StyledToggleButtonGroup = styled(MuiToggleButtonGroup)`
    &&& {
        display: grid;
        gap: .5rem;
        ${props => Object.entries(props.$layoutConfig).map(entry => (
            `@media screen and (min-width: ${entry[0]}px) {
                grid-template-columns: repeat(${entry[1]}, 1fr);
            }`
        ))}
        .Mui-selected {
            background-color: ${props => props.theme.colors.secondary};
            color: ${props => props.theme.colors.onSecondary};
            svg {
                fill: ${props => props.theme.colors.onSecondary};
                color: ${props => props.theme.colors.onSecondary};
            }
        }
    }
`
export default function ToggleButtonGroup({
    children,
    className,
    value,
    onChange,
    layoutConfig
}) {
    return (
        <StyledToggleButtonGroup
            value={value}
            onChange={onChange}
            $layoutConfig={layoutConfig}
            className={className}
        >
            {children}
        </StyledToggleButtonGroup>
    )
}
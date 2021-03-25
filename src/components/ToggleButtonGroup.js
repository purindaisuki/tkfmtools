import React from 'react';
import styled from 'styled-components';
import {
    ToggleButton as BootstrapToggleButton,
    ToggleButtonGroup as BootstrapToggleButtonGroup
} from 'react-bootstrap';

const StyledToggleButton = styled(BootstrapToggleButton)`
    &&&& {
        padding: .15rem .15rem;
        border-radius: .25rem;
        border: 1px solid ${props => props.theme.colors.secondaryBorder};
        background-color: ${props => props.theme.colors.surface};
        color: ${props => props.theme.colors.onSurface};
        white-space: break-spaces;
        user-select: none;
        &:hover {
            border: 1px solid ${props => props.theme.colors.secondary};
            box-shadow: inset 0 0 .5rem ${props => props.theme.colors.secondary}
                , 0 0 .1rem ${props => props.theme.colors.secondary};
        }
        &.active {
            background-color: ${props => props.theme.colors.secondary};
            color: ${props => props.theme.colors.onSecondary};
        }
        &.focus {
            box-shadow: none;
        }
    }
`
export const ToggleButton = ({
    className,
    children,
    type,
    checked,
    onChange,
    value
}) => {
    return (
        <StyledToggleButton
            className={className}
            type={type}
            value={value}
            checked={checked}
            onChange={onChange}
        >
            {children}
        </StyledToggleButton>
    )
}

const StyledToggleButtonGroup = styled(BootstrapToggleButtonGroup)`
    display: grid;
    gap: .5rem;
    ${props => Object.entries(props.$layoutConfig).map(entry => (
    `@media screen and (min-width: ${entry[0]}px) {
            grid-template-columns: repeat(${entry[1]}, 1fr);
        }
        `
))}
`
export default function ToggleButtonGroup({
    children,
    className,
    type,
    value,
    onChange,
    layoutConfig
}) {
    return (
        <StyledToggleButtonGroup
            type={type}
            value={value}
            onChange={onChange}
            $layoutConfig={layoutConfig}
            className={className}
        >
            {children}
        </StyledToggleButtonGroup>
    )
}
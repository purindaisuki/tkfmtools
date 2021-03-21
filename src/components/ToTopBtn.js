import React from 'react';
import styled from 'styled-components';
import ScrollUpButton from 'react-scroll-up-button';

import { ToTopIcon } from 'components/icon';

const StyledBtn = styled.div`
    .Container {
        position: fixed;
        right: -100px;
        bottom: 1.5rem;
        transition: right 0.5s;
        cursor: pointer;
        background-color: ${props => props.theme.colors.secondary};
        padding: .2rem;
        border-radius: 2rem;
        z-index: 2;
    }
    .Transition{
        right: 1.1rem;
    }
    svg {
        width: 2rem;
        height: 2rem;
        fill: ${props => props.theme.colors.onSecondary};
    }
`
export default function ToTopBtn() {
    return (
        <StyledBtn>
            <ScrollUpButton
                ContainerClassName="Container"
                TransitionClassName="Transition"
                EasingType='easeOutCirc'
            >
                {ToTopIcon}
            </ScrollUpButton>
        </StyledBtn>
    )
}

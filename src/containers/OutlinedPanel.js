import React from 'react';
import styled from 'styled-components';

const StyledPanel = styled.div`
    padding: 1rem;
    border-radius: .25rem;
    border: 1px solid ${props => props.theme.colors.border};
    background-color: ${props => props.theme.colors.surface};
    box-shadow: 0 0 .15em ${props => props.theme.colors.shadow};
`

const OutlinedPanel = ({ children, className }) => (
    <StyledPanel className={className}>
        {children}
    </StyledPanel>
)

export default OutlinedPanel
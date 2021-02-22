import React from 'react';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';

const StyledTable = styled(Table)`
    font-size: .9rem;
    color: ${props => props.theme.colors.onSurface};
    margin: 0;
    > tbody > tr > {
        td:first-child {
            padding-left: .75rem;
        }
    }
`
export default function CardTable({
    className,
    children,
    striped
}) {
    return (
        <StyledTable
            className={className}
            striped={striped}
            borderless
            size="sm"
        >
            {children}
        </StyledTable>
    )
}

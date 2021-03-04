import React from 'react';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';

export const MyIconButton = styled(IconButton)`
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

export const HeaderIconButton = styled(MyIconButton)`
    && {
        padding: .4rem;
        svg {
            width: 1.4rem;
            height: 1.4rem;
        }
    }
`

export default MyIconButton
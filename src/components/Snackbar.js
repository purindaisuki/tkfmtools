import React from 'react';
import styled from 'styled-components';
import { Snackbar as MuiSnackbar } from '@material-ui/core';

import { AlertIcon, ErrorIcon, SuccessIcon } from 'components/icon';

const StyledSnackbar = styled(MuiSnackbar)`
    > div {
        display: flex;
        flex-direction: row-reverse;
        justify-content: center;
        background-color: ${props => props.$type === 'warn'
        ? props.theme.colors.warn
        : props.$type === 'success'
            ? props.theme.colors.success
            : props.theme.colors.error
    };
        font-size: medium;
    }
    .MuiSnackbarContent-action {
        margin: 0;
        padding: 0;
    }
    svg {
        width: 1.4rem;
        height: 1.4rem;
        margin-right: .4rem;
        fill: ${props => props.$type === 'warn'
        ? props.theme.colors.onWarn
        : props.$type === 'success'
            ? props.theme.colors.onSuccess
            : props.theme.colors.onError
    };
    }
`
const Snackbar = ({
    open,
    onClose,
    message,
    type
}) => {
    const icons = {
        success: SuccessIcon,
        warn: AlertIcon,
        error: ErrorIcon
    }

    return (
        <StyledSnackbar
            open={open}
            autoHideDuration={3000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            message={message}
            action={icons[type]}
            $type={type}
        />
    )
}

export default Snackbar
import React from 'react';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';
import ImageSupplier from './ImageSupplier';

const StyledImg = styled(ImageSupplier)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-repeat: no-repeat;
`
const ImgWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
export const ImgCard = ({
    children,
    className,
    imgType,
    imgId,
    alt,
    isBackground
}) => (
    isBackground
        ? <StyledImg
            className={className}
            name={`${imgType}_${imgId}`}
            isBackground
            alt={alt}
        >
            {children}
        </StyledImg>
        : <ImgWrapper className={className}>
            <StyledImg
                name={`${imgType}_${imgId}`}
                alt={alt}
            />
            {children}
        </ImgWrapper>
)

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
export const CardTable = ({
    className,
    children,
    striped
}) => (
    <StyledTable
        className={className}
        striped={striped}
        borderless
        size="sm"
    >
        {children}
    </StyledTable>
)

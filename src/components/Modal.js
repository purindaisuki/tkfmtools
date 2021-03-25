import React from 'react';
import styled from 'styled-components';
import { Backdrop, Fade, Modal as MuiModal } from '@material-ui/core';

import Scrollable from 'containers/Scrollable';

import Header from 'components/Header';

const ModalContentWrapper = styled.div`
    background-color: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.onSurface};
    position: absolute;
    width: 70%;
    height: auto;
    left: 0;
    right: 0;
    top: 10%;
    bottom: auto;
    margin: auto;
    @media screen and (max-width: 1000px) {
        width: 80%;
    }
    @media screen and (max-width: 768px) {
        width: 90%;
    }
    padding: 1rem;
    border-radius: .25rem;
    border: 1px solid ${props => props.theme.colors.border};
`
const ModalHeader = styled(Header)`
    margin: -1rem;
    margin-bottom: 1rem;
    padding: .2rem .5rem;
    background-color: ${props => props.theme.colors.secondary};
    span {
        color: ${props => props.theme.colors.onSecondary};
    }
`
const CloseWrapper = styled.span`
    cursor: pointer;
    font-size: x-large;
`
export const Modal = ({
    children,
    className,
    title,
    open,
    onClose,
    keepMounted,
    ariaLabelledby,
    ariaDescribedby
}) => (
    <MuiModal
        className={className}
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
        disableEnforceFocus
        keepMounted={keepMounted}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
    >
        <Fade in={open}>
            <ModalContentWrapper>
                <ModalHeader
                    title={title}
                    id={ariaLabelledby}
                    end={<CloseWrapper onClick={onClose}>&times;</CloseWrapper>}
                />
                {children}
            </ModalContentWrapper>
        </Fade>
    </MuiModal>
)

const StyledScrollableModal = styled(Modal)`
    > div:nth-child(3) > div {
        max-height: calc(80vh - 2rem);
    }
`
export const ScrollableModal = ({
    children,
    className,
    title,
    open,
    onClose,
    keepMounted,
    ariaLabelledby,
    ariaDescribedby,
}) => (
    <StyledScrollableModal
        className={className}
        title={title}
        open={open}
        onClose={onClose}
        keepMounted={keepMounted}
        ariaLabelledby={ariaLabelledby}
        ariaDescribedby={ariaDescribedby}
    >
        <Scrollable>
            {children}
        </Scrollable>
    </StyledScrollableModal>
)

const ModalBody = styled.div`
    margin: 1rem 0;
`
const TextModalContent = ({
    content,
    ariaDescribedby
}) => (
    content.map((item, idx) => (
        <React.Fragment key={idx}>
            <Header
                title={item.title}
                border
            />
            <ModalBody>
                {item.content.map((text, idx) => (
                    <p key={idx} id={ariaDescribedby + '_' + idx}>{text}</p>
                ))}
            </ModalBody>
        </React.Fragment>
    ))
)

export const TextModal = ({
    title,
    content,
    open,
    onClose,
    ariaLabelledby,
    ariaDescribedby
}) => (
    <ScrollableModal
        title={title}
        open={open}
        onClose={onClose}
        ariaLabelledby={ariaLabelledby}
        ariaDescribedby={[...Array(content.length).keys()].map(i => ariaDescribedby + '_' + i).join(' ')}
    >
        <TextModalContent
            content={content}
            ariaDescribedby={ariaDescribedby}
        />
    </ScrollableModal>
)

export default Modal
import React from 'react';
import styled from 'styled-components';
import { Backdrop, Fade, Modal } from '@material-ui/core';
import { ContainerHeader } from './FilterComponents';
import ScrollableContainer from './ScrollableContainer';

const StyledModal = styled.div`
    background-color: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.onSurface};
    position: absolute;
    width: 70%;
    height: 80%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    @media screen and (max-width: 992px) {
        width: 80%;
    }
    @media screen and (max-width: 768px) {
        width: 90%;
    }
    padding: 1rem;
    border-radius: .25rem;
    border: 1px solid ${props => props.theme.colors.border};
`
const ModalTitle = styled(ContainerHeader)`
    margin: -1rem;
    margin-bottom: 1rem;
    padding: .2rem .5rem;
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.onSecondary};
`
const CloseWrapper = styled.span`
    cursor: pointer;
    font-size: x-large;
`
export const MyModal = ({
    children,
    className,
    title,
    open,
    onClose,
    ariaLabelledby,
    ariaDescribedby
}) => (
    <Modal
        className={className}
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
        disableEnforceFocus
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
    >
        <Fade in={open}>
            <StyledModal>
                <ModalTitle
                    title={title}
                    end={<CloseWrapper onClick={onClose}>&times;</CloseWrapper>}
                />
                {children}
            </StyledModal>
        </Fade>
    </Modal>
)

export const FitHeightModal = styled(MyModal)`
    > div:nth-child(3) {
        top: 10%;
        bottom: auto;
        height: min-content;
        > div {
            max-height: calc(80vh - 2rem);
        }
    }
`
const ScrollableModal = ({
    children,
    className,
    title,
    open,
    onClose,
    ariaLabelledby,
    ariaDescribedby,
}) => (
    <FitHeightModal
        className={className}
        title={title}
        open={open}
        onClose={onClose}
        ariaLabelledby={ariaLabelledby}
        ariaDescribedby={ariaDescribedby}
    >
        <ScrollableContainer>
            {children}
        </ScrollableContainer>
    </FitHeightModal>
)

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: large;
    border-bottom: 1px solid ${props => props.theme.colors.border};
`
const ModalBody = styled.div`
    margin: 1rem 0;
`
const TextModalContent = ({
    content
}) => (
    content.map((item, idx) => (
        <React.Fragment key={idx}>
            <ModalHeader>
                <span>{item.title}</span>
            </ModalHeader>
            <ModalBody>
                {item.content.map((text, idx) => <p key={idx}>{text}</p>)}
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
        ariaDescribedby={ariaDescribedby}
    >
        <TextModalContent
            content={content}
        />
    </ScrollableModal>
)

export default MyModal
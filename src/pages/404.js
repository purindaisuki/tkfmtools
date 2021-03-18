import React from 'react';
import styled from 'styled-components';
import ImageSupplier from 'components/ImageSupplier';
import LocalizedLink from 'components/LocalizedLink'
import { useLanguage } from 'components/LanguageProvider';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    min-height: calc(100vh - 6rem);
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.onSurface};
`
const NotFoundImg = styled(ImageSupplier)`
    background-position: center;
    background-repeat: no-repeat;
    background-size: 20rem 40rem;
    width: 100%;
    height: 100%;
    min-height: calc(100vh - 6rem);
`
const Message = styled.div`
    position: absolute;
    top: 25%;
    left: max(calc(35% - 20rem), 1rem);
    width: max-content;
    background: ${props => props.theme.colors.background + 'BF'};
    box-shadow: 0 0 1rem ${props => props.theme.colors.background};
    @media screen and (max-width: 992px) {
        top: 30%;
        left: calc(50% - 9.5rem);
        text-shadow: 0 0 2px ${props => props.theme.colors.background},
        -2px 0 2px  ${props => props.theme.colors.background},
        2px 0 2px  ${props => props.theme.colors.background},
        0 -2px 2px ${props => props.theme.colors.background},
        0 2px 2px  ${props => props.theme.colors.background},
        2px 2px 2px ${props => props.theme.colors.background},
        2px -2px 2px ${props => props.theme.colors.background},
        -2px 2px 2px ${props => props.theme.colors.background},
        -2px -2px 2px ${props => props.theme.colors.background};
    }
`
const StyledH1 = styled.h1`
    margin-top: 0;
    margin-bottom: 2rem;
    max-width: 20rem;
    font-weight: bold;
`
const StyledP = styled.p`
    font-size: x-large;
    max-width: 20rem;
    margin-bottom: 2rem;
`
const StyledLink = styled(LocalizedLink)`
    font-size: x-large;
    color: ${props => props.theme.colors.link};
    &:hover {
        color: ${props => props.theme.colors.linkHover};
    }
`
const NotFound = () => {
    const { pageString } = useLanguage()

    return (
        <Wrapper>
            <title>{pageString[404].title}</title>
            <NotFoundImg
                name='pageNotFound'
                isBackground={true}
                alt=''
            >
                <Message>
                    <StyledH1>{pageString[404].h1}</StyledH1>
                    <StyledP>{pageString[404].p}</StyledP>
                    <StyledLink to='/'>{pageString[404].link}</StyledLink>
                </Message>
            </NotFoundImg>
        </Wrapper>
    )
}

export default NotFound
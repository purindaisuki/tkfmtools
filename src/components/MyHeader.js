import React from 'react';
import styled from 'styled-components';
import { HeaderIconButton } from './MyIconButton';
import { HelpIcon } from './icon';

const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    height: 2.2rem;
    border-bottom: solid 1px ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.onSurface};
    font-size: large;
    font-weight: normal;
`
const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    > span {
        display: inline-block;
        vertical-align: middle;
        line-height: normal;
        svg {
            width: 1.2rem;
            height: 1.2rem;
            margin-right: .4rem;
            margin-bottom: .2rem;
            fill: ${props => props.theme.colors.onSurface};
        }
    }
`
const MyHeader = ({
    className,
    title,
    titleIcon,
    withHelp,
    onClickHelp,
    end
}) => (
    <StyledHeader className={className}>
        <TitleWrapper>
            <span>{titleIcon}{title}</span>
            {withHelp && onClickHelp ?
                <HeaderIconButton
                    onClick={onClickHelp}
                >
                    {HelpIcon}
                </HeaderIconButton> : null}
        </TitleWrapper>
        <div>
            {end}
        </div>
    </StyledHeader>
)

export default MyHeader
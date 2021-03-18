import React from 'react';
import styled from 'styled-components';
import { HeaderIconButton } from 'components/MyIconButton';
import { HelpIcon } from 'components/icon';

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
    flex-direction: row;
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
    end,
    id
}) => (
    <StyledHeader className={className}>
        <TitleWrapper>
            <span id={id}>{titleIcon}{title}</span>
            {withHelp && onClickHelp &&
                <HeaderIconButton
                    onClick={onClickHelp}
                    tooltipText='Help'
                >
                    {HelpIcon}
                </HeaderIconButton>}
        </TitleWrapper>
        {end && <div>{end}</div>}
    </StyledHeader>
)

export default MyHeader
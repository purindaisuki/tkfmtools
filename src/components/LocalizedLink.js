import React, { useContext } from "react";
import styled from 'styled-components';
import { Link } from "gatsby";
import { LanguageContext } from './LanguageProvider';

const StyledLink = styled(Link)`
    &:hover {
        ${props => props.$decoration ? null : 'text-decoration: none;'}
    }
`
const WrappedLink = ({ to, disableLocale, decoration, ...rest }) => {
    const { userLanguage, isDefault } = useContext(LanguageContext)

    const isIndex = to === '/'

    const path = disableLocale || isDefault
        ? to
        : isIndex
            ? `/${userLanguage}`
            : `/${userLanguage}${to}`

    return <StyledLink $decoration={decoration} {...rest} to={path} />
}

// pass ref down
const LocalizedLink = React.forwardRef((props, ref) => (
    // material-ui use innerRef as prop name
    <WrappedLink {...props} innerRef={ref} />
))

export default LocalizedLink
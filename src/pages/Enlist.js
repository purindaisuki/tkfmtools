import styled from 'styled-components';

const H3 = styled.h3`
margin-right: auto;
margin-top: 16rem;
margin-left: auto;
width: max-content;
color: ${props => props.theme.colors.onSurface};
a {
    color: ${props => props.theme.colors.link};
}
a:hover {
    color: ${props => props.theme.colors.linkHover};
}
}
`
export default function Enlist() {
    return (
        <H3>
            🚧施工中，請先移至
            <a href='https://purindaisuki.github.io/TenkafuMaRecruitFilter/'
                target="_blank" rel="noreferrer">現有版本</a>
        </H3>
    )
}
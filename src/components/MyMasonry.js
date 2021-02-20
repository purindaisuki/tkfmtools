import styled from 'styled-components';
import Masonry from 'react-masonry-css';

const StyledMasonry = styled(Masonry)`
    display: flex;
    width: auto;
    margin-left: -1rem;
    > div {
        padding-left: 1rem;
    }
`
export default function MyMasonry(props) {
    return (
        <StyledMasonry
            breakpointCols={props.breakpointCols}
            columnClassName=''
        >
            {props.children}
        </StyledMasonry>
    )
}

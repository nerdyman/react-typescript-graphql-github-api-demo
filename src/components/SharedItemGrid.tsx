import styled from '../utilities/styled';

export const SharedItemGrid = styled.div`
    display: grid;
    grid-gap: ${props => props.theme.space.whole};

    ${props => props.theme.mediaQuery.lower`
        grid-template-columns: repeat(2, 1fr);
    `}

    ${props => props.theme.mediaQuery.high`
        grid-template-columns: repeat(3, 1fr);
        grid-gap: ${props.theme.space.wholeQuarter};
    `}

    ${props => props.theme.mediaQuery.higher`
        grid-gap: ${props.theme.space.wholeHalf};
    `}
`;

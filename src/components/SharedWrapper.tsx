import styled from '../utilities/styled';

/**
 * Generic wrapper for all content
 */
export const SharedWrapper = styled.div`
    width: 100%;
    max-width: ${props => props.theme.breakpoints.higher};
    margin-left: auto;
    margin-right: auto;
    padding-left: ${props => props.theme.space.whole};
    padding-right: ${props => props.theme.space.whole};
`;

import styled from '../utilities/styled';

/**
 * Generic wrapper for all content
 */
export const SharedWrapper = styled.div`
    max-width: ${props => props.theme.breakpoints.high};
    margin-left: auto;
    margin-right: auto;
    padding-left: ${props => props.theme.space.whole};
    padding-right: ${props => props.theme.space.whole};
`;

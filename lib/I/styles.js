import { css } from 'styled-components';

export default css`
display: ${props => props.hidden ? 'none' : 'inline'};
`;

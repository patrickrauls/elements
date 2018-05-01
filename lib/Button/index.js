import styled from 'styled-components';
import Button from './Button';
import buttonStyles from './styles';

const StyledButton = styled(Button)`
  ${buttonStyles};
`;

StyledButton.displayName = 'Button';

export default StyledButton;

import { keyframes } from 'styled-components';

export const icons = {
  submit: 'fa fa-chevron-right',
  link: 'fa fa-chevron-right',
  loading: 'fas fa-circle-notch fast-spin',
  big: 'fa-2x',
  valid: 'check'
};

export const fastSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(720deg);
  }
`;
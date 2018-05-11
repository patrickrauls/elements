import { css } from 'styled-components';

const styles = css`
  &.invalid-flag,
  &.required-flag {
    position: absolute;
    right: -0.75rem;
    bottom: 0.25rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: white;
    z-index: 1;
    background: linear-gradient(109deg, #af1a12 0px, #af1a12 30%, #eb483e 100%);
    text-align: center;
    line-height: 1.5rem;
    height: 1.5625rem;
    border-radius: 3px;
    width: 5.75rem;
    &:before {
      position: absolute;
      left: -0.3rem;
      top: 0.3rem;
      content: '';
      width: 0;
      height: 0;
      border-top: 7px solid transparent;
      border-right: 7px solid #af1a12;
      border-bottom: 7px solid transparent;
    }
  }
  &.ellies-input-valid-indicator {
    position: absolute;
    right: 0;
    bottom: 0.125rem;
    animation: fadein 0.3s;
  }
`;

export default styles;

import { css } from 'styled-components';

const selectStyles = css`
  position: relative;
  margin-top: 2.1875rem;
  border-bottom: 0.125rem solid #474f4f;
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
  padding: 0;
  opacity: ${props => props.disabled ? '0.4' : '1'};
  cursor: pointer;
  &.ellies-disabled-select {
    opacity: 0.4;
  }
  &.ellies-select-focused {
    border-bottom: 0.125rem solid #021828;
    color: #021828;
  }
  &.ellies-invalid,
  &.ellies-required {
    color: #af1a12;
    border-bottom: 0.125rem solid #af1a12;
  }
  select {
    cursor: pointer;
    -moz-appearance: none;
    -webkit-appearance: none;
    border: none;
    width: 100%;
    padding: 0 1.125rem 0.25rem;
    font-size: 1rem;
    background-color: rgba(0, 0, 0, 0);
  }
  select.placeholder {
    color: #474f4f;
    opacity: 0.9;
  }
  select:focus {
    outline: none;
    color: #021828;
  }
  .ellies-select-icon {
    position: absolute;
    height: 1rem;
    width: 0.875rem;
    left: 0;
    bottom: 0.25rem;
  }
  select.invalid:not(:focus) ~ .flag {
    display: block;
    animation: fadein 0.3s;
  }
  .select:focus {
    display: none;
  }
`;

export default selectStyles;

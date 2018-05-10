import { css } from 'styled-components';

const styles = css`
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  position: relative;
  border-bottom: 0.125rem solid #474f4f;
  width: 100%;
  z-index: 1;
  margin-top: 2.1875rem;
  &.invalid,
  &.required {
    color: #af1a12;
    border-bottom: 0.125rem solid #af1a12;
  }
  &.disabled {
    opacity: 0.4;
  }
  .input-requirements {
    color: #021828;
    width: 90%;
    text-align: left;
    animation: fadein 0.3s;
    font-size: 0.875rem;
    font-weight: 200;
    margin: 1rem auto;
    .input-requirement {
      margin: 0.25rem 0;
    }
    .valid-requirement {
      animation: fadein 0.3s;
      margin-left: 0.5rem;
    }
  }
  .input-icon {
    position: absolute;
    height: 1rem;
    width: 0.875rem;
    left: 0;
    bottom: 0.25rem;
  }
  input {
    width: 100%;
    padding: 0 1.125rem 0.25rem;
    border: none;
    border-radius: 0;
    color: #474f4f;
    font-size: 1rem;
  }
  input:focus {
    outline: none;
    color: #021828;
  }
  input:invalid {
    box-shadow: none;
  }
  input:invalid:not(:focus) ~ .flag {
    display: block;
    animation: fadein 0.3s;
  }
  input:focus ~ .flag {
    display: none;
  }
  input::placeholder {
    color: #474f4f;
    opacity: 0.8;
  }
`;

export default styles;

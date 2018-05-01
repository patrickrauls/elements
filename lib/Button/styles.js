import { css } from 'styled-components';
import { fastSpin } from '../utils/styling';

const buttonStyles = css`
  border: none;
  color: white;
  font-size: 0.875rem;
  font-weight: 700;
  width: 46%;
  height: 2.1875rem;
  border-radius: 0.125rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  &:focus {
    outline: none;
  }
  &:active {
    box-shadow: none;
  }
  &.full-width {
    width: 100%;
    height: 3.1875rem;
  }
  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
  &:active {
    box-shadow: none;
    outline: none;
  }
  &.submit {
    background-color: #008a25;
    background: linear-gradient(135deg, #008a25, #008a25 70%, #0cb162);
    &:hover:enabled {
      background: linear-gradient(45deg, #0cb162, #008a25 30%, #008a25);
    }
    &:active:enabled {
      background-color: #008a25;
    }
  }
  &.edit {
    background-color: #f8f8f8;
    color: #46b9af;
    &:hover:enabled {
      background-color: #ffffff;
    }
    &:active:enabled {
      background-color: #eeeeee;
    }
  }
  &.delete {
    background-color: #008a25;
    background: linear-gradient(135deg, #af1a12, #af1a12 70%, #e3382d);
    &:hover:enabled {
      background: linear-gradient(45deg, #e3382d, #af1a12 30%, #af1a12);
    }
    &:active:enabled {
      background-color: #008a25;
    }
  }
  &.cancel {
    background-color: #474e4f;
    background: linear-gradient(135deg, #474e4f, #474e4f 70%, #6a7a84);
    &:hover:enabled {
      background: linear-gradient(45deg, #6a7a84, #474e4f 30%, #474e4f);
    }
    &:active:enabled {
      background-color: #474e4f;
    }
  }
  .button-text {
    margin: 0.5em 15%;
    letter-spacing: 0.0625;
  }
  .hidden {
    display: none;
  }
  i.fast-spin {
    svg {
      animation: ${fastSpin} 2s infinite linear;
    }
  }
`;

export default buttonStyles;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Flag from '../Flag';
import I from '../I';

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue || '',
      valid: false,
      dirty: false,
      status: '',
      focus: false
    };
  }
  checkStatus() {
    if (this.state.valid && this.state.dirty) {
      this.setState({ status: 'valid' });
    }
    if (this.props.required && this.state.dirty && !this.state.value) {
      this.setState({ status: 'required' });
    } else if (this.state.dirty && !this.state.valid) {
      this.setState({ status: 'invalid' });
    }
  }
  handleChange = e => {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
    const { value } = e.target;
    this.setState(
      {
        valid: e.target.checkValidity(),
        dirty: true,
        value
      },
      () => {
        this.checkStatus();
      }
    );
  };
  handleClick = ({ currentTarget }) => {
    const select = [...currentTarget.children].find(element => {
      return element.tagName === 'SELECT';
    });
    select.focus();
  };
  handleFocus = e => {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
    this.setState({
      focus: true,
      dirty: true
    });
  };
  handleBlur = e => {
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
    this.setState(
      {
        focus: false
      },
      () => {
        this.checkStatus();
      }
    );
  };
  render() {
    const {
      className,
      icon,
      name,
      onChange,
      required,
      defaultValue,
      onBlur,
      onFocus,
      placeholder,
      disabled,
      children,
      ...rest
    } = this.props;
    return (
      <div
        className={`
          ${className}
          ellies-select-container
          ${this.state.focus ? 'ellies-select-focused' : ''}
          ellies-${this.state.status}
        `}
        onClick={this.handleClick}
        onKeyDown={this.handleClick}
        role="presentation"
      >
        {icon && (
          <I
            className="ellies-select-icon"
            icon={icon}
          />
        )}
        <select
          {...rest}
          className={`
          ${name}
          ${name}-select-element
          ${this.state.dirty ? '' : 'placeholder'}
          `}
          disabled={disabled}
          name={name}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          required={required}
          value={this.state.value}
        >
          {placeholder && (
            <option disabled value="">
              {placeholder}
            </option>
          )}
          {children}
        </select>
        <Flag type={this.state.status || 'hidden'} />
      </div>
    );
  }
}

Select.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool
};

Select.defaultProps = {
  children: undefined,
  className: '',
  defaultValue: undefined,
  disabled: false,
  icon: '',
  name: '',
  onBlur: undefined,
  onChange: undefined,
  onFocus: undefined,
  placeholder: undefined,
  required: false
};

export default Select;

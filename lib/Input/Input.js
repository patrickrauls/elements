import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { icons } from '../utils/styling';
import { regEx } from '../utils/constants';
import { FAILED_VALIDATION } from '../utils/constants';
import Flag from '../Flag';
import I from '../I';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue,
      valid: false,
      dirty: false,
      status: '',
      focus: false
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.validateOn !== this.props.validateOn) {
      this.validate(this.input, nextProps.requirements);
    }
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
  emailValidation(value) {
    return this.props.type === 'email' ? regEx.email.test(value) : true;
  }
  satisfiesRequirements(value, requirements = this.props.requirements) {
    return requirements
      ? requirements.filter(
        requirement => requirement.validate(value) === false
      ).length === 0
      : true;
  }
  validate(input, requirements) {
    if (
      this.satisfiesRequirements(input.value, requirements) &&
      this.emailValidation(input.value)
    ) {
      input.setCustomValidity('');
    } else {
      input.setCustomValidity(FAILED_VALIDATION);
    }
    this.setState(
      {
        valid: input.checkValidity(),
        value: input.value
      },
      () => {
        this.checkStatus();
      }
    );
  }
  handleChange = e => {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
    this.validate(e.target, this.props.requirements);
    this.setState({ dirty: true });
  };
  handleClick = ({ currentTarget }) => {
    const input = [...currentTarget.children].find(element => {
      return element.tagName === 'INPUT';
    })
    input.focus();
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
      disabled,
      icon,
      inputMode,
      name,
      required,
      requirements,
      spellCheck,
      type,
      // destructure the following out of the ...rest object.
      defaultValue, validateOn, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;

    return (
      <div
        className={`
          ${className}
          ellies-input-container
          ${this.state.focus ? 'ellies-input-focused' : ''}
          ${type}-input-component
          ${this.state.status}
          ${disabled ? 'disabled' : ''}
        `}
        onClick={this.handleClick}
        onKeyDown={this.handleClick}
        role="presentation"
      >
        {requirements &&
          this.state.focus && (
          <ul className="ellies-input-requirements">
            {requirements.map(requirement => (
              <li className="ellies-input-requirement" key={requirement.description}>
                <span className="ellies-input-requirement-description">{requirement.description}</span>
                <I
                  className="ellies-input-requirement-status-icon"
                  hidden={!requirement.validate(this.state.value)}
                  icon={icons.valid}
                />
              </li>
            ))}
          </ul>
        )}
        {icon && (
          <I
            className="ellies-input-icon"
            icon={icon}
          />
        )}
        <input
          {...rest}
          className={`${name}-${type}-input input-element`}
          disabled={disabled}
          inputMode={type === 'email' ? 'email' : inputMode}
          name={name}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          ref={input => {
            this.input = input;
          }}
          required={required}
          spellCheck={type === 'email' ? false : spellCheck}
          type={type === 'email' ? 'text' : type}
          value={this.state.value}
        />
        <Flag type={this.state.status || 'hidden'} />
      </div>
    );
  }
}

Input.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  inputMode: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  required: PropTypes.bool,
  requirements: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      validate: PropTypes.func.isRequired
    })
  ),
  spellCheck: PropTypes.bool,
  type: PropTypes.oneOf([
    'email',
    'number',
    'password',
    'search',
    'tel',
    'text',
    'url'
  ]),
  validateOn: PropTypes.any
};

Input.defaultProps = {
  className: '',
  onFocus: undefined,
  name: undefined,
  type: 'text',
  defaultValue: '',
  disabled: false,
  icon: '',
  inputMode: undefined,
  spellCheck: undefined,
  requirements: undefined,
  validateOn: undefined,
  required: false,
  onBlur: undefined,
  onChange: undefined
};

export default Input;

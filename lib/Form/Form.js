import React from 'react';
import PropTypes from 'prop-types';

const Form = ({ children, className, onSubmit, ...rest }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const inputs = [...e.target.elements].filter(element => element.name);
    /**
     * Required inputs aren't set as required until they are dirty, preventing
     * them from rendering as already invalid. On submit, make everything dirty
     * to invalidate any required, pristine inputs.
     */
    inputs.forEach(input => {
      input.focus();
      input.blur();
    });
    const invalid =
      inputs.filter(input => input.checkValidity()).length < inputs.length;
    if (invalid) {
      return;
    }
    let payload;
    inputs.forEach(input => {
      const { name, value } = input;
      payload = {
        ...payload,
        [name]: value
      };
    });
    onSubmit(payload);
  };
  return (
    <form
      noValidate
      {...rest}
      className={`form-component ${className}`}
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  );
};

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired,
  className: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
};

Form.defaultProps = {
  className: ''
};

export default Form;

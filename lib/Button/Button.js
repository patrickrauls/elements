import React from 'react';
import PropTypes from 'prop-types';
import { icons } from '../utils/styling';

const Button = ({ text, ui, icon, wide, className, loading, ...rest }) => {
  const innerText = text || ui;
  const hideIcon = !icon;
  const iconClass = typeof icon === 'string' ? icon : icons[ui];
  const fullWidth = wide ? 'full-width' : '';

  return (
    <button className={`ellie-button ${className} ${ui} ${fullWidth}`} {...rest}>
      {loading ? (
        <span>
          <i
            className={wide ? `${icons.loading} ${icons.big}` : icons.loading}
          />
        </span>
      ) : (
        <div>
          <span className="button-text">{innerText}</span>
          <span className={`icon-container ${hideIcon && 'hidden'}`}>
            <i className={iconClass} />
          </span>
        </div>
      )}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  loading: PropTypes.bool,
  text: PropTypes.string,
  ui: PropTypes.oneOf(['delete', 'edit', 'submit', 'cancel']),
  wide: PropTypes.bool
};

Button.defaultProps = {
  className: '',
  icon: false,
  loading: false,
  text: undefined,
  ui: 'submit',
  wide: false
};

export default Button;

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const CustomFlagButton = ({
  buttonIcon,
  title,
  text,
  handleSelect,
  isSelected,
}) => (
  <button
    type="button"
    className={classnames(
      'flag-button flag-button-horizontal align-items-center px-3 py-2',
      isSelected ? 'flag-button-selected' : '',
    )}
    aria-checked={isSelected}
    role="radio"
    onClick={() => handleSelect()}
    data-testid={`weekly-learning-goal-input-${title}`}
  >
    <span className="flag-button-icon mr-3 d-flex align-items-center">{buttonIcon}</span>
    <span className="flag-button-texts d-flex flex-column align-items-start">
      <span className="flag-button-title font-weight-bold">{title}</span>
      <span className="flag-button-subtitle text-muted">{text}</span>
    </span>
  </button>
);

CustomFlagButton.propTypes = {
  buttonIcon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  handleSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default CustomFlagButton;

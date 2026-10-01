import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import {
  BookOpen, OutlinedFlag, Flag, LocalFireDepartment,
} from '@openedx/paragon/icons';
import FlagButton from './FlagButton';
import messages from '../messages';

const LearningGoalButton = ({
  level,
  isSelected,
  handleSelect,
}) => {
  const intl = useIntl();
  const buttonDetails = {
    casual: {
      daysPerWeek: 1,
      title: messages.casualGoalButtonTitle,
      text: messages.casualGoalButtonText,
      icon: <BookOpen />,
    },
    regular: {
      daysPerWeek: 3,
      title: messages.regularGoalButtonTitle,
      text: messages.regularGoalButtonText,
      icon: <OutlinedFlag />,
    },
    intense: {
      daysPerWeek: 5,
      title: messages.intenseGoalButtonTitle,
      text: messages.intenseGoalButtonText,
      icon: <LocalFireDepartment />,
    },
  };

  const values = buttonDetails[level];

  return (
    <FlagButton
      buttonIcon={values.icon}
      title={intl.formatMessage(values.title)}
      text={intl.formatMessage(values.text)}
      handleSelect={() => handleSelect(values.daysPerWeek)}
      isSelected={isSelected}
    />
  );
};

LearningGoalButton.propTypes = {
  level: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  handleSelect: PropTypes.func.isRequired,
};

export default LearningGoalButton;

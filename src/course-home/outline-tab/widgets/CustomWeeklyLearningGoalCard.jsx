import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Form, Icon } from '@openedx/paragon';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { MailOutline } from '@openedx/paragon/icons';
import messages from '../messages';
import LearningGoalButton from './LearningGoalButton';
import './FlagButton.scss';

const CustomWeeklyLearningGoalCard = ({
  daysPerWeekGoal,
  intl,
  handleSelect,
}) => {
  const [switchStates, setSwitchStates] = useState({
    1: daysPerWeekGoal === 1,
    3: daysPerWeekGoal === 3,
    5: daysPerWeekGoal === 5,
  });

  // Create reminderMap based on switchStates for the reminder box
  const reminderMap = {
    1: switchStates[1],
    3: switchStates[3],
    5: switchStates[5],
  };

  const handleCardClick = (days) => {
    // Toggle the switch state
    const newSwitchStates = {
      1: false,
      3: false,
      5: false,
      [days]: !switchStates[days],
    };
    setSwitchStates(newSwitchStates);

    // Call the original handleSelect
    handleSelect(days);
  };

  return (
    <section
      id="courseHome-weeklyLearningGoal"
      className="w-100 mb-3"
      data-testid="weekly-learning-goal-card"
    >
      <div className="mb-2">
        <div id="set-weekly-goal-header" className="h5 mb-1">{intl.formatMessage(messages.setWeeklyGoal)}</div>
        <div className="text-muted small">{intl.formatMessage(messages.setWeeklyGoalDetail)}</div>
      </div>
      <div className="text-gray-700 small">
        <div className="weekly-goal-options">
          <div
            className={classnames('weekly-goal-card', 'goal-casual', { selected: daysPerWeekGoal === 1 })}
            role="button"
            tabIndex={0}
            onClick={() => handleCardClick(1)}
            onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') { handleCardClick(1); } }}
          >
            <LearningGoalButton
              level="casual"
              isSelected={daysPerWeekGoal === 1}
              handleSelect={() => handleCardClick(1)}
            />
            <div className="weekly-goal-switch">
              <Form.Switch
                checked={switchStates[1]}
                onChange={() => {}} // No-op since we handle it in card click
                aria-label={intl.formatMessage(messages.setGoalReminder)}
                tabIndex={-1}
              />
            </div>
          </div>
          <div
            className={classnames('weekly-goal-card', 'goal-regular', { selected: daysPerWeekGoal === 3 })}
            role="button"
            tabIndex={0}
            onClick={() => handleCardClick(3)}
            onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') { handleCardClick(3); } }}
          >
            <LearningGoalButton
              level="regular"
              isSelected={daysPerWeekGoal === 3}
              handleSelect={() => handleCardClick(3)}
            />
            <div className="weekly-goal-switch">
              <Form.Switch
                checked={switchStates[3]}
                onChange={() => {}} // No-op since we handle it in card click
                aria-label={intl.formatMessage(messages.setGoalReminder)}
                tabIndex={-1}
              />
            </div>
          </div>
          <div
            className={classnames('weekly-goal-card', 'goal-intense', { selected: daysPerWeekGoal === 5 })}
            role="button"
            tabIndex={0}
            onClick={() => handleCardClick(5)}
            onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') { handleCardClick(5); } }}
          >
            <LearningGoalButton
              level="intense"
              isSelected={daysPerWeekGoal === 5}
              handleSelect={() => handleCardClick(5)}
            />
            <div className="weekly-goal-switch">
              <Form.Switch
                checked={switchStates[5]}
                onChange={() => {}} // No-op since we handle it in card click
                aria-label={intl.formatMessage(messages.setGoalReminder)}
                tabIndex={-1}
              />
            </div>
          </div>
        </div>
        <div className={classnames('weekly-goal-reminder-box', reminderMap[daysPerWeekGoal] ? 'active' : '')}>
          <div className="row w-100 m-0 small align-center">
            <div className="d-flex align-items-center pr-1">
              <Icon className="text-primary-500" src={MailOutline} />
            </div>
            <div className="col">
              {intl.formatMessage(messages.goalReminderDetail)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

CustomWeeklyLearningGoalCard.propTypes = {
  daysPerWeekGoal: PropTypes.number,
  intl: intlShape.isRequired,
  handleSelect: PropTypes.func.isRequired,
};

CustomWeeklyLearningGoalCard.defaultProps = {
  daysPerWeekGoal: null,
};

export default injectIntl(CustomWeeklyLearningGoalCard);

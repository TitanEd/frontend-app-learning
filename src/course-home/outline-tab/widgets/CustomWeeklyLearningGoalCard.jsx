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
  daysPerWeek,
  subscribedToReminders,
  intl,
  onGoalChange,
}) => {
  const [daysPerWeekGoal, setDaysPerWeekGoal] = useState(daysPerWeek);
  const [isGetReminderSelected, setGetReminderSelected] = useState(subscribedToReminders);
  const [switchStates, setSwitchStates] = useState({
    1: daysPerWeek === 1,
    3: daysPerWeek === 3,
    5: daysPerWeek === 5,
  });

  const handleCardClick = (days) => {
    // Check if this goal is already selected - if so, toggle it off
    if (daysPerWeekGoal === days) {
      // Toggle off the current goal
      setDaysPerWeekGoal(null);
      setSwitchStates({
        1: false,
        3: false,
        5: false,
      });
      setGetReminderSelected(false);

      // Notify parent component that goal is removed
      if (onGoalChange) {
        onGoalChange(null, false);
      }
      return;
    }

    // Select a new goal
    const newSwitchStates = {
      1: false,
      3: false,
      5: false,
      [days]: true,
    };
    setSwitchStates(newSwitchStates);
    setDaysPerWeekGoal(days);

    // Set the subscription button if this is the first time selecting a goal
    const selectReminders = daysPerWeekGoal === null ? true : isGetReminderSelected;
    setGetReminderSelected(selectReminders);

    // Notify parent component
    if (onGoalChange) {
      onGoalChange(days, selectReminders);
    }
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
        <div
          role="radiogroup"
          aria-labelledby="set-weekly-goal-header"
          className="weekly-goal-options"
        >
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

        {/* Reminder detail section */}
        {isGetReminderSelected && (
          <div className="weekly-goal-reminder-box active">
            <div className="row w-100 m-0 small align-center">
              <div className="d-flex align-items-center pr-1">
                <Icon className="text-primary-500" src={MailOutline} />
              </div>
              <div className="col">
                {intl.formatMessage(messages.goalReminderDetail)}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

CustomWeeklyLearningGoalCard.propTypes = {
  daysPerWeek: PropTypes.number,
  subscribedToReminders: PropTypes.bool,
  intl: intlShape.isRequired,
  onGoalChange: PropTypes.func,
};

CustomWeeklyLearningGoalCard.defaultProps = {
  daysPerWeek: null,
  subscribedToReminders: false,
  onGoalChange: null,
};

export default injectIntl(CustomWeeklyLearningGoalCard);

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Form, Icon } from '@openedx/paragon';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Email } from '@openedx/paragon/icons';
import messages from '../messages';
import LearningGoalButton from './LearningGoalButton';
import { saveWeeklyLearningGoal } from '../../data';
import './FlagButton.scss';

const CustomWeeklyLearningGoalCard = ({
  administrator,
  daysPerWeek,
  daysPerWeekGoal,
  subscribedToReminders,
  location,
  intl,
  courseId,
  isMasquerading,
  org,
  handleSelect,
  handleSubscribeToReminders,
  handleNextSectionCelebration,
}) => {
  const [reminderMap, setReminderMap] = useState({
    1: subscribedToReminders,
    3: false,
    5: false,
  });

  const handleReminderToggle = (days) => (event) => {
    const { checked } = event.target;
    if (checked) {
      // Only one switch can be on at a time
      setReminderMap({
        1: false, 3: false, 5: false, [days]: true,
      });
    } else {
      setReminderMap({ 1: false, 3: false, 5: false });
    }
    if (!isMasquerading) {
      saveWeeklyLearningGoal(courseId, days, checked);
      sendTrackEvent('edx.ui.lms.goal.reminder-selected.changed', {
        org_key: org,
        courserun_key: courseId,
        is_staff: administrator,
        num_days: days,
        reminder_selected: checked,
      });
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
        <div className="weekly-goal-options">
          <div
            className={classnames('weekly-goal-card', 'goal-casual', { selected: daysPerWeekGoal === 1 })}
            role="button"
            tabIndex={0}
            onClick={() => handleSelect(1)}
            onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') { handleSelect(1); } }}
          >
            <LearningGoalButton
              level="casual"
              isSelected={daysPerWeekGoal === 1}
              handleSelect={handleSelect}
            />
            <div className="weekly-goal-switch">
              <Form.Switch
                checked={!!reminderMap[1]}
                onChange={handleReminderToggle(1)}
                disabled={daysPerWeekGoal !== 1}
                aria-label={intl.formatMessage(messages.setGoalReminder)}
                tabIndex={-1}
              />
            </div>
          </div>
          <div
            className={classnames('weekly-goal-card', 'goal-regular', { selected: daysPerWeekGoal === 3 })}
            role="button"
            tabIndex={0}
            onClick={() => handleSelect(3)}
            onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') { handleSelect(3); } }}
          >
            <LearningGoalButton
              level="regular"
              isSelected={daysPerWeekGoal === 3}
              handleSelect={handleSelect}
            />
            <div className="weekly-goal-switch">
              <Form.Switch
                checked={!!reminderMap[3]}
                onChange={handleReminderToggle(3)}
                disabled={daysPerWeekGoal !== 3}
                aria-label={intl.formatMessage(messages.setGoalReminder)}
                tabIndex={-1}
              />
            </div>
          </div>
          <div
            className={classnames('weekly-goal-card', 'goal-intense', { selected: daysPerWeekGoal === 5 })}
            role="button"
            tabIndex={0}
            onClick={() => handleSelect(5)}
            onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') { handleSelect(5); } }}
          >
            <LearningGoalButton
              level="intense"
              isSelected={daysPerWeekGoal === 5}
              handleSelect={handleSelect}
            />
            <div className="weekly-goal-switch">
              <Form.Switch
                checked={!!reminderMap[5]}
                onChange={handleReminderToggle(5)}
                disabled={daysPerWeekGoal !== 5}
                aria-label={intl.formatMessage(messages.setGoalReminder)}
                tabIndex={-1}
              />
            </div>
          </div>
        </div>
        <div className={classnames('weekly-goal-reminder-box', reminderMap[daysPerWeekGoal] ? 'active' : '')}>
          <div className="row w-100 m-0 small align-center">
            <div className="d-flex align-items-center pr-1">
              <Icon className="text-primary-500" src={Email} />
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
  daysPerWeek: PropTypes.number,
  subscribedToReminders: PropTypes.bool,
  intl: intlShape.isRequired,
};

CustomWeeklyLearningGoalCard.defaultProps = {
  daysPerWeek: null,
  subscribedToReminders: false,
};
export default injectIntl(CustomWeeklyLearningGoalCard);

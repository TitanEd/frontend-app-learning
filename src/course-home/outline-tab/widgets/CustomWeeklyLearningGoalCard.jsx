import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Card, Icon } from '@openedx/paragon';
import { history } from '@edx/frontend-platform';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Email } from '@openedx/paragon/icons';
import { useSelector } from 'react-redux';
import { useModel } from '../../../generic/model-store';
import messages from '../messages';
import LearningGoalButton from './LearningGoalButton';
import { saveWeeklyLearningGoal } from '../../data';
import './FlagButton.scss';

const CustomWeeklyLearningGoalCard = ({ intl }) => {
  const { courseId } = useSelector(state => state.courseHome);

  const { isMasquerading, org } = useModel('courseHomeMeta', courseId);

  const { administrator } = getAuthenticatedUser();

  // Pull selectedGoal from outline model
  const {
    courseGoals: { selectedGoal } = {},
  } = useModel('outline', courseId);

  // Extract goal + reminder defaults
  const daysPerWeek = selectedGoal && 'daysPerWeek' in selectedGoal ? selectedGoal.daysPerWeek : null;
  const subscribedToReminders = selectedGoal && 'subscribedToReminders' in selectedGoal
    ? selectedGoal.subscribedToReminders
    : false;

  // Local state
  const [daysPerWeekGoal, setDaysPerWeekGoal] = useState(daysPerWeek);
  const [isGetReminderSelected, setGetReminderSelected] = useState(subscribedToReminders);

  const location = useLocation();

  // Sync state if selectedGoal changes later (e.g. API refresh)
  useEffect(() => {
    setDaysPerWeekGoal(daysPerWeek);
    setGetReminderSelected(subscribedToReminders);
  }, [daysPerWeek, subscribedToReminders]);

  const handleSelect = (days, triggeredFromEmail = false) => {
    if (days === null) {
      // Reset everything
      setDaysPerWeekGoal(null);
      setGetReminderSelected(false);

      if (!isMasquerading) {
        saveWeeklyLearningGoal(courseId, null, false);
        sendTrackEvent('edx.ui.lms.goal.days-per-week.cleared', {
          org_key: org,
          courserun_key: courseId,
          is_staff: administrator,
        });
      }
      return;
    }

    // Normal flow
    const selectReminders = daysPerWeekGoal === null ? true : isGetReminderSelected;
    setGetReminderSelected(selectReminders);
    setDaysPerWeekGoal(days);

    if (!isMasquerading) {
      saveWeeklyLearningGoal(courseId, days, selectReminders);
      sendTrackEvent('edx.ui.lms.goal.days-per-week.changed', {
        org_key: org,
        courserun_key: courseId,
        is_staff: administrator,
        num_days: days,
        reminder_selected: selectReminders,
      });
      if (triggeredFromEmail) {
        sendTrackEvent('enrollment.email.clicked.setgoal', {});
      }
    }
  };

  // Handle ?weekly_goal= in URL
  useEffect(() => {
    const currentParams = new URLSearchParams(location.search);
    const weeklyGoal = Number(currentParams.get('weekly_goal'));
    if ([1, 3, 5].includes(weeklyGoal)) {
      handleSelect(weeklyGoal, true);

      currentParams.delete('weekly_goal');
      history.replace({
        search: currentParams.toString(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  return (
    <Card
      id="courseHome-weeklyLearningGoal"
      className="row w-100 m-0 mb-3 raised-card"
      data-testid="weekly-learning-goal-card"
    >
      <Card.Header
        size="sm"
        title={(
          <div id="set-weekly-goal-header">
            {intl.formatMessage(messages.setWeeklyGoal)}
          </div>
        )}
        subtitle={intl.formatMessage(messages.setWeeklyGoalDetail)}
      />
      <Card.Section className="learningCardContainer text-gray-700 small">
        <div
          role="radiogroup"
          aria-labelledby="set-weekly-goal-header"
          className="flag-button-container m-0 p-0"
        >
          {/* Casual Goal */}
          <div
            className={`goal-card casual-goal ${
              daysPerWeekGoal === 1 ? 'selected' : ''
            }`}
          >
            <div
              role="radio"
              aria-checked={daysPerWeekGoal === 1}
              onClick={() => (daysPerWeekGoal === 1 ? handleSelect(null) : handleSelect(1))}
              className="goal-card-body"
            >
              <LearningGoalButton
                level="casual"
                isSelected={daysPerWeekGoal === 1}
                handleSelect={handleSelect}
              />
            </div>
            <Form.Switch
              checked={daysPerWeekGoal === 1}
              onChange={() => (daysPerWeekGoal === 1 ? handleSelect(null) : handleSelect(1))}
              className="goal-card-switch"
            />
          </div>

          {/* Regular Goal */}
          <div
            className={`goal-card regular-goal ${
              daysPerWeekGoal === 3 ? 'selected' : ''
            }`}
          >
            <div
              role="radio"
              aria-checked={daysPerWeekGoal === 3}
              onClick={() => (daysPerWeekGoal === 3 ? handleSelect(null) : handleSelect(3))}
              className="goal-card-body"
            >
              <LearningGoalButton
                level="regular"
                isSelected={daysPerWeekGoal === 3}
                handleSelect={handleSelect}
              />
            </div>
            <Form.Switch
              checked={daysPerWeekGoal === 3}
              onChange={() => (daysPerWeekGoal === 3 ? handleSelect(null) : handleSelect(3))}
              className="goal-card-switch"
            />
          </div>

          {/* Intense Goal */}
          <div
            className={`goal-card intense-goal ${
              daysPerWeekGoal === 5 ? 'selected' : ''
            }`}
          >
            <div
              role="radio"
              aria-checked={daysPerWeekGoal === 5}
              onClick={() => (daysPerWeekGoal === 5 ? handleSelect(null) : handleSelect(5))}
              className="goal-card-body"
            >
              <LearningGoalButton
                level="intense"
                isSelected={daysPerWeekGoal === 5}
                handleSelect={handleSelect}
              />
            </div>
            <Form.Switch
              checked={daysPerWeekGoal === 5}
              onChange={() => (daysPerWeekGoal === 5 ? handleSelect(null) : handleSelect(5))}
              className="goal-card-switch"
            />
          </div>
        </div>
      </Card.Section>

      {isGetReminderSelected && (
        <Card.Section muted>
          <div className="row w-100 m-0 small align-center">
            <div className="d-flex align-items-center pr-1">
              <Icon className="text-primary-500 reminder-primary-icon" src={Email} />
            </div>
            <div className="col">
              {intl.formatMessage(messages.goalReminderDetail)}
            </div>
          </div>
        </Card.Section>
      )}
    </Card>
  );
};

CustomWeeklyLearningGoalCard.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(CustomWeeklyLearningGoalCard);

import React from 'react';
import classNames from 'classnames';
import { FormattedDate } from '@edx/frontend-platform/i18n';

const CustomTodayDate = (props) => {
  // Function to check if the date is today
  const isToday = (dateToCheck) => {
    const today = new Date();
    return dateToCheck.toDateString() === today.toDateString();
  };

  // Check if current date is today
  const isCurrentDateToday = isToday(props.date);

  return (
    <div
      className={classNames(
        'row w-100 m-0 mb-1 align-items-center text-primary-700',
        { 'today-date-style': isCurrentDateToday },
      )}
      data-testid="dates-header"
    >
      <FormattedDate
        value={props.date}
        day="numeric"
        month="short"
        weekday="short"
        year="numeric"
        {...props.timezoneFormatArgs}
      />
    </div>
  );
};

export default CustomTodayDate;

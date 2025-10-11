import React from 'react';
import classNames from 'classnames';

const CustomDayTimeline = (props) => {
  // Function to check if the date is today
  const isToday = (dateToCheck) => {
    const today = new Date();
    return dateToCheck.toDateString() === today.toDateString();
  };

  // Check if current date is today
  const isCurrentDateToday = isToday(props.date);

  // Determine line color - use custom color for line above today's date
  const getTopLineClassName = () => {
    if (isCurrentDateToday) {
      return "dates-line-top border-1 border-left today-line";
    }
    return "dates-line-top border-1 border-left border-gray-900 bg-gray-900";
  };

  const getBottomLineClassName = () => {
    if (isCurrentDateToday) {
      return "dates-line-bottom border-1 border-left border-gray-900 bg-gray-900";
    }
    return "dates-line-bottom border-1 border-left today-line";
  };

  return (
    <>
      {/* Top Line */}
      {!props.first && <div className={getTopLineClassName()} />}
      
      {/* Dot */}
      <div>
        {props.first ? <div className={classNames(props.color, 'dates-dot border border-gray-900 first')} />
        : props.last ? <div className={classNames(props.color, 'dates-dot border last')} />
        :<div className={classNames(props.color, 'dates-dot border border-gray-900 today')} />}
      </div>
      
      {/* Bottom Line */}
      {!props.last && <div className={getBottomLineClassName()} />}
    </>
  );
};

export default CustomDayTimeline;


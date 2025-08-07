import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { FormattedDate } from '@edx/frontend-platform/i18n';
import React from 'react';
import PropTypes from 'prop-types';
import './DateSummary.scss';

const CustomDateSummary = ({
  dateBlock,
  userTimezone,
  courseId,
  org,
  logVerifiedUpgradeClick,
  linkedTitle,
  timezoneFormatArgs
}) => (
  <li className="p-0 mb-3 small text-dark-500">
    <div className="d-flex align-items-start">
      <span
        className="date-summary-icon-bg d-flex align-items-center justify-content-center mr-3"
        style={{
          width: 40,
          minWidth: 40,
          maxWidth: 40,
          height: 40,
          borderRadius: '50%',
          background: '#e8f0fe',
          flexShrink: 0,
        }}
      >
        <FontAwesomeIcon icon={faCalendarAlt} style={{ color: '#5f6368', fontSize: 22 }} />
      </span>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          flex: 1,
        }}
      >
        <div className="font-weight-bold" style={{ fontSize: '1rem', color: '#222' }}>
          <FormattedDate
            value={dateBlock.date}
            day="numeric"
            month="short"
            weekday="short"
            year="numeric"
            {...timezoneFormatArgs}
          />
        </div>
        <div className="date-summary-text" style={{ color: '#6b7280', fontSize: '0.95rem', fontWeight: 400 }}>
          {dateBlock.title}
          {dateBlock.description && (
            <div className="date-summary-text mt-1">{dateBlock.description}</div>
          )}
        </div>
      </div>

      {!linkedTitle && dateBlock.link && (
      <a
        href={dateBlock.link}
        onClick={dateBlock.dateType === 'verified-upgrade-deadline' ? logVerifiedUpgradeClick : () => {}}
        className="description-link"
      >
        {dateBlock.linkText}
      </a>
      )}
    </div>
  </li>
);

CustomDateSummary.propTypes = {
  dateBlock: PropTypes.shape({
    date: PropTypes.string.isRequired,
    dateType: PropTypes.string,
    description: PropTypes.string,
    link: PropTypes.string,
    linkText: PropTypes.string,
    title: PropTypes.string.isRequired,
    learnerHasAccess: PropTypes.bool,
  }).isRequired,
  userTimezone: PropTypes.string,
};

CustomDateSummary.defaultProps = {
  userTimezone: null,
};

export default CustomDateSummary;

import { LmsBook } from '@openedx/paragon/icons';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';

import sidebarMessages from '../messages';
import tabMessages from './messages';
import getLearnerDashboardUrl from '../utils/getLearnerDashboardUrl';

const CustomCourseHeader = (props) => {
  const intl = useIntl();
  const myCoursesLabel = intl.formatMessage(sidebarMessages.sidebarMyCoursesTitle);
  const title = props.title || intl.formatMessage(tabMessages.loading);

  return (
    <div className="course-header mb-2">
      <div className="ca-breadcrumb-bg">
        <div className="ca-breadcrumb-container">
          <div className="ca-breadcrumb">
            <span
              className="ca-breadcrumb-icon"
              role="link"
              tabIndex={0}
              onClick={() => { window.location.href = getLearnerDashboardUrl('/my-courses'); }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  window.location.href = getLearnerDashboardUrl('/my-courses');
                }
              }}
            >
              <LmsBook className="custom-icon" />
              {myCoursesLabel}
            </span>
            <span className="ca-breadcrumb-divider">/</span>
            <span className="ca-breadcrumb-current">
              {title}
            </span>
          </div>
          <div className="ca-title">{title}</div>
        </div>
      </div>
    </div>
  );
};

export default CustomCourseHeader;

CustomCourseHeader.propTypes = {
  title: PropTypes.string,
};

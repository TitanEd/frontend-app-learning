// Copy of OutlineTab.jsx for the custom UI: same data, rendered by <CustomOutlineTab />.
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { useIntl } from '@edx/frontend-platform/i18n';

import messages from './messages';
import useCertificateAvailableAlert from './alerts/certificate-status-alert';
import useCourseEndAlert from './alerts/course-end-alert';
import useCourseStartAlert from '../../alerts/course-start-alert';
import usePrivateCourseAlert from './alerts/private-course-alert';
import useScheduledContentAlert from './alerts/scheduled-content-alert';
import { useModel } from '../../generic/model-store';
import CustomOutlineTab from './CustomOutlineTab';
import PageLoading from '../../generic/PageLoading';
import tabPageMessages from '../../tab-page/messages';

const CustomOutlineTabContent = () => {
  const intl = useIntl();
  const {
    courseId,
    proctoringPanelStatus,
  } = useSelector(state => state.courseHome);

  const {
    isSelfPaced,
    org,
    title,
    userTimezone,
  } = useModel('courseHomeMeta', courseId);

  const expandButtonRef = useRef();

  const {
    accessExpiration,
    courseBlocks: {
      courses,
      sections,
    },
    courseGoals: {
      selectedGoal,
      weeklyLearningGoalEnabled,
    } = {},
    datesBannerInfo,
    datesWidget: {
      courseDateBlocks,
    },
    enableProctoredExams,
    offer,
    timeOffsetMillis,
    verifiedMode,
  } = useModel('outline', courseId);

  const {
    marketingUrl,
  } = useModel('coursewareMeta', courseId);

  const [expandAll, setExpandAll] = useState(false);
  const navigate = useNavigate();

  const eventProperties = {
    org_key: org,
    courserun_key: courseId,
  };

  // Below the course title alerts (appearing in the order listed here)
  const courseStartAlert = useCourseStartAlert(courseId);
  const courseEndAlert = useCourseEndAlert(courseId);
  const certificateAvailableAlert = useCertificateAvailableAlert(courseId);
  const privateCourseAlert = usePrivateCourseAlert(courseId);
  const scheduledContentAlert = useScheduledContentAlert(courseId);

  const rootCourseId = courses && Object.keys(courses)[0];

  const hasDeadlines = courseDateBlocks && courseDateBlocks.some(x => x.dateType === 'assignment-due-date');

  const logUpgradeToShiftDatesLinkClick = () => {
    sendTrackEvent('edx.bi.ecommerce.upsell_links_clicked', {
      ...eventProperties,
      linkCategory: 'personalized_learner_schedules',
      linkName: 'course_home_upgrade_shift_dates',
      linkType: 'button',
      pageName: 'course_home',
    });
  };

  const isEnterpriseUser = () => {
    const authenticatedUser = getAuthenticatedUser();
    const userRoleNames = authenticatedUser ? authenticatedUser.roles.map(role => role.split(':')[0]) : [];

    return userRoleNames.includes('enterprise_learner');
  };

  /** show post enrolment survey to only B2C learners */
  const learnerType = isEnterpriseUser() ? 'enterprise_learner' : 'b2c_learner';

  const location = useLocation();

  useEffect(() => {
    const currentParams = new URLSearchParams(location.search);
    const startCourse = currentParams.get('start_course');
    if (startCourse === '1') {
      sendTrackEvent('enrollment.email.clicked.startcourse', {});

      // Deleting the course_start query param as it only needs to be set once
      // whenever passed in query params.
      currentParams.delete('start_course');
      navigate({
        pathname: location.pathname,
        search: `?${currentParams.toString()}`,
        replace: true,
      });
    }
  }, [location.search]);

  return (
    <CustomOutlineTab
      intl={intl}
      courseId={courseId}
      proctoringPanelStatus={proctoringPanelStatus}
      isSelfPaced={isSelfPaced}
      org={org}
      title={title}
      userTimezone={userTimezone}
      accessExpiration={accessExpiration}
      courseStartAlert={courseStartAlert}
      courseEndAlert={courseEndAlert}
      certificateAvailableAlert={certificateAvailableAlert}
      privateCourseAlert={privateCourseAlert}
      scheduledContentAlert={scheduledContentAlert}
      eventProperties={eventProperties}
      navigate={navigate}
      rootCourseId={rootCourseId}
      hasDeadlines={hasDeadlines}
      isEnterpriseUser={isEnterpriseUser}
      logUpgradeToShiftDatesLinkClick={logUpgradeToShiftDatesLinkClick}
      learnerType={learnerType}
      location={location}
      expandAll={expandAll}
      setExpandAll={setExpandAll}
      enableProctoredExams={enableProctoredExams}
      selectedGoal={selectedGoal}
      offer={offer}
      verifiedMode={verifiedMode}
      datesBannerInfo={datesBannerInfo}
      marketingUrl={marketingUrl}
      timeOffsetMillis={timeOffsetMillis}
      courses={courses}
      sections={sections}
      sectionIds={rootCourseId ? courses[rootCourseId]?.sectionIds : undefined}
      weeklyLearningGoalEnabled={weeklyLearningGoalEnabled}
      daysPerWeek={selectedGoal && 'daysPerWeek' in selectedGoal ? selectedGoal.daysPerWeek : null}
      subscribedToReminders={selectedGoal && 'subscribedToReminders' in selectedGoal ? selectedGoal.subscribedToReminders : false}
    />
  );
};

// Coming from a page that loads only the course metadata (bookmarks, updates), the course is already
// "loaded" when this page first renders but its outline is not fetched yet: wait for it.
const CustomOutlineTabPage = () => {
  const intl = useIntl();
  const { courseId } = useSelector(state => state.courseHome);
  const outline = useModel('outline', courseId);
  if (!outline?.courseBlocks) {
    return <PageLoading srMessage={intl.formatMessage(tabPageMessages.loading)} />;
  }
  return <CustomOutlineTabContent />;
};

export default CustomOutlineTabPage;

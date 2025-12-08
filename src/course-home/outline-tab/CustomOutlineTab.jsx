import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Button, Card, Badge } from '@openedx/paragon';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import { AlertList } from '../../generic/user-messages';

import CourseDates from './widgets/CourseDates';
import CourseHandouts from './widgets/CourseHandouts';
import StartOrResumeCourseCard from './widgets/StartOrResumeCourseCard';
import WeeklyLearningGoalCard from './widgets/WeeklyLearningGoalCard';
import CourseTools from './widgets/CourseTools';
import { fetchOutlineTabWithMetadata } from '../data';
import messages from './messages';
import Section from './Section';
import ShiftDatesAlert from '../suggested-schedule-messaging/ShiftDatesAlert';
import UpgradeNotification from '../../generic/upgrade-notification/UpgradeNotification';
import UpgradeToShiftDatesAlert from '../suggested-schedule-messaging/UpgradeToShiftDatesAlert';
import useCertificateAvailableAlert from './alerts/certificate-status-alert';
import useCourseEndAlert from './alerts/course-end-alert';
import useCourseStartAlert from '../../alerts/course-start-alert';
import usePrivateCourseAlert from './alerts/private-course-alert';
import useScheduledContentAlert from './alerts/scheduled-content-alert';
import { useModel } from '../../generic/model-store';
import WelcomeMessage from './widgets/WelcomeMessage';
import ProctoringInfoPanel from './widgets/ProctoringInfoPanel';
import AccountActivationAlert from '../../alerts/logistration-alert/AccountActivationAlert';

const CustomOutlineTab = ({ 
  intl,
          courseId,
          proctoringPanelStatus,
          isSelfPaced,
          org,
          title,
          userTimezone,
          accessExpiration,
          courseStartAlert,
          courseEndAlert,
          certificateAvailableAlert,
          privateCourseAlert,
          scheduledContentAlert,
          eventProperties,
          navigate,
          rootCourseId,
          hasDeadlines,
          isEnterpriseUser,
          logUpgradeToShiftDatesLinkClick,
          handleNextSectionCelebration,
          learnerType,
          location,
          expandAll,
          setExpandAll,
          enableProctoredExams,
          selectedGoal,
          offer,
          verifiedMode,
          datesBannerInfo,
          marketingUrl,
          timeOffsetMillis,
          courses,
          sections,
          sectionIds,
          resumeBlock,
          weeklyLearningGoalEnabled,
          daysPerWeek,
          subscribedToReminders,
}) => {
  // Fetch shortDescription directly from courseHomeMeta
  const courseHomeMeta = useModel('courseHomeMeta', courseId);
  const shortDescriptionFromMeta = courseHomeMeta.shortDescription;

  console.log('shortDescription in CUSTOM OUTLINE TAB::::', shortDescriptionFromMeta);
  console.log('shortDescription from courseHomeMeta:', shortDescriptionFromMeta);

  const {
    resumeCourse: {
      hasVisitedCourse,
      url: resumeCourseUrl,
    },
  } = useModel('outline', courseId);

  const logResumeCourseClick = () => {
    sendTrackEvent('edx.course.home.resume_course.clicked', {
      org_key: org,
      courserun_key: courseId,
      event_type: hasVisitedCourse ? 'resume' : 'start',
      url: resumeCourseUrl,
    });
  };
  const formatCourseIdWithBreaks = (id) => {
    const parts = id.split(/([:\+\-_])/);
    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {part}
        {index < parts.length - 1 && /[:\+\-_]/.test(parts[index + 1]) && <wbr />}
      </React.Fragment>
    ));
  };

  return (
    <>
      <div className="row course-outline-tab">
        <AccountActivationAlert />
        <div className="col-12">
          <AlertList
            topic="outline-private-alerts"
            customAlerts={{
              ...privateCourseAlert,
            }}
          />
        </div>
        <div className="col col-12 col-md-8 custom-outline-tab-content">
          <Card className="mb-4 shadow-sm " style={{ borderRadius: '12px', overflow: 'hidden' }}>
            <div className="row no-gutters align-items-center custom-course-display-outline">
              <div className="col-12 col-md-auto">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
                  alt="Course"
                  className="course-card-image-responsive"
                />
              </div>
              <div className="col-12 col-md custom-outline-card-body">
                <Card.Body>
                  <Badge variant="light" className="mb-2 text-dark">Course</Badge>
                  <div className="h4 font-weight-bold mb-2">{title}</div>
                  <div
                    className="mb-3 text-muted course-outline-tab-short-description"
                    style={{
                      maxWidth: 500,
                      height: 110,
                    }}
                  >
                    {shortDescriptionFromMeta}
                  </div>
                  {resumeCourseUrl && (
                    <Button
                      // variant="brand"
                      href={resumeCourseUrl}
                      onClick={logResumeCourseClick}
                    >
                      {hasVisitedCourse ? intl.formatMessage(messages.resume) : intl.formatMessage(messages.start)}
                    </Button>
                  )}
                </Card.Body>
              </div>
            </div>
          </Card>
          <AlertList
            topic="outline-course-alerts"
            className="mb-3"
            customAlerts={{
              ...certificateAvailableAlert,
              ...courseEndAlert,
              ...courseStartAlert,
              ...scheduledContentAlert,
            }}
          />
          {isSelfPaced && hasDeadlines && (
            <>
              <ShiftDatesAlert model="outline" fetch={fetchOutlineTabWithMetadata} />
              <UpgradeToShiftDatesAlert model="outline" logUpgradeLinkClick={logUpgradeToShiftDatesLinkClick} />
            </>
          )}
          <WelcomeMessage courseId={courseId} />
          {rootCourseId && (
            <Card className="mb-3" data-testid="course-outline-card">
              <Card.Body className="course-outline-card-body">
                <div className="row w-100 m-0 mb-3 justify-content-between align-items-center">
                  <div className="col-auto p-0">
                    <h4 className="mb-0">Course Content</h4>
                  </div>
                  <div className="col-12 col-md-auto p-0 custom-mobile-view-expand-all-button">
                    <Button variant="link" onClick={() => { setExpandAll(!expandAll); }}>
                      {expandAll ? intl.formatMessage(messages.collapseAll) : intl.formatMessage(messages.expandAll)}
                    </Button>
                  </div>
                </div>
                <ol id="courseHome-outline" className="list-unstyled course-content-border">
                  {courses[rootCourseId].sectionIds.map((sectionId) => (
                    <Section
                      key={sectionId}
                      courseId={courseId}
                      defaultOpen={sections[sectionId].resumeBlock}
                      expand={expandAll}
                      section={sections[sectionId]}
                    />
                  ))}
                </ol>
              </Card.Body>
            </Card>
          )}
        </div>
        {rootCourseId && (
          <div className="col col-12 col-md-4 mobile-view-sidebar-course-home">
            <ProctoringInfoPanel />
            { /** Defer showing the goal widget until the ProctoringInfoPanel has resolved or has been determined as
             disabled to avoid components bouncing around too much as screen is rendered */ }
            {/* Group all sidebar widgets in a single card */}
            <Card className="mb-3 raised-card" data-testid="course-sidebar-card">
              <Card.Body className="p-4">
                {(!enableProctoredExams || proctoringPanelStatus === 'loaded') && weeklyLearningGoalEnabled && (
                  <WeeklyLearningGoalCard
                    daysPerWeek={selectedGoal && 'daysPerWeek' in selectedGoal ? selectedGoal.daysPerWeek : null}
                    subscribedToReminders={selectedGoal && 'subscribedToReminders' in selectedGoal ? selectedGoal.subscribedToReminders : false}
                  />
                )}
                <CourseTools />
                <CourseDates />
                <CourseHandouts />
              </Card.Body>
            </Card>
            <PluginSlot
              id="outline_tab_notifications_slot"
              pluginProps={{
                courseId,
                model: 'outline',
              }}
            >
              <UpgradeNotification
                offer={offer}
                verifiedMode={verifiedMode}
                accessExpiration={accessExpiration}
                contentTypeGatingEnabled={datesBannerInfo.contentTypeGatingEnabled}
                marketingUrl={marketingUrl}
                upsellPageName="course_home"
                userTimezone={userTimezone}
                shouldDisplayBorder
                timeOffsetMillis={timeOffsetMillis}
                courseId={courseId}
                org={org}
              />
            </PluginSlot>
          </div>
        )}
      </div>
    </>
  );
};

CustomOutlineTab.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(CustomOutlineTab);

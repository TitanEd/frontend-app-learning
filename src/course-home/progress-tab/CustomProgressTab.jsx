import React from 'react';
import { useSelector } from 'react-redux';
import { breakpoints, useWindowSize } from '@openedx/paragon';

import CertificateStatus from './certificate-status/CertificateStatus';
import CourseCompletion from './course-completion/CourseCompletion';
import CourseGrade from './grades/course-grade/CourseGrade';
import DetailedGrades from './grades/detailed-grades/DetailedGrades';
import GradeSummary from './grades/grade-summary/GradeSummary';
import ProgressHeader from './ProgressHeader';
import RelatedLinks from './related-links/RelatedLinks';

const CustomProgressTab = ({
  disableProgressGraph,
  wideScreen,
  applyLockedOverlay,
  gradesFeatureIsFullyLocked,
}) => (
  <>
    <div className="row w-100 m-0">
      {/* Main body */}
      <div className="col-12 col-md-8 p-0 mt-6">
        {!disableProgressGraph && <CourseCompletion />}
        {!wideScreen && <CertificateStatus />}
        <CourseGrade />
        <div className={`grades my-4 p-4 rounded raised-card progress-tab-card-style ${applyLockedOverlay}`} aria-hidden={gradesFeatureIsFullyLocked}>
          <GradeSummary />
          <DetailedGrades />
        </div>
      </div>

      {/* Side panel */}
      <div className="col-12 col-md-4 p-0 px-md-4">
        {wideScreen && <CertificateStatus />}
        <RelatedLinks />
      </div>
    </div>
  </>
);

export default CustomProgressTab;

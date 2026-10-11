// Copy of CourseGrade.jsx for the custom UI: title block on its own row, grade bar
// below it, no footer.
import { useIntl } from '@edx/frontend-platform/i18n';
import { useContextId } from '../../../../data/hooks';

import { useModel } from '../../../../generic/model-store';

import CourseGradeHeader from './CourseGradeHeader';
import GradeBar from './GradeBar';
import CreditInformation from '../../credit-information/CreditInformation';
import messages from '../messages';

const CustomCourseGrade = () => {
  const intl = useIntl();
  const courseId = useContextId();

  const {
    creditCourseRequirements,
    gradesFeatureIsFullyLocked,
    gradesFeatureIsPartiallyLocked,
    gradingPolicy: {
      gradeRange,
    },
  } = useModel('progress', courseId);

  const passingGrade = Number((Math.min(...Object.values(gradeRange)) * 100).toFixed(0));

  const applyLockedOverlay = gradesFeatureIsFullyLocked ? 'locked-overlay' : '';

  return (
    <section className="text-dark-700 my-4 rounded raised-card">
      {(gradesFeatureIsFullyLocked || gradesFeatureIsPartiallyLocked) && <CourseGradeHeader />}
      <div className={applyLockedOverlay} aria-hidden={gradesFeatureIsFullyLocked}>
        <div className="row w-100 m-0 p-4">
          <div className="col-12 p-0 pr-sm-5.5">
            <h2 className="custom-progress-tabs-titles">{creditCourseRequirements
              ? intl.formatMessage(messages.gradesAndCredit)
              : intl.formatMessage(messages.grades)}
            </h2>
            <p className="custom-progress-tabs-subtitles">
              {intl.formatMessage(messages.courseGradeBody)}
            </p>
          </div>
        </div>
        <div className="row w-100 m-0 px-4">
          <GradeBar passingGrade={passingGrade} />
          <CreditInformation />
        </div>
      </div>
    </section>
  );
};

export default CustomCourseGrade;

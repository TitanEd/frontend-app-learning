import PropTypes from 'prop-types';

import {
  getLocale, injectIntl, intlShape, isRtl,
} from '@edx/frontend-platform/i18n';

import messages from '../messages';

const CustomGradeBar = ({
  intl,
  passingGrade,
  courseId,
  isPassing,
  percent,
  gradesFeatureIsFullyLocked,
  currentGrade,
  adjustedRtlStyle,
}) => {
  const isLocaleRtl = isRtl(getLocale());

  return (
    <div className="col-12 align-self-center p-0">
      <div className="sr-only">{intl.formatMessage(messages.courseGradeBarAltText, { currentGrade, passingGrade })}</div>
      <svg width="100%" height="100px" className="grade-bar" aria-hidden="true">
        <g>
          <rect className="grade-bar__base" width="100%" y="20" />
          <rect className="grade-bar--passing" width={`${passingGrade}%`} y="20" style={adjustedRtlStyle(passingGrade)} />
          <rect className={`grade-bar--current-${isPassing ? 'passing' : 'non-passing'}`} width={`${currentGrade}%`} y="20" style={adjustedRtlStyle(currentGrade)} />

          {/* Start divider */}
          <rect className="grade-bar__divider" y="20" />
          {/* End divider */}
          <rect className="grade-bar__divider" x="99.7%" y="20" />
        </g>

        {/* Passing Grade Point and Label */}
        <g>
          <circle
            className="grade-bar--passing"
            cx={`${isLocaleRtl ? 100 - passingGrade : passingGrade}%`}
            cy="24"
            r="4"
          />
          <text
            className="x-small"
            textAnchor={passingGrade < 50 ? 'start' : 'end'}
            x={`${isLocaleRtl ? 100 - passingGrade : passingGrade}%`}
            y="50"
            // style={{ transform: `translateX(${passingGrade < 50 ? '' : '-'}3.4em)` }}
          >
            {passingGrade}%
          </text>
          <text
            className="x-small"
            textAnchor="middle"
            x={`${isLocaleRtl ? 100 - passingGrade : passingGrade}%`}
            y="70"
          >
            {intl.formatMessage(messages.passingGradeLabel)}
          </text>
        </g>

        {/* Start Label (0%) */}
        <text
          className="x-small"
          textAnchor="start"
          x="0%"
          y="50"
        >
          0%
        </text>

        {/* Current Grade Point and Label */}
        <g>
          <circle
            cx={`${Math.min(...[isLocaleRtl ? 100 - currentGrade : currentGrade, 100])}%`}
            cy="30"
            r="8.5"
            fill="transparent"
          />
          <rect
            className="grade-bar__divider"
            x={`${Math.min(...[isLocaleRtl ? 100 - currentGrade : currentGrade, 100])}%`}
            y="20"
          />
        </g>
      </svg>
    </div>
  );
};

CustomGradeBar.propTypes = {
  intl: intlShape.isRequired,
  passingGrade: PropTypes.number.isRequired,
};

export default injectIntl(CustomGradeBar);

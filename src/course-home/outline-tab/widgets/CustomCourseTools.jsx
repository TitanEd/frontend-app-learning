import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Badge } from '@openedx/paragon';
import messages from '../messages';
import LaunchCourseHomeTourButton from '../../../product-tours/newUserCourseHomeTour/LaunchCourseHomeTourButton';

const CustomCourseTools = ({
  intl, courseTools, org, courseId, eventProperties, logClick, renderIcon,
}) => (
  <section className="mb-4 mt-5">
    <h2 className="h4">{intl.formatMessage(messages.tools)}</h2>
    <div className="d-flex flex-column align-items-stretch gap-2 mb-2">
      {/* Bookmarks badge - full width */}
      {courseTools.filter((courseTool) => courseTool.analyticsId === 'edx.bookmarks').map((courseTool) => (
        <Badge
          key={courseTool.analyticsId}
          className="bg-white border border-gray-300 text-dark d-flex align-items-center justify-content-center w-100 mb-2 rounded-pill"
          as="a"
          href={courseTool.url}
          onClick={() => logClick(courseTool.analyticsId)}
          style={{
            textDecoration: 'none', fontWeight: 500, fontSize: '1rem', height: '40px',
          }}
        >
          <FontAwesomeIcon icon={renderIcon(courseTool.analyticsId)} className="mr-2" fixedWidth />
          {courseTool.title}
        </Badge>
      ))}
      {/* Updates and Launch tour in a row */}
      <div className="d-flex flex-row gap-2 w-100">
        {courseTools.filter((courseTool) => courseTool.analyticsId === 'edx.updates').map((courseTool) => (
          <Badge
            key={courseTool.analyticsId}
            className="bg-white border border-gray-300 text-dark d-flex align-items-center justify-content-center flex-fill rounded-pill"
            as="a"
            href={courseTool.url}
            onClick={() => logClick(courseTool.analyticsId)}
            style={{
              textDecoration: 'none', fontWeight: 500, fontSize: '1rem', height: '40px',
            }}
          >
            <FontAwesomeIcon icon={renderIcon(courseTool.analyticsId)} className="mr-2" fixedWidth />
            {courseTool.title}
          </Badge>
        ))}
        <Badge
          className="bg-white border border-gray-300 text-dark d-flex align-items-center justify-content-center flex-fill rounded-pill"
          style={{ fontWeight: 500, fontSize: '1rem', height: '40px' }}
        >
          <LaunchCourseHomeTourButton />
        </Badge>
      </div>
    </div>
  </section>
);

CustomCourseTools.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(CustomCourseTools);

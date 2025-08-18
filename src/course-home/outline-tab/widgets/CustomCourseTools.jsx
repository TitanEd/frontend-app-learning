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
          className="bg-white border border-gray-300 text-dark d-flex align-items-center justify-content-center w-100 mb-2 badge-border-radius bookmarks-badge"
          as="a"
          href={courseTool.url}
          onClick={() => logClick(courseTool.analyticsId)}
        >
          <FontAwesomeIcon icon={renderIcon(courseTool.analyticsId)} className="mr-2" fixedWidth />
          {courseTool.title}
        </Badge>
      ))}
      {/* Updates and Launch tour in a row */}
      <div className="d-flex flex-row w-100 badge-gap">
        {courseTools.filter((courseTool) => courseTool.analyticsId === 'edx.updates').map((courseTool) => (
          <Badge
            key={courseTool.analyticsId}
            className="bg-white border border-gray-300 text-dark d-flex align-items-center justify-content-center badge-border-radius badge-style"
            as="a"
            href={courseTool.url}
            onClick={() => logClick(courseTool.analyticsId)}
          >
            <FontAwesomeIcon icon={renderIcon(courseTool.analyticsId)} className="mr-2" fixedWidth />
            {courseTool.title}
          </Badge>
        ))}
        <Badge
          className="bg-white border border-gray-300 text-dark d-flex align-items-center justify-content-center badge-border-radius badge-style"
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

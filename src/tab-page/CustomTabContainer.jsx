import PropTypes from 'prop-types';
import { OuterExamTimer } from '@edx/frontend-lib-special-exams';

import { LmsBook } from '@openedx/paragon/icons';
import TabPage from './TabPage';
import { useModel } from '../generic/model-store';

const CustomTabContainer = (props) => {
  const {
    children,
    tab,
    courseId,
    courseStatus,
    metadataModel
  } = props;

  // const { courseId: courseIdFromUrl, targetUserId } = useParams();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   // The courseId from the URL is the course we WANT to load.
  //   if (isProgressTab) {
  //     dispatch(fetch(courseIdFromUrl, targetUserId));
  //   } else {
  //     dispatch(fetch(courseIdFromUrl));
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [courseIdFromUrl, targetUserId]);

  // The courseId from the store is the course we HAVE loaded.  If the URL changes,
  // we don't want the application to adjust to it until it has actually loaded the new data.
  // const {
  //   courseId,
  //   courseStatus,
  // } = useSelector(state => state[slice]);

  const {
    title,
  } = useModel('courseHomeMeta', courseId);

  return (
    <>
      <div className="ca-breadcrumb-bg">
        <div className="ca-breadcrumb-container">
          <div className="ca-breadcrumb">
            <span className="ca-breadcrumb-icon">
              <LmsBook className="custom-icon" />
              My Courses
            </span>
            <span className="ca-breadcrumb-divider">/</span>
            <span className="ca-breadcrumb-current">{title || 'Loading...'}</span>
          </div>
          <div className="ca-title">
            {title || 'Loading...'}
          </div>
        </div>
      </div>
      <div className="ca-main-layout">
        {/* <MobileCourseNavigation items={sidebarItems} courseId={courseId} /> */}
        {/* <div className="ca-sidebar">
          <PluginSlot id="course_sidebar_plugin_slot" pluginProps={{ courseId, sidebarItems }} />
        </div> */}
        <main className="ca-main-content">
            <TabPage
              activeTabSlug={tab}
              courseId={courseId}
              courseStatus={courseStatus}
              metadataModel={metadataModel}
            >
              {courseId && <OuterExamTimer courseId={courseId} />}
              {children}
            </TabPage>
        </main>
      </div>

    </>
  );
};

CustomTabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  tab: PropTypes.string.isRequired,
};

export default CustomTabContainer;

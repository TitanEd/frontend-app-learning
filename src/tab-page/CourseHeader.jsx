import { LmsBook } from '@openedx/paragon/icons';
import PropTypes from 'prop-types';

// const {
//   title,
// } = useModel('courseHomeMeta', courseId);

const CourseHeader = (props) => (
  <div className="ca-breadcrumb-bg">
    <div className="ca-breadcrumb-container">
      <div className="ca-breadcrumb">
        <span className="ca-breadcrumb-icon">
          <LmsBook className="custom-icon" />
          My Courses
        </span>
        <span className="ca-breadcrumb-divider">/</span>
        <span className="ca-breadcrumb-current">
          {props.title || 'Loading...'}
        </span>
      </div>
      <div className="ca-title">{props.title || 'Loading...'}</div>
    </div>
  </div>
);

export default CourseHeader;

CourseHeader.propTypes = {
  title: PropTypes.string,
};

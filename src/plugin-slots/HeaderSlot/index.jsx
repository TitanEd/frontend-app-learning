/* eslint-disable no-console */
import PropTypes from 'prop-types';
import { PluginSlot } from '@openedx/frontend-plugin-framework';

import { LearningHeader as Header } from '@edx/frontend-component-header';
import { setUIPreference } from '../../services/uiPreferenceService';

const HeaderSlot = ({
  courseOrg, courseNumber, courseTitle, showUserDropdown,
}) => (
  <PluginSlot
    id="header_slot"
    slotOptions={{
      mergeProps: true,
    }}
    pluginProps={{
      courseOrg,
      courseNumber,
      courseTitle,
      showUserDropdown,
    }}
  >
    <div>
      <Header
        courseOrg={courseOrg}
        courseNumber={courseNumber}
        courseTitle={courseTitle}
        showUserDropdown={showUserDropdown}
      />
      <button
        type="button"
        className="ui-switch-button"
        onClick={async () => {
          try {
            const success = await setUIPreference(true);
            if (success) {
              window.location.reload();
            } else {
              console.error('Failed to switch to new UI');
            }
          } catch (error) {
            console.error('Error switching to new UI:', error);
          }
        }}
      >
        Switch to New UI
      </button>
    </div>
  </PluginSlot>
);

HeaderSlot.propTypes = {
  courseOrg: PropTypes.string,
  courseNumber: PropTypes.string,
  courseTitle: PropTypes.string,
  showUserDropdown: PropTypes.bool,
};

HeaderSlot.defaultProps = {
  courseOrg: null,
  courseNumber: null,
  courseTitle: null,
  showUserDropdown: true,
};

export default HeaderSlot;

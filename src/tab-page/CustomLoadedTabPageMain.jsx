import React from 'react';
import PropTypes from 'prop-types';
import { PluginSlot } from '@openedx/frontend-plugin-framework';

import { CourseTabsNavigationSlot } from '../plugin-slots/CourseTabsNavigationSlot';
import { AlertList } from '../generic/user-messages';

// Custom UI version of the <main> block of LoadedTabPage (rendered through
// loaded_tab_page_main_plugin_slot): one content column holding the alerts,
// the custom course header (course_header_plugin_slot), the course tabs and
// the page content.
const CustomLoadedTabPageMain = ({
  title,
  tabs,
  activeTabSlug,
  enrollmentAlert,
  logistrationAlert,
  children,
}) => (
  <main className="d-flex flex-column flex-grow-1">
    <div className="container-xl course-home-column w-100">
      <AlertList
        topic="outline"
        className="mt-3"
        customAlerts={{
          ...enrollmentAlert,
          ...logistrationAlert,
        }}
      />
      <PluginSlot
        id="course_header_plugin_slot"
        pluginProps={{
          title,
        }}
      />
      <CourseTabsNavigationSlot tabs={tabs} activeTabSlug={activeTabSlug} />
      <div id="main-content">
        {children}
      </div>
    </div>
  </main>
);

CustomLoadedTabPageMain.propTypes = {
  title: PropTypes.string,
  tabs: PropTypes.arrayOf(PropTypes.shape({})),
  activeTabSlug: PropTypes.string,
  enrollmentAlert: PropTypes.shape({}),
  logistrationAlert: PropTypes.shape({}),
  children: PropTypes.node,
};

CustomLoadedTabPageMain.defaultProps = {
  title: '',
  tabs: [],
  activeTabSlug: '',
  enrollmentAlert: {},
  logistrationAlert: {},
  children: null,
};

export default CustomLoadedTabPageMain;

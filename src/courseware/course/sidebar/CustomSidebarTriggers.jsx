import { breakpoints, useWindowSize } from '@openedx/paragon';

import SidebarTriggers from './SidebarTriggers';

/**
 * Right sidebar triggers for the custom UI (org.openedx.frontend.learning.right_sidebar_trigger.v1):
 * shown on small screens only; on larger screens the custom layout has no trigger bar.
 */
const CustomSidebarTriggers = () => {
  const { width } = useWindowSize();
  if (width === undefined || width >= breakpoints.small.minWidth) {
    return null;
  }
  return <SidebarTriggers />;
};

export default CustomSidebarTriggers;

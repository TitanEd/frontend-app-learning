// Course tabs added by the custom UI (the backend tab list does not have them).
import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';

import messages from './customMessages';

export const BOOKMARKS_TAB_SLUG = 'bookmarks';
export const UPDATES_TAB_SLUG = 'updates';

/** Address of a custom course page of this MFE, e.g. /learning/course/<id>/bookmarks. */
export const getCustomTabUrl = (courseId, slug) => {
  const publicPath = (getConfig().PUBLIC_PATH || '/').replace(/\/$/, '');
  return `${publicPath}/course/${courseId}/${slug}`;
};

/**
 * The backend tabs plus "Bookmarks" and "Updates", placed before "Instructor"
 * (or at the end). Both pages need a signed-in learner.
 */
export const withCustomTabs = (tabs, courseId, intl) => {
  if (!courseId || !getAuthenticatedUser()) {
    return tabs;
  }
  const customTabs = [
    { slug: BOOKMARKS_TAB_SLUG, title: intl.formatMessage(messages.bookmarksTab) },
    { slug: UPDATES_TAB_SLUG, title: intl.formatMessage(messages.updatesTab) },
  ]
    .filter(({ slug }) => !tabs.some((tab) => tab.slug === slug))
    .map((tab) => ({ ...tab, tabId: tab.slug, url: getCustomTabUrl(courseId, tab.slug) }));

  const instructorIndex = tabs.findIndex((tab) => tab.slug === 'instructor');
  if (instructorIndex === -1) {
    return [...tabs, ...customTabs];
  }
  return [...tabs.slice(0, instructorIndex), ...customTabs, ...tabs.slice(instructorIndex)];
};

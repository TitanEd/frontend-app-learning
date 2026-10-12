// API calls of the custom UI pages (bookmarks and course updates).
import { camelCaseObject, getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

/**
 * One page of the signed-in learner's bookmarks in a course, newest first.
 *
 * LMS: GET /api/bookmarks/v1/bookmarks/?course_id=…&fields=display_name,path
 * Returns { count, numPages, currentPage, results: [{ id, usageId, blockType,
 * displayName, path: [{ usageKey, displayName }], created }] }.
 */
export async function getBookmarks(courseId, page = 1, pageSize = 20) {
  const url = new URL(`${getConfig().LMS_BASE_URL}/api/bookmarks/v1/bookmarks/`);
  url.searchParams.append('course_id', courseId);
  url.searchParams.append('fields', 'display_name,path');
  url.searchParams.append('page', page);
  url.searchParams.append('page_size', pageSize);
  const { data } = await getAuthenticatedHttpClient().get(url.href);
  return camelCaseObject(data);
}

/**
 * The visible updates (announcements) of a course, newest first.
 *
 * control-hub: GET /titaned/api/v1/course-updates/<course id>/ (the platform's own list is the
 * mobile API, which only answers for courses flagged "mobile available").
 * Returns [{ id, date, content }]: `date` is the text the course team typed, `content` is
 * course-team HTML (render it with LmsHtmlFragment). The server sends them in display order.
 */
export async function getCourseUpdates(courseId) {
  const url = `${getConfig().LMS_BASE_URL}/titaned/api/v1/course-updates/${encodeURIComponent(courseId)}/`;
  const { data } = await getAuthenticatedHttpClient().get(url);
  return Array.isArray(data) ? data : [];
}

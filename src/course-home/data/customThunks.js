import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { logError } from '@edx/frontend-platform/logging';

import { updateModel } from '../../generic/model-store';
import { fetchOutlineTab, fetchTab } from './thunks';

/**
 * Outline tab fetch for the custom UI: the stock fetchOutlineTab, then the
 * course short description (shown on the custom course card) from the
 * courseware metadata API, stored on the courseHomeMeta model.
 */
export function customFetchOutlineTab(courseId) {
  return async (dispatch, getState) => {
    await dispatch(fetchOutlineTab(courseId));
    if (!getState().models.courseHomeMeta?.[courseId]) {
      return;
    }
    try {
      const { data } = await getAuthenticatedHttpClient().get(
        `${getConfig().LMS_BASE_URL}/api/courseware/course/${courseId}`,
      );
      if (data?.short_description) {
        dispatch(updateModel({
          modelType: 'courseHomeMeta',
          model: { id: courseId, shortDescription: data.short_description },
        }));
      }
    } catch (e) {
      logError(e);
    }
  };
}

// Bookmarks and Updates pages: only the course metadata (course header, tabs,
// access check) goes through the store; each page loads its own list.
export function customFetchBookmarksTab(courseId) {
  return fetchTab(courseId, 'bookmarks');
}

export function customFetchUpdatesTab(courseId) {
  return fetchTab(courseId, 'updates');
}

import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { logError } from '@edx/frontend-platform/logging';

import { updateModel } from '../../generic/model-store';
import { fetchOutlineTab } from './thunks';

/**
 * Outline tab fetch for the custom UI: the stock fetchOutlineTab, then the
 * course short description (shown on the custom course card) from the
 * courseware metadata API, stored on the courseHomeMeta model.
 */
// eslint-disable-next-line import/prefer-default-export
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

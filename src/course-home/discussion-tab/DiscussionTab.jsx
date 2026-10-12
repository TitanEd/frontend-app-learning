import { getConfig } from '@edx/frontend-platform';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, generatePath, useNavigate } from 'react-router-dom';
import { useIntl } from '@edx/frontend-platform/i18n';
import { useIFrameHeight, useIFramePluginEvents } from '../../generic/hooks';
import discussionsMessages from '../../widgets/discussions/messages';

const DiscussionTab = () => {
  const { courseId } = useSelector(state => state.courseHome);
  const { path } = useParams();
  const [originalPath] = useState(path);
  const navigate = useNavigate();
  const intl = useIntl();

  const [, iFrameHeight] = useIFrameHeight();
  useIFramePluginEvents({
    'discussions.navigate': (payload) => {
      const basePath = generatePath('/course/:courseId/discussion', { courseId });
      navigate(`${basePath}/${payload.path}`);
    },
  });
  const discussionsUrl = `${getConfig().DISCUSSIONS_MFE_BASE_URL}/${courseId}/${originalPath}`;
  return (
    <iframe
      src={discussionsUrl}
      className="d-flex w-100 border-0"
      height={iFrameHeight}
      style={{ minHeight: '60rem' }}
      title={intl.formatMessage(discussionsMessages.discussionsTitle)}
    />
  );
};

export default DiscussionTab;

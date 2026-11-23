import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Button, Icon } from '@openedx/paragon';
import { Lock } from '@openedx/paragon/icons';

import PageLoading from '@src/generic/PageLoading';

import sequenceMessages from './messages';
import messages from './customSequenceMessages';

const CustomSequenceUnavailable = ({ courseId, sequenceId }) => {
  const intl = useIntl();
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    let isMounted = true;
    setStatus('checking');

    getAuthenticatedHttpClient()
      .get(`${getConfig().LMS_BASE_URL}/api/courseware/sequence/${sequenceId}`)
      .then(() => {
        if (isMounted) {
          setStatus('error');
        }
      })
      .catch((error) => {
        if (!isMounted) {
          return;
        }
        const responseStatus = error?.response?.status;
        if (responseStatus === 403 || responseStatus === 404) {
          setStatus('unavailable');
        } else {
          setStatus('error');
        }
      });

    return () => {
      isMounted = false;
    };
  }, [sequenceId]);

  if (status === 'checking') {
    return <PageLoading srMessage={intl.formatMessage(messages.checking)} />;
  }

  if (status === 'unavailable') {
    return (
      <div className="text-center py-5 mx-auto" style={{ maxWidth: '30em' }}>
        <Icon src={Lock} className="mx-auto mb-3 text-primary" size="lg" />
        <h3>{intl.formatMessage(messages.title)}</h3>
        <p>{intl.formatMessage(messages.body)}</p>
        <Button as={Link} to={`/course/${courseId}/home`} variant="primary">
          {intl.formatMessage(messages.backToCourse)}
        </Button>
      </div>
    );
  }

  return (
    <p className="text-center py-5 mx-auto" style={{ maxWidth: '30em' }}>
      {intl.formatMessage(sequenceMessages.loadFailure)}
    </p>
  );
};

CustomSequenceUnavailable.propTypes = {
  courseId: PropTypes.string,
  sequenceId: PropTypes.string,
};

export default CustomSequenceUnavailable;

// Updates page of the custom UI (/course/:courseId/updates): the course
// updates (announcements) written by the course team, newest first.
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { logError } from '@edx/frontend-platform/logging';
import {
  Alert, Button, Card, Icon, Spinner,
} from '@openedx/paragon';
import { Campaign, Event } from '@openedx/paragon/icons';

import { useModel } from '../../generic/model-store';
import { getCourseUpdates } from '../data/customApi';
import LmsHtmlFragment from '../outline-tab/LmsHtmlFragment';
import tabMessages from '../../course-tabs/customMessages';
import messages from './messages';

const CustomUpdatesTab = () => {
  const intl = useIntl();
  const { courseId } = useSelector(state => state.courseHome);
  const { title: courseTitle } = useModel('courseHomeMeta', courseId);

  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState('loading');
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    let isCurrent = true;
    setStatus('loading');
    getCourseUpdates(courseId)
      .then((items) => {
        if (isCurrent) {
          setUpdates(items);
          setStatus('loaded');
        }
      })
      .catch((error) => {
        logError(error);
        if (isCurrent) {
          setStatus('failed');
        }
      });
    return () => { isCurrent = false; };
  }, [courseId, attempt]);

  const retry = useCallback(() => setAttempt((value) => value + 1), []);

  // The date is text typed by the course team ("January 01, 2026"): show it in
  // the learner's language when it can be read, as typed otherwise.
  const formatUpdateDate = (date) => {
    const time = Date.parse(date);
    if (Number.isNaN(time)) {
      return date;
    }
    return intl.formatDate(time, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <section className="mb-4" data-testid="custom-updates-tab">
      <Helmet>
        <title>
          {`${intl.formatMessage(tabMessages.updatesTab)} | ${courseTitle} | ${getConfig().SITE_NAME}`}
        </title>
      </Helmet>
      <h1 className="h2 my-3">{intl.formatMessage(messages.title)}</h1>

      {status === 'loading' && (
        <div className="d-flex justify-content-center py-5">
          <Spinner animation="border" variant="primary" screenReaderText={intl.formatMessage(messages.loading)} />
        </div>
      )}

      {status === 'failed' && (
        <Alert
          variant="danger"
          actions={[
            <Button onClick={retry}>{intl.formatMessage(messages.retry)}</Button>,
          ]}
        >
          {intl.formatMessage(messages.failure)}
        </Alert>
      )}

      {status === 'loaded' && updates.length === 0 && (
        <Card>
          <Card.Section className="text-center py-5">
            <Icon src={Campaign} className="mx-auto mb-3 text-primary" size="lg" />
            <h2 className="h4">{intl.formatMessage(messages.emptyTitle)}</h2>
            <p className="text-muted mb-0">{intl.formatMessage(messages.emptyBody)}</p>
          </Card.Section>
        </Card>
      )}

      {status === 'loaded' && updates.length > 0 && (
        <ul className="list-unstyled mb-0">
          {updates.map((update) => (
            <li key={update.id} className="mb-3">
              <Card>
                <Card.Section>
                  {update.date && (
                    <h2 className="h4 d-flex align-items-center mb-3">
                      <Icon src={Event} className="text-primary mr-2 flex-shrink-0" />
                      {formatUpdateDate(update.date)}
                    </h2>
                  )}
                  <LmsHtmlFragment
                    className="inline-link"
                    html={update.content || ''}
                    title={intl.formatMessage(messages.updateFrameTitle)}
                  />
                </Card.Section>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default CustomUpdatesTab;

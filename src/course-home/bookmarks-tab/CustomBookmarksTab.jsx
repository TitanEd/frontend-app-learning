// Bookmarks page of the custom UI (/course/:courseId/bookmarks): the learner's
// bookmarked units in this course, each linking to the unit in this MFE.
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { logError } from '@edx/frontend-platform/logging';
import {
  Alert, Button, Card, Icon, Pagination, Spinner,
} from '@openedx/paragon';
import { Bookmark, BookmarkBorder, ChevronRight } from '@openedx/paragon/icons';

import { useModel } from '../../generic/model-store';
import { getBookmarks } from '../data/customApi';
import tabMessages from '../../course-tabs/customMessages';
import messages from './messages';

const PAGE_SIZE = 20;

// A unit opens in this MFE; anything else goes through the LMS "jump to" redirect.
const getBookmarkLink = (courseId, { usageId, blockType, path }) => {
  const sequence = (path || []).find(({ usageKey }) => usageKey?.includes('type@sequential'));
  if (blockType === 'vertical' && sequence) {
    return { to: `/course/${courseId}/${sequence.usageKey}/${usageId}` };
  }
  return { href: `${getConfig().LMS_BASE_URL}/courses/${courseId}/jump_to/${usageId}` };
};

const CustomBookmarksTab = () => {
  const intl = useIntl();
  const { courseId } = useSelector(state => state.courseHome);
  const { title: courseTitle } = useModel('courseHomeMeta', courseId);

  const [page, setPage] = useState(1);
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState('loading');
  const [data, setData] = useState({ results: [], numPages: 1 });

  useEffect(() => {
    let isCurrent = true;
    setStatus('loading');
    getBookmarks(courseId, page, PAGE_SIZE)
      .then((response) => {
        if (isCurrent) {
          setData({ results: response.results || [], numPages: response.numPages || 1 });
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
  }, [courseId, page, attempt]);

  const retry = useCallback(() => setAttempt((value) => value + 1), []);
  const { results, numPages } = data;

  return (
    <section className="mb-4" data-testid="custom-bookmarks-tab">
      <Helmet>
        <title>
          {`${intl.formatMessage(tabMessages.bookmarksTab)} | ${courseTitle} | ${getConfig().SITE_NAME}`}
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

      {status === 'loaded' && results.length === 0 && (
        <Card>
          <Card.Section className="text-center py-5">
            <Icon src={BookmarkBorder} className="mx-auto mb-3 text-primary" size="lg" />
            <h2 className="h4">{intl.formatMessage(messages.emptyTitle)}</h2>
            <p className="text-muted mb-4">{intl.formatMessage(messages.emptyBody)}</p>
            <Button as={Link} to={`/course/${courseId}/home`} variant="outline-primary">
              {intl.formatMessage(messages.emptyAction)}
            </Button>
          </Card.Section>
        </Card>
      )}

      {status === 'loaded' && results.length > 0 && (
        <>
          <ul className="list-unstyled mb-0">
            {results.map((bookmark) => {
              const link = getBookmarkLink(courseId, bookmark);
              const name = bookmark.displayName || intl.formatMessage(messages.unnamedUnit);
              const pathNames = (bookmark.path || []).map(({ displayName }) => displayName).filter(Boolean);
              return (
                <li key={bookmark.id} className="mb-3">
                  <Card>
                    <Card.Section className="d-flex align-items-start">
                      <Icon src={Bookmark} className="text-primary mr-3 mt-1 flex-shrink-0" />
                      <div className="flex-grow-1" style={{ minWidth: 0 }}>
                        {pathNames.length > 0 && (
                          <p className="text-muted mb-1 d-flex flex-wrap align-items-center">
                            {pathNames.map((pathName, index) => (
                              // eslint-disable-next-line react/no-array-index-key
                              <React.Fragment key={index}>
                                {index > 0 && <Icon src={ChevronRight} size="xs" className="mx-1" />}
                                <span>{pathName}</span>
                              </React.Fragment>
                            ))}
                          </p>
                        )}
                        <h2 className="h4 mb-1">
                          {link.to
                            ? <Link to={link.to}>{name}</Link>
                            : <a href={link.href}>{name}</a>}
                        </h2>
                        <p className="text-muted mb-0">
                          {intl.formatMessage(messages.bookmarkedOn, {
                            date: intl.formatDate(bookmark.created, {
                              year: 'numeric', month: 'long', day: 'numeric',
                            }),
                          })}
                        </p>
                      </div>
                    </Card.Section>
                  </Card>
                </li>
              );
            })}
          </ul>
          {numPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination
                paginationLabel={intl.formatMessage(messages.pagination)}
                pageCount={numPages}
                currentPage={page}
                onPageSelect={setPage}
              />
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default CustomBookmarksTab;

import React from 'react';
import { useSelector } from 'react-redux';

import { useIntl } from '@edx/frontend-platform/i18n';

import { PluginSlot } from '@openedx/frontend-plugin-framework';
import DateSummary from '../DateSummary';
import messages from '../messages';
import { useModel } from '../../../generic/model-store';

const CourseDates = () => {
  const intl = useIntl();
  const {
    courseId,
  } = useSelector(state => state.courseHome);
  const {
    userTimezone,
  } = useModel('courseHomeMeta', courseId);
  const {
    datesWidget: {
      courseDateBlocks,
      datesTabLink,
    },
  } = useModel('outline', courseId);

  if (courseDateBlocks.length === 0) {
    return null;
  }

  return (
    <section className="mb-4">
      <div id="courseHome-dates">
        <h2 className="h4">{intl.formatMessage(messages.dates)}</h2>
        <ol className="list-unstyled imp-dates-styles">
          {courseDateBlocks.map((courseDateBlock) => (
            <DateSummary
              key={courseDateBlock.title + courseDateBlock.date}
              dateBlock={courseDateBlock}
              userTimezone={userTimezone}
            />
          ))}
        </ol>
        <PluginSlot
          id="course_dates_plugin_slot"
          pluginProps={{
            href: datesTabLink,
            messages: intl.formatMessage(messages.allDates),
          }}
        >
          <a id="dates-tab-link" className="font-weight-bold ml-4 pl-1 small" href={datesTabLink}>
            {intl.formatMessage(messages.allDates)}
          </a>
        </PluginSlot>
      </div>
    </section>
  );
};

export default CourseDates;

import React, { useEffect, useState } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Collapsible, IconButton } from '@openedx/paragon';
import { Minus, Plus } from '@openedx/paragon/icons';
import { PluginSlot } from '@openedx/frontend-plugin-framework';

import { useModel } from '../../../generic/model-store';
import genericMessages from '../../../generic/messages';
import { useContextId } from '../../../data/hooks';
import messages from '../messages';
import SectionTitle from './SectionTitle';
import SequenceLink from './SequenceLink';

interface Props {
  defaultOpen: boolean;
  expand: boolean;
  section: {
    complete: boolean;
    sequenceIds: string[];
    title: string;
    hideFromTOC: boolean;
  };
}

const Section: React.FC<Props> = ({
  defaultOpen,
  expand,
  section,
}) => {
  const intl = useIntl();
  const courseId = useContextId();
  const {
    complete,
    sequenceIds,
    title,
    hideFromTOC,
  } = section;
  const {
    courseBlocks: {
      sequences,
    },
  } = useModel('outline', courseId);

  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    setOpen(expand);
  }, [expand]);

  useEffect(() => {
    setOpen(defaultOpen);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <li>
      <Collapsible
        className="mb-2"
        styling="card-lg"
        title={<SectionTitle {...{ complete, hideFromTOC, title }} />}
        open={open}
        onToggle={() => { setOpen(!open); }}
        iconWhenClosed={(
          <PluginSlot
            id="section_icon_open_plugin_slot"
            pluginProps={{
              alt: intl.formatMessage(messages.openSection),
              onClick: () => { setOpen(true); },
            }}
          >
            <IconButton
              alt={intl.formatMessage(messages.openSection)}
              iconAs={Plus}
              onClick={() => { setOpen(true); }}
              size="sm"
            />
          </PluginSlot>
        )}
        iconWhenOpen={(
          <PluginSlot
            id="section_icon_close_plugin_slot"
            pluginProps={{
              alt: intl.formatMessage(genericMessages.close),
              onClick: () => { setOpen(false); },
            }}
          >
            <IconButton
              alt={intl.formatMessage(genericMessages.close)}
              iconAs={Minus}
              onClick={() => { setOpen(false); }}
              size="sm"
            />
          </PluginSlot>
        )}
      >
        <ol className="list-unstyled">
          {sequenceIds.map((sequenceId, index) => (
            <SequenceLink
              key={sequenceId}
              id={sequenceId}
              sequence={sequences[sequenceId]}
              first={index === 0}
            />
          ))}
        </ol>
      </Collapsible>
    </li>
  );
};

export default Section;

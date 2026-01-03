/* eslint-disable react/prop-types */
import React from 'react';
import { IconButton, OverlayTrigger, Popover } from '@openedx/paragon';

const CustomProgressGradeSummary = ({
  showTooltip,
  setShowTooltip,
  intl,
  messages,
  InfoOutline,
  Icon,
  gradesFeatureIsFullyLocked,
  allOfSomeAssignmentTypeIsLocked,
  Blocked,
}) => (
  <>
    <div className="row w-100 m-0 align-items-center">
      <h3 className="h2 custom-progress-tabs-titles">{intl.formatMessage(messages.gradeSummary)}</h3>
      <OverlayTrigger
        trigger="click"
        placement="top"
        show={showTooltip}
        overlay={(
          <Popover>
            <Popover.Content className="small text-dark-700">
              {intl.formatMessage(messages.gradeSummaryTooltipBody)}
            </Popover.Content>
          </Popover>
        )}
      >
        <IconButton
          onClick={() => { setShowTooltip(!showTooltip); }}
          onBlur={() => { setShowTooltip(false); }}
          alt={intl.formatMessage(messages.gradeSummaryTooltipAlt)}
          src={InfoOutline}
          iconAs={Icon}
          className="mb-3"
          size="sm"
          disabled={gradesFeatureIsFullyLocked}
        />
      </OverlayTrigger>
      {!gradesFeatureIsFullyLocked && allOfSomeAssignmentTypeIsLocked && (
        <div className="mb-3 small ml-0 d-inline">
          <Icon className="mr-1 mt-1 d-inline-flex" style={{ height: '1rem', width: '1rem' }} src={Blocked} data-testid="blocked-icon" />
          {intl.formatMessage(messages.gradeSummaryLimitedAccessExplanation)}
        </div>
      )}
    </div>
    <hr className="customHr" />
  </>
);
export default CustomProgressGradeSummary;

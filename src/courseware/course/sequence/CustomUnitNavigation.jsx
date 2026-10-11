/* eslint-disable react/prop-types */
import React from 'react';
import { breakpoints, useWindowSize } from '@openedx/paragon';
import { UnitNavigation } from './sequence-navigation';
import SidebarTriggers from '../sidebar/SidebarTriggers';

const CustomUnitNavigation = (props) => {
  const {
    courseId, sequenceId, unitId, isAtTop, onClickPrevious, onClickNext,
  } = props;
  const isMobileView = useWindowSize().width < breakpoints.small.minWidth;
  if (isMobileView) {
    return (
      <div className="d-flex flex-row w-100 gap-2 justify-content-end">
        <UnitNavigation
          courseId={courseId}
          sequenceId={sequenceId}
          unitId={unitId}
          isAtTop={isAtTop}
          onClickPrevious={onClickPrevious}
          onClickNext={onClickNext}
        />
      </div>
    );
  }
  return (
    <div className="d-flex flex-row w-100 gap-2 justify-content-end custom-unit-navigation">
      <div>
        <UnitNavigation
          courseId={courseId}
          sequenceId={sequenceId}
          unitId={unitId}
          isAtTop={isAtTop}
          onClickPrevious={onClickPrevious}
          onClickNext={onClickNext}
        />
      </div>
      {isAtTop && (
      <div className="ml-2" style={{ marginTop: '0.2rem' }}>
        <SidebarTriggers />
      </div>
      )}
    </div>
  );
};

export default CustomUnitNavigation;

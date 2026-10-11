// Copy of ProgressTab.jsx for the custom UI: same data, rendered by <CustomProgressTab />.
import { useMemo } from 'react';
import { breakpoints, useWindowSize } from '@openedx/paragon';
import { useContextId } from '../../data/hooks';
import { useModel } from '../../generic/model-store';


import { useGetExamsData } from './hooks';
import CustomProgressTab from './CustomProgressTab';

const CustomProgressTabPage = () => {
  const courseId = useContextId();
  const {
    disableProgressGraph, sectionScores, gradesFeatureIsFullyLocked,
  } = useModel('progress', courseId);

  const applyLockedOverlay = gradesFeatureIsFullyLocked ? 'locked-overlay' : '';

  const sequenceIds = useMemo(() => (
    sectionScores.flatMap((section) => (section.subsections)).map((subsection) => subsection.blockKey)
  ), [sectionScores]);

  useGetExamsData(courseId, sequenceIds);

  const windowWidth = useWindowSize().width;
  if (windowWidth === undefined) {
    // Bail because we don't want to load <CertificateStatus/> twice, emitting 'visited' events both times.
    // This is a hacky solution, since the user can resize the screen and still get two visited events.
    // But I'm leaving a larger refactor as an exercise to a future reader.
    return null;
  }

  const wideScreen = windowWidth >= breakpoints.large.minWidth;
  return (
    <CustomProgressTab
      disableProgressGraph={disableProgressGraph}
      wideScreen={wideScreen}
      applyLockedOverlay={applyLockedOverlay}
      gradesFeatureIsFullyLocked={gradesFeatureIsFullyLocked}
    />
  );
};

export default CustomProgressTabPage;

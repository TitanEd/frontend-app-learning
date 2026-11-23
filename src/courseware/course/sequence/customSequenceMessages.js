import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  checking: {
    id: 'tels.learning.sequence.unavailable.checking',
    defaultMessage: 'Checking this content…',
    description: 'Screen reader message while re-checking whether a sequence is available',
  },
  title: {
    id: 'tels.learning.sequence.unavailable.title',
    defaultMessage: "This content isn't available",
    description: 'Heading shown when a course subsection is hidden or no longer accessible',
  },
  body: {
    id: 'tels.learning.sequence.unavailable.body',
    defaultMessage: 'The course team has hidden this section, or it closed after its due date.',
    description: 'Explanation shown when a course subsection is hidden or no longer accessible',
  },
  backToCourse: {
    id: 'tels.learning.sequence.unavailable.backToCourse',
    defaultMessage: 'Back to course',
    description: 'Label for the button that returns the learner to the course home',
  },
});

export default messages;

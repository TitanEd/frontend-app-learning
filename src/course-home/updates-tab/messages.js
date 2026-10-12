import { defineMessages } from '@edx/frontend-platform/i18n';

// Messages of the custom course updates page (CustomUpdatesTab).
const messages = defineMessages({
  title: {
    id: 'learning.custom.updates.title',
    defaultMessage: 'Course updates',
    description: 'Heading of the page that lists the updates (announcements) of a course',
  },
  loading: {
    id: 'learning.custom.updates.loading',
    defaultMessage: 'Loading course updates…',
    description: 'Screen reader text while the course updates are loading',
  },
  failure: {
    id: 'learning.custom.updates.failure',
    defaultMessage: 'The course updates could not be loaded. Please try again.',
    description: 'Error shown when the course updates request fails',
  },
  retry: {
    id: 'learning.custom.updates.retry',
    defaultMessage: 'Try again',
    description: 'Button that loads the course updates again after an error',
  },
  emptyTitle: {
    id: 'learning.custom.updates.empty.title',
    defaultMessage: 'No updates yet',
    description: 'Heading shown when the course has no update',
  },
  emptyBody: {
    id: 'learning.custom.updates.empty.body',
    defaultMessage: 'News and announcements from your course team will appear here.',
    description: 'Explanation shown when the course has no update',
  },
  updateFrameTitle: {
    id: 'learning.custom.updates.frame.title',
    defaultMessage: 'Course update',
    description: 'Accessible title of the frame that shows the text of one course update',
  },
});

export default messages;

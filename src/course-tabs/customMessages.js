import { defineMessages } from '@edx/frontend-platform/i18n';

// Titles of the course tabs added by the custom UI.
const messages = defineMessages({
  bookmarksTab: {
    id: 'learning.custom.tabs.bookmarks',
    defaultMessage: 'Bookmarks',
    description: 'Title of the course tab that lists the bookmarks of the learner',
  },
  updatesTab: {
    id: 'learning.custom.tabs.updates',
    defaultMessage: 'Updates',
    description: 'Title of the course tab that lists the course updates (announcements)',
  },
});

export default messages;

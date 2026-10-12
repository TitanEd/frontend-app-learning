import { defineMessages } from '@edx/frontend-platform/i18n';

// Messages of the custom bookmarks page (CustomBookmarksTab).
const messages = defineMessages({
  title: {
    id: 'learning.custom.bookmarks.title',
    defaultMessage: 'My bookmarks',
    description: 'Heading of the bookmarks page of a course',
  },
  loading: {
    id: 'learning.custom.bookmarks.loading',
    defaultMessage: 'Loading your bookmarks…',
    description: 'Screen reader text while the bookmarks are loading',
  },
  failure: {
    id: 'learning.custom.bookmarks.failure',
    defaultMessage: 'Your bookmarks could not be loaded. Please try again.',
    description: 'Error shown when the bookmarks request fails',
  },
  retry: {
    id: 'learning.custom.bookmarks.retry',
    defaultMessage: 'Try again',
    description: 'Button that loads the bookmarks again after an error',
  },
  emptyTitle: {
    id: 'learning.custom.bookmarks.empty.title',
    defaultMessage: 'You have not bookmarked any units yet',
    description: 'Heading shown when the learner has no bookmark in this course',
  },
  emptyBody: {
    id: 'learning.custom.bookmarks.empty.body',
    defaultMessage: 'Use the Bookmark button at the top of a unit to save it here and come back to it later.',
    description: 'Explanation shown when the learner has no bookmark in this course',
  },
  emptyAction: {
    id: 'learning.custom.bookmarks.empty.action',
    defaultMessage: 'Go to the course',
    description: 'Link to the course home page, shown when there are no bookmarks',
  },
  bookmarkedOn: {
    id: 'learning.custom.bookmarks.date',
    defaultMessage: 'Bookmarked on {date}',
    description: 'Date on which the learner bookmarked a unit',
  },
  unnamedUnit: {
    id: 'learning.custom.bookmarks.unnamed',
    defaultMessage: 'Untitled unit',
    description: 'Name shown for a bookmarked unit that has no title',
  },
  pagination: {
    id: 'learning.custom.bookmarks.pagination',
    defaultMessage: 'Bookmarks pages',
    description: 'Accessible label of the page selector under the bookmarks list',
  },
});

export default messages;

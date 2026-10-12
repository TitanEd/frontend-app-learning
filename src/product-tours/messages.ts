import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  beginTour: {
    id: 'tours.button.beginTour',
    defaultMessage: 'Begin tour',
    description: 'A button used to start a tour of the website',
  },
  launchTour: {
    id: 'tours.button.launchTour',
    defaultMessage: 'Launch tour',
    description: 'A button used to launch a tour of the website',
  },
  newUserModalAriaTitle: {
    id: 'tours.custom.newUserModal.ariaTitle',
    defaultMessage: 'New user course home prompt',
    description: 'Accessible name (screen readers) of the dialog that offers a new learner a tour of the course home page',
  },
  newUserModalBody: {
    id: 'tours.newUserModal.body',
    defaultMessage: 'Let’s take a quick tour of {siteName} so you can get the most out of your course.',
  },
  newUserModalTitleWelcome: {
    id: 'tours.newUserModal.title.welcome',
    defaultMessage: 'Welcome to your',
    description: 'The beginning of the phrase "Welcome to your edX course!"',
  },
  skipForNow: {
    id: 'tours.button.skipForNow',
    defaultMessage: 'Skip for now',
    description: 'A button used to dismiss the modal and skip the optional tour of the website',
  },
});

export default messages;

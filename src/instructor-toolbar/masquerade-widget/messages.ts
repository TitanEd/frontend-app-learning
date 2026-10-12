import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  genericError: {
    id: 'masquerade-widget.userName.error.generic',
    defaultMessage: 'An error has occurred; please try again.',
    description: 'Message shown after a general error when attempting to masquerade',
  },
  placeholder: {
    id: 'masquerade-widget.userName.input.placeholder',
    defaultMessage: 'Username or email',
    description: 'Placeholder text to prompt for a user to masquerade as',
  },
  userNameLabel: {
    id: 'masquerade-widget.userName.input.label',
    defaultMessage: 'Masquerade as this user',
    description: 'Label for the masquerade user input',
  },
  titleViewAs: {
    id: 'instructor.toolbar.view.as',
    defaultMessage: 'View this course as:',
    description: 'Button to view this course as',
  },
  titleStaff: {
    id: 'instructor.toolbar.staff',
    defaultMessage: 'Staff',
    description: 'Button Staff',
  },
  optionLearner: {
    id: 'instructor.toolbar.option.learner',
    defaultMessage: 'Learner',
    description: 'Option of the "View this course as" menu: see the course as any learner does',
  },
  optionSpecificStudent: {
    id: 'instructor.toolbar.option.specificStudent',
    defaultMessage: 'Specific Student...',
    description: 'Option of the "View this course as" menu: see the course as one learner, chosen next',
  },
});

export default messages;

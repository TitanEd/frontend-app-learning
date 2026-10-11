import { defineMessages } from '@edx/frontend-platform/i18n';

// Messages of the custom course home outline (CustomOutlineTab).
const messages = defineMessages({
  courseBadge: {
    id: 'learning.outline.custom.course.badge',
    defaultMessage: 'Course',
    description: 'Badge on the course card at the top of the course home page',
  },
  courseImageAlt: {
    id: 'learning.outline.custom.course.image.alt',
    defaultMessage: 'Course',
    description: 'Alt text of the course card image',
  },
  courseContent: {
    id: 'learning.outline.custom.course.content',
    defaultMessage: 'Course Content',
    description: 'Heading of the course sections list',
  },
});

export default messages;

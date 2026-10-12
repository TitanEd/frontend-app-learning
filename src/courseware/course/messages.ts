import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  breadcrumbsLabel: {
    id: 'learn.custom.breadcrumbs.label',
    defaultMessage: 'breadcrumb',
    description: 'Accessible name (screen readers) of the breadcrumb navigation above a unit',
  },
  closeSidebarTrigger: {
    id: 'sidebar.close.button',
    defaultMessage: 'Close sidebar',
    description: 'Button to close the active sidebar panel',
  },
  responsiveCloseSidebarPanel: {
    id: 'sidebar.responsive.close.button',
    defaultMessage: 'Back to course',
    description: 'Responsive back-button to close the sidebar and return to course content',
  },
});

export default messages;

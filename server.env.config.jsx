from tutor import hooks
from tutormfe.hooks import PLUGIN_SLOTS


hooks.Filters.ENV_PATCHES.add_item(
     (
         "mfe-env-config-runtime-definitions-learning",
         """
        // This file contains configuration for plugins and environment variables.
const { PLUGIN_OPERATIONS, DIRECT_PLUGIN } = await import('@openedx/frontend-plugin-framework');
const { faChevronUp, faChevronDown } = await import('@fortawesome/free-solid-svg-icons');
const { IconButton } = await import('@openedx/paragon');
const { FormattedDate } = await import('@edx/frontend-platform/i18n');
const { default: CustomCourseTools } = await import('./src/course-home/outline-tab/widgets/CustomCourseTools');
const { default: CustomDateSummary } = await import('./src/course-home/outline-tab/CustomDateSummary');
const { default: CustomFlagButton } = await import('./src/course-home/outline-tab/widgets/CustomFlagButton');
const { default: CustomWeeklyLearningGoalCard } = await import('./src/course-home/outline-tab/widgets/CustomWeeklyLearningGoalCard');
const { default: CustomOutlineTab } = await import('./src/course-home/outline-tab/CustomOutlineTab');
const { default: CourseHeader } = await import('./src/tab-page/CourseHeader');
const { default: CustomProgressTab } = await import('./src/course-home/progress-tab/CustomProgressTab');
const { classNames } = await import('classnames');
const { default: CustomGradeBar } = await import('./src/course-home/progress-tab/grades/course-grade/CustomGradeBar');
const { default: CustomGradeSummaryTable } = await import('./src/course-home/progress-tab/grades/grade-summary/CustomGradeSummaryTable');

{% raw %}

config = {
  ...config,
  ...process.env,
}

config.pluginSlots = {
    example_plugin_slot: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: "header_plugin_slot",
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: () => <div>This is Header</div>, // Render "This is Header" text
          },
        },
      ],
    },
    section_icon_open_plugin_slot: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: "section_icon_open_plugin_slot",
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => (
              <IconButton
                alt={props.alt}
                icon={faChevronDown}
                onClick={props.onClick}
                size="sm"
              />
            ),
          },
        },
      ],
    },
    section_icon_close_plugin_slot: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: "section_icon_close_plugin_slot",
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => (
              <IconButton
                alt={props.alt}
                icon={faChevronUp}
                onClick={props.onClick}
                size="sm"
              />
            ),
          },
        },
      ],
    },
    course_dates_plugin_slot: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: "course_dates_plugin_slot",
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => (
              <a className="font-weight-bold small" href={props.href}>
                {props.messages}
              </a>
            ),
          },
        },
      ],
    },
    course_tools_plugin_slot: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: "course_tools_plugin_slot",
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => <CustomCourseTools {...props} />,
          },
        },
      ],
    },
    date_summary_plugin_slot: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: "date_summary_plugin_slot",
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => <CustomDateSummary {...props} />,
          },
        },
      ],
    },
    flag_button_plugin_slot: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: "flag_button_plugin_slot",
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => <CustomFlagButton {...props} />,
          },
        },
      ],
    },
    weekly_learning_goal_card_plugin_slot: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: "weekly_learning_goal_card_plugin_slot",
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => (
              <CustomWeeklyLearningGoalCard {...props} />
            ),
          },
        },
      ],
    },
    outline_tab_plugin_slot: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: "outline_tab_plugin_slot",
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => <CustomOutlineTab {...props} />,
          },
        },
      ],
    },
    loaded_tab_page_plugin_slot: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Hide,
          widget: {
            id: "outline_tab_plugin_slot",
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => {},
          },
        },
      ],
    },
    hide_header_plugin_slot: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Hide,
          widget: {
            id: "hide_header_plugin_slot",
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => {},
          },
        },
      ],
    },
    course_header_plugin_slot: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: "course_header_plugin_slot",
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => <CourseHeader {...props} />,
          },
        },
      ],
    },
    progress_tab_plugin_slot: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: "progress_tab_plugin_slot",
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => <CustomProgressTab {...props} />,
          },
        },
      ],
    },
    footer_hide_plugin_slot: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Hide,
          widget: {
            id: "footer_hide_plugin_slot",
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: () => {},
          },
        },
      ],
    },
    day_timeline_plugin_slot: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: "day_timeline_plugin_slot",
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => {
              // Function to check if the date is today
              const isToday = (dateToCheck) => {
                const today = new Date();
                return dateToCheck.toDateString() === today.toDateString();
              };

              // Check if current date is today
              const isCurrentDateToday = isToday(props.date);

              // Determine line color - use custom color for line above today's date
              const getTopLineClassName = () => {
                if (isCurrentDateToday) {
                  return "dates-line-top border-1 border-left today-line";
                }
                return "dates-line-top border-1 border-left border-gray-900 bg-gray-900";
              };

              const getBottomLineClassName = () => {
                if (isCurrentDateToday) {
                  return "dates-line-bottom border-1 border-left border-gray-900 bg-gray-900";
                }
                return "dates-line-bottom border-1 border-left today-line";
              };

              return (
                <>
                {/* Top Line */}
                {!props.first && <div className={getTopLineClassName()} />}
                
                {/* Dot */}
                <div>
                  {props.first ? <div className={classNames(props.color, 'dates-dot border border-gray-900 first')} />
                  : props.last ? <div className={classNames(props.color, 'dates-dot border last')} />
                  :<div className={classNames(props.color, 'dates-dot border border-gray-900 today')} />}
                </div>
                
                {/* Bottom Line */}
                {!props.last && <div className={getBottomLineClassName()} />}
              </>
            );
          },
          },
        },
      ],
    },
    dates_tab_description_plugin_slot: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: "dates_tab_description_plugin_slot",
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => (
              <div>
                {props.item.description && (
                  <div className="small mb-2 dates-info">
                    {props.item.description}
                  </div>
                )}
              </div>
            ),
          },
        },
      ],
    },
    dates_tab_today_date_plugin_slot: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: "dates_tab_today_date_plugin_slot",
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => {
              // Function to check if the date is today
              const isToday = (dateToCheck) => {
                const today = new Date();
                return dateToCheck.toDateString() === today.toDateString();
              };

              // Check if current date is today
              const isCurrentDateToday = isToday(props.date);

              return (
                <div
                  className={classNames(
                    "row w-100 m-0 mb-1 align-items-center text-primary-700",
                    { "today-date-style": isCurrentDateToday }
                  )}
                  data-testid="dates-header"
                >
                  <FormattedDate
                    value={props.date}
                    day="numeric"
                    month="short"
                    weekday="short"
                    year="numeric"
                    {...props.timezoneFormatArgs}
                  />
                </div>
              );
            },
          },
        },
      ],
    },
    grade_bar_plugin_slot: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: "progress_tab_plugin_slot",
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => <CustomGradeBar {...props} />,
          },
        },
      ],
    },
    course_grade_footer_plugin_slot: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Hide,
          widget: {
            id: "course_grade_footer_plugin_slot",
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => {},
          },
        },
      ],
    },
    progress_grade_summary_plugin_slot: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: "progress_grade_summary_plugin_slot",
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => <CustomGradeSummaryTable {...props} />,
          },
        },
      ],
    },
  };
{% endraw %}
"""
     ))

import React from "react";
import {
  DIRECT_PLUGIN,
  PLUGIN_OPERATIONS,
} from "@openedx/frontend-plugin-framework";

import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "@openedx/paragon";
import { FormattedDate } from "@edx/frontend-platform/i18n";
import CustomCourseTools from "./src/course-home/outline-tab/widgets/CustomCourseTools";
import CustomDateSummary from "./src/course-home/outline-tab/CustomDateSummary";
import CustomFlagButton from "./src/course-home/outline-tab/widgets/CustomFlagButton";
import CustomWeeklyLearningGoalCard from "./src/course-home/outline-tab/widgets/CustomWeeklyLearningGoalCard";
import CustomCourseHeader from "./src/tab-page/CustomCourseHeader";
import classNames from "classnames";
import CustomGradeBar from "./src/course-home/progress-tab/grades/course-grade/CustomGradeBar";
import CustomGradeSummaryTable from "./src/course-home/progress-tab/grades/grade-summary/CustomGradeSummaryTable";
import CustomDayTimeline from "./src/course-home/dates-tab/timeline/CustomDayTimeline";
import CustomDateDescription from "./src/course-home/dates-tab/timeline/CustomDateDescription";
import CustomTodayDate from "./src/course-home/dates-tab/timeline/CustomTodayDate";
import CustomProgressGradeSummary from "./src/course-home/outline-tab/widgets/CustomProgressGradeSummary";
import CustomUnitNavigation from "./src/courseware/course/sequence/CustomUnitNavigation";
import CustomLayout from "./src/CustomLayout";
import CustomSidebarTriggers from "./src/courseware/course/sidebar/CustomSidebarTriggers";
import CustomLoadedTabPageMain from "./src/tab-page/CustomLoadedTabPageMain";
const getPluginSlots = () => {
return {

    app_layout_plugin_slot: {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Hide,
          widgetId: 'default_contents',
        },
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_app_layout',
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: () => <CustomLayout />,
          },
        },
      ],
    },
    // Stock learning header and footer: the custom layout has its own header.
    'org.openedx.frontend.layout.header_learning.v1': {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Hide,
          widgetId: 'default_contents',
        },
      ],
    },
    'org.openedx.frontend.layout.footer.v1': {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Hide,
          widgetId: 'default_contents',
        },
      ],
    },
    // Unit page sidebar triggers: small screens only.
    'org.openedx.frontend.learning.right_sidebar_trigger.v1': {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Hide,
          widgetId: 'default_contents',
        },
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_sidebar_triggers',
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: CustomSidebarTriggers,
          },
        },
      ],
    },
    section_icon_open_plugin_slot: {
      keepDefault: false,
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
      keepDefault: false,
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
      keepDefault: false,
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
      keepDefault: false,
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
      keepDefault: false,
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
      keepDefault: false,
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
      keepDefault: false,
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
    // Keep default_contents (InstructorToolbar / primary staff banner).
    // Course pages: custom content column (alerts, course header, tabs).
    loaded_tab_page_main_plugin_slot: {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Hide,
          widgetId: 'default_contents',
        },
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_loaded_tab_page_main',
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => <CustomLoadedTabPageMain {...props} />,
          },
        },
      ],
    },

    course_header_plugin_slot: {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: "course_header_plugin_slot",
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => <CustomCourseHeader {...props} />,
          },
        },
      ],
    },
    day_timeline_plugin_slot: {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: "day_timeline_plugin_slot",
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => <CustomDayTimeline {...props} />,
          },
        },
      ],
    },
    dates_tab_description_plugin_slot: {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: "dates_tab_description_plugin_slot",
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => <CustomDateDescription {...props} />,
          },
        },
      ],
    },
    dates_tab_today_date_plugin_slot: {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: "dates_tab_today_date_plugin_slot",
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => <CustomTodayDate {...props} />,
          },
        },
      ],
    },
    grade_bar_plugin_slot: {
      keepDefault: false,
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
    progress_grade_summary_plugin_slot: {
      keepDefault: false,
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
    progress_tab_grade_summary_plugin_slot: {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: "progress_tab_grade_summary_plugin_slot",
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => <CustomProgressGradeSummary {...props} />,
          },
        },
      ],
    },
    custom_unit_navigation_slot: {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: "custom_unit_navigation_slot",
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => <CustomUnitNavigation {...props} />,
          },
        },
      ],
    },
  };
};

// Load environment variables from .env file
const config = {
  ...process.env,
  get pluginSlots() {
    return getPluginSlots();
  },
};

export default config;

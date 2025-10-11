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
import CustomOutlineTab from "./src/course-home/outline-tab/CustomOutlineTab";
import CourseHeader from "./src/tab-page/CourseHeader";
import CustomProgressTab from "./src/course-home/progress-tab/CustomProgressTab";
import classNames from "classnames";
import CustomGradeBar from "./src/course-home/progress-tab/grades/course-grade/CustomGradeBar";
import CustomGradeSummaryTable from "./src/course-home/progress-tab/grades/grade-summary/CustomGradeSummaryTable";
import CustomDayTimeline from "./src/course-home/dates-tab/timeline/CustomDayTimeline";
import CustomDateDescription from "./src/course-home/dates-tab/timeline/CustomDateDescription";
import CustomTodayDate from "./src/course-home/dates-tab/timeline/CustomTodayDate";

const getPluginSlots = () => {
  if (typeof window !== 'undefined' && localStorage.getItem('oldUI') === 'true') {
    return {};
  }

  return {
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
            RenderWidget: (props) => <CustomDayTimeline {...props} />,
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
            RenderWidget: (props) => <CustomDateDescription {...props} />,
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
            RenderWidget: (props) => <CustomTodayDate {...props} />,
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
};

// Load environment variables from .env file
const config = {
  ...process.env,
  get pluginSlots() {
    return getPluginSlots();
  },
};

export default config;

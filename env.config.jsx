import {
  DIRECT_PLUGIN,
  PLUGIN_OPERATIONS,
} from "@openedx/frontend-plugin-framework";

import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from '@openedx/paragon';

const config = {
  ...process.env,
  pluginSlots: {
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
              onClick={ props.onClick }
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
              onClick={ props.onClick }
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
  },
};

export default config;
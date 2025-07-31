import {
  DIRECT_PLUGIN,
  PLUGIN_OPERATIONS,
} from "@openedx/frontend-plugin-framework";

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
  },
};

export default config;
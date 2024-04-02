//#slot:ui_1
const props = defineProps(["dataSource", "colums"]);
//#end;

return {
  slot: {
    ui_1: {
      element: function ui_1() {
        return `import { useAttrs, onUpdated } from "vue";
        let attrs = useAttrs();
        onUpdated(() => {
          attrs = useAttrs();
        });`;
      },
      antdv: function ui_1() {
        return ` `;
      },
    },
  },
  hook: {},
};

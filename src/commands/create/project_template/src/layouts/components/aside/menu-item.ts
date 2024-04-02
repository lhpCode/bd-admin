import SvgIcon from "@/components/svgIcon/index.vue";
//#slot:ui_1
const props = defineProps(["menuItem"]);
const styleIcon = {
  width: "20px",
  height: "20px",
  fontSize: "20px",
};
//#end;
() => {
  console.log(styleIcon, props, SvgIcon);
};
return {
  slot: {
    ui_1: {
      element: function ui_1() {
        return ``;
      },
      antdv: function ui_1() {
        return ``;
      },
    },
  },
  hook: {},
};

import SvgIcon from "@/components/svgIcon/index.vue";
import { useSystemStore } from "@/store/modules/system";
const systemStore = useSystemStore();
import MenuItem from "./menu-item.vue";
const props = defineProps(["menu", "isCollapse", "view"]);
const styleIcon = {
  width: "20px",
  height: "20px",
  fontSize: "20px",
};
//#end;
() => {
  console.log(SvgIcon, systemStore, MenuItem, props, styleIcon);
};
return {
  slot: {},
  hook: {},
};

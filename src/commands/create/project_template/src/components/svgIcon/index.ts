import "virtual:svg-icons-register";
import { useSystemStore } from "@/store/modules/system";
import { ref, watch } from "vue";
import { getCssValue } from "@/utils/index";
const systemStore = useSystemStore();
const props = defineProps({
  iconName: {
    type: String,
    default: "",
    required: true,
  },
  color: {
    type: String,
    default: "",
  },
  styleIcon: {
    type: Object,
    default: () => ({
      width: "12px",
      height: "12px",
      fontSize: "12px",
    }),
  },
});
const getId = (id: string) => {
  return id.includes("#");
};
const textColor = ref("");
watch(
  () => systemStore.themeValue,
  () => {
    textColor.value = props.color
      ? props.color
      : getCssValue("--them-head-font-color");
  },
  { immediate: true },
);
//#end;
return {
  slot: {},
  hook: {},
};

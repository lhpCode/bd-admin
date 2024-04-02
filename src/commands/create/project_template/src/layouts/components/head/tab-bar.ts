import { onMounted, onUnmounted, ref } from "vue";
import SvgIcon from "@/components/svgIcon/index.vue";
import { useSystemStore } from "@/store/modules/system";
import { useRouter } from "vue-router";
const systemStore = useSystemStore();
const router = useRouter();
let scrollNode: HTMLElement | null = null;
onMounted(() => {
  scrollNode = document.querySelector("#scroll");
  if (!scrollNode) return;
  scrollNode.addEventListener("scroll", scrollTop, true);
});
onUnmounted(() => {
  if (!scrollNode) return;
  scrollNode.removeEventListener("scroll", scrollTop);
});
const scrollLeft = ref(0);
// 实时滚动条高度
const scrollTop = () => {
  if (!scrollNode) return;
  const scroll = scrollNode.scrollLeft || scrollNode.scrollLeft;
  scrollLeft.value = scroll;
};

const clickScroll = (number: number) => {
  if (!scrollNode) return;
  scrollNode.scrollLeft = scrollLeft.value + number;
};
const goRouter = (path: string) => {
  router.push(path);
};
const styleIcon = {
  width: "10px",
  height: "10px",
  fontSize: "10px",
};
//#end;
() => {
  console.log(SvgIcon);
};
return {
  slot: {},
  hook: {},
};

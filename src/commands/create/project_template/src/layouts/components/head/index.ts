import { watch, ref } from "vue";
import SvgIcon from "@/components/svgIcon/index.vue";
import { useSystemStore } from "@/store/modules/system";
import { useUserInfoStore } from "@/store/modules/user";
import { useRouter } from "vue-router";
import TabBar from "./tab-bar.vue";
import { useScreen } from "@/layouts/hooks/useScreen";
import { useTheme } from "@/layouts/hooks/useTheme";
//#hook:hook_1
const { clickFullscreen, screen } = useScreen();
const { command, themeList } = useTheme();
const systemStore = useSystemStore();
const userInfoStore = useUserInfoStore();
const router = useRouter();
const styleIcon = {
  width: "18px",
  height: "18px",
  fontSize: "18px",
};

const clickGoGithub = () => {
  window.open("https://github.com/lili12352/hp-admin-cli");
};
const dropLogin = () => {
  userInfoStore.dropLogin();
  systemStore.resetSystem();
  router.push("/login");
};
const clickIcon = () => {
  systemStore.switchCollapse();
};

const breadcrumbList = ref<any[]>([]);
const routerList = router.getRoutes();
watch(
  () => router.currentRoute.value.path,
  (newValue) => {
    const breadcrumb = newValue.split("/");
    let path = "";
    breadcrumbList.value = [];
    for (let i = 0; i < breadcrumb.length; i++) {
      if (!breadcrumb[i]) continue;
      path = path + "/" + breadcrumb[i];
      const routerObj = routerList.find((item) => item.path === path);
      if (!routerObj) continue;
      //#hook:hook_2
    }
  },
  { immediate: true },
);
//#end;
() => {
  console.log(SvgIcon, TabBar);
};
return {
  slot: {},
  hook: {
    hook_1: {
      i18n: {
        HOOK: function () {
          return `import useLang from "../../hooks/useLang";
          const { checkI18, i18List, menuSwitchesToLang } = useLang();`;
        },
      },
    },
    hook_2: {
      i18n: {
        HOOK: function () {
          return `const title = menuSwitchesToLang(routerObj.meta.title);
          breadcrumbList.value.push({
            path: routerObj.path,
            title: title,
          });`;
        },
        FALSE: function () {
          return ` breadcrumbList.value.push({
            path:routerObj.path,
            title:routerObj.meta.title
          });`;
        },
      },
    },
  },
};

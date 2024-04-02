import { useRouter } from "vue-router";
import { useSystemStore } from "@/store/modules/system";
//#hook:hook_1
//#slot:ui_1
const systemStore = useSystemStore();
const router = useRouter();
const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const addTabBar = (path: string) => {
  const routerList = router.getRoutes();
  const tab = routerList.find((item) => item.path === path);
  if (!tab) return;
  //#hook:hook_2
  systemStore.addTabBar({
    path: tab.path,
    //#hook:hook_3
  });
};
addTabBar("/home");
//#slot:ui_2
const defaultActive = ref(router.currentRoute.value.fullPath);

//#end;
() => {
  console.log(select, defaultActive, props);
};
return {
  slot: {
    ui_1: {
      element: function ui_1() {
        return `import { ref, watch } from "vue";
        import { getCssValue } from "@/utils/index";`;
      },
      antdv: function ui_1() {
        return `import { ref } from "vue";`;
      },
    },
    ui_2: {
      element: function ui_1() {
        return `const select = (v) => {
          v.indexOf("https") === -1 ? router.push(v) : window.open(v);
          addTabBar(v);
          
        };
        const textColor = ref("");
        const backgroundColor = ref("");
        watch(
          () => systemStore.themeValue,
          () => {
            textColor.value = getCssValue("--them-menu-font-color");
            backgroundColor.value = getCssValue("--them-menu-bg-color");
          },
          { immediate: true },
        );
        `;
      },
      antdv: function ui_1() {
        return `const openKeys = ref([]);
        const getOpenKeys = (path) => {
          if (systemStore.isCollapse) return;
          const key = path.split("").reverse().join("");
          const index = key.indexOf("/") + 1;
          const keyPath = path.slice(0, key.length - index);
          if (!keyPath) return (openKeys.value = ["/"]);
          const array = [];
          const pathList = keyPath
            .split("/")
            .filter((item) => item)
            .map((item) => "/" + item);
          if (pathList.length > 1) {
            pathList.reduce((a, b) => {
              if (array.length === 0) array.push(a);
              array.push(a + b);
              return a + b;
            });
            openKeys.value = array;
          } else {
            openKeys.value = pathList;
          }
        };
        getOpenKeys(router.currentRoute.value.fullPath);
        
        const select = (v) => {
          defaultActive.value = v.key;
          getOpenKeys(v.key);
          v.key.indexOf("https") === -1 ? router.push(v.key) : window.open(v.key);
          addTabBar(v.key);
        };`;
      },
    },
  },
  hook: {
    hook_1: {
      i18n: {
        HOOK: function () {
          return `import useI18n from "../../hooks/useLang";
          const { menuSwitchesToLang } = useI18n();`;
        },
      },
    },
    hook_2: {
      i18n: {
        HOOK: function () {
          return `const title = menuSwitchesToLang(tab.meta.title);`;
        },
      },
    },
    hook_3: {
      i18n: {
        HOOK: function () {
          return `name: title,`;
        },
        FALSE: function () {
          return `name:tab.meta.title`;
        },
      },
    },
  },
};

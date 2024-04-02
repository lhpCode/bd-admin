import { ref } from "vue";
import { useSystemStore } from "@/store/modules/system";

import Menu from "./menu.vue";
import SubMenu from "./subMenu.vue";
import MenuItem from "./menu-item.vue";
//#hook:hook_1
const systemStore = useSystemStore();
interface MenuList {
  key: string;
  label: string;
  title: string;
  icon?: string;
  children?: MenuList[] | undefined;
}
const getMenuList = (routerList: RouterRes[]): MenuList[] => {
  if (!routerList || routerList.length === 0) return [];
  return routerList.map((router: RouterRes): MenuList => {
    //#hook:hook_2
    return {
      key: router.path,
      //#hook:hook_3
      title: router.path,
      icon: router?.meta?.icon,
      children: getMenuList(router.children),
    };
  });
};
const items = ref<MenuList[]>(getMenuList(systemStore.routerList));
//#end;
() => {
  console.log(Menu, SubMenu, MenuItem, systemStore);
};
return {
  slot: {},
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
          return `const title = menuSwitchesToLang(router.meta.title);`;
        },
      },
    },
    hook_3: {
      i18n: {
        HOOK: function () {
          return `label: title,`;
        },
        FALSE: function () {
          return `label: router.meta.title,`;
        },
      },
    },
  },
};

const ui = (type) => {
  let importUi = "";
  let useUi = "";
  switch (type) {
    case "antdv":
      importUi = `import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import * as antdIconsVue from "@ant-design/icons-vue";`;
      useUi = `app.use(Antd)
for (const [key, component] of Object.entries(antdIconsVue)) {
  app.component(key, component);
}
`;
      break;
    case "element":
      importUi = `import * as ElementPlusIconsVue from "@element-plus/icons-vue";`;
      useUi = `for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}`;
    default:
      break;
  }
  return {
    importUi,
    useUi,
  };
};

const i18n = (type) => {
  let importI18n = "";
  let useI18n = "";
  if (type) {
    importI18n = `
import { i18n } from "./lang/lang";`;
    useI18n = ".use(i18n)";
  }
  return {
    importI18n,
    useI18n,
  };
};

const pinia = () => {
  let importPinia = `import { initStore } from "@/store/index"`;
  let usePinia = `initStore(app);`;
  return {
    importPinia,
    usePinia,
  };
};
export const createMain = (answers) => {
  const { importUi, useUi } = ui(answers.ui);
  const { importI18n, useI18n } = i18n(answers.i18n);
  const { importPinia, usePinia } = pinia();
  return `import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "@/router";
import "@/router/protector";
import "@/styles/index.${answers.css}";
import { signSvgIcon } from "@/components/svgIcon/icon";
import { hasPermission } from "@/utils/index";
${importPinia}
${importUi}
${importI18n}
const app = createApp(App);
signSvgIcon(app);
${usePinia}
app.use(router)${useI18n};
${useUi}
router.isReady().then(() => {
  app.mount("#app");
});
//自定义按钮指令
app.directive("auth", {
  mounted(el, binding) {
    hasPermission(el, binding);
  },
});
 `;
};

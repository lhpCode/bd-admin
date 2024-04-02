import { createI18n } from "vue-i18n";
import en from "./en.json"; // 英文语言配置
import zhCN from "./zh-CN.json"; // 中文语言配置
import { getLocalStorage } from "@/utils/index";

const config: any = getLocalStorage("system");

const lang = config && config.lang ? config.lang : "zhCN";

export const i18n = createI18n({
  legacy: false, // componsition API需要设置为false
  locale: lang,
  globalInjection: true, // 可以在template模板中使用$t
  messages: {
    en,
    zhCN,
  },
});

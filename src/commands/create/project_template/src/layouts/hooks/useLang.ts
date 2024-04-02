import { useSystemStore } from "@/store/modules/system";
import langJSON from "@/lang/zh-CN.json";
import { i18n } from "@/lang/lang";
const systemStore = useSystemStore();

const checkI18 = (value: string) => {
  i18n.global.locale.value = value;
  systemStore.setLang(value);
};
const i18List = [
  {
    name: "中文",
    value: "zhCN",
  },
  {
    name: "English",
    value: "en",
  },
];

const getLangKey = (
  data: Object,
  findValue: string,
  path: string,
): string | undefined => {
  if (typeof data !== "object") return path;
  for (const [key, value] of Object.entries(data)) {
    const pathKey = path ? `${path}.${key}` : key;
    if (typeof value === "object") {
      const find = getLangKey(value, findValue, pathKey);
      if (find) return find;
    } else {
      if (value === findValue) {
        return pathKey;
      }
    }
  }
};

const menuSwitchesToLang = (findValue: string | unknown) => {
  if (!findValue || typeof findValue !== "string") return "";
  const get = getLangKey(langJSON, findValue, "");
  return get ? get : findValue;
};
export default function () {
  return { checkI18, i18List, menuSwitchesToLang };
}

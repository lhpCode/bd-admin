import { join, dirname } from "path";
import fs from "fs-extra";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const questionsList = [
  {
    type: "input",
    name: "version",
    message: "请输入项目的版本号",
    default: "0.0.0",
    validate: (value) => {
      const str = value.split(".");
      if (str.length !== 3) return "input format(0.0.0)";
      const flag = str.every((currentValue) => Number(currentValue) >= 0);
      if (!flag) return "please number";
      return flag;
    },
  },
  {
    type: "list",
    name: "variant", // key 名
    message: "请选择一个需要的语言",
    choices: [
      {
        name: "TypeScript",
        value: "TypeScript",
      },
      {
        name: "javaScript",
        value: "javaScript",
      },
    ],
  },
  {
    type: "list",
    name: "ui", // key 名
    message: "请选择一个需要的ui",
    choices: [
      {
        name: "element-plus",
        value: "element",
      },
      {
        name: "Ant Design Vue",
        value: "antdv",
      },
    ],
  },
  {
    type: "list",
    name: "css",
    message: "请选择一个css预处理器",
    choices: [
      {
        name: "scss",
        value: "scss",
      },
      {
        name: "less",
        value: "less",
      },
    ],
  },
  {
    type: "checkbox",
    name: "checkbox",
    message: "请选择需要的功能（多选）",
    choices: [
      {
        name: "eslint and Prettier",
        value: "eslint",
      },
      {
        name: "i18n国际化",
        value: "i18n",
        // disabled: "国际化正在开发中",
      },
    ],
    default: ["eslint"],
  },
  {
    type: "checkbox",
    name: "modelCheckbox",
    message: "请选择需要的模块（多选）",
    choices: [
      {
        name: "echars",
        value: "echarts",
      },
      {
        name: "three.js",
        value: "three",
      },
    ],
    default: ["echarts"],
  },
];

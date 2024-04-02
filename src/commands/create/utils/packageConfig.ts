const lang = (variant) => {
  let ts = "";
  if (variant === "TypeScript") {
    ts = `,
    "typescript": "^5.2.2",
    "vue-tsc": "^1.8.27"`;
  }
  return `"@vitejs/plugin-vue": "^5.0.4",
    "vite": "^5.1.4"${ts}`;
};

const ui = (type) => {
  let dependencies = "";
  let devDependencies = "";
  switch (type) {
    case "element":
      devDependencies = `,
    "unplugin-auto-import": "^0.17.5",
    "unplugin-vue-components": "^0.26.0"`;
      dependencies = `"@element-plus/icons-vue": "^2.3.1",
    "element-plus": "^2.6.0"`;
      break;
    case "antdv":
      dependencies = `"ant-design-vue": "^4.1.2"`;
      devDependencies = `,
      "fast-glob": "^3.3.2"`;
      break;
    default:
      return;
  }
  return {
    dependencies,
    devDependencies,
  };
};

const css = (type) => {
  if (type === "scss") {
    return `"sass": "^1.71.1",
    "sass-loader": "^14.1.1"`;
  } else {
    return `"less": "^4.2.0",
    "less-loader": "^12.2.0"`;
  }
};

const eslintWrite = (answers) => {
  const { variant, eslint } = answers;
  if (!eslint) return "";
  if (variant === "TypeScript") {
    return `,
    "vite-plugin-eslint": "^1.8.1",
    "@vue/eslint-config-typescript": "^12.0.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-config-standard-with-typescript": "^43.0.1",
    "eslint-plugin-import": "^2.29.1",
    "eslint-plugin-n": "^16.6.2",
    "eslint-plugin-prettier": "^5.1.3",
    "eslint-plugin-promise": "^6.1.1",
    "eslint-plugin-vue": "^9.22.0",
    "vue-eslint-parser": "^9.4.2"`;
  } else {
    return `,
    "vite-plugin-eslint": "^1.8.1",
    "@vue/eslint-config-prettier": "^9.0.0",
    "eslint": "^8.57.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.1.3",
    "eslint-plugin-vue": "^9.22.0",
    "prettier": "^3.2.5"`;
  }
};

const eslintScripts = (answers) => {
  if (answers.eslint) {
    return `,
    "lint": "eslint --ext .js,.vue,ts,jsx,tsx src",
    "prettier": "prettier --write ."`;
  } else {
    return "";
  }
};

const npmRunDev = (answers) => {
  if (answers.eslint) {
    return `"test": "prettier --write . & eslint --ext .js,.vue,ts,jsx,tsx src & vite --mode development",`;
  } else {
    return `"test": "vite --mode development",`;
  }
};

const i18n = (type) => {
  if (type) {
    return `,
    "vue-i18n": "^9.10.1"`;
  } else {
    return "";
  }
};

const echarts = (type) => {
  if (type) {
    return `,
    "echarts": "^5.5.0"`;
  } else {
    return "";
  }
};
const three3D = (type) => {
  if (type) {
    return `,
    "@types/three": "^0.160.0",
    "three": "^0.160.0"`;
  } else {
    return "";
  }
};

export const createPackage = (answers) => {
  const { projectName } = answers;
  return `{
  "name": "${projectName}",
  "private": true,
  "version": "${answers.version}",
  "type": "module",
  "scripts": {
    ${npmRunDev(answers)}
    "dev": "vite --mode development",
    "serve": "vite --mode development",
    "serve:pro": "vite --mode production",
    "build": "vite build --mode development",
    "build:pro": "vite build --mode production",
    "preview": "vite preview"${eslintScripts(answers)}
  },
  "dependencies": {
    "path": "^0.12.7",
    "vue": "^3.4.19",
    "vue-router": "^4.3.0",
    "pinia": "^2.1.7",
    "pinia-plugin-persistedstate": "^3.2.1",
    "axios": "^1.6.7",
    ${ui(answers.ui).dependencies}${i18n(answers.i18n)}${echarts(answers.echarts)}${three3D(answers.three)}
  },
  "devDependencies": {
    "vite-plugin-svg-icons": "^2.0.1",
    "vite-svg-loader": "^5.1.0",
    ${lang(answers.variant)}${ui(answers.ui).devDependencies},
    ${css(answers.css)}${eslintWrite(answers)}
  }
}
`;
};

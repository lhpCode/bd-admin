import inquirer from "inquirer";
import fs from "fs-extra";
import chalk from "chalk";
import { join, dirname, basename, extname } from "path";
import { createFolder } from "../../utils/index.js";
import { questionsList } from "./utils/index.js";
import { ConvertVue } from "./utils/convertVue.js";
import { createViteConfig } from "./utils/viteConfig.js";
import { createPackage } from "./utils/packageConfig.js";
import { createMain } from "./utils/main.js";
import { fileURLToPath } from "url";
import spawn from "cross-spawn";
import ora from "ora";
const message = "项目创建中。。。";
const spinner = ora(message);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const userQuestions = (projectName: string) => {
  inquirer
    .prompt(questionsList)
    .then(async (answers: any) => {
      spinner.start();
      const { checkbox, modelCheckbox } = answers;
      const modelCheckboxList = ["echarts", "three"];
      const checkboxList = ["eslint", "i18n"];
      const checkboxObj = {};
      checkboxList.forEach((key) => {
        checkboxObj[key] = checkbox.includes(key);
      });
      modelCheckboxList.forEach((key) => {
        checkboxObj[key] = modelCheckbox.includes(key);
      });

      await createTemplates({ ...answers, ...checkboxObj, projectName });

      const child = spawn("npm", ["run", "prettier"]);

      spinner.color = "blue";
      spinner.text = "格式化代码";

      child.on("close", function (code) {
        if (code !== 0) {
          console.log("\n");
          console.log(chalk.cyanBright("项目创建完毕"));
          console.log(chalk.cyanBright(`cd ${projectName}`));
          console.log(chalk.cyanBright("npm install"));
          spinner.stop(); // 停止
          delEmptyFile(projectName);
          spinner.succeed("Loading succeed"); // 成功 ✔
        } else {
          spinner.stop(); // 停止
          console.log(chalk.red("构建异常"));
        }
      });
    })
    .catch((error) => {
      spinner.stop(); // 停止
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
};

const delEmptyFile = (projectName: string) => {
  const path = join(process.cwd(), projectName);

  const getFiles = (getPath: string) => {
    fs.readdir(getPath, (err, files: string[]) => {
      if (err) throw err;
      files.forEach((file) => {
        const filedir = join(getPath, file);
        const stats = fs.statSync(filedir);
        const isDir = stats.isDirectory();
        if (isDir) {
          fs.readdir(filedir, (cErr, cFiles: string[]) => {
            if (cErr) throw err;
            if (cFiles.length <= 0) {
              fs.rmdir(filedir);
            } else {
              getFiles(filedir);
            }
          });
        }
      });
    });
  };
  getFiles(path);
};

const createTemplates = async (answers: any) => {
  const { variant, projectName } = answers;
  const templatePath =
    variant === "TypeScript" ? "project_template_ts" : "project_template";
  // 从模板复制项目
  await projectCopy(templatePath, projectName, answers);
};

const projectCopy = async (
  templatePath: string,
  projectName: string,
  answers,
) => {
  const { variant, eslint } = answers;

  const files = await fs.readdir(join(__dirname, templatePath), {
    withFileTypes: true,
  });
  const manualOperation = [
    "src",
    "package.json",
    ".prettierrc",
    ".eslintrc_js.cjs",
    ".eslintrc_ts.cjs",
    "tsconfig.json",
    "tsconfig.node.json",
    "env.d.ts",
  ];

  const model = {
    eslint: [".prettierrc"],
    ts: ["tsconfig.json", "tsconfig.node.json", "env.d.ts"],
  };

  files.forEach((item: any) => {
    //兼容低版本
    const ItemPath = item.path
      ? item.path
      : join(
          process.cwd(),
          "build",
          "commands",
          "create",
          "project_template_ts",
        );

    const path = join(ItemPath, item.name);
    const targetPath = join(
      process.cwd(),
      projectName,
      path.split(templatePath)[1],
    );
    const fileName = item.name;
    // 处理src下文件
    if (fileName === "src") {
      fs.ensureDirSync(join(process.cwd(), projectName, "src"));
      readFileList(join(__dirname, templatePath, "src"), answers).then(
        (fileList: string[]) => {},
      );
    }
    // ts
    if (variant === "TypeScript" && model.ts.includes(fileName)) {
      fs.copy(path, targetPath, (err) => {
        if (err) throw err;
      });
    }
    // eslint
    if (eslint) {
      if (fileName === ".prettierrc") {
        fs.copy(path, targetPath, (err) => {
          if (err) throw err;
        });
      }
      if (variant === "TypeScript" && fileName === ".eslintrc_ts.cjs") {
        fs.copy(
          path,
          targetPath.replace(".eslintrc_ts", ".eslintrc"),
          (err) => {
            if (err) throw err;
          },
        );
      }
      if (variant !== "TypeScript" && fileName === ".eslintrc_js.cjs") {
        fs.copy(
          path,
          targetPath.replace(".eslintrc_js", ".eslintrc"),
          (err) => {
            if (err) throw err;
          },
        );
      }
    }

    // 其他文件自动复制
    if (manualOperation.includes(item.name)) return;
    fs.copy(path, targetPath, (err) => {
      if (err) throw err;
    });
  });

  const fileSuffix = variant === "TypeScript" ? "ts" : "js";
  // 追加写入viteConfig文件
  const viteConfigData = createViteConfig(answers);
  fs.outputFileSync(
    join(process.cwd(), projectName, `vite.config.${fileSuffix}`),
    viteConfigData,
  );
  // 追加写入package文件
  const createPackageData = createPackage(answers);
  fs.outputFileSync(
    join(process.cwd(), projectName, "package.json"),
    createPackageData,
  );

  //追加main文件
  const mainData = createMain(answers);
  fs.outputFileSync(
    join(process.cwd(), projectName, "src", `main.${fileSuffix}`),
    mainData,
  );
};

const readFileList = async (path, answers) => {
  const { projectName, variant } = answers;
  const templatePath =
    variant === "TypeScript" ? "project_template_ts" : "project_template";
  const files = await fs.readdir(path, { withFileTypes: true });
  const fileList = [];
  // 将当前目录下文件写入
  fileWrite(path, files, projectName, templatePath, answers);
  // 获取目录
  for (const dirent of files) {
    const filedir = join(path, dirent.name);
    const targetPath = join(
      process.cwd(),
      projectName,
      filedir.split(templatePath)[1],
    );
    if (dirent.isFile()) {
      // 处理文件
      fileList.push(filedir);
    } else if (dirent.isDirectory()) {
      fs.ensureDirSync(targetPath);
      // 递归读取子目录中的文件
      const subDirFiles = await readFileList(filedir, answers);
      fileList.push(...subDirFiles);
    }
  }
  // 当所有文件都被读取后，返回文件列表
  return fileList;
};

const isCopyFile = (answers, filePath: string) => {
  const file = filePath.substring(filePath.indexOf("src"), filePath.length);
  const { variant } = answers;
  const filePostfix = variant === "TypeScript" ? ".ts" : ".js";
  const modelFile = {
    echarts: [join("src", "hooks", `userEcharts${filePostfix}`)],
    i18n: [
      join("src", "hooks", `useI18${filePostfix}`),
      join("src", "lang", "en.json"),
      join("src", "lang", "zh-CN.json"),
      join("src", "lang", `lang${filePostfix}`),
      join("src", "layouts", "hooks", `useLang${filePostfix}`),
    ],
    three: [
      join("src", "utils", "three", `index${filePostfix}`),
      join("src", "utils", "three", `ModelThree${filePostfix}`),
      join("src", "utils", "three", `SpriteThree${filePostfix}`),
      join("src", "utils", "three", `Three${filePostfix}`),
      join("src", "utils", "three", "indexdb", `index${filePostfix}`),
      join("src", "utils", "three", "interface", `index${filePostfix}`),
      join("src", "utils", "three", "utils", `index${filePostfix}`),
    ],
  };
  let flag = true;
  for (const [key, value] of Object.entries(modelFile)) {
    if (!value.includes(file)) continue;
    if (typeof answers[key] === "boolean" && !answers[key]) {
      flag = false;
      return false;
    }
  }
  return flag;
};

const fileWrite = (path, files, projectName, templatePath, answers) => {
  const fileList = files.filter((dirent) => dirent.isFile());
  const vueFileNameList = fileList
    .filter((dirent) => extname(dirent.name) === ".vue")
    .map((item) => item.name.replace(extname(item.name), ""));

  fileList.forEach(() => {});
  if (vueFileNameList.length === 0) {
    // 目录下没有vue文件
    fileList.forEach((dirent) => {
      const filedir = join(path, dirent.name);
      const targetPath = join(
        process.cwd(),
        projectName,
        filedir.split(templatePath)[1],
      );
      // 根据模块判断是否需要复制

      if (isCopyFile(answers, targetPath)) {
        fs.copyFile(filedir, targetPath);
      }
    });
  } else {
    fileList.forEach(async (item) => {
      const filedir = join(path, item.name);
      const targetPath = join(
        process.cwd(),
        projectName,
        filedir.split(templatePath)[1],
      );
      const fileName = item.name.replace(extname(item.name), "");
      if (vueFileNameList.includes(fileName)) {
        // vue文件写入
        if (extname(item.name) === ".vue") {
          // 判断vue文件是否需要写入
          const flag = writeVueFile(answers, targetPath);
          if (flag) {
            const convertVue = new ConvertVue({
              path,
              fileName,
              answers,
              model: ["hook_1"],
            });
            const vueFile = await convertVue.init();
            fs.outputFileSync(targetPath, vueFile);
          }
        }
      } else {
        // 其他文件复制
        // 根据模块判断是否需要复制
        if (isCopyFile(answers, targetPath)) {
          fs.copyFile(filedir, targetPath);
        }
      }
    });
  }
};

const writeVueFile = (answers, filePath: string) => {
  const file = filePath.substring(filePath.indexOf("src"), filePath.length);
  const modelFile = {
    three: [join("src", "views", "three", `three.vue`)],
  };
  let flag = true;
  for (const [key, value] of Object.entries(modelFile)) {
    if (!value.includes(file)) continue;
    if (typeof answers[key] === "boolean" && !answers[key]) {
      flag = false;
      return false;
    }
  }
  return flag;
};

const action = (projectName: string) => {
  const cwdUrl = process.cwd();
  createFolder(join(cwdUrl, projectName))
    .then(() => {
      userQuestions(projectName);
    })
    .catch(() => {
      console.log(
        chalk.red(`项目名可能已存在，请更换项目名或者删除文件夹${projectName}`),
      );
    });
};
export default {
  command: "create <registry-name> ",
  description: "create a new project",
  action: action,
};

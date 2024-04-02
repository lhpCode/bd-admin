// 文件复制
import fs from "fs-extra";
import { join, extname } from "path";
const cwdUrl = process.cwd();

const getFileListAndIncludes = (startUrl, destUrl) => {
  return new Promise((res, rej) => {
    fs.readdir(startUrl, (err, files) => {
      if (err) throw err;
      const filePromiseAll = [];
      files.forEach((file) => {
        const filedir = join(startUrl, file);
        const stats = fs.statSync(filedir);
        const isFile = stats.isFile(); //是文件
        const isDir = stats.isDirectory(); //是文件夹
        if (isFile) {
          // 将tsconfig.json无法编译的文件复制到project_template
          if (extname(file) !== ".ts") {
            const copyToJs = destUrl.replace(
              "project_template_ts",
              "project_template",
            );
            fs.ensureDirSync(copyToJs); // 确保文件夹存在
            filePromiseAll.push(
              fs.copyFile(join(startUrl, file), join(copyToJs, file)),
            );
          }
          filePromiseAll.push(
            fs.copyFile(join(startUrl, file), join(destUrl, file)),
          );
        }
        if (isDir) {
          fs.mkdir(join(destUrl, file)).then(() => {
            getFileListAndIncludes(
              join(startUrl, file),
              join(destUrl, file),
            ).then((filePromiseAll) => {
              Promise.all(filePromiseAll);
            });
          });
        }
      });
      res(filePromiseAll);
    });
  });
};

fs.readFile(join("./", "package.json"), function (err, data) {
  if (err) throw err;
  fs.writeFile(join("./", "build", "package.json"), data, function (err) {
    if (err) throw err;
  });
});

fs.readFile(join("./", "README.md"), function (err, data) {
  if (err) throw err;
  fs.writeFile(join("./", "build", "README.md"), data, function (err) {
    if (err) throw err;
  });
});

const destUrl = join(
  cwdUrl,
  "build",
  "commands",
  "create",
  "project_template_ts",
);

// 复制ts文件
fs.mkdir(destUrl).then(() => {
  getFileListAndIncludes(
    join(cwdUrl, "src", "commands", "create", "project_template"),
    destUrl,
    false,
  ).then((filePromiseAll) => {
    Promise.all(filePromiseAll);
  });
});

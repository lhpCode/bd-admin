import fs from "fs-extra";
import spawn from "cross-spawn";
import chalk from "chalk";

export const getFileList = (filesPath: string): Promise<string[]> => {
  return new Promise((res, rej) => {
    fs.readdir(filesPath, (err: any, fileList: string[]) => {
      if (err) rej(err);
      res(fileList);
    });
  });
};

export const createFolder = (path: string): Promise<string[]> => {
  return new Promise((res, rej) => {
    fs.readdir(path, (err: any, files: string[]) => {
      if (err) {
        fs.mkdir(path, (err: any) => {
          if (err) {
            rej(err);
          } else {
            res([]);
          }
        });
      } else {
        rej(files);
      }
    });
  });
};

export const installDependencies = (
  path: string,
  command: string,
): Promise<any> => {
  return new Promise((res, rej) => {
    const dependencies = ["ejs@3.1.8"];
    const child = spawn(command, ["install", "-D"].concat(dependencies), {
      stdio: "inherit",
      cwd: path,
    });
    child.on("close", function (code) {
      // 执行失败
      if (code !== 0) {
        console.log(chalk.red("Error occurred while installing dependencies!"));
        rej();
      } else {
        res(code);
      }
    });
  });
};

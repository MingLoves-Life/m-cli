#!/usr/bin/env node
import { program } from "commander";
import inquirer from "inquirer";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

console.log(import.meta.dir);
console.log(import.meta.url);
console.log(dirname(import.meta.url));
console.log(process.cwd());

program.version("1.0.0", "-v, --version");

program
  .option("-c, --create", "create a new file")
  .option("-d, --copy", "copy a file");

program.action(() => {
  const { create, copy } = program.opts();
  if (create) {
    console.log("create a new file");
    inquirer
      .prompt([
        {
          type: "list",
          name: "type",
          message: "请选择要创建的文件类型",
          choices: [
            {
              name: "路由",
              value: "route",
            },
            {
              name: "组件",
              value: "component",
            },
          ],
        },
        {
          type: "checkbox",
          name: "routeType",
          message: "请选择要创建的路由类型",
          when: (answers) => answers.type === "route",
          choices: [
            {
              name: "菜单路由",
              value: "menu",
            },
            {
              name: "动态路由",
              value: "dynamic",
            },
          ],
          validate: (value) => {
            if (value.length === 0) {
              return "请选择路由类型";
            }
            return true;
          },
        },
        {
          type: "input",
          name: "routeName",
          message: "请输入路由名称",
          when: (answers) => answers.type === "route",
        },
        {
          type: "list",
          name: "componentType",
          message: "请选择组件类型",
          when: (answers) => answers.type === "component",
          choices: [
            {
              name: "formTable",
              value: "formTable",
            },
            {
              name: "formDrawer",
              value: "formDrawer",
            },
          ],
        },
      ])
      .then((answers) => {
        const fileContent = fs.readFileSync(
          fileURLToPath(join(dirname(import.meta.url), "template.js")),
          "utf-8"
        );

        const newContent = fileContent.replace(
          "{{template}}",
          JSON.stringify(answers)
        );

        fs.writeFileSync(
          join(process.cwd(), `${answers.routeName}.js`),
          newContent
        );
      });
  }

  if (copy) {
    console.log("copy a file");
  }
});

program.parse(process.argv);

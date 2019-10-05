/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable @typescript-eslint/no-explicit-any,no-console,security/detect-object-injection */
/* eslint-disable security/detect-child-process,@typescript-eslint/no-var-requires,import/no-extraneous-dependencies */
require("./envs");

const { spawn } = require("child_process");
const format = require("format");

((process.env.FORCE_COLOR as unknown) as boolean) = true;

let command: string;
let commandType: number;
if (process.env.SPAWN_CODE) {
  command = (process.env.SPAWN_CODE as string).split("Q")[0];
  commandType = 1;
} else if (process.env.SPAWN_CODE_2) {
  command = (process.env.SPAWN_CODE_2 as string).split("Q")[0];
  commandType = 2;
}
// @ts-ignore
const spawns = [];

(process.env.APPS as string).split(",").map(app => {
  let spawnCode: string;
  if (commandType === 1) {
    spawnCode = format(process.env.SPAWN_CODE, app);
  } else if (commandType === 2) {
    spawnCode = format(
      process.env.SPAWN_CODE_2,
      Math.floor(Math.random() * 1000) + 9000,
      app
    );
  }
  // @ts-ignore
  const args = spawnCode.split("Q")[1].split("@");
  // @ts-ignore
  const identifier = spawnCode.split("Q")[2].split(",");
  if (process.env[app + identifier] === "true")
    spawns.push({
      spawn: spawn(command, args, {
        env: process.env
      }),
      app,
      spawnCode: process.env.SPAWN_CODE
    });
  return {};
});

// @ts-ignore
spawns.map((_, i) => {
  // @ts-ignore
  spawns[i].spawn.stdout.on("data", (data: any) => {
    console.log(
      `stdout: ${
        // @ts-ignore
        spawns[i].app
      } ${data.toString().trim()}`
    );
  });
  // @ts-ignore
  spawns[i].spawn.stderr.on("data", (data: any) => {
    console.log(
      `stderr: ${
        // @ts-ignore
        spawns[i].app
      } ${data.toString().trim()}`
    );
  });
  // @ts-ignore
  spawns[i].spawn.on("exit", (code: any) => {
    console.log(
      `::child process exited with code ${code.toString()} appName=${
        // @ts-ignore
        spawns[i].app
      } spawnCode=${
        // @ts-ignore
        spawns[i].spawnCode
      }`
    );
  });
  return {};
});

/*eslint-disable*/
require("./envs");

const { spawn } = require("child_process");
const format = require("format");

process.env.FORCE_COLOR = true;

let command;
let commandType;
if (process.env.SPAWN_CODE) {
  command = process.env.SPAWN_CODE.split("Q")[0];
  commandType = 1;
} else if (process.env.SPAWN_CODE_2) {
  command = process.env.SPAWN_CODE_2.split("Q")[0];
  commandType = 2;
}
const spawns = [];

process.env.APPS.split(",").map(app => {
  let spawnCode;
  if (commandType === 1) {
    spawnCode = format(process.env.SPAWN_CODE, app);
  } else if (commandType === 2) {
    spawnCode = format(
      process.env.SPAWN_CODE_2,
      Math.floor(Math.random() * 1000) + 9000,
      app
    );
  }
  const args = spawnCode.split("Q")[1].split("@");
  const identifier = spawnCode.split("Q")[2].split(",");
  if (process.env[app + identifier] === "true")
    spawns.push({
      spawn: spawn(command, args, {
        env: process.env
      }),
      app,
      spawnCode: process.env.SPAWN_CODE
    });
});

spawns.map((_, i) => {
  spawns[i].spawn.stdout.on("data", (data) => {
    console.log(
      `stdout: ${
      spawns[i].app
      } ${data.toString().trim()}`
    );
  });
  spawns[i].spawn.stderr.on("data", (data) => {
    console.log(
      `stderr: ${
      spawns[i].app
      } ${data.toString().trim()}`
    );
  });
  spawns[i].spawn.on("exit", (code) => {
    console.log(
      `::child process exited with code ${code.toString()} appName=${
      spawns[i].app
      } spawnCode=${
      spawns[i].spawnCode
      }`
    );
  });
});

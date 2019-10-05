/* eslint-disable no-underscore-dangle */
/* eslint-disable global-require */
/* eslint-disable no-console */
import { getProcessEnv } from "@@src/nodejs/utils/helpers";
import chalk from "chalk";
// import { captureException, init } from "@sentry/node";
import { Debugger } from "debug";

// if (!isDev()) {
//   init({
//     dsn: getProcessEnv("KEY_LOGGER")
//   });
// }

class Logger {
  private _logging?: boolean;

  private static _debugs: { [t: string]: Debugger } = {};

  private _ext: string;

  private _debug: Debugger;

  private _name: string;

  public constructor(ext: string, name?: string) {
    this._ext = ext;
    this._name = name || `${getProcessEnv("ALL_NAME_APP")}:_default_`;
    let DEBUG;
    if (!Logger._debugs[name + ext]) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      DEBUG = require("debug")(`${this.name}`);
      Logger._debugs[name + ext] = DEBUG;
    } else {
      DEBUG = Logger._debugs[name + ext];
    }
    this._debug = DEBUG;
  }

  public get logging(): boolean | undefined {
    return this._logging;
  }

  public get ext(): string {
    return this._ext;
  }

  public get name(): string {
    return this._name;
  }

  public get debug(): Debugger {
    return this._debug;
  }

  public isLogging(x: boolean): Logger {
    this._logging = x;
    return this;
  }

  public createLog(_log: string | object): Logger {
    const log = JSON.stringify(_log);
    if (typeof this._logging === "undefined") {
      this.debug(
        chalk.bgBlue(new Date().toString()),
        chalk.blue(
          `${log}  ${chalk.white("|")} ${chalk.magenta(
            JSON.stringify(this.ext)
          )}`
        ),
        chalk.bgBlueBright("LOGGER_LOG")
      );
    } else if (this._logging === true) {
      console.log(
        // console.trace(
        chalk.bgBlue(new Date().toString()),
        chalk.blue(
          `${log}  ${chalk.white("|")} ${chalk.magenta(
            JSON.stringify(this.ext)
          )}`
        ),
        chalk.bgBlueBright("LOGGER_LOG")
      );
    }
    return this;
  }

  public createError(_log: string | object): Logger {
    const log = JSON.stringify(_log);
    try {
      throw new Error(
        `${chalk.redBright(log)} ${chalk.white("|")} ${chalk.red(this.ext)}`
      );
    } catch (err) {
      if (typeof this._logging === "undefined") {
        this.debug(
          chalk.bgRed(new Date().toString()),
          err,
          chalk.bgRedBright("LOGGER_ERROR")
        );
      } else if (this._logging === true) {
        console.trace(
          chalk.bgRed(new Date().toString()),
          err,
          chalk.bgRedBright("LOGGER_ERROR")
        );
      }
      // if (!isDev()) {
      //   captureException(err);
      // }
    }
    return this;
  }
}

export default Logger;

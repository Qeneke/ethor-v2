import chalk from "chalk";

const getProcessEnv = (
  processEnv: string,
  test?: boolean
): string | undefined => {
  // eslint-disable-next-line security/detect-object-injection
  if (typeof process.env[processEnv] === "undefined" && !test) {
    // eslint-disable-next-line no-console
    console.trace(
      chalk.bgRed(new Date().toString()),
      `Environment not found:${processEnv}`,
      chalk.bgRedBright("LOGGER_ERROR")
    );
  }
  // eslint-disable-next-line security/detect-object-injection
  return process.env[processEnv];
};

export default getProcessEnv;

/* eslint-disable no-underscore-dangle */
import "../../envs";
import editJsonFile from "edit-json-file";
import unhandledRejection from "unhandled-rejection";

const folder = process.env.NODE_ENV !== "production" ? "src" : "build/src";
const packageJson = editJsonFile(`${process.cwd()}/package.json`);
Object.keys(packageJson.toObject()._moduleAliases).map(
  (moduleAlias): string => {
    if (moduleAlias === "@@graphql") {
      let graphqlFolder = "_@graphql_types";
      if (process.env.NODE_ENV === "production") {
        graphqlFolder = "build/_@graphql_types";
      }
      packageJson.set(`_moduleAliases.${moduleAlias}`, graphqlFolder);
      packageJson.save();
      return moduleAlias;
    }
    // eslint-disable-next-line security/detect-object-injection
    let splitting = packageJson
      .toObject()
      ._moduleAliases[moduleAlias].split("/");
    splitting = splitting.slice(2, splitting.length);
    splitting.unshift(folder);
    const splittingJoin = splitting.join("/");
    packageJson.set(`_moduleAliases.${moduleAlias}`, splittingJoin);
    packageJson.save();
    return moduleAlias;
  }
);

if (process.env.NODE_ENV === "production") {
  if ((packageJson.toObject()._building as unknown) === "0") {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require,security/detect-child-process
    const childProcess = require("child_process");
    childProcess.spawn(process.argv.shift(), process.argv, {
      cwd: process.cwd(),
      detached: false,
      stdio: "inherit"
    });
    packageJson.set(`_building`, "1");
    packageJson.save();
    process.exit(0);
  }
} else {
  packageJson.set(`_building`, "0");
  packageJson.save();
}

require("module-alias/register");

const Logger = require("@@src/nodejs/utils/logger").default;

const rejectionEmitter = unhandledRejection({
  timeout: process.env.NODE_ENV !== "production" ? 1 : 100
});
new Logger("package.json:toObject:moduleAliases")
  .isLogging(true)
  .createLog(packageJson.toObject()._moduleAliases);
const rejectionEmitterFunc = (errMessage: string): void => {
  rejectionEmitter.on(errMessage, (err: string): void => {
    // eslint-disable-next-line no-console
    console.log(err);
    new Logger(errMessage).isLogging(true).createError(err);
  });
};
rejectionEmitterFunc("unhandledRejection");
rejectionEmitterFunc("rejectionHandled");

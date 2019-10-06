/* eslint-disable no-underscore-dangle */
import unhandledRejection from "unhandled-rejection";
import moduleAlias from 'module-alias';
import { publicEnvs } from "../../envs";

const moduleAliases = {
  "@@src": `${(publicEnvs as { buildDir: string }).buildDir}/src`,
  "@@graphql": `${(publicEnvs as { buildDir: string }).buildDir}/_@graphql_types`
};
moduleAlias.addAliases(moduleAliases);

const Logger = require("@@src/nodejs/utils/logger").default;

const rejectionEmitter = unhandledRejection({
  timeout: process.env.NODE_ENV !== "production" ? 1 : 100
});
new Logger("package.json:toObject:moduleAliases")
  .isLogging(true)
  .createLog(moduleAliases);
const rejectionEmitterFunc = (errMessage: string): void => {
  rejectionEmitter.on(errMessage, (err: string): void => {
    // eslint-disable-next-line no-console
    console.log(err);
    new Logger(errMessage).isLogging(true).createError(err);
  });
};
rejectionEmitterFunc("unhandledRejection");
rejectionEmitterFunc("rejectionHandled");

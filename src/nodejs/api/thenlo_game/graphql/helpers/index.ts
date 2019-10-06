import { Application } from "express";
import { isDev, getProcessEnv } from "@@src/nodejs/utils/helpers";
import { join } from "path";
import { readdirSync, statSync } from "fs";

export default ({
  app,
  appName
}: {
  app: Application;
  appName: string;
}): { port: string | number; link: string; services: string[] } => {
  if (isDev()) {
    // eslint-disable-next-line no-underscore-dangle
    const _routes = app._router;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,no-inner-declarations,@typescript-eslint/no-unused-vars
    function removeMiddlewares(route: any, i: any, routes: any): void {
      // if (!route.handle.name) {
      // eslint-disable-next-line no-param-reassign
      routes = routes.splice(i, 1);
      // }
      if (route.route) route.route.stack.forEach(removeMiddlewares);
    }
    // eslint-disable-next-line no-unused-expressions
    _routes && _routes.stack.forEach(removeMiddlewares);
  }

  const port = getProcessEnv(`${appName}_PORT`) as string | number;
  const link = getProcessEnv(`${appName}_LOCALHOST_LINK`) as string;

  const servicesPath = join(
    process.cwd(),
    "src",
    "nodejs",
    "api",
    appName,
    "graphql",
    "services"
  );
  const services = readdirSync(servicesPath).filter((f): boolean =>
    statSync(join(servicesPath, f)).isDirectory()
  );

  app.use(
    `/${getProcessEnv("ALL_PATH_GRAPHQL")}_*`,
    (req, res, next): unknown => {
      if (
        req.headers[getProcessEnv("API_SERVER_AUTH_KEY") as string] !==
        getProcessEnv("API_SERVER_AUTH_ITEM")
      ) {
        return res.status(404).send();
      }
      return next();
    }
  );

  return { port, link, services };
};

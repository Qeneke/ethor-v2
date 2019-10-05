/* eslint-disable import/no-extraneous-dependencies,@typescript-eslint/no-var-requires,global-require */
import "./load";
import { isDev, getProcessEnv } from "@@src/nodejs/utils/helpers";
import { join } from "path";
import { readdirSync, statSync } from "fs";

const Server = require("@@src/nodejs/utils/server").default;

(process.env.APPS as string).split(",").map((appName: string) => {
  const server = new Server({ appName });
  server.start();

  if (
    isDev() &&
    getProcessEnv("_API", true) &&
    !getProcessEnv("_WEB", true) &&
    getProcessEnv(`${appName}_API_NODEJS_GRAPHQL`) === "true"
  ) {
    process.setMaxListeners(0);
    const { generate } = require("@graphql-codegen/cli");
    const graphqlGenerate = (): void => {
      const link = getProcessEnv(`${appName}_LOCALHOST_LINK`);
      const path = `${getProcessEnv("ALL_PATH_GRAPHQL")}`;
      const servicesPath = join(
        __dirname,
        "api",
        appName,
        "graphql",
        "services"
      );

      const services = readdirSync(servicesPath).filter((f): boolean =>
        statSync(join(servicesPath, f)).isDirectory()
      );
      services.map(
        async (service: string): Promise<boolean> => {
          await generate(
            {
              silent: true,
              schema: {
                [`${link}/${path}_${service}`]: {
                  headers: {
                    [getProcessEnv(
                      "API_SERVER_AUTH_KEY"
                    ) as string]: getProcessEnv("API_SERVER_AUTH_ITEM")
                  }
                }
              },
              documents: null,
              generates: {
                [`${process.cwd()}/_@graphql_types/${appName}/${service}.types.ts`]: {
                  plugins: ["typescript", "typescript-resolvers"]
                }
              }
            },
            true
          );
          return true;
        }
      );
      generate(
        {
          silent: true,
          schema: `${link}/${path}`,
          documents: null,
          generates: {
            [`${process.cwd()}/_@graphql_types/${appName}/servicesAll.json`]: {
              plugins: ["introspection"]
            }
          }
        },
        true
      );
    };
    graphqlGenerate();

    const paths = [`api/${appName}`];
    const pathCheck = (id: string): boolean[] => {
      return paths.map((path): boolean => {
        return id.startsWith(join(__dirname, path));
      });
    };
    const chokidar = require("chokidar");
    return paths.map((watcherPath): string => {
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      const watcher = chokidar.watch(join(__dirname, watcherPath));
      watcher.on("ready", (): void => {
        watcher.on("all", (event: string, dir: string): void => {
          // eslint-disable-next-line no-console
          console.log(event, "event", dir);
          Object.keys(require.cache).forEach((id): void => {
            if (pathCheck(id).indexOf(true) !== -1) {
              // console.log(id);
              // eslint-disable-next-line security/detect-object-injection
              delete require.cache[id];
            }
          });
          graphqlGenerate();
          server.api();
          server.api();
        });
      });
      return watcherPath;
    });
  }
  return {};
});
